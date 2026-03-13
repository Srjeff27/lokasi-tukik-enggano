"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker
} from "@vis.gl/react-google-maps";
import {
  MapPinIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  MapPinIcon as MapPinSolid,
  Squares2X2Icon as SquaresSolid,
} from "@heroicons/react/24/solid";
import KerambaInfoPanel from "./KerambaInfoPanel";
import TempatPenetasanTelurInfoPanel from "./TempatPenetasanTelurInfoPanel";
import AlurBudidayaPanel from "./AlurBudidayaPanel";

// ============ TYPES & CONSTANTS ============
type AnnotationType = "kolam" | "telur";

interface Annotation {
  id: string;
  coordinates: { lat: number; lng: number };
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  type: AnnotationType;
  onClick: () => void;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

const MAP_CONFIG = {
  center: { lat: -5.3211, lng: 102.2243 },
  zoom: 19.5,
  tilt: 65,
  heading: 45,
  mapTypeId: "satellite",
};

// ============ MARKER COMPONENTS ============
function KolamMarker() {
  const sekatCells = Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      style={{
        background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(16,185,129,0.15))",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(16,185,129,0.2)",
      }}
    >
      <span style={{ fontSize: "14px", lineHeight: "1" }}>🐢</span>
      <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.6)", fontWeight: 600, marginTop: "2px" }}>
        2.5m
      </span>
    </div>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.7))" }}>
      <div
        style={{
          background: "linear-gradient(145deg,rgba(16,185,129,0.18),rgba(6,182,212,0.12))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(16,185,129,0.4)",
          borderRadius: "18px",
          padding: "14px 16px",
          textAlign: "center",
          minWidth: "200px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "8px" }}>
          <span style={{ fontSize: "18px" }}>🐢</span>
          <span style={{ color: "#34d399", fontSize: "13px", fontWeight: 800, letterSpacing: "0.02em" }}>KOLAM PEMBESARAN TUKIK</span>
        </div>
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            margin: "0 auto 8px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "2.5px solid rgba(16,185,129,0.6)",
            boxShadow: "inset 0 0 20px rgba(16,185,129,0.15),0 0 20px rgba(16,185,129,0.1)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "2.5px", width: "100%", height: "100%", padding: "2px" }}>
            {sekatCells}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
          <div style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "6px", padding: "2px 8px" }}>
            <span style={{ color: "#6ee7b7", fontSize: "11px", fontWeight: 700 }}>5m</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>×</span>
          <div style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "6px", padding: "2px 8px" }}>
            <span style={{ color: "#6ee7b7", fontSize: "11px", fontWeight: 700 }}>5m</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "5px", padding: "3px 7px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "9px", fontWeight: 600 }}>4 Sekat</span>
          </div>
          <div style={{ background: "rgba(6,182,212,0.1)", borderRadius: "5px", padding: "3px 7px", border: "1px solid rgba(6,182,212,0.2)" }}>
            <span style={{ color: "#67e8f9", fontSize: "9px", fontWeight: 600 }}>🌊 Jaring 2m</span>
          </div>
          <div style={{ background: "rgba(59,130,246,0.1)", borderRadius: "5px", padding: "3px 7px", border: "1px solid rgba(59,130,246,0.2)" }}>
            <span style={{ color: "#93c5fd", fontSize: "9px", fontWeight: 600 }}>💧 1.5m terendam</span>
          </div>
        </div>
      </div>
      <div style={{ width: "2px", height: "24px", background: "linear-gradient(to bottom,rgba(16,185,129,0.5),rgba(16,185,129,0.1))" }}></div>
      <div style={{ position: "relative" }}>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "radial-gradient(circle,#34d399,#10b981)", boxShadow: "0 0 20px rgba(16,185,129,0.6)", border: "2px solid rgba(255,255,255,0.3)" }}></div>
        <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "26px", height: "26px", borderRadius: "50%", border: "2px solid rgba(16,185,129,0.3)", animation: "pulse 2s infinite" }}></div>
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function TelurMarker() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.7))" }}>
      <div
        style={{
          background: "linear-gradient(145deg,rgba(245,158,11,0.18),rgba(234,88,12,0.12))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(245,158,11,0.4)",
          borderRadius: "18px",
          padding: "14px 16px",
          textAlign: "center",
          minWidth: "180px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "8px" }}>
          <span style={{ fontSize: "18px" }}>🥚</span>
          <span style={{ color: "#fbbf24", fontSize: "13px", fontWeight: 800, letterSpacing: "0.02em" }}>PENETASAN TELUR</span>
        </div>
        <div
          style={{
            width: "100px",
            height: "60px",
            margin: "0 auto 8px",
            borderRadius: "50%",
            background: "linear-gradient(180deg,rgba(245,158,11,0.2),rgba(180,83,9,0.3))",
            border: "2px solid rgba(245,158,11,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            boxShadow: "inset 0 4px 12px rgba(180,83,9,0.3)",
          }}
        >
          <span style={{ fontSize: "16px" }}>🥚</span>
          <span style={{ fontSize: "14px" }}>🥚</span>
          <span style={{ fontSize: "16px" }}>🥚</span>
          <span style={{ fontSize: "12px" }}>🥚</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
          <div style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "6px", padding: "2px 8px" }}>
            <span style={{ color: "#fcd34d", fontSize: "11px", fontWeight: 700 }}>5m × 8m</span>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "5px", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "9px", fontWeight: 600 }}>📦 Kapasitas 80-120 telur/sarang</span>
        </div>
      </div>
      <div style={{ width: "2px", height: "24px", background: "linear-gradient(to bottom,rgba(245,158,11,0.5),rgba(245,158,11,0.1))" }}></div>
      <div style={{ position: "relative" }}>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "radial-gradient(circle,#fbbf24,#f59e0b)", boxShadow: "0 0 20px rgba(245,158,11,0.6)", border: "2px solid rgba(255,255,255,0.3)" }}></div>
        <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "26px", height: "26px", borderRadius: "50%", border: "2px solid rgba(245,158,11,0.3)", animation: "pulse 2s infinite" }}></div>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function TurtleConservationMap() {
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTelurOpen, setIsTelurOpen] = useState(false);
  const [isAlurOpen, setIsAlurOpen] = useState(false);

  // Define annotations data
  const annotations: Annotation[] = useMemo(
    () => [
      {
        id: "penetasan-telur",
        coordinates: { lat: -5.3214281971597455, lng: 102.22484531359885 },
        title: "Penetasan Telur",
        subtitle: "5m × 8m · 80-120 telur/sarang",
        color: "#f59e0b",
        icon: "🥚",
        type: "telur" as AnnotationType,
        onClick: () => setIsTelurOpen(true),
      },
      {
        id: "kolam-pembesaran",
        coordinates: { lat: -5.320950369792689, lng: 102.22414822933048 },
        title: "Kolam Pembesaran Tukik",
        subtitle: "5m × 5m · 4 sekat · Jaring 2m (1.5m terendam)",
        color: "#10b981",
        icon: "🐢",
        type: "kolam" as AnnotationType,
        onClick: () => setIsInfoOpen(true),
      },
    ],
    []
  );

  // Glass style utility
  const glass =
    "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

  // Handlers
  const handleOpenInfo = useCallback(() => setIsInfoOpen(true), []);
  const handleOpenAlur = useCallback(() => setIsAlurOpen(true), []);
  const handleCloseInfo = useCallback(() => setIsInfoOpen(false), []);
  const handleCloseTelur = useCallback(() => setIsTelurOpen(false), []);
  const handleCloseAlur = useCallback(() => setIsAlurOpen(false), []);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <main className="relative w-full h-screen overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Map
            defaultCenter={MAP_CONFIG.center}
            defaultZoom={MAP_CONFIG.zoom}
            defaultHeading={MAP_CONFIG.heading}
            defaultTilt={MAP_CONFIG.tilt}
            mapId={MAP_ID}
            mapTypeId={MAP_CONFIG.mapTypeId}
            disableDefaultUI={true}
            gestureHandling="greedy"
            style={{ width: "100%", height: "100%" }}
          >
            {annotations.map((anno) => (
              <AdvancedMarker
                key={anno.id}
                position={anno.coordinates}
                onClick={anno.onClick}
              >
                {anno.type === "kolam" && <KolamMarker />}
                {anno.type === "telur" && <TelurMarker />}
              </AdvancedMarker>
            ))}
          </Map>
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-3 sm:p-4 md:p-6">
          {/* Top Row */}
          <div className="flex items-start justify-between gap-2">
            {/* Header */}
            <header className="pointer-events-auto">
              <div className={`${glass} p-3 sm:p-4 rounded-2xl`}>
                <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-white tracking-tight leading-tight">
                  Peta Lokasi{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    Pembesaran Tukik
                  </span>
                </h1>
                <div className="flex items-center mt-1 gap-1.5">
                  <MapPinSolid className="w-3 h-3 text-rose-400 shrink-0" />
                  <p className="text-[10px] sm:text-xs text-white/40 font-medium">
                    Bak Blau, Pulau Enggano
                  </p>
                </div>
              </div>
            </header>

            {/* Action Buttons */}
            <div className="pointer-events-auto flex gap-1.5 sm:flex-col sm:gap-2">
              <button
                onClick={handleOpenInfo}
                className={`group ${glass} flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl hover:bg-white/[0.1] hover:border-emerald-400/25 transition-all duration-300`}
                aria-label="Lihat detail keramba"
              >
                <SquaresSolid className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] sm:text-xs font-semibold text-white/80 hidden sm:inline">
                  Keramba
                </span>
              </button>
              <button
                onClick={handleOpenAlur}
                className={`group ${glass} flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl hover:bg-white/[0.1] hover:border-cyan-400/25 transition-all duration-300`}
                aria-label="Lihat alur budidaya"
              >
                <ArrowPathIcon className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-[10px] sm:text-xs font-semibold text-white/80 hidden sm:inline">
                  Alur
                </span>
              </button>
            </div>
          </div>

          {/* Bottom - Legend */}
          <div className="pointer-events-auto self-end w-full max-w-[240px] sm:max-w-[280px]">
            <div className={`${glass} rounded-2xl overflow-hidden`}>
              <button
                onClick={() => setIsLegendOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
                aria-expanded={isLegendOpen}
              >
                <div className="flex items-center gap-1.5">
                  <InformationCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <h2 className="text-[11px] sm:text-xs font-semibold text-white/80">
                    Kapasitas & Skala
                  </h2>
                </div>
                {isLegendOpen ? (
                  <ChevronDownIcon className="w-3 h-3 text-white/25" />
                ) : (
                  <ChevronUpIcon className="w-3 h-3 text-white/25" />
                )}
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${isLegendOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-3 pb-3 space-y-2.5">
                  {/* Capacity Card */}
                  <div className="bg-emerald-500/[0.07] border border-emerald-500/15 rounded-xl p-2.5">
                    <div className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest">
                      Total Kapasitas
                    </div>
                    <div className="text-white text-lg font-black mt-0.5">
                      100{" "}
                      <span className="text-[10px] font-medium text-white/35">
                        tukik
                      </span>
                    </div>
                    <div className="text-white/25 text-[9px]">
                      1 kolam · 4 sekat · 5m × 5m
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-1.5">
                    {[
                      {
                        icon: (
                          <Squares2X2Icon className="w-3 h-3 text-emerald-400" />
                        ),
                        label: "Keramba Jaring",
                        desc: "5m × 5m × 2m · 4 sekat · 1 unit",
                        bgClass:
                          "bg-emerald-500/10 border-emerald-500/15",
                      },
                      {
                        icon: (
                          <GlobeAltIcon className="w-3 h-3 text-amber-400" />
                        ),
                        label: "Sarang Penetasan",
                        desc: "5m × 8m · 80-120 telur/sarang",
                        bgClass:
                          "bg-amber-500/10 border-amber-500/15",
                      },
                      {
                        icon: (
                          <MapPinIcon className="w-3 h-3 text-sky-400" />
                        ),
                        label: "Pelampung & Tiang",
                        desc: "Bambu 3m · Styrofoam",
                        bgClass:
                          "bg-sky-500/10 border-sky-500/15",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${item.bgClass}`}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-[11px] font-semibold text-white/70 truncate">
                            {item.label}
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-white/25 truncate">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Overlays */}
        <KerambaInfoPanel isOpen={isInfoOpen} onClose={handleCloseInfo} />
        <TempatPenetasanTelurInfoPanel
          isOpen={isTelurOpen}
          onClose={handleCloseTelur}
        />
        <AlurBudidayaPanel isOpen={isAlurOpen} onClose={handleCloseAlur} />
      </main>
    </APIProvider>
  );
}