"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
type AnnotationType = "kolam" | "telur" | "jembatan";

interface Annotation {
  id: string;
  coordinates: [number, number];
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  type: AnnotationType;
  onClick: () => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const MAP_CONFIG = {
  center: [102.2243, -5.3211] as [number, number],
  zoom: 19.5,
  pitch: 65,
  bearing: 45,
  style: "mapbox://styles/mapbox/satellite-streets-v12",
  projection: "globe" as const,
  minZoom: 17,
  maxZoom: 22,
  maxBounds: [
    [102.222, -5.3235],
    [102.227, -5.3195],
  ] as [[number, number], [number, number]],
  terrain: { source: "mapbox-dem", exaggeration: 1.2 },
  fog: {
    range: [-1, 2],
    "horizon-blend": 0.3,
    color: "#242B4B",
    "high-color": "#161B36",
    "space-color": "#0B1026",
    "star-intensity": 0.8,
  },
};

// ============ MARKER HTML BUILDERS ============
function buildKolamMarkerHTML(): string {
  const sekatCells = Array.from({ length: 4 })
    .map(
      () => `
    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.25),rgba(16,185,129,0.15));border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(16,185,129,0.2);">
      <span style="font-size:14px;line-height:1;">🐢</span>
      <span style="font-size:8px;color:rgba(255,255,255,0.6);font-weight:600;margin-top:2px;">2.5m</span>
    </div>
  `
    )
    .join("");

  return `
    <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 6px 24px rgba(0,0,0,0.7));">
      <div style="background:linear-gradient(145deg,rgba(16,185,129,0.18),rgba(6,182,212,0.12));backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1.5px solid rgba(16,185,129,0.4);border-radius:18px;padding:14px 16px;text-align:center;min-width:200px;">
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px;">
          <span style="font-size:18px;">🐢</span>
          <span style="color:#34d399;font-size:13px;font-weight:800;letter-spacing:0.02em;">KOLAM PEMBESARAN TUKIK</span>
        </div>
        <div style="position:relative;width:120px;height:120px;margin:0 auto 8px;border-radius:10px;overflow:hidden;border:2.5px solid rgba(16,185,129,0.6);box-shadow:inset 0 0 20px rgba(16,185,129,0.15),0 0 20px rgba(16,185,129,0.1);">
          <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:2.5px;width:100%;height:100%;padding:2px;">
            ${sekatCells}
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:6px;">
          <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:2px 8px;">
            <span style="color:#6ee7b7;font-size:11px;font-weight:700;">5m</span>
          </div>
          <span style="color:rgba(255,255,255,0.3);font-size:10px;">×</span>
          <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:2px 8px;">
            <span style="color:#6ee7b7;font-size:11px;font-weight:700;">5m</span>
          </div>
        </div>
        <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.06);border-radius:5px;padding:3px 7px;border:1px solid rgba(255,255,255,0.08);">
            <span style="color:rgba(255,255,255,0.55);font-size:9px;font-weight:600;">4 Sekat</span>
          </div>
          <div style="background:rgba(6,182,212,0.1);border-radius:5px;padding:3px 7px;border:1px solid rgba(6,182,212,0.2);">
            <span style="color:#67e8f9;font-size:9px;font-weight:600;">🌊 Jaring 2m</span>
          </div>
          <div style="background:rgba(59,130,246,0.1);border-radius:5px;padding:3px 7px;border:1px solid rgba(59,130,246,0.2);">
            <span style="color:#93c5fd;font-size:9px;font-weight:600;">💧 1.5m terendam</span>
          </div>
        </div>
      </div>
      <div style="width:2px;height:24px;background:linear-gradient(to bottom,rgba(16,185,129,0.5),rgba(16,185,129,0.1));"></div>
      <div style="position:relative;">
        <div style="width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#34d399,#10b981);box-shadow:0 0 20px rgba(16,185,129,0.6);border:2px solid rgba(255,255,255,0.3);"></div>
        <div style="position:absolute;top:-6px;left:-6px;width:26px;height:26px;border-radius:50%;border:2px solid rgba(16,185,129,0.3);animation:pulse 2s infinite;"></div>
      </div>
    </div>
  `;
}

function buildTelurMarkerHTML(): string {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 6px 24px rgba(0,0,0,0.7));">
      <div style="background:linear-gradient(145deg,rgba(245,158,11,0.18),rgba(234,88,12,0.12));backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1.5px solid rgba(245,158,11,0.4);border-radius:18px;padding:14px 16px;text-align:center;min-width:180px;">
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px;">
          <span style="font-size:18px;">🥚</span>
          <span style="color:#fbbf24;font-size:13px;font-weight:800;letter-spacing:0.02em;">PENETASAN TELUR</span>
        </div>
        <div style="width:100px;height:60px;margin:0 auto 8px;border-radius:50%;background:linear-gradient(180deg,rgba(245,158,11,0.2),rgba(180,83,9,0.3));border:2px solid rgba(245,158,11,0.3);display:flex;align-items:center;justify-content:center;gap:3px;box-shadow:inset 0 4px 12px rgba(180,83,9,0.3);">
          <span style="font-size:16px;">🥚</span>
          <span style="font-size:14px;">🥚</span>
          <span style="font-size:16px;">🥚</span>
          <span style="font-size:12px;">🥚</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:6px;">
          <div style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:6px;padding:2px 8px;">
            <span style="color:#fcd34d;font-size:11px;font-weight:700;">5m × 8m</span>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:5px;padding:3px 8px;border:1px solid rgba(255,255,255,0.08);display:inline-block;">
          <span style="color:rgba(255,255,255,0.55);font-size:9px;font-weight:600;">📦 Kapasitas 80-120 telur/sarang</span>
        </div>
      </div>
      <div style="width:2px;height:24px;background:linear-gradient(to bottom,rgba(245,158,11,0.5),rgba(245,158,11,0.1));"></div>
      <div style="position:relative;">
        <div style="width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#fbbf24,#f59e0b);box-shadow:0 0 20px rgba(245,158,11,0.6);border:2px solid rgba(255,255,255,0.3);"></div>
        <div style="position:absolute;top:-6px;left:-6px;width:26px;height:26px;border-radius:50%;border:2px solid rgba(245,158,11,0.3);animation:pulse 2s infinite;"></div>
      </div>
    </div>
  `;
}

function buildJembatanMarkerHTML(): string {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 6px 24px rgba(0,0,0,0.7));">
      <div style="background:linear-gradient(145deg,rgba(59,130,246,0.18),rgba(37,99,235,0.12));backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1.5px solid rgba(59,130,246,0.4);border-radius:18px;padding:12px 16px;text-align:center;min-width:140px;">
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:6px;">
          <span style="font-size:18px;">🌉</span>
          <span style="color:#60a5fa;font-size:13px;font-weight:800;letter-spacing:0.02em;">JEMBATAN</span>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:5px;padding:4px 8px;border:1px solid rgba(255,255,255,0.08);display:inline-block;">
          <span style="color:rgba(255,255,255,0.55);font-size:10px;font-weight:600;">Akses jalan utama</span>
        </div>
      </div>
      <div style="width:2px;height:24px;background:linear-gradient(to bottom,rgba(59,130,246,0.5),rgba(59,130,246,0.1));"></div>
      <div style="position:relative;">
        <div style="width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#60a5fa,#3b82f6);box-shadow:0 0 20px rgba(59,130,246,0.6);border:2px solid rgba(255,255,255,0.3);"></div>
      </div>
    </div>
  `;
}

// ============ MAIN COMPONENT ============
export default function TurtleConservationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTelurOpen, setIsTelurOpen] = useState(false);
  const [isAlurOpen, setIsAlurOpen] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Define annotations data
  const annotations: Annotation[] = useMemo(
    () => [
      {
        id: "penetasan-telur",
        coordinates: [102.22484531359885, -5.3214281971597455] as [number, number],
        title: "Penetasan Telur",
        subtitle: "5m × 8m · 80-120 telur/sarang",
        color: "#f59e0b",
        icon: "🥚",
        type: "telur" as AnnotationType,
        onClick: () => setIsTelurOpen(true),
      },
      {
        id: "kolam-pembesaran",
        coordinates: [102.22414822933048, -5.320950369792689] as [number, number],
        title: "Kolam Pembesaran Tukik",
        subtitle: "5m × 5m · 4 sekat · Jaring 2m (1.5m terendam)",
        color: "#10b981",
        icon: "🐢",
        type: "kolam" as AnnotationType,
        onClick: () => setIsInfoOpen(true),
      },
      {
        id: "jembatan-akses",
        coordinates: [102.22415204554444, -5.320819534515757] as [number, number],
        title: "Jembatan Akses",
        subtitle: "Akses jalan utama ke lokasi",
        color: "#3b82f6",
        icon: "🌉",
        type: "jembatan" as AnnotationType,
        onClick: () => {
          // You can handle jembatan click here if you want to open a modal
          // For now, it just functions as a marker
        },
      },
    ],
    []
  );

  // Initialize map — dynamic import to avoid SSR issues
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let cancelled = false;

    async function initMap() {
      try {
        // Dynamic import of mapbox-gl (avoids SSR window issues)
        const mapboxgl = (await import("mapbox-gl")).default;
        // @ts-ignore - Ignore TS error for CSS import
        await import("mapbox-gl/dist/mapbox-gl.css");

        if (cancelled || !mapContainer.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: MAP_CONFIG.style,
          center: MAP_CONFIG.center,
          zoom: MAP_CONFIG.zoom,
          pitch: MAP_CONFIG.pitch,
          bearing: MAP_CONFIG.bearing,
          antialias: true,
          projection: MAP_CONFIG.projection,
          minZoom: MAP_CONFIG.minZoom,
          maxZoom: MAP_CONFIG.maxZoom,
          maxBounds: MAP_CONFIG.maxBounds,
        });

        mapRef.current = newMap;

        newMap.on("load", () => {
          if (cancelled) return;

          // Add terrain and fog
          newMap.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14,
          });
          newMap.setTerrain(MAP_CONFIG.terrain);
          newMap.setFog(MAP_CONFIG.fog as mapboxgl.FogSpecification);

          // Add pulse animation style
          const style = document.createElement("style");
          style.textContent = `
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.8); opacity: 0; }
              100% { transform: scale(1); opacity: 0; }
            }
          `;
          document.head.appendChild(style);

          setMapReady(true);
        });

        newMap.on("error", (e: mapboxgl.ErrorEvent) => {
          console.error("Map error:", e);
          setMapError(e.error?.message || "Unknown map error");
        });
      } catch (error) {
        console.error("Failed to initialize map:", error);
        if (!cancelled) {
          setMapError(
            error instanceof Error ? error.message : "Failed to initialize map"
          );
        }
      }
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add markers when map is ready
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    let mapboxgl: typeof import("mapbox-gl").default;
    const markers: mapboxgl.Marker[] = [];

    async function addMarkers() {
      const mod = await import("mapbox-gl");
      mapboxgl = mod.default;

      if (!mapRef.current) return;

      annotations.forEach((anno) => {
        const el = document.createElement("div");
        el.className = "map-annotation-marker";
        el.style.cursor = "pointer";

        if (anno.type === "kolam") {
          el.innerHTML = buildKolamMarkerHTML();
        } else if (anno.type === "telur") {
          el.innerHTML = buildTelurMarkerHTML();
        } else if (anno.type === "jembatan") {
          el.innerHTML = buildJembatanMarkerHTML();
        }

        el.addEventListener("click", anno.onClick);

        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(anno.coordinates)
          .addTo(mapRef.current!);

        markers.push(marker);
      });
    }

    addMarkers();

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [mapReady, annotations]);

  // Glass style utility
  const glass =
    "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

  // Handlers
  const handleOpenInfo = useCallback(() => setIsInfoOpen(true), []);
  const handleOpenAlur = useCallback(() => setIsAlurOpen(true), []);
  const handleCloseInfo = useCallback(() => setIsInfoOpen(false), []);
  const handleCloseTelur = useCallback(() => setIsTelurOpen(false), []);
  const handleCloseAlur = useCallback(() => setIsAlurOpen(false), []);

  if (mapError) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-red-400 mb-2">Map Error</p>
          <p className="text-sm text-white/50">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-950">
      <div ref={mapContainer} className="absolute inset-0 z-0 w-full h-full" />

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
              className={`transition-all duration-300 overflow-hidden ${
                isLegendOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
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
  );
}