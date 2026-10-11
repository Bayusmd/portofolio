"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IdCardLanyard() {
  return (
    <div className="relative w-full h-[580px] flex justify-center items-start overflow-visible">
      {/* 
        Membungkus keseluruhan (Tali diagonal + Klip + Kartu ID) 
        - Efek masuk: Meluncur/jatuh dari atas layar dengan pegas yang memantul mulus.
        - Fitur drag: Bisa ditarik dan digeser bebas ke segala arah.
      */}
      <motion.div
        drag
        dragConstraints={{ top: -40, bottom: 80, left: -70, right: 70 }}
        dragElastic={0.25}
        whileTap={{ cursor: "grabbing" }}
        initial={{ y: -450, opacity: 0, rotate: -15 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 10,
          mass: 1.1,
        }}
        className="relative flex flex-col items-center cursor-grab select-none z-30 pt-32"
      >
        {/* Tali Lanyard Diagonal (Menyambung rapi dari sudut kanan atas menuju ke klip kartu) */}
        <div className="absolute -top-24 right-3 w-[3px] h-[210px] bg-gradient-to-b from-zinc-700 via-zinc-500 to-zinc-400 rotate-[32deg] origin-bottom z-10 flex items-center justify-center shadow-md">
          <span className="text-[9px] tracking-[0.35em] text-zinc-300 font-mono uppercase -rotate-90 whitespace-nowrap opacity-90 select-none">
            ID CARD
          </span>
        </div>

        {/* Klip Besi / Gantungan Penghubung Utama */}
        <div className="relative z-20 flex flex-col items-center mb-1">
          <div className="w-4 h-4 border-2 border-zinc-400 rounded-full bg-zinc-800 shadow-md"></div>
          <div className="w-6 h-5 bg-gradient-to-b from-zinc-300 to-zinc-600 rounded-md shadow-md border border-zinc-500 -mt-1"></div>
        </div>

        {/* Kartu ID Utama */}
        <div className="w-64 bg-zinc-900 border border-zinc-700/80 rounded-3xl p-3.5 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-md">
          {/* Notch / Speaker atas ala kartu/ponsel modern */}
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-3"></div>

          {/* Frame Foto (Hitam putih estetik, berubah berwarna saat di-hover) */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shadow-inner">
            <Image
              src="/bayu.jpeg" // Pastikan foto Anda ada di folder public/bayu.jpeg
              alt="Fauzan Bayu"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
              priority
            />
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