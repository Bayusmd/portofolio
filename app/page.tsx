"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, animate, useInView, useMotionValue, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaMailBulk,
  FaExternalLinkAlt,
  FaCode,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import IdCardLanyard from "./IdCardLanyard";
import Navbar from "./Navbar";

// Data dummy untuk workexperience Projects, Certificates, dan Tech Stack
const workExperiences = [
  {
    role: "Full-Stack Web Developer Intern (Intership)",
    company: "Dinas Komunikasi Dan Informatika Kabupaten Karanganyar",
    period: "Feb 2025 - Apr 2025",
    logo: "/work/diskominfo.png", // Letakkan gambar logo di folder public/
    description: "Mengembangkan dan memelihara sistem informasi desa berbasis WordPress dan fullstack web, mencakup perancangan UI/UX responsif, integrasi API, serta optimasi kinerja sistem.",
  },
  {
    role: "Freelance Web Developer",
    company: "-",
    period: "2024 - Present",
    logo: "/work/freelance.png", // Letakkan gambar logo di folder public/
    description: "Mengembangkan berbagai aplikasi web kustom untuk klien menggunakan stack seperti Laravel,React.js, Next.js, SQL, Dan Wordpress sesuai kebutuhan bisnis",
  },
];

const projectsData = [
  {
    id: "desa-lemahbang",
    title: "Website Desa Lemahbang",
    category: "Laravel Development",
    desc: "Building a Laravel-based Website for village profile and administration.",
    image: "/project1.png",
    webLink: "https://lemahbangdesa.smartsense.my.id",
    repoLink: "https://github.com/Bayusmd/Website-Desa",
    techs: ["Laravel", "Tailwind CSS", "MySQL", "RestAPI"],
    features: ["Profil Desa", "Manajemen Surat Administrasi", "Berita Desa & Pengumuman", "Notifikasi Wa otomatis untuk permohonan surat"]
  },
  {
    id: "desa-paseban",
    title: "Website Desa Paseban",
    category: "WordPress Development",
    desc: "Redesign of a WordPress-based website for official village government information.",
    image: "/project3.png",
    webLink: "https://paseban.karanganyarkab.go.id",
    repoLink: "#",
    techs: ["WordPress", "Elementor", "Divibuilder"],
    features: ["Informasi Publik", "Struktur Organisasi", "Transparansi Anggaran"]
  },
  {
    id: "booking-futsal",
    title: "Website Booking Futsal",
    category: "Fullstack Laravel",
    desc: "Building a Laravel-based Website for booking futsal fields seamlessly.",
    image: "/project5.png",
    webLink: "",
    repoLink: "https://github.com/Bayusmd/web-booking-futsal",
    techs: ["Laravel", "Bootstrap", "MySQL"],
    features: ["Sistem Jadwal Realtime", "Booking Lapangan", "Manajemen Pembayaran"]
  },
  {
    id: "outlet-management",
    title: "Website Management Outlet",
    category: "Fullstack Web App",
    desc: "Building a Website Management Outlet (Ginastel Management App).",
    image: "/project8.png",
    webLink: "",
    repoLink: "https://github.com/Bayusmd/Ginastel-Management-App",
    techs: ["Laravel", "JavaScript", "Tailwind CSS"],
    features: ["Manajemen Stok Barang", "Laporan Keuangan Harian", "Kasir Outlet"]
  },
  {
    id: "kuiskuy-app",
    title: "KuisKuy Application",
    category: "Mobile App",
    desc: "Interactive quiz mobile application built for fun learning.",
    image: "/project4.png",
    webLink: "",
    repoLink: "https://github.com/Bayusmd/quizapp",
    techs: ["Android Studio", "Java", "Firebase"],
    features: ["Sistem Skor & Leaderboard", "Kategori Kuis Beragam", "Desain UI Responsif"]
  },
  {
    id: "cinequick-ui",
    title: "Design CineQuick Mobile App",
    category: "UI/UX Design",
    desc: "Design UI Mobile App for cinema ticket booking experience.",
    image: "/project6.png",
    webLink: "https://www.figma.com/design/OI6bH1Xs7YCl8bqXIPmZgA/Desain-UI-CineQuick?node-id=0-1&t=FbyoMQryADVI1cla-1",
    repoLink: "#",
    techs: ["Figma", "UI/UX Research", "Prototyping"],
    features: ["User Flow Pemesanan Bioskop", "Wireframing", "High-Fidelity Design"]
  },
  {
    id: "vapestore-ui",
    title: "Design Cashier Vapestore App",
    category: "UI/UX Design",
    desc: "Design UI App for Vapestore cashier system.",
    image: "/project7.png",
    webLink: "https://www.figma.com/design/HauK3sQa0oxxk5tvuLKmp5/Untitled?node-id=0-1&t=3mbe6ToZ9Kbvdzyl-1",
    repoLink: "#",
    techs: ["Figma", "Design System"],
    features: ["Dashboard Kasir", "Manajemen Produk", "Interface Clean & Modern"]
  }
];

const certificatesData = [
  {
    title: "Sertifikat Magang Diskominfo Kabupaten Karanganyar",
    image: "/kominfo.png", // Ganti dengan path gambar sertifikat asli Anda
    issuer: "Diskominfo Kabupaten Karanganyar"
  },
  // Tambahkan sertifikat lain di sini jika ada
];

const techStackData = [
  { name: "Laravel", icon: "/tech/laravel.png" },
  { name: "Figma", icon: "/tech/figma.png" },        
  { name: "WordPress", icon: "/tech/wordpress.png" },
  { name: "Android Studio", icon: "/tech/android.png" },
  { name: "Next.js", icon: "/tech/nextjs.png" },
  { name: "react.js", icon: "/tech/react.png" },
  { name: "TypeScript", icon: "/tech/typescript.png" },
  { name: "Python", icon: "/tech/python.png" },       
  { name: "Bootstrap css", icon: "/tech/bootstrap.png" },
  { name: "Tailwind CSS", icon: "/tech/tailwind.png" },
  { name: "PHP", icon: "/tech/php.png" },
  { name: "MySQL", icon: "/tech/mysql.png" },
  
  
  
];


const educationData = [
  {
    logo: "/ums.png",
    title: "S1 Teknik Informatika",
    subtitle: "Universitas Muhammadiyah Surakarta",
    period: "2022 - 2026",
    extra: "IPK 3.81",
  },
  {
    logo: "/sma.png",
    title: "MIPA",
    subtitle: "SMAN Jumapolo",
    period: "2018 - 2021",
  },
];

const aboutContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const aboutItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Angka yang berhitung naik dari 0
function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix]);

  return <span ref={ref}>{(0).toFixed(decimals) + suffix}</span>;
}

type TimelineEntry = {
  logo: string;
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  extra?: string;
};

// Timeline vertikal dengan logo di setiap item
function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="relative pl-8">
      {/* Garis yang menggambar diri dari atas */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ originY: 0 }}
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 to-blue-500/10"
      />

      <div className="space-y-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative"
          >
            {/* Titik penanda */}
            <span className="absolute -left-8 top-6 h-3.5 w-3.5 rounded-full bg-blue-500 ring-4 ring-black" />

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-start gap-4 rounded-xl border border-gray-800 bg-zinc-900/60 p-4 transition-colors hover:border-blue-500/50"
            >
              {/* Logo */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-800">
                <Image src={it.logo} alt={`Logo ${it.subtitle}`} width={36} height={36} className="object-contain" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold md:text-base">{it.title}</h4>
                <p className="text-xs text-gray-400 md:text-sm">{it.subtitle}</p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                    {it.period}
                  </span>
                  {it.extra && (
                    <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
                      ⭐ {it.extra}
                    </span>
                  )}
                </div>

                {it.description && (
                  <p className="mt-3 text-xs leading-relaxed text-gray-500">{it.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Foto dengan efek miring mengikuti kursor + badge melayang
function TiltPhoto() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={reset} className="group">
      <motion.div style={{ rotateX, rotateY }} className="relative w-fit">
        <Image
          src="/bayu.jpeg"
          width={300}
          height={400}
          alt="Fauzan Bayu"
          className="h-auto w-64 rounded-xl object-cover shadow-xl md:w-[300px]"
        />
        <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-xl border-2 border-blue-500 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />

        {/* Badge melayang */}
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute -left-3 top-8 z-10 flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-xs text-gray-200 backdrop-blur md:-left-8"
        >
          <FaCode className="text-blue-400" size={12} /> Fullstack Dev
        </motion.span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute -right-2 bottom-12 z-10 flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-xs text-gray-200 backdrop-blur md:-right-8"
        >
          <FaMapMarkerAlt className="text-blue-400" size={12} /> Karanganyar
        </motion.span>
      </motion.div>
    </div>
  );
}


const roles = [
  "Fullstack Web Developer",
  "Laravel Developer",
  "UI/UX Designer",
  "WordPress Developer",
];

function TypingRole() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span>
      <span className="text-blue-400">{text}</span>
      <span className="ml-0.5 animate-pulse text-blue-400">|</span>
    </span>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  
  // State untuk Portfolio Showcase Tabs ("projects" | "certificates" | "techstack")
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "techstack">("projects");
  
  // State untuk Halaman Detail Project (Menyimpan objek project yang sedang dibuka, atau null jika di menu utama)
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  // State untuk Popup Gambar Sertifikat
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Pesan dari ${form.name}`;
    const body = `Nama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`;
    window.location.href = `mailto:fauzanbayu123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Loading & Welcome Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="flex items-center gap-3 mb-4"
            >
              <Image src="/profile.jpg" width={60} height={60} className="rounded-full border-2 border-blue-500" alt="Logo" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold tracking-wider"
            >
              Selamat Datang di <span className="text-blue-500">Portofolio Saya</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm text-gray-400 mt-2"
            >
              Fauzan Bayu Samudra • Fullstack Developer
            </motion.p>

            <div className="w-48 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-blue-500 w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-black text-white min-h-screen">
        {/* Navbar */}
        <Navbar show={!isLoading} />



        {/* Hero */}
        <section
          id="home"
          className="relative grid md:grid-cols-2 items-center gap-10 px-6 md:px-10 pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          {/* Glow latar belakang */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

          <motion.div
            className="relative z-10"
            initial="hidden"
            animate={!isLoading ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            }}
          >
            {/* Badge status */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-blue-300">
                Open for Freelance & Work
              </span>
            </motion.div>
            
            {/* Judul */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Fauzan
              </span>{" "}
              Bayu
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                Samudra
              </span>
            </motion.h1>
            
            {/* Teks berganti otomatis */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-4 text-lg md:text-xl font-semibold text-gray-200 h-8"
            >
              <TypingRole />
            </motion.p>
            
            {/* Deskripsi */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-4 text-gray-400 max-w-md leading-relaxed"
            >
              Saya seorang web developer yang fokus pada performa, desain modern, dan
              hasil nyata.
            </motion.p>
            
            {/* Tombol */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#showcase"
                className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-600/30"
              >
                Lihat Portfolio
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="/cv/Fauzan-Bayu-Samudra-CV.pdf"
                download="Fauzan-Bayu-Samudra-CV.pdf"
                className="border border-gray-600 px-6 py-3 rounded-lg hover:border-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                Download CV
              </motion.a>
            </motion.div>
            
            {/* Social icons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="text-xs text-gray-500 mr-1">Find me on</span>
              {[
                { icon: <FaGithub size={16} />, href: "https://github.com/Bayusmd" },
                { icon: <FaLinkedinIn size={16} />, href: "https://www.linkedin.com/in/fauzan-bayu-samudra-3061a1440" },
                { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/bayu_samudra.id" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3 }}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
            
          </motion.div>



          {/* Komponen ID Card Lanyard Interaktif */}
            <div className="order-first md:order-last mt-20 md:mt-0 flex justify-center items-center w-full">
              <IdCardLanyard play={!isLoading} />
            </div>
        </section>

        {/* ABOUT & EDUCATION */}
        <section
          id="about"
          className="scroll-mt-24 grid items-start gap-12 px-6 py-20 md:grid-cols-2 md:gap-10 md:px-10"
        >
          {/* KIRI: teks, statistik, timeline */}
          <motion.div
            variants={aboutContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="order-last md:order-first"
          >
            <motion.p variants={aboutItem} className="mb-2 text-sm font-semibold text-blue-500">
              ABOUT ME
            </motion.p>

            <motion.h2 variants={aboutItem} className="text-4xl font-bold">
              Tentang Saya
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 mt-3 h-[3px] rounded-full bg-blue-600"
            />

            <motion.p variants={aboutItem} className="mb-4 leading-relaxed text-gray-400">
              Saya lulusan S1 Teknik Informatika dari Universitas Muhammadiyah Surakarta
              dengan keahlian pengembangan sistem digital berbasis web dan dukungan IT.
              Saya adalah seorang{" "}
              <span className="font-medium text-blue-400">Full Stack Web Developer</span>{" "}
              yang fokus pada pembuatan aplikasi modern dari frontend hingga backend.
            </motion.p>

            <motion.p variants={aboutItem} className="mb-8 leading-relaxed text-gray-400">
              Berpengalaman dalam membangun website dinamis, API, dan aplikasi mobile
              menggunakan teknologi modern dengan pemahaman yang kuat tentang teknologi
              web menggunakan <span className="font-medium text-blue-400">Laravel</span>{" "}
              dan <span className="font-medium text-blue-400">WordPress</span>, serta
              berpengalaman dalam instalasi dan troubleshooting perangkat lunak.
            </motion.p>

            {/* Statistik */}
            <motion.div variants={aboutItem} className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { node: <CountUp to={3.81} decimals={2} />, label: "IPK" },
                { node: <CountUp to={projectsData.length} suffix="+" />, label: "Projects" },
                { node: <CountUp to={workExperiences.length} />, label: "Pengalaman" },
                { node: <span>S1</span>, label: "Informatika" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-gray-800 bg-zinc-900/60 p-4 text-center transition-colors hover:border-blue-500/50"
                >
                  <p className="text-2xl font-bold text-white">{s.node}</p>
                  <p className="mt-1 text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
            
            {/* Pendidikan */}
            <motion.h3 variants={aboutItem} className="mb-4 text-xl font-bold text-gray-200">
              Pendidikan
            </motion.h3>
            <Timeline items={educationData} />
            
            {/* Pengalaman kerja */}
            <motion.h3 variants={aboutItem} className="mb-4 mt-10 text-xl font-bold text-gray-200">
              Pengalaman Kerja
            </motion.h3>
            <Timeline
              items={workExperiences.map((exp) => ({
                logo: exp.logo,
                title: exp.role,
                subtitle: exp.company === "-" ? "Independen" : exp.company,
                period: exp.period,
                description: exp.description,
              }))}
            />
          </motion.div>
            
          {/* KANAN: foto (di HP tampil paling atas, di desktop menempel saat scroll) */}
          <div className="order-first flex justify-center md:order-last md:sticky md:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltPhoto />
            </motion.div>
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE SECTION (Projects, Certificates, Tech Stack) */}
        <section id="showcase" className="scroll-mt-24 px-10 py-20 border-t border-gray-800">
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-bold tracking-tight mb-2">Portfolio Showcase</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Explore my journey through projects, certifications, and technical expertise.
            </p>

            {/* Menu Navigasi Showcase ala Desain Referensi */}
            <div className="inline-flex bg-zinc-900 border border-gray-800 p-1.5 rounded-full mt-8 shadow-inner">
              <button
                onClick={() => { setActiveTab("projects"); setSelectedProject(null); }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "projects" ? "bg-zinc-800 text-blue-400 shadow-md border border-gray-700" : "text-gray-400 hover:text-white"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => { setActiveTab("certificates"); setSelectedProject(null); }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "certificates" ? "bg-zinc-800 text-blue-400 shadow-md border border-gray-700" : "text-gray-400 hover:text-white"
                }`}
              >
                Certificates
              </button>
              <button
                onClick={() => { setActiveTab("techstack"); setSelectedProject(null); }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "techstack" ? "bg-zinc-800 text-blue-400 shadow-md border border-gray-700" : "text-gray-400 hover:text-white"
                }`}
              >
                Tech Stack
              </button>
            </div>
          </div>

          {/* KONTEN TAB: PROJECTS */}
          {activeTab === "projects" && !selectedProject && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all hover:-translate-y-1 group"
                >
                  <div className="overflow-hidden h-48 relative">
                    <Image src={project.image} fill alt={project.title} className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-blue-500 font-semibold">{project.category}</span>
                    <h3 className="font-bold text-lg mt-1 mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.desc}</p>
                    <span className="inline-block mt-4 text-blue-400 text-sm font-medium">Lihat Detail →</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* HALAMAN DETAIL PROJECT (Muncul saat salah satu project diklik) */}
          {activeTab === "projects" && selectedProject && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
              {/* Tombol Back */}
              <button
                onClick={() => setSelectedProject(null)}
                className="text-blue-400 hover:text-blue-300 font-medium mb-6 flex items-center gap-2 text-sm"
              >
                ← Back to Projects
              </button>
          
              {/* Judul & Deskripsi */}
              <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
              <p className="text-gray-400 text-base mb-6 leading-relaxed">{selectedProject.desc}</p>
          
              {/* GAMBAR PREVIEW PROJECT (Ditambahkan di bawah deskripsi judul) */}
              <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden border border-gray-800 mb-8 shadow-lg">
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>
          
              {/* Grid Kotak Info Fitur & Teknologi */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 border border-gray-800 p-5 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                    <FaCode /> {selectedProject.techs.length} Technologies Used
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedProject.techs.map((t, idx) => (
                      <span key={idx} className="bg-zinc-800 text-gray-300 px-3 py-1 rounded-md text-xs border border-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                  
                <div className="bg-black/40 border border-gray-800 p-5 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                    ✨ Key Features
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
                    {selectedProject.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
                  
              {/* Link Tombol Eksternal */}
              <div className="flex gap-4 flex-wrap">
                {selectedProject.webLink ? (
                  <a href={selectedProject.webLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition">
                    <FaExternalLinkAlt size={14} /> Visit Website
                  </a>
                ) : (
                  <span className="bg-zinc-800 text-gray-500 px-5 py-2.5 rounded-xl text-sm font-medium cursor-not-allowed">No Live Link</span>
                )}

                {selectedProject.repoLink && selectedProject.repoLink !== "#" ? (
                  <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer" className="border border-gray-700 hover:border-blue-500 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition">
                    <FaGithub size={16} /> View Repository
                  </a>
                ) : (
                  <span className="border border-gray-800 text-zinc-600 px-5 py-2.5 rounded-xl text-sm font-medium cursor-not-allowed">No Repository</span>
                )}
              </div>
            </motion.div>
          )}

          {/* KONTEN TAB: CERTIFICATES */}
          {activeTab === "certificates" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {certificatesData.map((cert, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCert(cert.image)}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all hover:-translate-y-1 p-4 group"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 mb-4">
                    <Image src={cert.image} fill alt={cert.title} className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="font-bold text-center text-sm text-gray-200">{cert.title}</h3>
                  <p className="text-xs text-center text-blue-400 mt-1">{cert.issuer}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* KONTEN TAB: TECH STACK */}
          {activeTab === "techstack" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {techStackData.map((tech, idx) => (
                <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/50 transition flex flex-col items-center justify-center gap-3">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image 
                      src={tech.icon} 
                      alt={tech.name} 
                      width={48} 
                      height={48} 
                      className="object-contain" 
                    />
                  </div>
                  <span className="font-bold text-sm text-gray-200">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          )}

        </section>

        {/* MODAL POPUP UNTUK SERTIFIKAT */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-gray-900 border border-gray-800 p-4 rounded-2xl max-w-3xl w-full">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 bg-zinc-800 p-2 rounded-full text-gray-400 hover:text-white transition"
              >
                <FaTimes size={18} />
              </button>
              <div className="relative h-[400px] w-full mt-6">
                <Image src={selectedCert} fill alt="Sertifikat" className="object-contain rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24 py-28 px-6 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-400 text-lg mb-4">Have a project in mind?</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Let's <span className="text-blue-500">build</span> something <br /> great.
            </h2>
            <div className="mt-10">
              <a
                href="mailto:fauzanbayu123@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-zinc-100 hover:text-black shadow-lg"
              >
                <FaMailBulk size={20} /> Get In Touch
              </a>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-2 text-sm">
              <span className="text-zinc-500">Local Time</span>
              <span className="text-zinc-600">•</span>
              <span className="font-medium text-white">
                {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black text-gray-400 border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Fauzan <span className="text-blue-600">Bayu</span> Samudra.
                </h2>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  Fresh Graduate Informatika yang berfokus pada Web Development,
                  UI/UX, serta pengembangan aplikasi modern yang responsif.
                </p>
              </div>

              <div>
                <h3 className="font-semibold tracking-widest text-white uppercase text-sm mb-6">Navigasi</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="#home" className="hover:text-blue-600 transition">Home</Link></li>
                  <li><Link href="#about" className="hover:text-blue-600 transition">About</Link></li>
                  <li><Link href="#showcase" className="hover:text-blue-600 transition">Portfolio</Link></li>
                  <li><Link href="#contact" className="hover:text-blue-600 transition">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold tracking-widest text-white uppercase text-sm mb-6">Skills</h3>
                <ul className="space-y-3 text-sm">
                  <li>Laravel Development</li>
                  <li>Next.js Development</li>
                  <li>UI / UX Design</li>
                  <li>WordPress Development</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold tracking-widest text-white uppercase text-sm mb-6">Social Media</h3>
                <div className="flex gap-4">
                  <a href="www.linkedin.com/in/fauzan-bayu-samudra-3061a1440" target="_blank" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <FaLinkedinIn size={16} />
                  </a>
                  <a href="https://github.com/Bayusmd" target="_blank" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition">
                    <FaGithub size={16} />
                  </a>
                  <a href="https://www.instagram.com/bayu_samudra.id" target="_blank" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition">
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-900 mt-14 pt-8 text-center text-xs text-gray-600">
              © 2026 <span className="text-blue-600">Fauzan Bayu Samudra</span>. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}