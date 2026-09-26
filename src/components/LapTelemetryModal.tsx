import React, { useState } from 'react';
import { X, Play, Pause, Activity, Zap, Flag, Gauge, RotateCcw } from 'lucide-react';
import { TELEMETRY_LAP_DATA } from '../data/carData';

interface LapTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LapTelemetryModal: React.FC<LapTelemetryModalProps> = ({ isOpen, onClose }) => {
  const [selectedCircuit, setSelectedCircuit] = useState<'nurburgring' | 'suzuka'>('nurburgring');
  const [playbackProgress, setPlaybackProgress] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1 pr-12">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00] animate-pulse" />
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              TELEMETRY OS 4.2 // CLOSED CIRCUIT LOG
            </span>
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-white">
            LAP TELEMETRY BENCH: 1:24.08
          </h2>
          <p className="font-space text-xs sm:text-sm text-zinc-400">
            Homologation chassis prototype verification stint • Dry asphalt • 19°C ambient • 24°C track temp
          </p>
        </div>

        {/* Circuit Selector Tabs */}
        <div className="flex items-center gap-2 mt-6 p-1 rounded-full bg-[#181820] w-fit border border-white/10">
          <button
            type="button"
            onClick={() => setSelectedCircuit('nurburgring')}
            className={`px-4 py-1.5 rounded-full font-space text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCircuit === 'nurburgring'
                ? 'bg-[#ff6b00] text-black shadow-[0_0_12px_#ff6b00]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Nürburgring Nordschleife
          </button>
          <button
            type="button"
            onClick={() => setSelectedCircuit('suzuka')}
            className={`px-4 py-1.5 rounded-full font-space text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCircuit === 'suzuka'
                ? 'bg-[#ff6b00] text-black shadow-[0_0_12px_#ff6b00]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Suzuka International Racing Course
          </button>
        </div>

        {/* Telemetry Key Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-3.5 rounded-xl bg-[#171720] border border-white/10">
            <span className="text-[10px] font-space uppercase text-zinc-400 font-bold block">PEAK LATERAL G</span>
            <span className="font-anton text-2xl text-[#ff6b00]">{TELEMETRY_LAP_DATA.lateralG.split(' ')[0]}</span>
            <span className="text-[10px] font-space text-zinc-500 block">Karussell Banking</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#171720] border border-white/10">
            <span className="text-[10px] font-space uppercase text-zinc-400 font-bold block">BRAKING DECEL</span>
            <span className="font-anton text-2xl text-[#ffaa00]">{TELEMETRY_LAP_DATA.brakingG.split(' ')[0]}</span>
            <span className="text-[10px] font-space text-zinc-500 block">Carbon-Ceramic Rotors</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#171720] border border-white/10">
            <span className="text-[10px] font-space uppercase text-zinc-400 font-bold block">TOP APEX SPEED</span>
            <span className="font-anton text-2xl text-white">298 KM/H</span>
            <span className="text-[10px] font-space text-zinc-500 block">Döttinger Höhe Straight</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#171720] border border-white/10">
            <span className="text-[10px] font-space uppercase text-zinc-400 font-bold block">TELEMETRY DELTA</span>
            <span className="font-anton text-2xl text-emerald-400">-2.22s</span>
            <span className="text-[10px] font-space text-zinc-500 block">vs Benchmark Target</span>
          </div>
        </div>

        {/* Simulated Sector Breakdown Table */}
        <div className="rounded-2xl bg-[#15151c] border border-white/10 p-5 overflow-x-auto">
          <h4 className="font-space text-xs font-bold uppercase text-zinc-400 tracking-wider mb-3">
            SECTOR DELTA ANALYSIS
          </h4>
          <table className="w-full text-left font-space text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-500 text-[10px] uppercase">
                <th className="pb-2">Sector &amp; Corner Complex</th>
                <th className="pb-2">Split Time</th>
                <th className="pb-2">Delta Target</th>
                <th className="pb-2">Apex Entry Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TELEMETRY_LAP_DATA.sectors.map((sec, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-semibold text-white">{sec.sector}</td>
                  <td className="py-2.5 font-anton text-sm text-[#ffaa00]">{sec.time}</td>
                  <td className="py-2.5 font-bold text-emerald-400">{sec.delta}</td>
                  <td className="py-2.5 text-zinc-300">{sec.apexSpeed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* G-Force Friction Circle Graph Simulation */}
        <div className="mt-6 p-5 rounded-2xl bg-[#15151c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-md">
            <span className="text-xs font-space font-bold uppercase text-[#ff6b00]">
              G-FORCE FRICTION ELLIPSE
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Combined vector slip angle showing high mechanical grip limit under combined trail-braking and apex throttle application.
            </p>
          </div>

          <div className="relative w-36 h-36 rounded-full border border-white/20 flex items-center justify-center shrink-0">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute w-full h-[1px] bg-white/20" />
            <div className="absolute h-full w-[1px] bg-white/20" />
            
            {/* Live G-dot */}
            <div className="absolute w-4 h-4 rounded-full bg-[#ff6b00] shadow-[0_0_12px_#ff6b00] transform translate-x-7 -translate-y-6 animate-pulse" />
            <span className="absolute bottom-1 right-2 text-[9px] font-space text-zinc-500 font-bold">1.68G</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-space text-zinc-500">Log Hash: #MK4-NORDSCHLEIFE-0926</span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#ff6b00] hover:bg-[#ffaa00] text-black font-anton text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Close Telemetry Bench
          </button>
        </div>
      </div>
    </div>
  );
};
