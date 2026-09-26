import React from 'react';
import { Flag, Trophy, Cpu, History } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const milestones = [
    {
      year: '1993',
      title: 'The Iron Block Genesis',
      subtitle: 'JGTC GT500 Champion Era',
      desc: 'The legendary 3.0L twin-cam straight six debuted in touring car racing, generating over 650 horsepower under 2.2 bar boost and dominating endurance rounds.',
    },
    {
      year: '1998',
      title: 'Suzuka 1000km Dominance',
      subtitle: 'Aerodynamic Evolution',
      desc: 'First homologated carbon composite front splitter and functional rear diffuser package tested and proven at Suzuka Circuit and Tsukuba Time Attack.',
    },
    {
      year: '2026',
      title: 'Apex MK-IV Reborn',
      subtitle: 'Modern Homologation Special',
      desc: 'Handcrafted aerospace pre-preg carbon monocoque, 505 BHP dry-sump inline-6, active ground-effect tunnels, and dual-clutch shifting in 90ms.',
    },
  ];

  return (
    <section id="heritage" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <History size={16} className="text-[#ff6b00]" />
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              // MOTORSPORT BLOODLINE
            </span>
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-tight">
            HERITAGE: THREE DECADES OF SPEED
          </h2>
          <p className="font-space text-zinc-400 text-sm max-w-2xl mt-2 font-light">
            From Fuji Speedway high-banks to the Nürburgring Nordschleife, the MK-IV badge represents uninterrupted circuit pedigree.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {milestones.map((item, index) => (
          <div
            key={item.year}
            className="p-6 rounded-2xl bg-[#131318] border border-white/10 hover:border-[#ff6b00]/40 transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-anton text-3xl sm:text-4xl text-[#ffaa00]">
                  {item.year}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-space uppercase text-zinc-300 tracking-wider">
                  Chassis Stage 0{index + 1}
                </span>
              </div>
              <h3 className="font-space text-lg font-bold text-white uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="font-space text-xs text-[#ffb693] font-semibold mt-0.5 uppercase tracking-wider">
                {item.subtitle}
              </p>
              <p className="font-space text-xs sm:text-sm text-zinc-400 mt-3 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-space text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" />
              <span>Verified Historic Archive</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
