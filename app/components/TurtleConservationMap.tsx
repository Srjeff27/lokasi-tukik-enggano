"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  MapPinIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import {
  MapPinIcon as MapPinSolid,
  Squares2X2Icon as SquaresSolid,
} from '@heroicons/react/24/solid';
import KerambaInfoPanel from './KerambaInfoPanel';
import TempatPenetasanTelurInfoPanel from './TempatPenetasanTelurInfoPanel';
import AlurBudidayaPanel from './AlurBudidayaPanel';

// Extend the Window interface for mapboxgl
declare global {
  interface Window {
    mapboxgl: any;
  }
}

export default function TurtleConservationMap() {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTelurOpen, setIsTelurOpen] = useState(false);
  const [isAlurOpen, setIsAlurOpen] = useState(false);

  // Mapbox configuration constants
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  const MAP_CENTER: [number, number] = [102.22450, -5.32145];
  const MAP_ZOOM = 19.5;
  const MAP_PITCH = 65;
  const MAP_BEARING = 45;

  useEffect(() => {
    if (map.current) return;

    const initMap = () => {
      try {
        const mapboxgl = window.mapboxgl;
        mapboxgl.accessToken = MAPBOX_TOKEN;

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
            [102.2220, -5.3235],
            [102.2270, -5.3195],
          ],
        });

        map.current.on('style.load', () => {
          map.current.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
          });
          map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });
          map.current.setFog({
            'range': [-1, 2],
            'horizon-blend': 0.3,
            'color': '#242B4B',
            'high-color': '#161B36',
            'space-color': '#0B1026',
            'star-intensity': 0.8,
          });

          const annotations = [
            {
              coordinates: [102.22484531359885, -5.3214281971597455] as [number, number],
              title: 'Penetasan Telur',
              subtitle: '5m × 8m · 80-120 telur/sarang',
              color: '#f59e0b',
              bgColor: 'rgba(245,158,11,0.12)',
              borderColor: 'rgba(245,158,11,0.35)',
              icon: '🥚',
              onClick: () => setIsTelurOpen(true),
            },
            {
              coordinates: [102.22442522414661, -5.3214624411341225] as [number, number],
              title: 'Kolam Tukik 1',
              subtitle: '5m × 5m · 4 sekat · Jaring 2m',
              color: '#10b981',
              bgColor: 'rgba(16,185,129,0.12)',
              borderColor: 'rgba(16,185,129,0.35)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
            {
              coordinates: [102.22443359452579, -5.32150698129618] as [number, number],
              title: 'Kolam Tukik 2',
              subtitle: '5m × 5m · 4 sekat · Jaring 2m',
              color: '#10b981',
              bgColor: 'rgba(16,185,129,0.12)',
              borderColor: 'rgba(16,185,129,0.35)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
            {
              coordinates: [102.22441750127211, -5.321390808074521] as [number, number],
              title: 'Kolam Tukik 3',
              subtitle: '5m × 5m · 4 sekat · Jaring 2m',
              color: '#10b981',
              bgColor: 'rgba(16,185,129,0.12)',
              borderColor: 'rgba(16,185,129,0.35)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
            {
              coordinates: [102.22444, -5.32155] as [number, number],
              title: 'Kolam Tukik 4',
              subtitle: '5m × 5m · 4 sekat · Jaring 2m',
              color: '#10b981',
              bgColor: 'rgba(16,185,129,0.12)',
              borderColor: 'rgba(16,185,129,0.35)',
              icon: '🐢',
              onClick: () => setIsInfoOpen(true),
            },
          ];

          annotations.forEach((anno) => {
            const el = document.createElement('div');
            el.className = 'map-annotation-marker';
            el.style.cursor = 'pointer';
            el.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));">
                <div style="background:${anno.bgColor};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid ${anno.borderColor};border-radius:12px;padding:5px 9px;max-width:170px;text-align:center;">
                  <div style="display:flex;align-items:center;justify-content:center;gap:3px;margin-bottom:1px;">
                    <span style="font-size:10px;">${anno.icon}</span>
                    <span style="color:${anno.color};font-size:9px;font-weight:700;letter-spacing:0.01em;white-space:nowrap;">${anno.title}</span>
                  </div>
                  <span style="color:rgba(255,255,255,0.45);font-size:7.5px;line-height:1.3;display:block;">${anno.subtitle}</span>
                </div>
                <div style="width:1px;height:14px;background:linear-gradient(to bottom,${anno.borderColor},transparent);"></div>
                <div style="width:6px;height:6px;border-radius:50%;background:${anno.color};box-shadow:0 0 10px ${anno.color}50;"></div>
              </div>
            `;
            el.addEventListener('click', () => anno.onClick());
            new window.mapboxgl.Marker({ element: el, anchor: 'bottom' })
              .setLngLat(anno.coordinates)
              .addTo(map.current);
          });
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    if (window.mapboxgl) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js';
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css';
      document.head.appendChild(link);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const glass = "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

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
                Peta Lokasi{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Pembesaran Tukik
                </span>
              </h1>
              <div className="flex items-center mt-1 gap-1.5">
                <MapPinSolid className="w-3 h-3 text-rose-400 shrink-0" />
                <p className="text-[10px] sm:text-xs text-white/40 font-medium">Bak Blau, Pulau Enggano</p>
              </div>
            </div>
          </header>

          {/* Action Buttons */}
          <div className="pointer-events-auto flex gap-1.5 sm:flex-col sm:gap-2">
            <button
              onClick={() => setIsInfoOpen(true)}
              className={`group ${glass} flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl hover:bg-white/[0.1] hover:border-emerald-400/25 transition-all duration-300`}
            >
              <SquaresSolid className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-xs font-semibold text-white/80 hidden sm:inline">Keramba</span>
            </button>
            <button
              onClick={() => setIsAlurOpen(true)}
              className={`group ${glass} flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl hover:bg-white/[0.1] hover:border-cyan-400/25 transition-all duration-300`}
            >
              <ArrowPathIcon className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-white/80 hidden sm:inline">Alur</span>
            </button>
          </div>
        </div>

        {/* Bottom - Legend */}
        <div className="pointer-events-auto self-end w-full max-w-[240px] sm:max-w-[280px]">
          <div className={`${glass} rounded-2xl overflow-hidden`}>
            
            <button
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <InformationCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                <h2 className="text-[11px] sm:text-xs font-semibold text-white/80">Kapasitas & Skala</h2>
              </div>
              {isLegendOpen ? (
                <ChevronDownIcon className="w-3 h-3 text-white/25" />
              ) : (
                <ChevronUpIcon className="w-3 h-3 text-white/25" />
              )}
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${isLegendOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-3 pb-3 space-y-2.5">
                
                {/* Capacity Card */}
                <div className="bg-emerald-500/[0.07] border border-emerald-500/15 rounded-xl p-2.5">
                  <div className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest">Total Kapasitas</div>
                  <div className="text-white text-lg font-black mt-0.5">
                    200 <span className="text-[10px] font-medium text-white/35">tukik</span>
                  </div>
                  <div className="text-white/25 text-[9px]">4 kolam × 50 tukik/kolam</div>
                </div>

                {/* Specs */}
                <div className="space-y-1.5">
                  {[
                    { icon: <Squares2X2Icon className="w-3 h-3 text-emerald-400" />, label: 'Keramba Jaring', desc: '5m × 5m × 2m · 4 sekat · 4 unit', color: 'emerald' },
                    { icon: <GlobeAltIcon className="w-3 h-3 text-amber-400" />, label: 'Sarang Penetasan', desc: '5m × 8m · 80-120 telur/sarang', color: 'amber' },
                    { icon: <MapPinIcon className="w-3 h-3 text-sky-400" />, label: 'Pelampung & Tiang', desc: 'Bambu 3m · Styrofoam', color: 'sky' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md bg-${item.color}-500/10 border border-${item.color}-500/15 flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-semibold text-white/70 truncate">{item.label}</p>
                        <p className="text-[8px] sm:text-[9px] text-white/25 truncate">{item.desc}</p>
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
      <KerambaInfoPanel isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      <TempatPenetasanTelurInfoPanel isOpen={isTelurOpen} onClose={() => setIsTelurOpen(false)} />
      <AlurBudidayaPanel isOpen={isAlurOpen} onClose={() => setIsAlurOpen(false)} />
    </main>
  );
}
