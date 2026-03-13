"use client";

import React from 'react';
import { XMarkIcon, SunIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface TempatPenetasanTelurInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TempatPenetasanTelurInfoPanel({ isOpen, onClose }: TempatPenetasanTelurInfoPanelProps) {
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
          background: 'linear-gradient(160deg, #78350f 0%, #b45309 30%, #d97706 60%, #f59e0b 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 rounded-full p-2.5 transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Title Area */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="absolute top-0 flex justify-center w-full opacity-20 blur-2xl pointer-events-none">
              <div className="w-64 h-32 bg-amber-300 rounded-full"></div>
            </div>
            
            <div className="bg-amber-900/40 p-3 rounded-2xl border border-amber-300/30 mb-4 backdrop-blur-md">
               <SunIcon className="w-8 h-8 text-amber-200" />
            </div>
            
            <h2
              className="text-2xl md:text-4xl font-extrabold text-center mb-2"
              style={{ color: '#ffffff', textShadow: '0 2px 15px rgba(0,0,0,0.6)', letterSpacing: '-0.02em' }}
            >
              Fasilitas: Tempat Penetasan Telur
            </h2>
            <p className="text-center text-amber-100/90 text-sm md:text-base max-w-xl">
              Area pesisir pantai berpasir yang dilindungi khusus untuk proses inkubasi alami telur penyu Enggano
            </p>
          </div>

          {/* Main Layout: Image Background + Info */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* LEFT: Real Photo with SVG Overlay Markers */}
            <div className="flex-1 flex flex-col">
              <div
                className="rounded-2xl flex-1 flex items-center justify-center relative shadow-inner overflow-hidden min-h-[400px]"
                style={{
                  border: '1px solid rgba(251,191,36,0.5)',
                  backgroundImage: 'url("/ember.jpeg")', 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay SVG (Hanya untuk Garis dan Kotak Label) */}
                <svg viewBox="0 0 600 500" className="w-full h-full absolute inset-0 z-10" style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.4))' }}>
                  <defs>
                    <filter id="amberGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <radialGradient id="eggGrad" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="80%" stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#d6d3d1" />
                    </radialGradient>
                  </defs>

                  {/* LABELS & ANNOTATIONS */}

                  {/* Protection Fence Label (Pagar Pelindung) */}
                  <g transform="translate(40, 220)">
                    <rect x="0" y="0" width="140" height="42" rx="8" fill="rgba(88, 28, 135, 0.85)" stroke="#fbbf24" strokeWidth="1.5" filter="url(#amberGlow)" />
                    <text x="70" y="18" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Identifikasi dan Label</text>
                    <text x="70" y="32" textAnchor="middle" fill="white" fontSize="9">Jenis Penyu (Hijau,SisiK)</text>
                  </g>
                  <line x1="150" y1="262" x2="220" y2="295" stroke="#fbbf24" strokeWidth="2" />
                  <circle cx="220" cy="295" r="4" fill="#f59e0b" filter="url(#amberGlow)" />

                  {/* Nest Info Label (Sarang Semi Alami) */}
                  <g transform="translate(380, 210)">
                    <rect x="0" y="0" width="150" height="42" rx="8" fill="rgba(255,255,255,0.95)" stroke="#d97706" strokeWidth="1.5" filter="url(#amberGlow)" />
                    <text x="75" y="18" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">Sarang Semi Alami</text>
                    <text x="75" y="32" textAnchor="middle" fill="#78350f" fontSize="9">Lubang sedalam 50-70cm</text>
                  </g>
                  <line x1="380" y1="252" x2="330" y2="310" stroke="#d97706" strokeWidth="2" />
                  <circle cx="330" cy="310" r="4" fill="#f59e0b" filter="url(#amberGlow)" />
                  
                  {/* Egg Detail Callout (Telur Penyu Enggano) */}
                  <g transform="translate(50, 380)">
                    <rect x="0" y="0" width="170" height="48" rx="8" fill="rgba(254,243,199,0.95)" stroke="#d97706" strokeWidth="1.5" />
                    <circle cx="22" cy="24" r="11" fill="url(#eggGrad)" stroke="#b45309" strokeWidth="0.5" />
                    <text x="42" y="20" textAnchor="start" fill="#92400e" fontSize="11" fontWeight="bold">Telur Penyu Enggano</text>
                    <text x="42" y="36" textAnchor="start" fill="#78350f" fontSize="9">Masa Inkubasi: 45 - 50 Hari</text>
                  </g>
                  <line x1="220" y1="390" x2="280" y2="345" stroke="#d97706" strokeWidth="2" />
                  <circle cx="280" cy="345" r="4" fill="#f59e0b" filter="url(#amberGlow)" />

                  {/* Bucket Height Annotation */}
                  <g transform="translate(420, 380)">
                     <rect x="0" y="0" width="130" height="36" rx="8" fill="rgba(67, 56, 202, 0.85)" stroke="#6366f1" strokeWidth="1.5" />
                     <text x="65" y="16" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Ember Pelindung</text>
                     <text x="65" y="28" textAnchor="middle" fill="white" fontSize="9">Tinggi 80 cm</text>
                  </g>
                  <line x1="420" y1="390" x2="350" y2="360" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="350" cy="360" r="4" fill="#818cf8" />

                </svg>
              </div>
            </div>

            {/* RIGHT: Detail Information Cards */}
            <div className="lg:w-80 w-full space-y-5">
              
              {/* Info Lingkungan */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <SunIcon className="w-5 h-5 text-amber-300" />
                  </div>
                  <h3 className="text-white font-bold tracking-wide">Kondisi Inkubasi</h3>
                </div>
                
                <p className="text-amber-50 text-sm leading-relaxed mb-4">
                  Suhu pasir sangat menentukan jenis kelamin tukik. Pasir yang hangat akan menghasilkan lebih banyak betina, sedangkan pasir yang sejuk dominan jantan.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-900/40 rounded-xl p-3 border border-amber-500/20 text-center">
                    <p className="text-xs text-amber-200/60 font-medium uppercase mb-1">Kedalaman</p>
                    <p className="text-white font-bold text-lg">50-70 <span className="text-xs font-normal text-amber-200/80">cm</span></p>
                  </div>
                  <div className="bg-amber-900/40 rounded-xl p-3 border border-amber-500/20 text-center">
                    <p className="text-xs text-amber-200/60 font-medium uppercase mb-1">Durasi ETA</p>
                    <p className="text-white font-bold text-lg">45-60 <span className="text-xs font-normal text-amber-200/80">Hari</span></p>
                  </div>
                </div>
              </div>

              {/* Perlindungan */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold tracking-wide">Upaya Pelestarian</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                    <p className="text-sm text-amber-50/80">Area dipagari dari predator alami liar seperti babi hutan dan biawak darat.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                    <p className="text-sm text-amber-50/80">Setelah telur ditetaskan, bayi penyu akan dirawat beberapa bulan sebelum dilepaskan ke kolam.</p>
                  </li>
                </ul>
              </div>

              {/* Data Geografis */}
              <div
                className="rounded-2xl p-4 flex items-center justify-between"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-3">
                  <SunIcon className="w-5 h-5 text-amber-500 opacity-60" />
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-0.5">Jenis Penyu</p>
                    <p className="text-amber-200 text-sm font-semibold">Penyu Hijau / Sisik</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-0.5">Kapasitas Sarang</p>
                  <p className="text-white text-sm font-semibold">100 Telur</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}