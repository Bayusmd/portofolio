"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

// Ukuran area & titik-titik penting (satuan px)
const W = 420; // lebar area
const H = 640; // tinggi area
const ANCHOR = { x: 340, y: -60 }; // titik tali menempel di atas (kanan atas, di luar area)
const CLIP = { x: W / 2, y: 120 }; // titik tali bertemu klip kartu (posisi awal)

export default function IdCardLanyard() {
  // Posisi drag kartu
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Efek masuk: kartu jatuh dari atas layar lalu memantul (spring)
  useEffect(() => {
    animate(y, 0, { type: "spring", stiffness: 70, damping: 7, mass: 1.2 });
  }, [y]);

  // Rotasi mengikuti arah tarikan, seperti bandul yang berayun
  const rotateRaw = useTransform(x, [-200, 200], [-28, 28]);
  const rotate = useSpring(rotateRaw, { stiffness: 110, damping: 7, mass: 0.9 });

  // Tali selalu tersambung dari titik anchor ke klip kartu saat kartu digeser
  const x2 = useTransform(x, (v) => CLIP.x + v);
  const y2 = useTransform(y, (v) => CLIP.y + v);
  const pathD = useTransform(
    [x, y] as const,
    ([vx, vy]: number[]) =>
      `M ${CLIP.x + vx} ${CLIP.y + vy} L ${ANCHOR.x} ${ANCHOR.y}`
  );

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: W, height: H }}
    >
      {/* Tali lanyard hitam + tulisan "ID CARD" mengikuti arah tali */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 overflow-visible"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
      >
        <defs>
          <motion.path id="lanyard-path" d={pathD} />
        </defs>

        {/* Badan tali */}
        <motion.line
          x1={ANCHOR.x}
          y1={ANCHOR.y}
          x2={x2}
          y2={y2}
          stroke="#0a0a0a"
          strokeWidth={16}
          strokeLinecap="butt"
        />
        {/* Garis tepi tipis agar tali terlihat di background gelap */}
        <motion.line
          x1={ANCHOR.x}
          y1={ANCHOR.y}
          x2={x2}
          y2={y2}
          stroke="#2a2a2a"
          strokeWidth={17}
          strokeLinecap="butt"
          style={{ mixBlendMode: "lighten" }}
          opacity={0.35}
        />

        {/* Teks di tali */}
        <text
          fill="#e5e5e5"
          fontSize={7}
          fontFamily="ui-monospace, monospace"
          letterSpacing={3}
          dy={2.5}
        >
          <textPath href="#lanyard-path" startOffset="18%">
            ID CARD &nbsp;&nbsp;&nbsp;&nbsp; ID CARD &nbsp;&nbsp;&nbsp;&nbsp; ID CARD
          </textPath>
        </text>
      </svg>

      {/* Kartu yang bisa ditarik; saat dilepas kembali ke posisi gantung & berayun */}
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
          transformOrigin: "50% 0%", // berayun dari titik klip di atas kartu
          left: CLIP.x - 110,
          top: CLIP.y,
        }}
        className="absolute z-20 cursor-grab touch-none"
      >
        {/* Strap kecil / klip penghubung tali ke kartu */}
        <div className="absolute -top-3 left-1/2 z-10 h-6 w-4 -translate-x-1/2 rounded-sm bg-neutral-950 ring-1 ring-neutral-700" />

        {/* Kartu: frame putih rounded dengan foto hitam-putih */}
        <div className="relative h-[300px] w-[220px] rounded-2xl bg-white p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Lubang gantungan */}
          <div className="absolute left-1/2 top-1 h-1.5 w-8 -translate-x-1/2 rounded-full bg-neutral-300" />

          <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-900">
            <Image
              src="/rifqi.jpeg" // taruh foto kamu di public/rifqi.jpeg
              alt="Rifqi Muhammad Aliya"
              fill
              priority
              draggable={false}
              className="pointer-events-none object-cover grayscale"
            />
            {/* Kilau cahaya diagonal halus */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
