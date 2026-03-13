"use client";

import React, { useState } from "react";
import {
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

interface AlurBudidayaPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    icon: "🏖️",
    title: "Penyu Bertelur",
    subtitle: "Nesting Season",
    description:
      "Penyu betina naik ke pantai Enggano pada malam hari untuk bertelur. Satu sarang dapat berisi 80–120 butir telur.",
    details: [
      "Penyu naik ke pantai saat malam hari",
      "Menggali lubang sedalam 50-60 cm",
      "80-120 telur per sarang",
    ],
    color: "#f59e0b",
    gradient: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
    duration: "2-3 jam",
  },
  {
    id: 2,
    icon: "🥚",
    title: "Pengumpulan & Penetasan",
    subtitle: "Egg Collection & Incubation",
    description:
      "Tim konservasi mengumpulkan telur dari sarang alami dan memindahkannya ke tempat penetasan untuk melindungi dari predator dan pencurian.",
    details: [
      "Suhu inkubasi: 28-32°C",
      "Masa inkubasi: 45-60 hari",
    ],
    color: "#f97316",
    gradient: "from-orange-500/10 to-red-500/10",
    borderColor: "border-orange-500/20",
    duration: "45-60 hari",
  },
  {
    id: 3,
    icon: "🐣",
    title: "Tukik Menetas",
    subtitle: "Hatching Phase",
    description:
      "Setelah 45-60 hari, tukik menetas dari telur. Tukik yang baru menetas berukuran sekitar 5 cm dan sangat rentan terhadap predator. Di alam liar, hanya 1 dari 1.000 tukik yang bertahan hidup.",
    details: [
      "Ukuran tukik: ~5 cm",
      "Survival rate alami: 0.1%",
      "Sangat rentan terhadap predator",
      "Butuh perlindungan intensif",
    ],
    color: "#10b981",
    gradient: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-500/20",
    duration: "Hari ke-1",
  },
  {
    id: 4,
    icon: "🐢",
    title: "Pembesaran di Kolam",
    subtitle: "Nursery Rearing (Keramba)",
    description:
      "Tukik dipindahkan ke kolam keramba jaring (5m × 5m, 4 sekat) di perairan Bak Blau. Jaring sedalam 2m (1.5m terendam) menjaga tukik tetap aman sambil terpapar air laut alami.",
    details: [
      "1 kolam keramba: 5m × 5m",
      "4 sekat per kolam (2.5m × 2.5m)",
      "Jaring 2m, terendam 1.5m",
      "Kapasitas: 100 tukik",
      "Pemberian pakan 3× sehari",
      "Monitoring",
      "Dipindahkan ke kolam pembesaran dengan tujuan mempersiapkan penyu sampai usia yang siap untuk dilepaskan",
    ],
    color: "#06b6d4",
    gradient: "from-cyan-500/10 to-blue-500/10",
    borderColor: "border-cyan-500/20",
    duration: "3-6 bulan",
  },
  {
    id: 5,
    icon: "🌊",
    title: "Pelepasliaran",
    subtitle: "Release to Ocean",
    description:
      "Setelah tukik mencapai ukuran 7-12 cm dan dinyatakan sehat, mereka dilepasliarkan ke laut.",
    details: [
      "Ukuran target: 7 - 12 cm",
      "Harapan menaikan survival karna sudah siap menghadapi predator",
      "Pelepasan saat senja/malam di pantai desa Meok",
      "Edukasi masyarakat",
    ],
    color: "#3b82f6",
    gradient: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-500/20",
    duration: "Setelah 3-6 bulan",
  },
  {
    id: 6,
    icon: "♻️",
    title: "Penyu Kembali ke pantai untuk bertelur",
    subtitle: "Nesting Season",
    description:
      "Penyu yang telah dilepasliarkan Mereka akan kembali ke pantai tempat mereka dilepaskan untuk bertelur. Oleh karena itu, sangat penting untuk menjaga keadaan dan kondisi pantai agar tetap layak untuk bertelur.",
    details: [
      "Penyu akan kembali ke pantai tempat mereka bertelur",
      "Untuk itu sangat diperlukan menjaga keadaan dan kondisi pantai baik untuk bertelur",
      "Dampak Cahaya pada Tukik: Lampu terang membuat tukik menjauhi laut dan berjalan ke arah daratan, meningkatkan risiko dehidrasi, predator, dan tertabrak kendaraan Dive SSI.",
      "Regulasi & Mitigasi: Konservasi mewajibkan penggunaan lampu yang ramah penyu (redup/merah), mematikan lampu di malam hari saat musim bertelur, dan membatasi pembangunan di pesisir Dive SSI."
    ],
    color: "#3b82f6",
    gradient: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-500/20",
    duration: "Setelah 3-6 bulan",
  },
];

export default function AlurBudidayaPanel({ isOpen, onClose }: AlurBudidayaPanelProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const current = steps[activeStep];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm border border-white/10"
        >
          <XMarkIcon className="w-4 h-4 text-white/80" />
        </button>

        {/* Header */}
        <div className="px-5 pt-5 sm:px-7 sm:pt-6">
          <h2 className="text-lg sm:text-xl font-light text-white tracking-tight">
            Alur Budidaya Penyu
          </h2>
          <p className="text-white/30 text-[11px] sm:text-xs mt-0.5 font-mono">
            Siklus konservasi dari bertelur hingga pelepasliaran
          </p>
        </div>

        {/* Timeline */}
        <div className="px-5 sm:px-7 pt-4 pb-2">
          <div className="flex items-center gap-0.5">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStep(i)}
                  className={`relative group shrink-0 flex items-center justify-center transition-all duration-500 ${i === activeStep ? "w-10 h-10 sm:w-11 sm:h-11" : "w-7 h-7 sm:w-8 sm:h-8"
                    }`}
                >
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-500"
                    style={{
                      background: i <= activeStep ? `${step.color}15` : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${i <= activeStep ? `${step.color}50` : "rgba(255,255,255,0.07)"}`,
                      boxShadow: i === activeStep ? `0 0 16px ${step.color}20` : "none",
                    }}
                  />
                  <span
                    className={`relative z-10 transition-all duration-300 ${i === activeStep ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                      }`}
                  >
                    {step.icon}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 h-px mx-0.5 rounded-full"
                    style={{
                      background:
                        i < activeStep
                          ? `linear-gradient(90deg, ${steps[i].color}50, ${steps[i + 1].color}50)`
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 sm:px-7 pb-5 sm:pb-6 overflow-auto" style={{ maxHeight: "calc(92vh - 180px)" }}>
          <div
            className={`rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${current.gradient} border ${current.borderColor} backdrop-blur-sm transition-all duration-500`}
          >
            {/* Step Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0"
                style={{
                  background: `${current.color}10`,
                  border: `1px solid ${current.color}30`,
                }}
              >
                {current.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span
                    className="text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-md"
                    style={{ background: `${current.color}15`, color: current.color }}
                  >
                    Tahap {current.id}
                  </span>
                  <span className="text-white/20 text-[10px]">{current.duration}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  {current.title}
                </h3>
                <p className="text-white/30 text-[10px] italic">{current.subtitle}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
              {current.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {current.details.map((detail, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5"
                >
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center shrink-0 text-[8px] font-black"
                    style={{ background: `${current.color}15`, color: current.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-white/50 text-[10px] sm:text-[11px] leading-snug">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${activeStep === 0
                ? "text-white/15 cursor-not-allowed"
                : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
                }`}
            >
              <ChevronLeftIcon className="w-3 h-3" />
              Sebelumnya
            </button>

            <div className="flex gap-1">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === activeStep ? current.color : "rgba(255,255,255,0.1)",
                    boxShadow: i === activeStep ? `0 0 8px ${current.color}40` : "none",
                    transform: i === activeStep ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${activeStep === steps.length - 1
                ? "text-white/15 cursor-not-allowed"
                : "text-white/80 border"
                }`}
              style={
                activeStep < steps.length - 1
                  ? {
                    background: `${current.color}10`,
                    borderColor: `${current.color}30`,
                  }
                  : {}
              }
            >
              Selanjutnya
              <ChevronRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="px-5 pb-3 text-center text-white/10 text-[9px] border-t border-white/5 pt-2">
          Data lapangan 2026 • Konservasi Penyu Enggano
        </div>
      </div>
    </div>
  );
}