"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IdCardLanyard() {
  return (
    <div className="relative w-full h-[520px] flex justify-end items-start pr-16 overflow-visible">
      {/* 
        Membungkus tali miring dan kartu ID menjadi satu kesatuan.
        - Animasi awal: Masuk dari atas dengan efek memantul (spring).
        - Fitur drag: Bisa ditarik dan digeser bebas.
      */}
      <motion.div
        drag
        dragConstraints={{ top: -30, bottom: 60, left: -50, right: 30 }}
        dragElastic={0.25}
        whileTap={{ cursor: "grabbing" }}
        initial={{ y: -350, opacity: 0, rotate: -10 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 12,
        }}
        className="relative flex flex-col items-center cursor-grab select-none z-30"
      >
        {/* 1. Tali Lanyard Miring (Diagonal) persis seperti referensi video */}
        <div className="absolute -top-[140px] right-[75px] w-[3px] h-[160px] bg-gradient-to-b from-zinc-700 via-zinc-500 to-zinc-400 rotate-[22deg] origin-bottom z-10 flex items-center justify-center shadow-sm">
          {/* Teks ID CARD di sepanjang tali */}
          <span className="text-[9px] tracking-[0.3em] text-zinc-300 font-mono uppercase -rotate-90 whitespace-nowrap opacity-90 select-none">
            ID CARD
          </span>
        </div>

        {/* 2. Klip Besi / Gantungan Penghubung */}
        <div className="relative z-20 flex flex-col items-center mt-2">
          <div className="w-4 h-4 border-2 border-zinc-400 rounded-full bg-zinc-800 shadow-md"></div>
          <div className="w-6 h-5 bg-gradient-to-b from-zinc-300 to-zinc-600 rounded-md shadow-md border border-zinc-500 -mt-1"></div>
        </div>

        {/* 3. Kartu ID Utama */}
        <div className="w-60 bg-zinc-900 border border-zinc-700/80 rounded-3xl p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-md mt-1">
          {/* Lubang Gantungan / Notch */}
          <div className="w-10 h-1.5 bg-zinc-800 rounded-full mx-auto mb-3"></div>

          {/* Frame Foto (Efek Hitam Putih & Berwarna saat Hover) */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shadow-inner">
            <Image
              src="/bayu.jpeg" // Pastikan foto Anda ada di folder public/bayu.jpeg
              alt="Fauzan Bayu"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
              priority
            />
            {/* Efek kilau cahaya tipis */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Informasi Nama & Role */}
          <div className="mt-3.5 text-center pb-1">
            <h3 className="font-bold text-sm text-white tracking-wide">
              Fauzan Bayu Samudra
            </h3>
            <p className="text-[11px] text-blue-400 font-mono tracking-widest mt-0.5 uppercase">
              Fullstack Developer
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}