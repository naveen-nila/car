import React, { useState } from 'react';
import { Gauge, TrendingUp, Zap, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { DRIVE_MODES, DriveMode } from '../data/carData';

export const DynoCircuitBench: React.FC = () => {
  const [selectedModeKey, setSelectedModeKey] = useState<string>('track');
  const [currentGear, setCurrentGear] = useState<number>(3);
  const [shiftingActive, setShiftingActive] = useState<boolean>(false);
  const [hoverRpm, setHoverRpm] = useState<number | null>(null);

  const activeMode: DriveMode = DRIVE_MODES[selectedModeKey] || DRIVE_MODES.track;

  const handlePaddleShift = (direction: 'up' | 'down') => {
    if (shiftingActive) return;
    setShiftingActive(true);
    if (direction === 'up' && currentGear < 7) {
      setCurrentGear((g) => g + 1);
    } else if (direction === 'down' && currentGear > 1) {
      setCurrentGear((g) => g - 1);
    }
    setTimeout(() => {
      setShiftingActive(false);
    }, activeMode.shiftLatencyMs);
  };

  // Interpolated dyno points
  const dynoPoints = [
    { rpm: 2000, hp: 180, torque: 340 },
    { rpm: 3000, hp: 290, torque: 470 },
    { rpm: 4000, hp: 380, torque: 490 },
    { rpm: 5000, hp: 440, torque: 485 },
    { rpm: 6000, hp: 485, torque: 470 },
    { rpm: 7000, hp: 505, torque: 440 },
    { rpm: 8000, hp: 495, torque: 395 },
  ];

  return (
    <section id="engineering" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
      {/* Header and Mode Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#ffaa00] animate-pulse"></span>
            <span className="font-space text-xs font-bold uppercase text-[#ffaa00] tracking-widest">
              // LIVE TELEMETRY MATRIX
            </span>
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            DYNO &amp; CIR-CUIT DATA BENCH
          </h2>
          <p className="font-space text-zinc-400 text-sm max-w-xl mt-2 font-light">
            Real-time engine mapping, wastegate boost curves, dual-clutch actuation profiles, and chassis slip angles.
          </p>
        </div>

        {/* Drive Mode Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#131318] border border-white/10 self-start lg:self-end">
          {Object.entries(DRIVE_MODES).map(([key, mode]) => {
            const isSelected = selectedModeKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedModeKey(key)}
                className={`px-5 py-2 rounded-full font-space text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff6b00] text-black shadow-[0_0_20px_rgba(255,107,0,0.55)] scale-102'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {mode.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Briefing Banner */}
      <div className="my-6 p-4 rounded-xl bg-[#14141a]/60 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[#ff6b00]/20 text-[#ff6b00] font-space text-xs font-bold uppercase">
            Active Map: {activeMode.name}
          </span>
          <span className="text-zinc-300 text-xs font-space">{activeMode.description}</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-space text-zinc-400 shrink-0">
          <span>Active Aero: <strong className="text-white">{activeMode.activeAeroAngle}</strong></span>
          <span>Diff Lock: <strong className="text-white">{activeMode.tractionControl}</strong></span>
        </div>
      </div>

      {/* 4 Telemetry Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Boost Pressure Gauge */}
        <div className="p-6 rounded-2xl bg-[#131318] border border-white/10 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#ff6b00]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-space text-xs font-bold text-zinc-400 uppercase tracking-wider">
              BOOST PRESSURE
            </span>
            <Gauge size={18} className="text-[#ff6b00]" />
          </div>

          {/* Radial Visualization */}
          <div className="flex items-center justify-center py-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-white/10"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-[#ff6b00] transition-all duration-700 ease-out"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="42"
                  stroke="currentColor"
                  strokeDasharray="264"
                  strokeDashoffset={activeMode.boostOffset}
                  strokeLinecap="round"
                  strokeWidth="8"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.7))',
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-anton text-4xl text-white tracking-tight">
                  {activeMode.boostBar}
                </span>
                <span className="font-space text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  BAR PEAK
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-space text-zinc-400 pt-2 border-t border-white/5">
            <span>Twin Ceramic Turbos</span>
            <span className="text-[#ff6b00] font-semibold">Overboost Ready</span>
          </div>
        </div>

        {/* Card 2: Dyno Curve Chart */}
        <div className="p-6 rounded-2xl bg-[#131318] border border-white/10 flex flex-col justify-between shadow-xl hover:border-[#ffaa00]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-space text-xs font-bold text-zinc-400 uppercase tracking-wider">
              DYNO CURVE // PWR
            </span>
            <TrendingUp size={18} className="text-[#ffaa00]" />
          </div>

          {/* Vector Dyno Sparkline Chart with Hover Tooltip */}
          <div className="py-4 relative">
            <svg className="w-full h-32 overflow-visible" fill="none" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="dynoGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill Area */}
              <path
                d="M 10 90 Q 50 82, 80 50 T 140 22 T 190 12 L 190 98 L 10 98 Z"
                fill="url(#dynoGrad)"
              />
              {/* Stroke Line */}
              <path
                d="M 10 90 Q 50 82, 80 50 T 140 22 T 190 12"
                stroke="#ffaa00"
                strokeLinecap="round"
                strokeWidth="3.5"
                className="filter drop-shadow-[0_0_8px_rgba(255,170,0,0.6)]"
              />
              {/* Interactive Peak Marker */}
              <circle cx="170" cy="16" r="4" fill="#ffffff" className="animate-ping" />
              <circle cx="170" cy="16" r="3.5" fill="#ff6b00" />
            </svg>

            {/* Quick Dyno Inspection Points */}
            <div className="flex justify-between items-center text-[10px] font-space text-zinc-500 mt-2">
              <span>2k RPM</span>
              <span>4k RPM</span>
              <span>6k RPM</span>
              <span className="text-[#ffaa00] font-bold">8.2k RPM</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div>
              <p className="font-space text-[10px] text-zinc-400 uppercase font-bold">MAX TORQUE BAND</p>
              <p className="font-anton text-lg text-white">3,200 - 6,800 RPM</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#ffaa00]/15 text-[#ffaa00] font-space text-[10px] font-bold">
              +14% FLATTENED
            </span>
          </div>
        </div>

        {/* Card 3: Redline Ceiling Dynamic Meter */}
        <div className="p-6 rounded-2xl bg-[#131318] border border-white/10 flex flex-col justify-between shadow-xl hover:border-white/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-space text-xs font-bold text-zinc-400 uppercase tracking-wider">
              REDLINE CEILING
            </span>
            <Zap size={18} className="text-[#ffb693]" />
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <span className="font-anton text-4xl text-[#ff6b00] tracking-tight">
              {activeMode.revLimit.toLocaleString()}
            </span>
            <span className="font-space text-[10px] text-zinc-400 uppercase tracking-widest mt-1 font-bold">
              RPM CUTOFF
            </span>

            {/* Tachometer Bar Array */}
            <div className="flex gap-1.5 mt-5 w-full">
              <div className="h-4 flex-1 rounded-sm bg-[#ff6b00]/30" />
              <div className="h-4 flex-1 rounded-sm bg-[#ff6b00]/50" />
              <div className="h-4 flex-1 rounded-sm bg-[#ff6b00]/70" />
              <div className="h-4 flex-1 rounded-sm bg-[#ff6b00]" />
              <div className="h-4 flex-1 rounded-sm bg-[#ffaa00]" />
              <div className="h-4 flex-1 rounded-sm bg-[#ffaa00] animate-pulse" />
              <div className="h-4 flex-1 rounded-sm bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-space text-zinc-400 pt-2 border-t border-white/5">
            <span>Titanium Valvetrain</span>
            <span className="text-white font-semibold">Dry Sump Oiling</span>
          </div>
        </div>

        {/* Card 4: DCT Shifting Latency & Interactive Paddle Shifter */}
        <div className="p-6 rounded-2xl bg-[#131318] border border-white/10 flex flex-col justify-between shadow-xl hover:border-[#ffaa00]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-space text-xs font-bold text-zinc-400 uppercase tracking-wider">
              DCT SHIFT LATENCY
            </span>
            <Clock size={18} className="text-[#ffaa00]" />
          </div>

          <div className="py-4 flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-1">
              <span className="font-anton text-4xl text-[#ffaa00] tracking-tight">
                {activeMode.shiftLatencyMs}
              </span>
              <span className="font-space text-xs text-zinc-400 font-bold">MS</span>
            </div>
            <span className="font-space text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5 font-bold">
              MILLISECONDS
            </span>

            {/* Interactive Paddle Shift Simulator */}
            <div className="w-full mt-4 p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handlePaddleShift('down')}
                disabled={currentGear <= 1}
                className="w-8 h-8 rounded-lg bg-[#22222c] hover:bg-[#333342] disabled:opacity-30 text-white flex items-center justify-center font-anton text-sm"
                title="Downshift"
              >
                <ChevronDown size={16} />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase font-space text-zinc-400">ENGAGED GEAR</span>
                <span
                  className={`font-anton text-2xl transition-all duration-150 ${
                    shiftingActive ? 'text-[#ff6b00] scale-125' : 'text-white'
                  }`}
                >
                  G{currentGear}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handlePaddleShift('up')}
                disabled={currentGear >= 7}
                className="w-8 h-8 rounded-lg bg-[#22222c] hover:bg-[#333342] disabled:opacity-30 text-white flex items-center justify-center font-anton text-sm"
                title="Upshift"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-space text-zinc-400 pt-2 border-t border-white/5">
            <span>7-Speed Dual Clutch</span>
            <span className="text-[#ffaa00] font-semibold">Paddle Shift</span>
          </div>
        </div>
      </div>
    </section>
  );
};
