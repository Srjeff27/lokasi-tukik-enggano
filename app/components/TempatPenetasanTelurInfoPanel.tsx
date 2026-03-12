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

          {/* Main Layout: 3D Illustration + Info */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* LEFT: 3D Perspective Illustration */}
            <div className="flex-1 flex flex-col">
              <div
                className="rounded-2xl p-6 flex-1 flex items-center justify-center relative shadow-inner overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, rgba(254,243,199,0.9) 0%, rgba(253,230,138,0.95) 100%)',
                  border: '1px solid rgba(251,191,36,0.5)',
                }}
              >
                {/* 3D SVG Content */}
                <svg viewBox="0 0 600 500" className="w-full max-w-xl relative z-10" style={{ filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.4))' }}>
                  <defs>
                    <linearGradient id="sandBase" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="50%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#fcd34d" />
                    </linearGradient>
                    <linearGradient id="sandShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#b45309" stopOpacity="0.8" />
                    </linearGradient>
                    <radialGradient id="nestMoundGrad" cx="50%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="70%" stopColor="#fcd34d" />
                      <stop offset="100%" stopColor="#d97706" />
                    </radialGradient>
                    <radialGradient id="eggGrad" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="80%" stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#d6d3d1" />
                    </radialGradient>
                    <pattern id="sandTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.5" fill="#ca8a04" opacity="0.3" />
                      <circle cx="8" cy="12" r="0.8" fill="#d97706" opacity="0.2" />
                      <circle cx="15" cy="5" r="0.6" fill="#b45309" opacity="0.4" />
                      <circle cx="18" cy="18" r="0.5" fill="#f59e0b" opacity="0.5" />
                      <circle cx="5" cy="16" r="1" fill="#78350f" opacity="0.1" />
                    </pattern>
                    <filter id="amberGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Sand base landscape */}
                  <rect x="0" y="0" width="600" height="500" rx="16" fill="url(#sandBase)" />
                  <rect x="0" y="0" width="600" height="500" rx="16" fill="url(#sandTexture)" />
                  
                  {/* Gentle dunes / contours */}
                  <path d="M 0 350 Q 150 300 300 350 T 600 350 L 600 500 L 0 500 Z" fill="url(#sandShadow)" opacity="0.5" />
                  <path d="M 0 420 Q 200 380 400 440 T 600 400 L 600 500 L 0 500 Z" fill="#b45309" opacity="0.3" />
                  
                  {/* Subtle ocean water in the top background corner */}
                  <path d="M 450 0 L 600 0 L 600 150 Q 550 100 450 0 Z" fill="#0ea5e9" opacity="0.6" />
                  <path d="M 450 0 L 600 0 L 600 150 Q 550 100 450 0 Z" fill="rgba(255,255,255,0.2)" opacity="0.8" stroke="white" strokeWidth="2" strokeDasharray="10 5" />
                  <text x="560" y="50" fill="white" fontSize="12" fontWeight="bold" opacity="0.8" transform="rotate(45 560 50)">LAUT</text>


                  {/* ISOMETRIC HATCHING AREA */}
                  <g transform="translate(0, 30)">
                    {/* Protective Bamboo Fence (Pagar Pelindung) */}
                    <path d="M 120 280 L 320 180 L 480 260 L 280 360 Z" fill="none" stroke="#92400e" strokeWidth="4" strokeLinejoin="round" />
                    
                    {/* Fence posts */}
                    {/* Back corner */}
                    <line x1="320" y1="180" x2="320" y2="130" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <line x1="320" y1="180" x2="320" y2="130" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                    {/* Right corner */}
                    <line x1="480" y1="260" x2="480" y2="210" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <line x1="480" y1="260" x2="480" y2="210" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                    {/* Front corner */}
                    <line x1="280" y1="360" x2="280" y2="310" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <line x1="280" y1="360" x2="280" y2="310" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                    {/* Left corner */}
                    <line x1="120" y1="280" x2="120" y2="230" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <line x1="120" y1="280" x2="120" y2="230" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                    
                    {/* Connecting top fence rails */}
                    <line x1="120" y1="245" x2="320" y2="145" stroke="#92400e" strokeWidth="4" />
                    <line x1="320" y1="145" x2="480" y2="225" stroke="#92400e" strokeWidth="4" />
                    <line x1="480" y1="225" x2="280" y2="325" stroke="#92400e" strokeWidth="4" />
                    <line x1="280" y1="325" x2="120" y2="245" stroke="#92400e" strokeWidth="4" />


                    {/* NEST MOUNDS (Gundukan Sarang) */}
                    
                    {/* Nest 1 (Front Left) */}
                    <g transform="translate(200, 280)">
                      <ellipse cx="0" cy="0" rx="35" ry="18" fill="rgba(180,83,9,0.3)" filter="url(#amberGlow)" />
                      <ellipse cx="-2" cy="-4" rx="25" ry="12" fill="url(#nestMoundGrad)" stroke="#b45309" strokeWidth="1" />
                      
                      {/* Exposed Eggs in Nest 1 */}
                      <circle cx="-5" cy="-8" r="4.5" fill="url(#eggGrad)" />
                      <circle cx="2" cy="-6" r="4" fill="url(#eggGrad)" />
                      <circle cx="-10" cy="-3" r="4.5" fill="url(#eggGrad)" />
                      <circle cx="-3" cy="-1" r="5" fill="url(#eggGrad)" />
                      
                      {/* Little hatched turtle matching marker style */}
                      <g transform="translate(15, -10) scale(0.6)">
                        <ellipse cx="0" cy="0" rx="12" ry="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" transform="rotate(45)" />
                        <circle cx="10" cy="10" r="4" fill="#047857" /> {/* head */}
                        <circle cx="8" cy="-8" r="3" fill="#059669" /> {/* flipper */}
                        <circle cx="-8" cy="8" r="3" fill="#059669" /> {/* flipper */}
                      </g>
                    </g>

                    {/* Nest 2 (Center) */}
                    <g transform="translate(300, 240)">
                      <ellipse cx="0" cy="0" rx="40" ry="20" fill="rgba(180,83,9,0.3)" filter="url(#amberGlow)" />
                      <ellipse cx="0" cy="-5" rx="30" ry="14" fill="url(#nestMoundGrad)" stroke="#b45309" strokeWidth="1" />
                      
                      {/* Sub-surface hole showing eggs */}
                      <ellipse cx="0" cy="-7" rx="14" ry="6" fill="#78350f" />
                      
                      {/* Deep Eggs in Nest 2 */}
                      <circle cx="-6" cy="-8" r="4" fill="url(#eggGrad)" />
                      <circle cx="0" cy="-9" r="4" fill="url(#eggGrad)" />
                      <circle cx="5" cy="-7" r="4" fill="url(#eggGrad)" />
                      <circle cx="-2" cy="-5" r="4" fill="url(#eggGrad)" opacity="0.8" />
                      <circle cx="4" cy="-4" r="4" fill="url(#eggGrad)" opacity="0.6" />
                    </g>

                    {/* Nest 3 (Right Back) */}
                    <g transform="translate(400, 210)">
                      <ellipse cx="0" cy="0" rx="30" ry="15" fill="rgba(180,83,9,0.3)" filter="url(#amberGlow)" />
                      <ellipse cx="0" cy="-3" rx="20" ry="10" fill="url(#nestMoundGrad)" stroke="#b45309" strokeWidth="1" />
                      <text x="0" y="-3" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.6">#3</text>
                    </g>

                    {/* Tukik Tracks (Jejak Tukik) heading to top right (ocean) */}
                    <path d="M 220 270 Q 250 250 280 200 T 350 150 T 420 100" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
                    <path d="M 230 275 Q 260 255 290 205 T 360 155 T 430 105" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
                    
                    {/* Small moving hatched turtles */}
                    <g transform="translate(320, 180) scale(0.5) rotate(-30)">
                      <ellipse cx="0" cy="0" rx="12" ry="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                      <circle cx="12" cy="0" r="4" fill="#047857" />
                    </g>
                    <g transform="translate(380, 130) scale(0.5) rotate(-40)">
                      <ellipse cx="0" cy="0" rx="12" ry="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                      <circle cx="12" cy="0" r="4" fill="#047857" />
                    </g>

                  </g>

                  {/* LABELS & ANNOTATIONS */}

                  {/* Protection Fence Label */}
                  <g transform="translate(50, 100)">
                    <rect x="0" y="0" width="130" height="38" rx="8" fill="rgba(120,53,15,0.8)" stroke="#fbbf24" strokeWidth="1.5" filter="url(#amberGlow)" />
                    <text x="65" y="16" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Pagar Pelindung</text>
                    <text x="65" y="30" textAnchor="middle" fill="white" fontSize="9">Aman dari predator darat</text>
                  </g>
                  <line x1="130" y1="138" x2="220" y2="200" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
                  <circle cx="220" cy="200" r="3" fill="#f59e0b" filter="url(#amberGlow)" />

                  {/* Nest Info Label */}
                  <g transform="translate(420, 280)">
                    <rect x="0" y="0" width="140" height="38" rx="8" fill="rgba(255,255,255,0.9)" stroke="#d97706" strokeWidth="1.5" filter="url(#amberGlow)" />
                    <text x="70" y="16" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">Sarang Semi Alami</text>
                    <text x="70" y="30" textAnchor="middle" fill="#78350f" fontSize="9">Lubang sedalam 50-70cm</text>
                  </g>
                  <line x1="420" y1="299" x2="330" y2="265" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 2" />
                  <circle cx="330" cy="265" r="3" fill="#f59e0b" filter="url(#amberGlow)" />
                  
                  {/* Egg Detail Callout */}
                  <g transform="translate(60, 380)">
                    <rect x="0" y="0" width="160" height="45" rx="8" fill="rgba(254,243,199,0.9)" stroke="#d97706" strokeWidth="1" />
                    <circle cx="20" cy="22" r="10" fill="url(#eggGrad)" stroke="#b45309" strokeWidth="0.5" />
                    <text x="40" y="18" textAnchor="start" fill="#92400e" fontSize="11" fontWeight="bold">Telur Penyu Enggano</text>
                    <text x="40" y="32" textAnchor="start" fill="#78350f" fontSize="9">Masa inkubasi: 45 - 60 Hari</text>
                  </g>
                  <line x1="160" y1="380" x2="190" y2="305" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 2" />

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
                    <p className="text-sm text-amber-50/80">Lokasi sengaja dipilih di area pesisir yang landai dan bebas dari erosi keras ombak laut.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                    <p className="text-sm text-amber-50/80">Tepat berhadapan dengan perairan terbuka agar tukik pasca menetas dapat langsung berenang menuju lepas laut (freediving).</p>
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
                  <p className="text-white text-sm font-semibold">80-120 Telur</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
