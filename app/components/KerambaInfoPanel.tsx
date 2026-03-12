"use client";

import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface KerambaInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KerambaInfoPanel({ isOpen, onClose }: KerambaInfoPanelProps) {
  // UX Improvement: Handle tombol Escape dan kunci scroll body saat modal terbuka
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-6xl max-h-[95vh] overflow-auto rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] border border-white/10 animate-in fade-in zoom-in-95 duration-200"
        style={{
          background:
            "linear-gradient(160deg, #064e3b 0%, #065f46 20%, #0c4a6e 50%, #0e7490 80%, #155e75 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/70 rounded-full p-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Tutup panel informasi"
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </button>

        {/* Content Container */}
        <div className="p-6 md:p-10">
          {/* Header */}
          <header className="mb-8 text-center">
            <h2
              id="modal-title"
              className="text-2xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md mb-2"
            >
              Peta Lokasi Jaring Pembesaran Tukik di Bacbau
            </h2>
            <p className="text-white/60 text-sm md:text-base font-medium">
              Struktur Keramba · Dimensi 5m × 5m · 4 Sekat · Jaring 2m
            </p>
          </header>

          {/* Main Layout: 3D Illustration + Sidebar Info */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* LEFT: 3D Perspective Illustration */}
            <div className="flex-1 w-full flex flex-col rounded-xl overflow-hidden bg-gradient-to-b from-sky-500/15 via-cyan-500/20 to-teal-500/20 border border-white/10 p-4">
              <KerambaIllustration />
            </div>

            {/* RIGHT: Sidebar Info */}
            <div className="lg:w-80 w-full flex flex-col gap-5 shrink-0">
              {/* Location Card */}
              <InfoCard title="Lokasi">
                <p className="font-medium text-white">📍 Bak Blau, Pulau Enggano</p>
                <p className="text-sm text-white/50">Bengkulu, Indonesia</p>
                <p className="text-xs text-white/40 mt-3 font-mono bg-black/20 p-2 rounded-md inline-block">
                  5°19'17.2"S 102°13'27.0"E
                </p>
              </InfoCard>

              {/* Legend Card */}
              <InfoCard title="Keterangan Peta">
                <LegendItem
                  title="Tiang Bambu"
                  desc="Pengikat Tali"
                  icon={
                    <div className="w-5 h-8 bg-amber-700 rounded-full relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full"></div>
                    </div>
                  }
                  iconBg="bg-amber-900/30 border-amber-600/30"
                />
                <LegendItem
                  title="Pelampung"
                  desc="Penanda & Daya Apung"
                  icon={<div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg"></div>}
                  iconBg="bg-yellow-500/20 border-yellow-500/30"
                />
                <LegendItem
                  title="Waring"
                  desc="Area Perlindungan Tukik"
                  icon={<div className="w-6 h-6 border-2 border-emerald-400 rounded"></div>}
                  iconBg="bg-emerald-500/20 border-emerald-500/30"
                />
              </InfoCard>

              {/* Bahan & Alat Instalasi Card */}
              <InfoCard title="🔧 Bahan & Alat Instalasi">
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <MaterialItem
                    icon="🪢"
                    title="Waring / Jaring"
                    desc="Jaring polyethylene mesh 2×2 cm, ukuran tiap sekat 2×2 m, kedalaman 1.5 m. Total 4 sekat."
                  />
                  <MaterialItem
                    icon="⚓"
                    title="Pemberat"
                    desc="Batu/besi pemberat dipasang di dasar jaring setiap 50 cm agar jaring tetap tegang dan tidak terangkat arus."
                  />
                  <MaterialItem
                    icon="🟡"
                    title="Pelampung"
                    desc="Pelampung busa/plastik dipasang di bagian atas jaring setiap 50 cm agar jaring mengapung tegak."
                  />
                  <MaterialItem
                    icon="🪵"
                    title="Tiang Bambu/Pipa"
                    desc="Tiang vertikal 4 sudut tiap sekat, ditancapkan ke dasar atau diikat ke tiang jembatan sebagai rangka penyangga."
                  />
                  <MaterialItem
                    icon="🧵"
                    title="Tali Pengikat"
                    desc="Tali PE/nylon untuk mengikat jaring ke tiang dan menghubungkan sekat satu dengan lainnya."
                  />
                  <MaterialItem
                    icon="🚪"
                    title="Pintu Sekat"
                    desc="Tiap sekat memiliki 1 pintu buka-tutup (zipper / tali simpul) untuk memasukkan atau mengeluarkan penyu."
                  />
                </div>
              </InfoCard>

              {/* Dimensions Card */}
              <InfoCard title="Dimensi Keramba">
                <dl className="space-y-2 text-sm">
                  <DimensionRow label="Panjang" value="5 m" />
                  <DimensionRow label="Lebar" value="5 m" />
                  <DimensionRow label="Sekat" value="2.5m × 4" />
                  <DimensionRow label="Jaring" value="2 m" />
                  <DimensionRow label="Terendam" value="1.5 m" />
                  <DimensionRow label="Sisa di atas" value="0.5 m" />
                </dl>
              </InfoCard>
            </div>
          </div>

          {/* Sekat Section */}
          <section className="mt-12">
            <header className="text-center mb-8">
              <h3 className="text-2xl font-light text-white mb-2">Fungsi Setiap Sekat</h3>
              <p className="text-white/50 text-sm">Detail penghuni dan prosedur tiap kompartemen</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SekatCard
                title="Tukik Penyu Hijau"
                subtitle="Chelonia mydas"
                sekatNumber={1}
                colorTheme="emerald"
                icon="🐢"
                description="Penampungan dan pembesaran tukik (bayi penyu) jenis Penyu Hijau."
                steps={[
                  "Tukik baru menetas dari bak penetasan",
                  "Dipantau pertumbuhan & kesehatan harian",
                  "Diberi pakan alami (ubur-ubur kecil, cumi)",
                  "Dilepas setelah cukup kuat (±3–6 bulan)",
                ]}
              />
              <SekatCard
                title="Tukik Penyu Sisik"
                subtitle="Eretmochelys imbricata"
                sekatNumber={2}
                colorTheme="green"
                icon="💚"
                description="Penampungan dan pembesaran tukik jenis Penyu Sisik."
                steps={[
                  "Dipisah dari lekang untuk mencegah persaingan",
                  "Pakan utama: rumput laut dan alga",
                  "Pencatatan ID tiap individu (tagging)",
                  "Pelepasan liar setelah pembesaran",
                ]}
              />
              <SekatCard
                title="Karantina Penyu"
                subtitle="Rehabilitasi Tangkapan Nelayan"
                sekatNumber={3}
                colorTheme="amber"
                icon="🩹"
                description="Penanganan penyu yang terjerat jaring nelayan atau ditemukan dalam kondisi luka/stres."
                steps={[
                  "Isolasi penuh dari sekat lain",
                  "Penanganan luka, perawatan medis dasar",
                  "Pemantauan 24 jam oleh petugas",
                  "Dilepas setelah dinyatakan pulih",
                ]}
              />
              <SekatCard
                title="Penyu Dewasa"
                subtitle="Penampungan Sementara"
                sekatNumber={4}
                colorTheme="blue"
                icon="🌊"
                description="Pemisahan sementara bagi penyu dewasa yang menunggu pelepasan atau penelitian lebih lanjut."
                steps={[
                  "Ukuran sekat lebih tinggi (min. 2m dalam)",
                  "Pemasangan tag/chip identifikasi",
                  "Pengambilan sampel darah/DNA jika diperlukan",
                  "Pelepasan terkoordinasi dengan BKSDA",
                ]}
              />
            </div>
          </section>

          {/* Fungsi Utama Section */}
          <section className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl md:text-3xl drop-shadow-md">⚙️</span>
              <span className="tracking-tight">Fungsi Utama Sistem Waring Sekat</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              <FeatureItem icon="🛡️" text="Melindungi tukik dari predator alami (ikan besar, kepiting) di perairan Bak Blau" />
              <FeatureItem icon="📏" text="Memisahkan penyu berdasarkan jenis, ukuran, dan kondisi kesehatan" />
              <FeatureItem icon="🌊" text="Memanfaatkan air tawar biru Bak Blau yang jernih & bersih sepanjang tahun" />
              <FeatureItem icon="🔬" text="Memudahkan pemantauan pertumbuhan dan kondisi kesehatan tiap individu" />
              <FeatureItem icon="🤝" text="Tempat edukasi masyarakat & nelayan tentang pentingnya perlindungan penyu" />
              <FeatureItem icon="♻️" text="Penyelamatan penyu terjerat jaring sebelum dikembalikan ke laut bebas" />
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-10 text-center text-white/30 text-xs border-t border-white/10 pt-6">
            <p>Peta interaktif — Data lapangan 2026 • Konservasi Penyu Enggano</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS (Modularisasi Kode)
// ==========================================

// 1. Kartu Informasi Sidebar
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-5 border border-white/10 shadow-lg">
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// 2. Item Legend
function LegendItem({ title, desc, icon, iconBg }: { title: string; desc: string; icon: React.ReactNode; iconBg: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-white/90 text-sm">{title}</p>
        <p className="text-xs text-white/40 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

// 3. Item Bahan & Alat Instalasi
function MaterialItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-base border border-white/5">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white/90 text-sm mb-0.5">{title}</h4>
        <p className="text-[11px] text-white/50 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// 4. Baris Dimensi
function DimensionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
      <dt className="text-white/50">{label}</dt>
      <dd className="font-mono text-emerald-400 font-semibold">{value}</dd>
    </div>
  );
}

// 5. Item Fitur Utama
function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-lg">
      <div className="text-2xl md:text-3xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-sm text-white/90 leading-relaxed font-medium">{text}</p>
    </div>
  );
}

// 6. Kartu Sekat
interface SekatCardProps {
  title: string;
  subtitle: string;
  sekatNumber: number;
  description: string;
  steps: string[];
  icon: string;
  colorTheme: "emerald" | "green" | "amber" | "blue";
}

function SekatCard({ title, subtitle, sekatNumber, description, steps, icon, colorTheme }: SekatCardProps) {
  const themeStyles = {
    emerald: "border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    green: "border-green-500/20 hover:border-green-500/40 text-green-400 bg-green-500/10",
    amber: "border-amber-500/20 hover:border-amber-500/40 text-amber-400 bg-amber-500/10",
    blue: "border-blue-500/20 hover:border-blue-500/40 text-blue-400 bg-blue-500/10",
  };

  const theme = themeStyles[colorTheme];

  return (
    <article className={`backdrop-blur-sm bg-white/5 rounded-2xl p-6 border transition-colors duration-300 ${theme.split(" ")[0]} ${theme.split(" ")[1]}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${theme.split(" ")[3]}`}>
          {icon}
        </div>
        <div>
          <div className={`text-xs font-black tracking-widest mb-1 ${theme.split(" ")[2]}`}>
            SEKAT {sekatNumber}
          </div>
          <h4 className="font-bold text-white text-lg leading-tight">{title}</h4>
          <p className="text-xs text-white/40 italic mt-0.5">{subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-white/70 mb-5 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-3 text-xs text-white/60 leading-relaxed">
            <span className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-md font-bold text-[10px] ${theme.split(" ")[3]} ${theme.split(" ")[2]}`}>
              {idx + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

// 7. SVG Keramba Illustration
function KerambaIllustration() {
  return (
    <svg viewBox="0 0 600 500" className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
      <defs>
        <linearGradient id="waterGrad3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.3" />
        </linearGradient>
        <pattern id="netPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="12" y2="0" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
        </pattern>
        <pattern id="waves3d" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q15 5 30 10 Q45 15 60 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <filter id="glow3d">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="dimArrowL" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
          <path d="M8,0 L0,4 L8,8" fill="none" stroke="white" strokeWidth="1.5" />
        </marker>
        <marker id="dimArrowR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8" fill="none" stroke="white" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="0" y="0" width="600" height="500" rx="12" fill="url(#waterGrad3d)" />
      <rect x="0" y="0" width="600" height="500" rx="12" fill="url(#waves3d)" />

      <polygon points="200,310 400,230 500,290 300,370" fill="rgba(0,0,0,0.15)" filter="url(#glow3d)" />

      <polygon points="200,285 400,205 500,265 300,345" fill="rgba(6,182,212,0.15)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
      <polygon points="200,285 400,205 500,265 300,345" fill="url(#netPattern)" />
      <line x1="300" y1="245" x2="400" y2="305" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="350" y1="285" x2="250" y2="325" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 3" />

      <polygon points="200,285 200,195 300,255 300,345" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.2" />
      <polygon points="200,285 200,195 300,255 300,345" fill="url(#netPattern)" />

      <polygon points="200,195 400,115 400,205 200,285" fill="rgba(16,185,129,0.10)" stroke="#10b981" strokeWidth="1.2" />
      <polygon points="200,195 400,115 400,205 200,285" fill="url(#netPattern)" />

      <polygon points="400,115 500,175 500,265 400,205" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.2" />
      <polygon points="400,115 500,175 500,265 400,205" fill="url(#netPattern)" />

      <polygon points="300,255 500,175 500,265 300,345" fill="rgba(16,185,129,0.14)" stroke="#10b981" strokeWidth="1.2" />
      <polygon points="300,255 500,175 500,265 300,345" fill="url(#netPattern)" />

      <line x1="250" y1="240" x2="450" y2="160" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="250" y1="240" x2="250" y2="320" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="450" y1="160" x2="450" y2="240" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="300" y1="155" x2="300" y2="255" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="400" y1="205" x2="400" y2="305" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="300" y1="155" x2="400" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />

      <polygon points="200,195 400,115 500,175 300,255" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="300" y1="155" x2="400" y2="215" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="250" y1="240" x2="450" y2="160" stroke="#f59e0b" strokeWidth="1.5" />

      <line x1="200" y1="195" x2="200" y2="155" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
      <line x1="200" y1="195" x2="200" y2="155" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="200" cy="152" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

      <line x1="400" y1="115" x2="400" y2="75" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
      <line x1="400" y1="115" x2="400" y2="75" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="400" cy="72" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

      <line x1="500" y1="175" x2="500" y2="135" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
      <line x1="500" y1="175" x2="500" y2="135" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="500" cy="132" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

      <line x1="300" y1="255" x2="300" y2="215" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
      <line x1="300" y1="255" x2="300" y2="215" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="300" cy="212" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

      <line x1="250" y1="240" x2="250" y2="210" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <line x1="250" y1="240" x2="250" y2="210" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="250" cy="208" r="3" fill="#d97706" />

      <line x1="450" y1="160" x2="450" y2="130" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <line x1="450" y1="160" x2="450" y2="130" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="450" cy="128" r="3" fill="#d97706" />

      <line x1="300" y1="155" x2="300" y2="125" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <line x1="300" y1="155" x2="300" y2="125" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="300" cy="123" r="3" fill="#d97706" />

      <line x1="400" y1="215" x2="400" y2="185" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <line x1="400" y1="215" x2="400" y2="185" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="400" cy="183" r="3" fill="#d97706" />

      <line x1="350" y1="285" x2="350" y2="258" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="350" y1="285" x2="350" y2="258" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />

      <ellipse cx="270" cy="167" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="340" cy="138" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="435" cy="135" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="470" cy="152" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="370" cy="228" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="440" cy="198" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="220" cy="208" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
      <ellipse cx="235" cy="228" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />

      <line x1="200" y1="180" x2="400" y2="100" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
      <rect x="270" y="126" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
      <text x="296" y="140" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

      <line x1="410" y1="100" x2="510" y2="160" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
      <rect x="435" y="116" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
      <text x="461" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

      <rect x="222" y="152" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
      <text x="241" y="164" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>
      <rect x="340" y="118" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
      <text x="359" y="130" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>
      <rect x="204" y="202" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
      <text x="223" y="214" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>
      <rect x="330" y="222" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
      <text x="349" y="234" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>

      <line x1="305" y1="357" x2="505" y2="277" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
      <rect x="378" y="303" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
      <text x="404" y="317" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

      <line x1="188" y1="195" x2="288" y2="350" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
      <rect x="210" y="262" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
      <text x="236" y="276" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

      <line x1="200" y1="155" x2="90" y2="95" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="90" cy="95" r="2" fill="#fbbf24" />
      <rect x="12" y="72" width="110" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
      <text x="67" y="89" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Tiang Bambu</text>
      <text x="67" y="103" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Pengikat Tali</text>

      <line x1="470" y1="152" x2="530" y2="90" stroke="#facc15" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="530" cy="90" r="2" fill="#facc15" />
      <rect x="480" y="65" width="100" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(250,204,21,0.5)" strokeWidth="1" />
      <text x="530" y="82" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Pelampung</text>
      <text x="530" y="96" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Daya Apung Jaring</text>

      <line x1="460" y1="230" x2="530" y2="245" stroke="#34d399" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="530" cy="245" r="2" fill="#34d399" />
      <rect x="480" y="232" width="100" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(16,185,129,0.5)" strokeWidth="1" />
      <text x="530" y="249" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Waring</text>
      <text x="530" y="263" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Area Tukik</text>

      <rect x="20" y="370" width="150" height="115" rx="10" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="95" y="390" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Tampak dari Atas</text>
      <rect x="40" y="400" width="110" height="70" rx="3" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="95" y1="400" x2="95" y2="470" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" />
      <line x1="40" y1="435" x2="150" y2="435" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="40" cy="400" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="150" cy="400" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="40" cy="470" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="150" cy="470" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="95" cy="400" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
      <circle cx="95" cy="470" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
      <circle cx="40" cy="435" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
      <circle cx="150" cy="435" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
      <circle cx="95" cy="435" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
      <circle cx="67" cy="400" r="2.5" fill="#facc15" />
      <circle cx="122" cy="400" r="2.5" fill="#facc15" />
      <circle cx="67" cy="470" r="2.5" fill="#facc15" />
      <circle cx="122" cy="470" r="2.5" fill="#facc15" />
      <circle cx="40" cy="418" r="2.5" fill="#facc15" />
      <circle cx="150" cy="418" r="2.5" fill="#facc15" />
      <circle cx="40" cy="452" r="2.5" fill="#facc15" />
      <circle cx="150" cy="452" r="2.5" fill="#facc15" />
      <text x="67" y="396" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
      <text x="122" y="396" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
      <text x="33" y="422" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
      <text x="33" y="456" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
    </svg>
  );
}