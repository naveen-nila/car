import React, { useState } from 'react';
import { ArrowRight, Gauge, MapPin, Network, Headphones, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0a0a0d] border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#ff6b00] rounded-sm transform rotate-45 opacity-90 shadow-[0_0_10px_#ff6b00]" />
                <div className="relative text-black font-anton font-bold text-[10px]">MK</div>
              </div>
              <span className="font-anton text-2xl tracking-wider text-white uppercase">
                APEX MK
              </span>
            </div>

            <p className="font-space text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed font-light">
              Handcrafted aerodynamics, twin-turbo hybrid propulsion, and precision telemetry engineered for track domination and road mastery.
            </p>

            {/* Accent colored bars matching reference image */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-1.5 w-12 bg-[#ff6b00] rounded-full shadow-[0_0_8px_#ff6b00]" />
              <div className="h-1.5 w-6 bg-[#ffaa00] rounded-full" />
              <div className="h-1.5 w-3 bg-[#ffcf90] rounded-full" />
            </div>
          </div>

          {/* Performance Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              PERFORMANCE
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#showcase" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  MK-IV Prototype
                </a>
              </li>
              <li>
                <a href="#engineering" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  GT Aerodynamics
                </a>
              </li>
              <li>
                <a href="#engineering" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  Titanium Exhaust Lab
                </a>
              </li>
              <li>
                <a href="#engineering" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  Telemetry OS 4.2
                </a>
              </li>
            </ul>
          </div>

          {/* Circuit Access Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              CIRCUIT ACCESS
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#test-drive" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  Track Day Schedule
                </a>
              </li>
              <li>
                <a href="#test-drive" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  Apex Racing Club
                </a>
              </li>
              <li>
                <a href="#test-drive" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  Pitlane Concierge
                </a>
              </li>
              <li>
                <a href="#custom-studio" className="font-space text-xs text-zinc-400 hover:text-white transition-colors">
                  Factory Delivery
                </a>
              </li>
            </ul>
          </div>

          {/* Track Dispatch // Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              TRACK DISPATCH // NEWSLETTER
            </span>
            <p className="font-space text-xs text-zinc-400 leading-relaxed font-light">
              Receive telemetry briefings, closed-circuit track day invitations, and bespoke MK-IV build slot alerts.
            </p>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@apex-motors.com"
                className="w-full px-4 py-2.5 rounded-full bg-[#181822] text-white text-xs font-space border border-white/10 focus:outline-none focus:border-[#ff6b00] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#ff6b00] hover:bg-[#ffaa00] text-black font-anton text-sm uppercase tracking-wider transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_12px_rgba(255,107,0,0.4)]"
              >
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>

            {subscribed && (
              <p className="text-xs font-space text-[#ffaa00]">
                Telemetry channel synchronized. Dispatch frequency logged.
              </p>
            )}

            {/* Quick action icons */}
            <div className="flex items-center gap-4 mt-1">
              <span className="text-zinc-500 hover:text-[#ff6b00] transition-colors cursor-pointer" title="Telemetry Hub">
                <Gauge size={18} />
              </span>
              <span className="text-zinc-500 hover:text-[#ff6b00] transition-colors cursor-pointer" title="Circuit Pitlane Locations">
                <MapPin size={18} />
              </span>
              <span className="text-zinc-500 hover:text-[#ff6b00] transition-colors cursor-pointer" title="Telemetry OS Sync">
                <Network size={18} />
              </span>
              <span className="text-zinc-500 hover:text-[#ff6b00] transition-colors cursor-pointer" title="Driver Support Audio">
                <Headphones size={18} />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-space text-[11px] text-zinc-500 tracking-wider uppercase text-center md:text-left">
            © 2026 APEX MK PERFORMANCE AUTOMOBILES. ALL RACING TELEMETRY SUBJECT TO CIRCUIT REGULATION.
          </p>
          <div className="flex items-center gap-6 font-space text-[11px] text-zinc-500 uppercase tracking-wider">
            <a href="#showcase" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#engineering" className="hover:text-white transition-colors">TELEMETRY POLICY</a>
            <a href="#test-drive" className="hover:text-white transition-colors">TERMS OF DRIVING</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
