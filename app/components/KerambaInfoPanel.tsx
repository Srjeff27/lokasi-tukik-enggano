"use client";

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface KerambaInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KerambaInfoPanel({ isOpen, onClose }: KerambaInfoPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[95vh] overflow-auto rounded-2xl"
        style={{
          background: 'linear-gradient(160deg, #064e3b 0%, #065f46 20%, #0c4a6e 50%, #0e7490 80%, #155e75 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-5 md:p-8">
          {/* Title */}
          <h2
            className="text-xl md:text-3xl font-extrabold text-center mb-1"
            style={{
              color: '#ffffff',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em',
            }}
          >
            Peta Lokasi Jaring Pembesaran Tukik di Bacbau
          </h2>
          <p className="text-center text-white/50 text-sm mb-6">
            Struktur Keramba · Dimensi 5m × 5m · 4 Sekat · Jaring 2m
          </p>

          {/* Main Layout: 3D Illustration + Info */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* LEFT: 3D Perspective Illustration */}
            <div className="flex-1 flex flex-col">
              {/* 3D Isometric View */}
              <div
                className="rounded-xl p-4 flex-1 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, rgba(14,165,233,0.15) 0%, rgba(6,182,212,0.25) 40%, rgba(20,184,166,0.2) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <svg viewBox="0 0 600 500" className="w-full max-w-xl" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}>
                  <defs>
                    {/* Water gradient */}
                    <linearGradient id="waterGrad3d" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                      <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.3" />
                    </linearGradient>
                    {/* Net pattern */}
                    <pattern id="netPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="12" y2="0" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
                      <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
                    </pattern>
                    {/* Wave pattern */}
                    <pattern id="waves3d" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
                      <path d="M0 10 Q15 5 30 10 Q45 15 60 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                    </pattern>
                    <filter id="glow3d">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="shadow3d">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
                    </filter>
                    {/* Arrow markers */}
                    <marker id="dimArrowL" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
                      <path d="M8,0 L0,4 L8,8" fill="none" stroke="white" strokeWidth="1.5"/>
                    </marker>
                    <marker id="dimArrowR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8" fill="none" stroke="white" strokeWidth="1.5"/>
                    </marker>
                  </defs>

                  {/* Water background */}
                  <rect x="0" y="0" width="600" height="500" rx="12" fill="url(#waterGrad3d)" />
                  <rect x="0" y="0" width="600" height="500" rx="12" fill="url(#waves3d)" />

                  {/* ==================== */}
                  {/* 3D ISOMETRIC KERAMBA */}
                  {/* ==================== */}
                  {/* Using isometric projection: x-axis goes right-down, y-axis goes left-down, z-axis goes up */}
                  
                  {/* Shadow on water */}
                  <polygon
                    points="200,310 400,230 500,290 300,370"
                    fill="rgba(0,0,0,0.15)"
                    filter="url(#glow3d)"
                  />

                  {/* ===== BOTTOM NET FACES (underwater) ===== */}
                  {/* Bottom face of net enclosure */}
                  <polygon
                    points="200,285 400,205 500,265 300,345"
                    fill="rgba(6,182,212,0.15)"
                    stroke="rgba(16,185,129,0.3)"
                    strokeWidth="1"
                  />
                  {/* Net grid on bottom */}
                  <polygon
                    points="200,285 400,205 500,265 300,345"
                    fill="url(#netPattern)"
                  />
                  {/* Internal divider lines on bottom */}
                  <line x1="300" y1="245" x2="400" y2="305" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 3"/>
                  <line x1="350" y1="285" x2="250" y2="325" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 3"/>

                  {/* ===== SIDE NET WALLS ===== */}
                  {/* Left wall */}
                  <polygon
                    points="200,285 200,195 300,255 300,345"
                    fill="rgba(16,185,129,0.12)"
                    stroke="#10b981"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="200,285 200,195 300,255 300,345"
                    fill="url(#netPattern)"
                  />
                  
                  {/* Back wall */}
                  <polygon
                    points="200,195 400,115 400,205 200,285"
                    fill="rgba(16,185,129,0.10)"
                    stroke="#10b981"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="200,195 400,115 400,205 200,285"
                    fill="url(#netPattern)"
                  />

                  {/* Right wall */}
                  <polygon
                    points="400,115 500,175 500,265 400,205"
                    fill="rgba(16,185,129,0.08)"
                    stroke="#10b981"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="400,115 500,175 500,265 400,205"
                    fill="url(#netPattern)"
                  />

                  {/* Front wall */}
                  <polygon
                    points="300,255 500,175 500,265 300,345"
                    fill="rgba(16,185,129,0.14)"
                    stroke="#10b981"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="300,255 500,175 500,265 300,345"
                    fill="url(#netPattern)"
                  />

                  {/* ===== INTERNAL DIVIDER WALLS ===== */}
                  {/* Internal wall - horizontal divider */}
                  <line x1="250" y1="240" x2="450" y2="160" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
                  <line x1="250" y1="240" x2="250" y2="320" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
                  <line x1="450" y1="160" x2="450" y2="240" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
                  {/* Internal wall - vertical divider */}
                  <line x1="300" y1="155" x2="300" y2="255" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
                  <line x1="400" y1="205" x2="400" y2="305" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />
                  <line x1="300" y1="155" x2="400" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3" />

                  {/* ===== TOP FRAME (rope/bamboo edge) ===== */}
                  <polygon
                    points="200,195 400,115 500,175 300,255"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Internal top frame dividers */}
                  <line x1="300" y1="155" x2="400" y2="215" stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="250" y1="240" x2="450" y2="160" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* ===== BAMBOO POLES (vertical) ===== */}
                  {/* Corner poles - tall bamboo */}
                  {/* Back-left */}
                  <line x1="200" y1="195" x2="200" y2="155" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
                  <line x1="200" y1="195" x2="200" y2="155" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="200" cy="152" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />
                  
                  {/* Back-right */}
                  <line x1="400" y1="115" x2="400" y2="75" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
                  <line x1="400" y1="115" x2="400" y2="75" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="400" cy="72" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

                  {/* Front-right */}
                  <line x1="500" y1="175" x2="500" y2="135" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
                  <line x1="500" y1="175" x2="500" y2="135" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="500" cy="132" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

                  {/* Front-left */}
                  <line x1="300" y1="255" x2="300" y2="215" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
                  <line x1="300" y1="255" x2="300" y2="215" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="300" cy="212" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

                  {/* Center poles (smaller) */}
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

                  {/* Mid-edge pole */}
                  <line x1="350" y1="285" x2="350" y2="258" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="350" y1="285" x2="350" y2="258" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />

                  {/* ===== BUOYS (Pelampung) ===== */}
                  {/* Back edge buoys */}
                  <ellipse cx="270" cy="167" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
                  <ellipse cx="340" cy="138" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
                  
                  {/* Right edge buoys */}
                  <ellipse cx="435" cy="135" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
                  <ellipse cx="470" cy="152" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />

                  {/* Front edge buoys */}
                  <ellipse cx="370" cy="228" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
                  <ellipse cx="440" cy="198" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
                  
                  {/* Left edge buoys */}
                  <ellipse cx="220" cy="208" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />
                  <ellipse cx="235" cy="228" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" filter="url(#glow3d)" />

                  {/* ===== DIMENSION LINES ===== */}
                  {/* Top edge: 10m */}
                  <line x1="200" y1="180" x2="400" y2="100" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
                  <rect x="270" y="126" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
                  <text x="296" y="140" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

                  {/* Right edge: 10m */}
                  <line x1="410" y1="100" x2="510" y2="160" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
                  <rect x="435" y="116" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
                  <text x="461" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

                  {/* Internal: 5m labels */}
                  {/* Top-left half */}
                  <rect x="222" y="152" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
                  <text x="241" y="164" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>

                  {/* Top-right half */}
                  <rect x="340" y="118" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
                  <text x="359" y="130" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>

                  {/* Left-top half */}
                  <rect x="204" y="202" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
                  <text x="223" y="214" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>

                  {/* Front internal */}
                  <rect x="330" y="222" width="38" height="16" rx="4" fill="rgba(0,0,0,0.55)" />
                  <text x="349" y="234" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2.5m</text>

                  {/* Bottom: 10m */}
                  <line x1="305" y1="357" x2="505" y2="277" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
                  <rect x="378" y="303" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
                  <text x="404" y="317" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

                  {/* Left: 10m */}
                  <line x1="188" y1="195" x2="288" y2="350" stroke="white" strokeWidth="1.2" markerStart="url(#dimArrowL)" markerEnd="url(#dimArrowR)" />
                  <rect x="210" y="262" width="52" height="20" rx="5" fill="rgba(0,0,0,0.65)" />
                  <text x="236" y="276" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5 m</text>

                  {/* ===== COMPONENT LABELS WITH LEADER LINES ===== */}
                  {/* Tiang Bambu label */}
                  <line x1="200" y1="155" x2="90" y2="95" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 2" />
                  <circle cx="90" cy="95" r="2" fill="#fbbf24" />
                  <rect x="12" y="72" width="110" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
                  <text x="67" y="89" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Tiang Bambu</text>
                  <text x="67" y="103" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Pengikat Tali</text>

                  {/* Pelampung label */}
                  <line x1="470" y1="152" x2="530" y2="90" stroke="#facc15" strokeWidth="1" strokeDasharray="4 2" />
                  <circle cx="530" cy="90" r="2" fill="#facc15" />
                  <rect x="480" y="65" width="100" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(250,204,21,0.5)" strokeWidth="1" />
                  <text x="530" y="82" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Pelampung</text>
                  <text x="530" y="96" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Daya Apung Jaring</text>

                  {/* Waring label */}
                  <line x1="460" y1="230" x2="530" y2="245" stroke="#34d399" strokeWidth="1" strokeDasharray="4 2" />
                  <circle cx="530" cy="245" r="2" fill="#34d399" />
                  <rect x="480" y="232" width="100" height="38" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(16,185,129,0.5)" strokeWidth="1" />
                  <text x="530" y="249" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Waring</text>
                  <text x="530" y="263" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Area Tukik</text>

                  {/* ===== MINI INSET: Top-down view ===== */}
                  <rect x="20" y="370" width="150" height="115" rx="10" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text x="95" y="390" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Tampak dari Atas</text>
                  
                  {/* Mini top-down net diagram */}
                  <rect x="40" y="400" width="110" height="70" rx="3" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
                  <line x1="95" y1="400" x2="95" y2="470" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" />
                  <line x1="40" y1="435" x2="150" y2="435" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" />
                  
                  {/* Mini corner dots */}
                  <circle cx="40" cy="400" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
                  <circle cx="150" cy="400" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
                  <circle cx="40" cy="470" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
                  <circle cx="150" cy="470" r="3" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
                  <circle cx="95" cy="400" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
                  <circle cx="95" cy="470" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
                  <circle cx="40" cy="435" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
                  <circle cx="150" cy="435" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />
                  <circle cx="95" cy="435" r="2.5" fill="#92400e" stroke="#fbbf24" strokeWidth="0.8" />

                  {/* Mini buoys */}
                  <circle cx="67" cy="400" r="2.5" fill="#facc15" />
                  <circle cx="122" cy="400" r="2.5" fill="#facc15" />
                  <circle cx="67" cy="470" r="2.5" fill="#facc15" />
                  <circle cx="122" cy="470" r="2.5" fill="#facc15" />
                  <circle cx="40" cy="418" r="2.5" fill="#facc15" />
                  <circle cx="150" cy="418" r="2.5" fill="#facc15" />
                  <circle cx="40" cy="452" r="2.5" fill="#facc15" />
                  <circle cx="150" cy="452" r="2.5" fill="#facc15" />

                  {/* Mini dimension labels */}
                  <text x="67" y="396" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
                  <text x="122" y="396" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
                  <text x="33" y="422" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
                  <text x="33" y="456" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="bold">2.5m</text>
                </svg>
              </div>
            </div>

            {/* RIGHT: Legend & Specs */}
            <div className="lg:w-64 w-full space-y-4">
              {/* Legend Card */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="text-white font-bold text-xs mb-3 tracking-widest uppercase">Keterangan</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(146,64,14,0.3)', border: '1px solid rgba(251,191,36,0.5)' }}>
                      <svg width="16" height="24" viewBox="0 0 16 24">
                        <line x1="8" y1="4" x2="8" y2="20" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="8" cy="4" r="3" fill="#d97706" stroke="#92400e" strokeWidth="1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">Tiang Bambu</p>
                      <p className="text-white/40 text-xs">Pengikat Tali</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(250,204,21,0.5)' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18">
                        <ellipse cx="9" cy="9" rx="7" ry="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
                        <ellipse cx="9" cy="8" rx="4" ry="2.5" fill="#fde047" opacity="0.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">Pelampung</p>
                      <p className="text-white/40 text-xs">Penanda & Daya Apung</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.5)' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18">
                        <rect x="2" y="2" width="14" height="14" rx="2" fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="1.2" />
                        <line x1="6" y1="2" x2="6" y2="16" stroke="#10b981" strokeWidth="0.6" />
                        <line x1="10" y1="2" x2="10" y2="16" stroke="#10b981" strokeWidth="0.6" />
                        <line x1="14" y1="2" x2="14" y2="16" stroke="#10b981" strokeWidth="0.6" />
                        <line x1="2" y1="6" x2="16" y2="6" stroke="#10b981" strokeWidth="0.6" />
                        <line x1="2" y1="10" x2="16" y2="10" stroke="#10b981" strokeWidth="0.6" />
                        <line x1="2" y1="14" x2="16" y2="14" stroke="#10b981" strokeWidth="0.6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">Waring</p>
                      <p className="text-white/40 text-xs">Area Perlindungan Tukik</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Dimensi Card */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="text-white font-bold text-xs mb-3 tracking-widest uppercase">Dimensi Keramba</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">Panjang</span>
                    <span className="text-emerald-400 font-bold text-sm">5 m</span>
                  </div>
                  <div className="w-full h-px bg-white/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">Lebar</span>
                    <span className="text-emerald-400 font-bold text-sm">5 m</span>
                  </div>
                  <div className="w-full h-px bg-white/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">Sekat</span>
                    <span className="text-emerald-400 font-bold text-sm">2.5m × 2.5m × 4</span>
                  </div>
                  <div className="w-full h-px bg-white/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">Panjang Jaring</span>
                    <span className="text-emerald-400 font-bold text-sm">2 m</span>
                  </div>
                  <div className="w-full h-px bg-white/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">Terendam Air</span>
                    <span className="text-emerald-400 font-bold text-sm">1.5 m</span>
                  </div>
                  <div className="w-full h-px bg-white/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">Sisa di Atas</span>
                    <span className="text-emerald-400 font-bold text-sm">0.5 m</span>
                  </div>
                </div>
              </div>

              {/* Lokasi Card */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="text-white font-bold text-xs mb-2 tracking-widest uppercase">Lokasi</h3>
                <p className="text-white/80 text-sm font-medium">📍 Bak Blau, Pulau Enggano</p>
                <p className="text-white/40 text-xs mt-0.5">Bengkulu, Indonesia</p>
                <p className="text-white/30 text-xs mt-2 font-mono">5°19&apos;17.2&quot;S 102°13&apos;27.0&quot;E</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
