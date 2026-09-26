import React from 'react';
import { Trophy, Calendar, Compass, ShieldAlert, Award } from 'lucide-react';

interface TestDriveSectionProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export const TestDriveSection: React.FC<TestDriveSectionProps> = ({
  onOpenBooking,
  onOpenConcierge,
}) => {
  return (
    <section id="test-drive" className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24">
      <div className="relative rounded-3xl p-10 lg:p-16 bg-gradient-to-r from-[#121217] via-[#1a1a24] to-[#121217] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden">
        {/* Glow ambient top band */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent" />
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[#ff6b00]/10 filter blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-[#ff6b00]" />
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              VIP DRIVER CONCIERGE
            </span>
          </div>

          <h3 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            TEST DRIVE THE PROTOTYPE AT NURBURGRING OR SUZUKA
          </h3>

          <p className="font-space text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Private circuit evaluations by appointment only. Each session includes factory telemetry briefing, professional instructor coaching, and custom seat molding.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-space text-zinc-400">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-[#ffaa00]" />
              Spring / Autumn Calendar Slots
            </span>
            <span className="flex items-center gap-2">
              <Compass size={14} className="text-[#ffaa00]" />
              Full Track Private Closed Circuit
            </span>
            <span className="flex items-center gap-2">
              <Award size={14} className="text-[#ffaa00]" />
              FIA Grade 1 Superlicense Coach
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full lg:w-auto">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2a2a38] hover:bg-white text-white hover:text-black font-anton text-sm uppercase tracking-wider transition-all duration-300 border border-white/10 shadow-lg text-center cursor-pointer"
          >
            Request Circuit Pass
          </button>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] text-black font-anton text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,107,0,0.55)] hover:shadow-[0_0_36px_rgba(255,107,0,0.85)] hover:scale-[1.03] active:scale-95 transition-all text-center cursor-pointer"
          >
            Contact Concierge
          </button>
        </div>
      </div>
    </section>
  );
};
