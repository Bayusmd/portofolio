"use code";
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IdCardLanyard() {
  return (
    <div className="relative w-full h-[550px] flex justify-center items-start overflow-visible pt-2">
      {/* 
        Membungkus tali dan kartu menjadi SATU KESATUAN.
        - Animasi masuk: Jatuh dari atas (y: -400 ke 0) dengan efek memantul (spring).
        - Fitur drag: Seluruh bagian (tali + kartu) bisa ditarik/digeser bersamaan.
      */}
      <motion.div
        drag
        dragConstraints={{ top: -40, bottom: 80, left: -60, right: 60 }}
        dragElastic={0.2}
        whileTap={{ cursor: "grabbing" }}
        initial={{ y: -400, opacity: 0, rotate: -5 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 12,
          mass: 1.2,
        }}
        className="relative flex flex-col items-center cursor-grab select-none z-30"
      >
        {/* 1. Pengait / Gantungan di paling atas */}
        <div className="w-4 h-6 bg-gradient-to-b from-zinc-500 to-zinc-700 rounded-t-sm shadow-md border border-zinc-400"></div>
        <div className="w-7 h-3 bg-zinc-800 rounded-sm shadow-md -mt-1 border border-zinc-600"></div>

        {/* 2. Tali Lanyard (Menyatu langsung di atas kartu) */}
        <div className="w-[3px] h-[120px] bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-400 shadow-sm relative flex items-center justify-center">
          {/* Teks kecil di tali */}
          <span className="absolute text-[8px] tracking-[0.25em] text-zinc-400 font-mono uppercase -rotate-90 whitespace-nowrap opacity-70">
            PORTFOLIO
          </span>
        </div>

        {/* 3. Klip Metal & Ring Penghubung Tali ke Kartu */}
        <div className="flex flex-col items-center -space-y-1">
          <div className="w-5 h-4 border-2 border-zinc-400 rounded-full bg-zinc-800 shadow-md"></div>
          <div className="w-6 h-5 bg-gradient-to-b from-zinc-300 to-zinc-600 rounded-md shadow-md border border-zinc-500 z-10"></div>
        </div>

        {/* 4. Kartu ID Utama */}
        <div className="w-64 bg-zinc-900 border border-zinc-700/80 rounded-3xl p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-md mt-[-4px]">
          {/* Speaker / Notch ala Smartphone/ID Card Modern */}
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-3"></div>

          {/* Frame Foto */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shadow-inner">
            <Image
              src="/bayu.jpeg" // Pastikan foto Anda ada di folder public/bayu.jpeg
              alt="Fauzan Bayu"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
              priority
            />
            {/* Efek kilau kaca tipis */}
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