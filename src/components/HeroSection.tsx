import React, { useState, useEffect, useRef } from 'react';
import { Bolt, PlayCircle, Flame, Volume2, ArrowRight } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenTelemetry: () => void;
  onOpenConfigurator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onOpenTelemetry,
  onOpenConfigurator,
}) => {
  const [isRevving, setIsRevving] = useState(false);
  const [rpm, setRpm] = useState(850);
  const [soundActive, setSoundActive] = useState(false);
  const [exhaustFlames, setExhaustFlames] = useState(false);
  const animRef = useRef<number | null>(null);

  // Smooth RPM update while revving
  useEffect(() => {
    const updateRpm = () => {
      setRpm((prev) => {
        const target = isRevving ? 8200 : soundActive ? 850 : 0;
        const speed = isRevving ? 380 : 220;
        if (Math.abs(prev - target) < 100) return target;
        return prev < target ? Math.min(target, prev + speed) : Math.max(target, prev - speed);
      });
      animRef.current = requestAnimationFrame(updateRpm);
    };

    animRef.current = requestAnimationFrame(updateRpm);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRevving, soundActive]);

  const handleStartRev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!soundActive) {
      engineAudio.start();
      setSoundActive(true);
    }
    engineAudio.setThrottle(true, 8200);
    setIsRevving(true);
    setExhaustFlames(true);
  };

  const handleEndRev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    engineAudio.setThrottle(false);
    setIsRevving(false);
    setTimeout(() => setExhaustFlames(false), 600);
  };

  const toggleSound = () => {
    if (soundActive) {
      engineAudio.stop();
      setSoundActive(false);
      setIsRevving(false);
    } else {
      engineAudio.start();
      setSoundActive(true);
    }
  };

  return (
    <section id="showcase" className="relative w-full min-h-[94vh] flex flex-col justify-center overflow-hidden px-6 lg:px-12 pt-8 pb-16">
      {/* Background Ambient Lighting & Vertical Stripes (matching reference image) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center lg:justify-end lg:pr-32 overflow-hidden z-0">
        {/* Dark Room Floor Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/85 to-transparent z-10" />

        {/* Asymmetric Vertical Triple Racing Stripes matching reference image */}
        <div className="relative h-full flex opacity-90 mix-blend-screen filter blur-[0.5px]">
          <div className="w-10 sm:w-16 h-full bg-gradient-to-b from-[#ff6b00]/15 via-[#ff6b00]/35 to-transparent" />
          <div className="w-16 sm:w-24 h-full bg-gradient-to-b from-[#ffaa00]/20 via-[#ffaa00]/50 to-transparent" />
          <div className="w-20 sm:w-32 h-full bg-gradient-to-b from-[#ffb693]/20 via-[#ff6b00]/45 to-[#ff6b00]/10" />
          
          {/* Ultra-hot core vertical laser line */}
          <div className="w-1.5 h-full bg-white shadow-[0_0_35px_#ff6b00,0_0_15px_#ffffff]" />
          
          <div className="w-16 sm:w-28 h-full bg-gradient-to-b from-[#ff6b00]/35 via-[#ffb693]/15 to-transparent" />
        </div>

        {/* Radial Warmth Emitter */}
        <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-[#ff6b00]/12 filter blur-[130px] pointer-events-none" />
      </div>

      {/* Hero Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Typography & Ignition Cluster (Left) */}
        <div className="lg:col-span-6 flex flex-col gap-6 pt-4">
          {/* Homologation Badge */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#1b1b22]/90 border border-white/10 w-fit backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-ping" />
            <span className="font-space text-[11px] text-[#ff6b00] uppercase tracking-widest font-bold">
              // HOMOLOGATION MK-IV CHASSIS
            </span>
          </div>

          {/* Headlines */}
          <div className="flex flex-col">
            <p className="font-space text-sm sm:text-base text-[#ffaa00] uppercase tracking-[0.25em] font-semibold mb-1">
              THE LEGEND REBORN
            </p>
            <h1 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-[96px] text-white uppercase tracking-tight leading-[0.9] drop-shadow-2xl">
              APEX{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] via-[#ffaa00] to-[#ffb693]">
                MK-IV
              </span>
            </h1>
            <p className="font-space text-sm sm:text-lg text-zinc-300 mt-3 font-normal tracking-wide">
              TWIN-TURBO 3.0L INLINE-6 • 505 HP • 0-60 IN 3.4S
            </p>
          </div>

          {/* Description */}
          <p className="font-space text-sm sm:text-base text-zinc-400 max-w-xl font-light leading-relaxed">
            Forged in the crucible of golden-era Japanese circuit endurance and refined with modern aerospace carbon weave. Engineered to shatter lap records while maintaining authentic analog driver feedback.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] text-black font-anton text-base uppercase tracking-wider shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:shadow-[0_0_45px_rgba(255,107,0,0.9)] hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>Reserve Slot #12</span>
              <Bolt size={20} className="fill-black" />
            </button>

            <button
              type="button"
              onClick={onOpenTelemetry}
              className="px-6 py-4 rounded-full bg-[#1e1e26]/80 hover:bg-[#282834] text-white font-space text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-lg border border-white/10 transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              <PlayCircle size={20} className="text-[#ff6b00] group-hover:scale-110 transition-transform" />
              <span>Lap Telemetry 1:24.08</span>
            </button>
          </div>

          {/* Interactive Acoustic Lab // 2JZ Heritage Engine Rev Simulator */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${
                  soundActive
                    ? 'bg-[#ff6b00]/15 border-[#ff6b00] text-white'
                    : 'bg-[#15151c] border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <Volume2 size={16} className={soundActive ? 'text-[#ff6b00] animate-pulse' : 'text-zinc-500'} />
                <span className="font-space text-[11px] uppercase tracking-wider font-semibold">
                  Acoustic Lab // 2JZ Heritage Tone
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  soundActive ? 'bg-[#ff6b00] text-black' : 'bg-white/10 text-zinc-400'
                }`}>
                  {soundActive ? 'LIVE 48kHz' : 'MUTED'}
                </span>
              </button>
            </div>

            {/* Hold to REV interactive pedal */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onMouseDown={handleStartRev}
                onMouseUp={handleEndRev}
                onMouseLeave={handleEndRev}
                onTouchStart={handleStartRev}
                onTouchEnd={handleEndRev}
                className={`px-4 py-2 rounded-full font-anton text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer select-none ${
                  isRevving
                    ? 'bg-[#ff6b00] text-black scale-105 shadow-[0_0_24px_#ff6b00]'
                    : 'bg-[#22222c] hover:bg-[#2c2c3a] text-zinc-200 border border-[#ff6b00]/40'
                }`}
              >
                <Flame size={14} className={isRevving ? 'text-black fill-black animate-bounce' : 'text-[#ff6b00]'} />
                <span>{isRevving ? 'REV LIMIT 8,200 RPM!' : 'HOLD TO REV THROTTLE'}</span>
              </button>

              {/* Tachometer mini display */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 border border-white/10">
                <span className="font-anton text-sm text-[#ffaa00] w-12 text-right">
                  {Math.round(rpm)}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-space">RPM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Stage Display (Right) matching image styling */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          {/* Vertical legacy watermark text matching poster artwork */}
          <div className="absolute -left-12 top-0 bottom-0 pointer-events-none select-none flex items-center opacity-10 hidden xl:flex">
            <span className="font-anton text-8xl text-[#ff6b00] rotate-90 uppercase tracking-widest origin-center">
              LEGACY
            </span>
          </div>

          {/* Car Image Container with Rim Lighting & Wet Floor Ground Reflection */}
          <div className="relative w-full max-w-lg lg:max-w-none flex flex-col items-center group">
            {/* Flashing exhaust flame effect when revving */}
            {exhaustFlames && (
              <div className="absolute -bottom-2 -left-4 z-20 pointer-events-none">
                <div className="w-16 h-8 bg-gradient-to-r from-blue-400 via-[#ff6b00] to-yellow-300 rounded-full filter blur-sm animate-pulse opacity-90"></div>
                <div className="w-24 h-12 bg-[#ff6b00]/40 rounded-full filter blur-md -mt-4"></div>
              </div>
            )}

            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_70px_-15px_rgba(0,0,0,0.95)] border border-white/10 transition-transform duration-700 group-hover:scale-[1.015]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApQR51T8oWao4kMkjifBz78Ci63zh7DVJkeaTiALZymqZX-FaVzLtvxGwORV0bvzfapq9eZ8IiBrLoz8aC4oC3sejbMduKlNIEfi4oKxc1INzT4I0oenMcs8JPsVGZPM6NspuHMLnnNwE0uCVwtsmdTjn0K1mPgZw_XQvz3P4PY1au94hLSUVLz6uYXIi-sv0Zt-HC6hfkmxqA0O21iABKnEG-Rk1jrkKQC2uddAn_EBLUNfMKduQ9DrvwszRjXK0j7A"
                alt="Apex MK-IV high performance sports car in Sunset Ember finish staged in dark studio with vertical racing stripes"
                className="w-full h-auto object-cover rounded-xl"
              />

              {/* Top specular edge reflection */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffaa00] to-transparent" />

              {/* Floating interact badge */}
              <button
                type="button"
                onClick={onOpenConfigurator}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-[11px] font-space uppercase text-white tracking-wider border border-white/20 flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <span>360° Studio</span>
                <ArrowRight size={13} className="text-[#ff6b00]" />
              </button>
            </div>

            {/* Synthetic Floor Shadow & Orange Glow Puddle */}
            <div className="w-5/6 h-8 bg-[#ff6b00]/30 filter blur-xl -mt-4 rounded-full" />
            <div className="w-full h-12 bg-black/90 filter blur-md -mt-6 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating Telemetry Metric Cards Bar */}
      <div className="w-full max-w-7xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#14141a]/90 backdrop-blur-md border border-white/10 flex flex-col justify-between shadow-lg hover:border-[#ff6b00]/50 transition-colors">
          <span className="font-space text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
            MAX POWER OUTPUT
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-anton text-2xl sm:text-3xl text-[#ff6b00]">505</span>
            <span className="font-space text-xs sm:text-sm text-zinc-200 font-semibold">BHP @ 7,600</span>
          </div>
          <div className="w-full bg-[#22222c] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#ff6b00] h-full w-[88%] rounded-full shadow-[0_0_8px_#ff6b00]" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#14141a]/90 backdrop-blur-md border border-white/10 flex flex-col justify-between shadow-lg hover:border-[#ffaa00]/50 transition-colors">
          <span className="font-space text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
            PEAK TORQUE
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-anton text-2xl sm:text-3xl text-[#ffaa00]">490</span>
            <span className="font-space text-xs sm:text-sm text-zinc-200 font-semibold">LB-FT @ 3,200</span>
          </div>
          <div className="w-full bg-[#22222c] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#ffaa00] h-full w-[82%] rounded-full shadow-[0_0_8px_#ffaa00]" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#14141a]/90 backdrop-blur-md border border-white/10 flex flex-col justify-between shadow-lg hover:border-white/40 transition-colors">
          <span className="font-space text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
            TOP VELOCITY
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-anton text-2xl sm:text-3xl text-white">198</span>
            <span className="font-space text-xs sm:text-sm text-zinc-400 font-semibold">MPH RADAR</span>
          </div>
          <div className="w-full bg-[#22222c] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-white/80 h-full w-[94%] rounded-full" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#14141a]/90 backdrop-blur-md border border-white/10 flex flex-col justify-between shadow-lg hover:border-[#ffb693]/50 transition-colors">
          <span className="font-space text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
            WEIGHT BALANCE
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-anton text-2xl sm:text-3xl text-[#ffb693]">50 : 50</span>
            <span className="font-space text-xs sm:text-sm text-zinc-400 font-semibold">CHASSIS RATIO</span>
          </div>
          <div className="w-full bg-[#22222c] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#ffb693] h-full w-[50%] rounded-full shadow-[0_0_6px_#ffb693]" />
          </div>
        </div>
      </div>
    </section>
  );
};
