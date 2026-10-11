"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IdCardLanyard() {
  return (
    <div className="relative w-full h-[450px] flex justify-end items-start pr-12 overflow-hidden">
      {/* 1. Bagian Tali Lanyard (Garis miring dari atas ke kartu) */}
      <div className="absolute top-0 right-32 w-[2px] h-[180px] bg-gradient-to-b from-gray-600 to-gray-400 rotate-[15deg] origin-top z-10">
        {/* Teks kecil di tali lanyard ala ID card asli */}
        <span className="absolute top-10 -left-3 text-[9px] tracking-widest text-gray-400 -rotate-90 uppercase font-mono">
          ID CARD
        </span>
      </div>

      {/* 2. Klip / Gantungan di atas */}
      <div className="absolute top-[170px] right-[112px] w-6 h-4 bg-zinc-700 rounded-sm z-20 shadow-md"></div>

      {/* 3. Kartu ID yang bisa di-drag / digeser */}
      <motion.div
        drag
        dragConstraints={{ top: -20, bottom: 50, left: -50, right: 20 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.02 }}
        whileTap={{ cursor: "grabbing" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="absolute top-[185px] right-16 w-56 bg-zinc-900 border border-zinc-700 rounded-2xl p-3 shadow-2xl cursor-grab z-30 select-none backdrop-blur-md bg-opacity-90"
      >
        {/* Foto dalam Kartu */}
        <div className="relative w-full h-72 rounded-xl overflow-hidden bg-zinc-800 shadow-inner">
          <Image
            src="/bayu.jpeg" // Ganti dengan foto Anda
            alt="Fauzan Bayu ID Card"
            fill
            className="object-cover pointer-events-none"
          />
          {/* Efek kilau cahaya di kartu */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Nama / Info di bawah kartu */}
        <div className="mt-3 text-center">
          <h3 className="font-bold text-sm text-white">Fauzan Bayu Samudra</h3>
          <p className="text-[11px] text-blue-400 font-mono">Fullstack Developer</p>
        </div>
      </motion.div>
    </div>
  );
}