"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes, FaEnvelope } from "react-icons/fa";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "showcase", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ show = true }: { show?: boolean }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // Menandai menu aktif sesuai bagian yang sedang terlihat
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.2 }}
      className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4"
    >
      <div className="pointer-events-auto relative w-full max-w-3xl">
        {/* Kapsul utama */}
        <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-zinc-900/70 p-1.5 pl-2 shadow-lg shadow-black/40 backdrop-blur-md">
          {/* Logo monogram */}
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              FB
            </span>
            <span className="text-base font-semibold text-white">
              Fauzan<span className="text-blue-500">.</span>
            </span>
          </a>

          {/* Menu desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === l.id ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-zinc-800"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            ))}
          </div>

          {/* Tombol kontak (desktop) */}
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:fauzanbayu123@gmail.com"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:inline-flex"
          >
            <FaEnvelope size={13} /> Contact me
          </motion.a>

          {/* Hamburger (HP) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-white md:hidden"
          >
            {open ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </nav>

        {/* Panel menu (HP) */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-white/10 bg-zinc-900/90 p-2 backdrop-blur-md md:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm ${
                    active === l.id
                      ? "bg-zinc-800 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="mailto:fauzanbayu123@gmail.com"
                className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white"
              >
                <FaEnvelope size={13} /> Contact me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}