"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Info, ChevronDown, ChevronUp, LifeBuoy, CircleDot, Grid, Layers } from 'lucide-react';
import KerambaInfoPanel from './KerambaInfoPanel';
import RumahTerapungInfoPanel from './RumahTerapungInfoPanel';
import TempatPenetasanTelurInfoPanel from './TempatPenetasanTelurInfoPanel';

// Extend the Window interface for mapboxgl
declare global {
  interface Window {
    mapboxgl: any;
  }
}

export default function TurtleConservationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isRumahOpen, setIsRumahOpen] = useState(false);
  const [isTelurOpen, setIsTelurOpen] = useState(false);

  // Mapbox configuration constants
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  const MAP_CENTER: [number, number] = [102.22415417804913, -5.321441493088909];
  const MAP_ZOOM = 19.5;
  const MAP_PITCH = 65;
  const MAP_BEARING = 45;

  useEffect(() => {
    // Prevent multiple map initializations
    if (map.current) return;

    const initMap = () => {
      try {
        const mapboxgl = window.mapboxgl;
        
        // Set Mapbox Access Token
        mapboxgl.accessToken = MAPBOX_TOKEN;

        // Initialize Map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          pitch: MAP_PITCH,
          bearing: MAP_BEARING,
          antialias: true,
          projection: 'globe',
          minZoom: 17,
          maxZoom: 22,
          maxBounds: [
            [102.2220, -5.3235],  // Southwest corner
            [102.2265, -5.3195],  // Northeast corner
          ],
        });

        // Handle Map Load Event
        map.current.on('style.load', () => {
          // 1. Add 3D Terrain
          map.current.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
          });
          // Set terrain with exaggeration of 1.2 as requested
          map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });

          // Add Sky atmosphere for realism
          map.current.setFog({
            'range': [-1, 2],
            'horizon-blend': 0.3,
            'color': '#242B4B',
            'high-color': '#161B36',
            'space-color': '#0B1026',
            'star-intensity': 0.8
          });


          // 3. Add Annotation Markers for key locations
          const annotations = [
            {
              coordinates: [102.22458, -5.32125] as [number, number],
              title: 'Tempat Penetasan Telur',
              subtitle: 'Area 5m × 8m · Kapasitas 80-120 telur/sarang',
              color: '#f59e0b',
              bgColor: 'rgba(245, 158, 11, 0.15)',
              borderColor: 'rgba(245, 158, 11, 0.5)',
              icon: '🥚',
              onClick: () => setIsTelurOpen(true),
            },
            {
              coordinates: [102.22435, -5.32155] as [number, number],
              title: 'Rumah Terapung',
              subtitle: 'Struktur ilegal · Harus disingkirkan (Perdes)',
              color: '#ef4444',
              bgColor: 'rgba(239, 68, 68, 0.15)',
              borderColor: 'rgba(239, 68, 68, 0.5)',
              icon: '🏠',
              onClick: () => setIsRumahOpen(true),
            },
            {
              coordinates: [102.22444, -5.32148] as [number, number],
              title: 'Kolam Tukik 1',
              subtitle: '10m × 10m · 200 tukik · Kedalaman 1.5m',
              color: '#10b981',
              bgColor: 'rgba(16, 185, 129, 0.15)',
              borderColor: 'rgba(16, 185, 129, 0.5)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
            {
              coordinates: [102.22442, -5.32150] as [number, number],
              title: 'Kolam Tukik 2',
              subtitle: '10m × 10m · 200 tukik · Kedalaman 1.5m',
              color: '#10b981',
              bgColor: 'rgba(16, 185, 129, 0.15)',
              borderColor: 'rgba(16, 185, 129, 0.5)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
            {
              coordinates: [102.22440, -5.32149] as [number, number],
              title: 'Kolam Tukik 3',
              subtitle: '10m × 10m · 200 tukik · Kedalaman 1.5m',
              color: '#10b981',
              bgColor: 'rgba(16, 185, 129, 0.15)',
              borderColor: 'rgba(16, 185, 129, 0.5)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
          ];

          annotations.forEach((anno) => {
            // Create custom HTML marker element
            const el = document.createElement('div');
            el.className = 'map-annotation-marker';
            el.innerHTML = `
              <div style="
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));
              ">
                <!-- Label -->
                <div style="
                  background: ${anno.bgColor};
                  backdrop-filter: blur(16px);
                  -webkit-backdrop-filter: blur(16px);
                  border: 1px solid ${anno.borderColor};
                  border-radius: 10px;
                  padding: 6px 10px;
                  white-space: nowrap;
                  margin-bottom: 6px;
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                  max-width: 220px;
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 5px;
                  ">
                    <span style="font-size: 13px;">${anno.icon}</span>
                    <span style="
                      color: ${anno.color};
                      font-weight: 700;
                      font-size: 11px;
                      letter-spacing: 0.02em;
                    ">${anno.title}</span>
                  </div>
                  <div style="
                    color: rgba(255,255,255,0.7);
                    font-size: 9px;
                    margin-top: 2px;
                    padding-left: 18px;
                    font-weight: 500;
                  ">${anno.subtitle}</div>
                </div>
                <!-- Connector line -->
                <div style="
                  width: 2px;
                  height: 18px;
                  background: linear-gradient(to bottom, ${anno.color}, transparent);
                "></div>
                <!-- Pulse dot -->
                <div style="
                  position: relative;
                  width: 12px;
                  height: 12px;
                ">
                  <div style="
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: ${anno.color};
                    box-shadow: 0 0 12px ${anno.color}, 0 0 24px ${anno.color}40;
                  "></div>
                  <div style="
                    position: absolute;
                    inset: -5px;
                    border-radius: 50%;
                    border: 2px solid ${anno.color};
                    opacity: 0.4;
                    animation: annotationPulse 2s ease-out infinite;
                  "></div>
                </div>
              </div>
            `;

            // Add hover effect
            el.addEventListener('mouseenter', () => {
              const label = el.querySelector('div > div:first-child') as HTMLElement;
              if (label) {
                label.style.transform = 'scale(1.05)';
                label.style.boxShadow = `0 0 20px ${anno.color}40`;
              }
            });
            el.addEventListener('mouseleave', () => {
              const label = el.querySelector('div > div:first-child') as HTMLElement;
              if (label) {
                label.style.transform = 'scale(1)';
                label.style.boxShadow = 'none';
              }
            });

            // Add click handler if provided
            if (anno.onClick) {
              el.addEventListener('click', anno.onClick);
            }

            new mapboxgl.Marker({ element: el, anchor: 'bottom' })
              .setLngLat(anno.coordinates)
              .addTo(map.current);
          });

          // Inject pulse animation keyframes
          if (!document.getElementById('annotation-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'annotation-pulse-style';
            style.textContent = `
              @keyframes annotationPulse {
                0% { transform: scale(1); opacity: 0.4; }
                100% { transform: scale(2.5); opacity: 0; }
              }
            `;
            document.head.appendChild(style);
          }
        });
      } catch (err) {
        console.error("Error initializing Mapbox map:", err);
      }
    };

    // Dynamically inject Mapbox v3.7.0 scripts to bypass bundler & strict iframe issues
    if (!window.mapboxgl) {
      const css = document.createElement('link');
      css.href = 'https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css';
      css.rel = 'stylesheet';
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    // Cleanup on unmount
    return () => {
      if (map.current) map.current.remove();
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Mapbox Container */}
      <div ref={mapContainer} className="absolute inset-0 z-0 w-full h-full" />

      {/* UI Overlay Container (pointer-events-none ensures you can still pan/zoom the map through the invisible parts) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-6 lg:p-8">
        
        {/* Header - Top Left */}
        <header className="pointer-events-auto self-start w-full max-w-sm">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-slate-900/70">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
              Peta Lokasi <br className="hidden md:block" />
              <span className="text-emerald-400">Pembesaran Tukik</span>
            </h1>
            <div className="flex items-center mt-3 text-slate-300 space-x-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <p className="text-sm font-medium">Pulau Enggano, Bengkulu</p>
            </div>
          </div>
        </header>

        {/* Info Button - Top Right */}
        <div className="pointer-events-auto absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="group flex items-center gap-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-slate-900/70 hover:border-emerald-500/30"
          >
            <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">Detail Keramba</span>
          </button>
        </div>

        {/* Legend Panel - Bottom Right */}
        <div className="pointer-events-auto self-end w-full max-w-[280px] sm:max-w-sm transition-all duration-300 ease-in-out">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Legend Header / Toggle Button */}
            <button
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              className="flex items-center justify-between w-full p-3 sm:p-4 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
            >
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                <h2 className="text-sm sm:text-base font-semibold text-white">Kapasitas & Skala</h2>
              </div>
              {isLegendOpen ? (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              ) : (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              )}
            </button>

            {/* Collapsible Content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isLegendOpen ? 'max-h-96 opacity-100 p-3 sm:p-4 pt-2' : 'max-h-0 opacity-0 p-0'
              }`}
            >
              {/* Total Capacity Summary */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-3">
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Total Kapasitas</div>
                <div className="text-white text-xl sm:text-2xl font-black">600 <span className="text-sm font-medium text-slate-300">tukik</span></div>
                <div className="text-slate-400 text-[10px] sm:text-xs mt-1">3 kolam × 200 tukik/kolam</div>
              </div>

              <ul className="space-y-2.5">
                {/* Kolam Specs */}
                <li className="flex items-start space-x-2.5">
                  <div className="mt-0.5 bg-emerald-500/20 p-1.5 rounded-lg border border-emerald-500/50">
                    <Grid className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-200">Keramba Jaring</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">10m × 10m × 1.5m · 3 unit</p>
                  </div>
                </li>

                {/* Penetasan */}
                <li className="flex items-start space-x-2.5">
                  <div className="mt-0.5 bg-amber-500/20 p-1.5 rounded-lg border border-amber-500/50">
                    <CircleDot className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-200">Sarang Penetasan</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">5m × 8m · 80-120 telur/sarang</p>
                  </div>
                </li>

                {/* Struktur */}
                <li className="flex items-start space-x-2.5">
                  <div className="mt-0.5 bg-amber-700/20 p-1.5 rounded-lg border border-amber-700/50">
                    <LifeBuoy className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-200">Pelampung & Tiang</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Bambu 3m · Pelampung styrofoam</p>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        
      </div>

      {/* Info Panel Overlays */}
      <KerambaInfoPanel isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      <RumahTerapungInfoPanel isOpen={isRumahOpen} onClose={() => setIsRumahOpen(false)} />
      <TempatPenetasanTelurInfoPanel isOpen={isTelurOpen} onClose={() => setIsTelurOpen(false)} />
    </main>
  );
}
