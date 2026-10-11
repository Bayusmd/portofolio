"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IdCardLanyard() {
  return (
    <div className="relative w-full h-[520px] flex justify-center items-start pt-0 overflow-visible">
      {/* 1. Tali Lanyard Vertikal Lurus */}
      <div className="absolute top-0 w-[3px] h-[140px] bg-gradient-to-b from-zinc-700 via-zinc-500 to-zinc-400 z-10 shadow-sm flex items-center justify-center">
        {/* Teks kecil di tali */}
        <span className="text-[9px] tracking-[0.2em] text-zinc-400 font-mono uppercase -rotate-90 whitespace-nowrap opacity-80">
          DEV PORTFOLIO
        </span>
      </div>

      {/* 2. Ring & Klip Metal Gantungan */}
      <div className="absolute top-[138px] z-20 flex flex-col items-center">
        {/* Ring Besi Lingkaran */}
        <div className="w-4 h-4 border-2 border-zinc-400 rounded-full bg-zinc-800 shadow-md"></div>
        {/* Klip Metal Jepitan */}
        <div className="w-5 h-4 bg-gradient-to-b from-zinc-300 to-zinc-600 rounded-sm -mt-1 shadow-md border border-zinc-500"></div>
      </div>

      {/* 3. Container Kartu ID (Bisa di-drag & membal) */}
      <motion.div
        drag
        dragConstraints={{ top: -30, bottom: 80, left: -60, right: 60 }}
        dragElastic={0.25}
        whileHover={{ scale: 1.02 }}
        whileTap={{ cursor: "grabbing" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="absolute top-[158px] w-64 bg-zinc-900/90 border border-zinc-700/80 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-grab z-30 select-none"
      >
        {/* Lubang Gantungan Kartu (Hole Punch) */}
        <div className="w-8 h-2 bg-zinc-950 border border-zinc-700 rounded-full mx-auto mb-3 shadow-inner"></div>

        {/* Frame Foto */}
        <div className="relative w-full h-72 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shadow-inner">
          <Image
            src="/bayu.jpeg" // Ganti dengan path foto Anda
            alt="Fauzan Bayu"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
            priority
          />
          {/* Efek Kilau Kaca (Glass Reflect) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Informasi Nama & Role */}
        <div className="mt-3 text-center pb-1">
          <h3 className="font-bold text-sm text-white tracking-wide">
            Fauzan Bayu Samudra
          </h3>
          <p className="text-[11px] text-blue-400 font-mono tracking-wider mt-0.5 uppercase">
            Fullstack Developer
          </p>
        </div>
      </motion.div>
    </div>
  );
}