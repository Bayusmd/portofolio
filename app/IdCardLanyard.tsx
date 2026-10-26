"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const W = 420;
const H = 640;
const CLIP = { x: W / 2, y: 120 }; // titik tali bertemu klip kartu
const ANCHORS = [
  { x: 130, y: -80 }, // tali kiri
  { x: 290, y: -80 }, // tali kanan
];

export default function IdCardLanyard({ play = true }: { play?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  // Hitung skala berdasarkan lebar container (tidak pernah > 1)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      setScale(Math.min(1, available / W));
      setReady(true);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(-300); // mulai dari atas, tersembunyi

  // Efek jatuh + memantul, baru jalan saat play = true
  useEffect(() => {
    if (!play) return;
    const controls = animate(y, 0, {
      type: "spring",
      stiffness: 70,
      damping: 7,
      mass: 1.2,
      delay: 0.3,
    });
    return () => controls.stop();
  }, [play, y]);

  // Rotasi berayun mengikuti tarikan
  const rotateRaw = useTransform(x, [-200, 200], [-28, 28]);
  const rotate = useSpring(rotateRaw, { stiffness: 110, damping: 7, mass: 0.9 });

  // Ujung tali ikut posisi kartu
  const x2 = useTransform(x, (v) => CLIP.x + v);
  const y2 = useTransform(y, (v) => CLIP.y + v);

  const pathLeft = useTransform(
    [x, y],
    ([vx, vy]: number[]) =>
      `M ${CLIP.x + vx} ${CLIP.y + vy} L ${ANCHORS[0].x} ${ANCHORS[0].y}`
  );
  const pathRight = useTransform(
    [x, y],
    ([vx, vy]: number[]) =>
      `M ${CLIP.x + vx} ${CLIP.y + vy} L ${ANCHORS[1].x} ${ANCHORS[1].y}`
  );

  return (
    // Wrapper: mengambil lebar penuh parent, dipakai untuk mengukur
    <div ref={wrapperRef} className="flex w-full justify-center">
      {/* Kotak dengan ukuran yang sudah di-scale (supaya layout ikut mengecil) */}
      <div
        className="relative select-none"
        style={{
          width: W * scale,
          height: H * scale,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {/* Kompensasi scale agar drag mengikuti jari/kursor dengan pas */}
        <MotionConfig
          transformPagePoint={(point) => ({
            x: point.x / scale,
            y: point.y / scale,
          })}
        >
          {/* Area kerja asli 420x640, di-scale dari pojok kiri atas */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: W,
              height: H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <svg
              className="pointer-events-none absolute inset-0 z-10 overflow-visible"
              width={W}
              height={H}
              viewBox={`0 0 ${W} ${H}`}
              fill="none"
            >
              <defs>
                <motion.path id="lanyard-left" d={pathLeft} />
                <motion.path id="lanyard-right" d={pathRight} />
              </defs>

              {/* Garis tepi tipis agar tali terlihat di background gelap */}
              {ANCHORS.map((a, i) => (
                <motion.line
                  key={`edge-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={x2}
                  y2={y2}
                  stroke="#3a3a3a"
                  strokeWidth={15}
                  opacity={0.35}
                />
              ))}

              {/* Badan tali */}
              {ANCHORS.map((a, i) => (
                <motion.line
                  key={`rope-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={x2}
                  y2={y2}
                  stroke="#0a0a0a"
                  strokeWidth={14}
                  strokeLinecap="butt"
                />
              ))}

              {/* Teks di tali */}
              <text
                fill="#e5e5e5"
                fontSize={7}
                fontFamily="ui-monospace, monospace"
                letterSpacing={3}
                dy={2.5}
              >
                <textPath href="#lanyard-left" startOffset="25%">
                  ID CARD &nbsp;&nbsp;&nbsp; ID CARD
                </textPath>
              </text>
              <text
                fill="#e5e5e5"
                fontSize={7}
                fontFamily="ui-monospace, monospace"
                letterSpacing={3}
                dy={2.5}
              >
                <textPath href="#lanyard-right" startOffset="25%">
                  ID CARD &nbsp;&nbsp;&nbsp; ID CARD
                </textPath>
              </text>
            </svg>

            {/* Kartu yang bisa ditarik */}
            <motion.div
              drag
              dragSnapToOrigin
              dragElastic={0.35}
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 140, bounceDamping: 8 }}
              whileTap={{ cursor: "grabbing" }}
              style={{
                x,
                y,
                rotate,
                transformOrigin: "50% 0%",
                left: CLIP.x - 110,
                top: CLIP.y,
              }}
              className="absolute z-20 cursor-grab touch-none"
            >
              {/* Klip penghubung tali ke kartu */}
              <div className="absolute -top-3 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-sm bg-neutral-950 ring-1 ring-neutral-700" />

              {/* Kartu */}
              <div className="relative h-[300px] w-[220px] rounded-2xl bg-white p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                {/* Lubang gantungan */}
                <div className="absolute left-1/2 top-1 h-1.5 w-8 -translate-x-1/2 rounded-full bg-neutral-300" />

                <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-900">
                  <Image
                    src="/bayu2.jpg"
                    alt="Fauzan Bayu Samudra"
                    fill
                    priority
                    draggable={false}
                    className="pointer-events-none object-cover"
                  />
                  {/* Kilau cahaya diagonal halus */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </MotionConfig>
      </div>
    </div>
  );
}