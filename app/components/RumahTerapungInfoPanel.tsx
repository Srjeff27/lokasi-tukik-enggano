"use client";

import React from 'react';
import { X, AlertTriangle, Home, Anchor } from 'lucide-react';

interface RumahTerapungInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RumahTerapungInfoPanel({ isOpen, onClose }: RumahTerapungInfoPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[95vh] overflow-auto rounded-2xl"
        style={{
          background: 'linear-gradient(160deg, #450a0a 0%, #7f1d1d 20%, #991b1b 50%, #b91c1c 80%, #dc2626 100%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2.5 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Title Area */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="absolute top-0 flex justify-center w-full opacity-10 blur-xl pointer-events-none">
              <div className="w-48 h-48 bg-red-500 rounded-full"></div>
            </div>
            
            <div className="bg-red-950/50 p-3 rounded-2xl border border-red-500/30 mb-4 backdrop-blur-md">
               <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h2
              className="text-2xl md:text-4xl font-extrabold text-center mb-2"
              style={{ color: '#ffffff', textShadow: '0 2px 15px rgba(0,0,0,0.6)', letterSpacing: '-0.02em' }}
            >
              Status: Rumah Terapung
            </h2>
            <p className="text-center text-red-200/80 text-sm md:text-base max-w-xl">
              Struktur bangunan liar di atas perairan konservasi Bak Blau yang menyalahi Peraturan Desa (Perdes)
            </p>
          </div>

          {/* Main Layout: 3D Illustration + Info */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* LEFT: 3D Perspective Illustration */}
            <div className="flex-1 flex flex-col">
              <div
                className="rounded-2xl p-6 flex-1 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, rgba(8,47,73,0.8) 0%, rgba(15,23,42,0.9) 100%)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                }}
              >
                {/* 3D SVG Content */}
                <svg viewBox="0 0 600 500" className="w-full max-w-xl relative z-10" style={{ filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.6))' }}>
                  <defs>
                    <linearGradient id="waterDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#0f172a" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7f1d1d" />
                      <stop offset="100%" stopColor="#450a0a" />
                    </linearGradient>
                    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a16207" />
                      <stop offset="50%" stopColor="#713f12" />
                      <stop offset="100%" stopColor="#422006" />
                    </linearGradient>
                    <filter id="redGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Water base */}
                  <rect x="0" y="0" width="600" height="500" rx="16" fill="url(#waterDark)" />
                  
                  {/* Subtle ripples */}
                  <path d="M 100 350 Q 150 340 200 350 T 300 350" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                  <path d="M 250 400 Q 300 390 350 400 T 450 400" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                  <path d="M 150 250 Q 200 240 250 250 T 350 250" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

                  {/* ISOMETRIC HOUSE STRUCTURE */}
                  <g transform="translate(0, 40)">
                    {/* Shadow on water */}
                    <polygon points="220,340 380,260 480,310 320,390" fill="rgba(0,0,0,0.6)" filter="url(#redGlow)" />

                    {/* Float barrels (Drum Pelampung) */}
                    <ellipse cx="280" cy="350" rx="15" ry="8" fill="#475569" stroke="#1e293b" />
                    <rect x="265" y="340" width="30" height="10" fill="#334155" />
                    
                    <ellipse cx="360" cy="310" rx="15" ry="8" fill="#475569" stroke="#1e293b" />
                    <rect x="345" y="300" width="30" height="10" fill="#334155" />

                    <ellipse cx="440" cy="330" rx="15" ry="8" fill="#475569" stroke="#1e293b" />
                    <rect x="425" y="320" width="30" height="10" fill="#334155" />

                    <ellipse cx="250" cy="310" rx="15" ry="8" fill="#475569" stroke="#1e293b" />
                    <rect x="235" y="300" width="30" height="10" fill="#334155" />

                    {/* Wooden Base Platform (Rakit) */}
                    {/* Top face */}
                    <polygon points="220,320 380,240 480,290 320,370" fill="#854d0e" stroke="#713f12" strokeWidth="1" />
                    {/* Left edge */}
                    <polygon points="220,320 320,370 320,380 220,330" fill="#422006" />
                    {/* Right edge */}
                    <polygon points="320,370 480,290 480,300 320,380" fill="#713f12" />
                    {/* Planks lines on platform */}
                    <line x1="240" y1="310" x2="400" y2="250" stroke="#713f12" strokeWidth="1" />
                    <line x1="260" y1="320" x2="420" y2="260" stroke="#713f12" strokeWidth="1" />
                    <line x1="280" y1="330" x2="440" y2="270" stroke="#713f12" strokeWidth="1" />
                    <line x1="300" y1="340" x2="460" y2="280" stroke="#713f12" strokeWidth="1" />

                    {/* Main House Walls */}
                    {/* Left Wall */}
                    <polygon points="260,300 260,200 340,240 340,340" fill="#facc15" stroke="#ca8a04" strokeWidth="1" opacity="0.9" />
                    {/* Front Wall */}
                    <polygon points="340,340 340,240 440,190 440,290" fill="#eab308" stroke="#ca8a04" strokeWidth="1" opacity="0.95" />
                    
                    {/* Door on front wall */}
                    <polygon points="370,325 370,265 400,250 400,310" fill="#450a0a" stroke="#713f12" strokeWidth="2" />
                    
                    {/* Window on left wall */}
                    <polygon points="280,270 280,230 310,245 310,285" fill="#0ea5e9" stroke="#1e3a8a" strokeWidth="2" opacity="0.7" />

                    {/* Roof */}
                    {/* Left roof pane */}
                    <polygon points="240,210 320,130 360,240 240,210" fill="url(#roofGrad)" stroke="#450a0a" strokeWidth="2" />
                    {/* Right roof pane */}
                    <polygon points="320,130 460,160 460,200 360,240" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
                    {/* Front roof triangle */}
                    <polygon points="260,200 340,240 340,160" fill="#ca8a04" stroke="#a16207" />

                    {/* Mooring ropes (Tali Jangkar) */}
                    <path d="M 220 320 Q 180 340 150 400" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="5 3" />
                    <path d="M 480 290 Q 520 300 550 360" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="5 3" />

                    {/* Anchor point visually */}
                    <circle cx="150" cy="400" r="4" fill="#64748b" />
                    <circle cx="550" cy="360" r="4" fill="#64748b" />
                  </g>

                  {/* LABELS & ANNOTATIONS */}
                  {/* Status Label */}
                  <g transform="translate(340, 80)">
                    <rect x="0" y="0" width="160" height="38" rx="8" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5" filter="url(#redGlow)" />
                    <text x="80" y="16" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">STATUS ILEGAL</text>
                    <text x="80" y="30" textAnchor="middle" fill="white" fontSize="9">Melanggar Perdes Enggano</text>
                  </g>
                  <line x1="380" y1="118" x2="350" y2="180" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="4 2" />
                  <circle cx="350" cy="180" r="3" fill="#ef4444" filter="url(#redGlow)" />

                  {/* Structure Label */}
                  <g transform="translate(60, 200)">
                    <rect x="0" y="0" width="130" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <text x="65" y="16" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Bangunan Fisik</text>
                    <text x="65" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">Berdampak pada ekosistem</text>
                  </g>
                  <line x1="190" y1="219" x2="270" y2="280" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4 2" />

                  {/* Mooring Label */}
                  <g transform="translate(360, 420)">
                    <rect x="0" y="0" width="140" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <text x="70" y="16" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Penjangkaran</text>
                    <text x="70" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">Merusak terumbu/biodata</text>
                  </g>
                  <line x1="360" y1="439" x2="280" y2="380" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4 2" />

                </svg>
              </div>
            </div>

            {/* RIGHT: Detail Information Cards */}
            <div className="lg:w-80 w-full space-y-5">
              
              {/* Regulasi Card */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-white font-bold tracking-wide">Tindakan Regulasi</h3>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <strong className="text-white">Rumah Terapung ini berstatus ilegal</strong> dan berada di dalam zona konservasi pembesaran tukik Bak Blau.
                </p>
                
                <div className="bg-black/30 rounded-xl p-4 border border-red-500/20">
                  <p className="text-xs text-red-300 font-medium mb-1 uppercase tracking-wider">Tindakan Lanjutan:</p>
                  <p className="text-white text-sm font-semibold">Harus disingkirkan melalui regulasi Peraturan Desa (Perdes).</p>
                </div>
              </div>

              {/* Dampak Ekosistem */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <Anchor className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-white font-bold tracking-wide">Dampak Lingkungan</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                    <p className="text-sm text-slate-300">Menghalangi rute alami pergerakan tukik menuju laut lepas.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                    <p className="text-sm text-slate-300">Polusi suara dan limbah domestik mencemari kualitas air area pembesaran.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                    <p className="text-sm text-slate-300">Sistem penjangkaran merusak dasar perairan Bak Blau.</p>
                  </li>
                </ul>
              </div>

              {/* Lokasi Card */}
              <div
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="p-3 bg-slate-800 rounded-full">
                  <Home className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5">Koordinat Lokasi</p>
                  <p className="text-white text-sm font-mono">102.22435°E, -5.32155°S</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
