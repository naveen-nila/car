import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ChevronRight, Gauge, Activity } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenReservation: () => void;
  onOpenTelemetry: () => void;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConfigurator,
  onOpenReservation,
  onOpenTelemetry,
  currentSection,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    if (isAudioActive) {
      engineAudio.stop();
      setIsAudioActive(false);
    } else {
      engineAudio.start();
      setIsAudioActive(true);
    }
  };

  const navItems = [
    { label: 'Showcase', href: '#showcase', id: 'showcase' },
    { label: 'Engineering & Specs', href: '#engineering', id: 'engineering' },
    { label: 'Custom Studio', href: '#custom-studio', id: 'custom-studio' },
    { label: 'Heritage', href: '#heritage', id: 'heritage' },
    { label: 'Test Drive', href: '#test-drive', id: 'test-drive' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#0a0a0c]/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <a href="#showcase" className="flex items-center gap-3.5 group">
            {/* Geometric Mark */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#ff6b00] rounded-sm transform rotate-45 opacity-90 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300 shadow-[0_0_12px_#ff6b00]"></div>
              <div className="relative text-black font-anton font-bold text-xs tracking-tighter">
                MK
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-anton text-xl uppercase tracking-wider text-white group-hover:text-[#ff6b00] transition-colors leading-tight">
                APEX MK
              </span>
              <span className="font-space text-[10px] text-[#ffb693]/80 uppercase tracking-widest font-semibold">
                PERFORMANCE LAB
              </span>
            </div>
          </a>

          <div className="hidden xl:block h-6 w-[1px] bg-white/15"></div>
        </div>

        {/* Desktop Navigation pill bar */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#16161c]/90 border border-white/10 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`px-4 py-2 font-space text-xs uppercase tracking-wider transition-all duration-200 rounded-full font-medium ${
                  isActive
                    ? 'bg-[#ff6b00] text-black font-bold shadow-[0_0_20px_rgba(255,107,0,0.45)]'
                    : 'text-[#e5e1e6]/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Track Ready Status Pill */}
          <button
            onClick={onOpenTelemetry}
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1b22] border border-[#ff6b00]/30 hover:border-[#ff6b00] transition-all group"
            title="Open Live Lap Telemetry"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse shadow-[0_0_8px_#ff6b00]"></span>
            <span className="font-space text-[11px] font-bold uppercase text-[#ffaa00] tracking-widest group-hover:text-white transition-colors">
              TRACK READY
            </span>
          </button>

          {/* Sound / Acoustic Lab Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            aria-label="Toggle Engine Sound Synthesizer"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
              isAudioActive
                ? 'bg-[#ff6b00] text-black border-[#ff6b00] shadow-[0_0_18px_rgba(255,107,0,0.6)] animate-pulse'
                : 'bg-[#181820] text-zinc-300 border-white/15 hover:text-white hover:bg-[#252530]'
            }`}
            title={isAudioActive ? 'Mute 2JZ Exhaust Synthesizer' : 'Engage 2JZ Exhaust Audio Lab'}
          >
            {isAudioActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Configure MK-IV CTA */}
          <button
            type="button"
            onClick={onOpenConfigurator}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#ff6b00] hover:bg-[#ffaa00] text-black font-anton text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,107,0,0.45)] hover:shadow-[0_0_36px_rgba(255,170,0,0.7)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Configure MK-IV
          </button>

          {/* Reserve Quick Slot Pill */}
          <button
            type="button"
            onClick={onOpenReservation}
            className="hidden lg:inline-flex items-center justify-center px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-space text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all"
          >
            #012 Slot
          </button>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#181820] flex items-center justify-center text-zinc-300 border border-white/15 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c10] border-b border-white/15 px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg text-sm uppercase font-space tracking-wider text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <span>{item.label}</span>
                <ChevronRight size={16} className="text-[#ff6b00]" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full py-3 rounded-full bg-[#ff6b00] text-black font-anton text-center uppercase tracking-wider shadow-[0_0_20px_rgba(255,107,0,0.5)]"
            >
              Configure MK-IV Spec
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-full bg-white/10 text-white font-space text-xs font-bold uppercase tracking-wider text-center border border-white/15"
            >
              Reserve Production Slot #12
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
