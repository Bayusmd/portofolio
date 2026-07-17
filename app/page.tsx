"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";


export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = `Pesan dari ${form.name}`;
    const body = `Nama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`;

    window.location.href = `mailto:fauzanbayu123@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Image src="/profile.jpg" width={40} height={40} className="rounded-full" alt="" />
          <div>
            <h1 className="font-bold">Fauzan Bayu Samudra</h1>
            <p className="text-xs text-blue-500">PORTOFOLIO</p>
          </div>
        </div>

        <div className="hidden md:flex gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#projects" className="hover:text-blue-500">Projects</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </div>

        <a href="mailto:fauzanbayu123@gmail.com" className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700">
          Contact Me
        </a>
      </nav>

      {/* Hero */}
      <section className="grid md:grid-cols-2 items-center px-10 py-20">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-white-500 text-sm mb-2">JUNIOR FULLSTACK WEB DEVELOPER</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-blue-500">Fauzan</span> Bayu <span className="text-blue-500">Samudra</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-md">
            Saya seorang web developer yang fokus pada performa, desain modern, dan hasil nyata.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#projects" className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
              Lihat Project
            </a>
            <a href="/cv/Fauzan-Bayu-Samudra-CV.pdf"
              download="Fauzan-Bayu-Samudra-CV.pdf" className="border border-gray-600 px-6 py-3 rounded-lg hover:border-blue-500">
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-10 md:mt-0"
        >
          <p className="text-gray-500 text-sm mb-2">// developer profile</p>
          <pre className="text-sm text-blue-400">
{`const developer = {
  name: "Fauzan Bayu Samudra",
  role: "Fullstack Developer",
  location: "Indonesia",
  stack: ["Next.js", "Laravel", "Android Studio"]
}`}
          </pre>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-10 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
          <p className="text-blue-500 text-sm mb-2">ABOUT ME</p>
          <h2 className="text-4xl font-bold mb-6">Tentang Saya</h2>

          <p className="text-gray-400 mb-4">
            Saya lulusan S1 Teknik Informatika dari Universitas Muhammadiyah Surakarta dengan keahlian 
            pengembangan sistem digital berbasis web dan dukungan IT. Saya adalah 
            seorang <b>Juniol Full Stack Web Developer</b> yang fokus pada pembuatan 
            aplikasi modern dari frontend hingga backend.
          </p>

          <p className="text-gray-400 mb-6">
            Berpengalaman dalam membangun website dinamis, API, dan aplikasi mobile
            menggunakan teknologi modern dengan pemahaman yang kuat tentang teknologi web 
            menggunakan Laravel dan Wordpress, serta berpengalaman dalam instalasi dan 
            troubleshooting perangkat lunak. 
          </p>

          {/* Info Box */}
          <div className="flex gap-4 flex-wrap">
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-transparent border border-blue-500/30">
              📍 Karanganyar, Jawa Tengah
            </div>
            {/* <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-transparent border border-blue-500/30"> */}
              {/* 💼 2+ Tahun Freelance */}
            {/* </div> */}
          </div>


        {/* Education */}
          <div className="mt-6 space-y-4">

            {/* UMS */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-transparent border border-blue-500/30 flex justify-between items-center">

              {/* KIRI */}
              <div className="flex items-center gap-4">

                {/* Logo */}
                <div className="w-14 h-14  rounded-lg flex items-center justify-center shadow-md">
                  <Image
                    src="/ums.png"
                    alt="Logo UMS"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold">S1 Teknik Informatika</h3>
                  <p className="text-sm text-gray-400">
                    Universitas Muhammadiyah Surakarta
                  </p>
                </div>
              </div>

              {/* KANAN */}
              <div className="text-right">
                <p className="text-blue-500 font-bold">2022 - 2026</p>
                <p className="text-sm text-gray-400">⭐ IPK 3.81</p>
              </div>
            </div>

            {/* SMA */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-transparent border border-blue-500/30 flex justify-between items-center">

              {/* KIRI */}
              <div className="flex items-center gap-4">

                {/* Logo */}
                <div className="w-14 h-14  rounded-lg flex items-center justify-center shadow-md">
                  <Image
                    src="/sma.png"
                    alt="Logo SMAN Jumapolo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold">MIPA</h3>
                  <p className="text-sm text-gray-400">
                    SMAN Jumapolo
                  </p>
                </div>
              </div>

              {/* KANAN */}
              <div className="text-right">
                <p className="text-blue-500 font-bold">2018 - 2021</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Image */}
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
          <div className="relative w-fit mx-auto">
            <Image src="/bayu.jpeg" width={300} height={400} className="rounded-xl" alt="" />
            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl translate-x-4 translate-y-4"></div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-10 py-20">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
            <Image src="/project1.png" width={400} height={200} alt="" />
            <div className="p-4">
              <h3 className="font-bold">Website Desa Lemahbang</h3>
              <p className="text-gray-400 text-sm">Building a Laravel-based Website</p>
              <a href="https://lemahbangdesa.smartsense.my.id" target="_blank" className="text-blue-500 text-sm">Kunjungi</a>
            </div>
          </motion.div>
                            
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
            <Image src="/project3.png" width={400} height={200} alt="" />
            <div className="p-4">
              <h3 className="font-bold">Website Desa Paseban</h3>
              <p className="text-gray-400 text-sm">Redesign of a WordPress-based website</p>
              <a href="https://paseban.karanganyarkab.go.id" target="_blank" className="text-blue-500 text-sm">Kunjungi</a>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
            <Image src="/project5.png" width={400} height={200} alt="" />
            <div className="p-4">
              <h3 className="font-bold">Website Booking Futsal</h3>
              <p className="text-gray-400 text-sm">Building a Laravel-based Website</p>
              <a href="https://github.com/Bayusmd/web-booking-futsal" target="_blank" className="text-blue-500 text-sm">View Repository</a>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
            <Image src="/project8.png" width={400} height={200} alt="" />
            <div className="p-4">
              <h3 className="font-bold">Website Management Outlet</h3>
              <p className="text-gray-400 text-sm">Building a Website Management Outlet</p>
              <a href="https://github.com/Bayusmd/Ginastel-Management-App" target="_blank" className="text-blue-500 text-sm">View Repository</a>
            </div>
          </motion.div>

           <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
            <Image src="/project4.png" width={400} height={200} alt="" />
            <div className="p-4">
              <h3 className="font-bold">KuisKuy Aplication</h3>
              <p className="text-gray-400 text-sm">Mobile App</p>
              <a href="#" className="text-blue-500 text-sm">Detail</a>
            </div>
           </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
         <Image src="/project6.png" width={400} height={200} alt="" />
         <div className="p-4">
           <h3 className="font-bold">Design CineQuick Mobile Aplication</h3>
           <p className="text-gray-400 text-sm">Design UI Mobile App</p>
           <a href="https://www.figma.com/design/OI6bH1Xs7YCl8bqXIPmZgA/Desain-UI-CineQuick?node-id=0-1&t=FbyoMQryADVI1cla-1" className="text-blue-500 text-sm">Detail</a>
         </div>
        </motion.div>  

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 rounded-xl overflow-hidden">
         <Image src="/project7.png" width={400} height={200} alt="" />
         <div className="p-4">
           <h3 className="font-bold">Design Cashier Vapestore Aplication</h3>
           <p className="text-gray-400 text-sm">Design UI App</p>
           <a href="https://www.figma.com/design/HauK3sQa0oxxk5tvuLKmp5/Untitled?node-id=0-1&t=3mbe6ToZ9Kbvdzyl-1" className="text-blue-500 text-sm">Detail</a>
         </div>
        </motion.div>  
        </div>
      </section>

      {/* Contact */}
      <section  className="px-10 py-20 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Nama" className="w-full p-3 rounded bg-gray-900 border border-gray-700" onChange={handleChange} />
          <input name="email" placeholder="Email" className="w-full p-3 rounded bg-gray-900 border border-gray-700" onChange={handleChange} />
          <textarea name="message" placeholder="Pesan" className="w-full p-3 rounded bg-gray-900 border border-gray-700" onChange={handleChange} />
          <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">Kirim</button>
        </form>
      </section>

     
     
     


      <footer className="bg-black text-white-800 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Profile */}
            <div>
              <h2 className="text-3xl font-bold">
                Fauzan <span className="text-blue-600">Bayu</span> Samudra.
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                Fresh Graduate Informatika yang berfokus pada Web Development,
                UI/UX, serta pengembangan aplikasi modern yang responsif dan
                mudah digunakan.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold tracking-widest uppercase mb-6">
                Navigasi
              </h3>

              <ul className="space-y-4 text-gray-600">
                <li>
                  <Link href="#home" className="hover:text-blue-600 transition">
                    Home
                  </Link>
                </li>

                <li>
                  <Link href="#about" className="hover:text-blue-600 transition">
                    About
                  </Link>
                </li>

                <li>
                  <Link href="#projects" className="hover:text-blue-600 transition">
                    Projects
                  </Link>
                </li>

                <li>
                  <Link href="#contact" className="hover:text-blue-600 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold tracking-widest uppercase mb-6">
                Skills
              </h3>

              <ul className="space-y-4 text-gray-600">
                <li>Laravel Development</li>
                <li>Next.js Development</li>
                <li>UI / UX Design</li>
                <li>WordPress Development</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold tracking-widest uppercase mb-6">
                Social Media
              </h3>

              <div className="flex gap-4">

                <a
                  href="https://linkedin.com/in/USERNAME"
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <FaLinkedinIn size={20} />
                </a>

                <a
                  href="https://github.com/Bayusmd"
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  <FaGithub size={20} />
                </a>

                <a
                  href="https://instagram.com/bayu.sm_"
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300"
                >
                  <FaInstagram size={20} />
                </a>

              </div>

              <div className="mt-8">
                <p className="text-gray-600">Hubungi Langsung:</p>

                <a
                  id="contact"
                  href="mailto:fauzanbayu123@gmail.com"
                  className="font-semibold hover:text-blue-600"
                >
                  fauzanbayu123@gmail.com
                </a>
              </div>

            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-14 pt-8 text-center text-gray-500">
            © 2026 <span className="text-blue-600">Fauzan Bayu Samudra</span>. All
            rights reserved.
          </div>

        </div>
      </footer>

    </main>
  );
}
