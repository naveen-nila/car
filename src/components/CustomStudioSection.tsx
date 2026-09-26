import React, { useState } from 'react';
import { CheckCircle2, Palette, Sparkles, Sliders, Layers } from 'lucide-react';
import { COLOR_OPTIONS, ColorOption } from '../data/carData';

interface CustomStudioSectionProps {
  onOpenConfigurator: () => void;
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export const CustomStudioSection: React.FC<CustomStudioSectionProps> = ({
  onOpenConfigurator,
  selectedColor,
  onSelectColor,
}) => {
  const [activeTab, setActiveTab] = useState<'cockpit' | 'exterior'>('cockpit');

  return (
    <section id="custom-studio" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <div className="rounded-3xl bg-[#121217] border border-white/10 p-8 lg:p-14 relative overflow-hidden shadow-2xl">
        {/* Background Ambient Glow */}
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-[#ff6b00]/15 filter blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Story / Customization Controls (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1b22] border border-white/10 w-fit">
              <CheckCircle2 size={15} className="text-[#ff6b00]" />
              <span className="font-space text-[11px] font-bold uppercase text-white tracking-wider">
                LIMITED PRODUCTION RUN // 300 UNITS
              </span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
              CUSTOM STUDIO: TAILORED RACING SPEC
            </h2>

            <p className="font-space text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Each MK-IV is individually numbered with a solid titanium chassis plate and finished according to client telemetry requirements. Select your homologation livery inspired by 90s JGTC touring legends.
            </p>

            {/* Swatch Selection Interactive */}
            <div className="pt-2">
              <label className="font-space text-xs uppercase text-zinc-400 font-bold tracking-wider block mb-3.5">
                SELECT EXTERIOR LIVERY COAT
              </label>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => onSelectColor(color)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#22222c] border-2 border-[#ff6b00] shadow-[0_0_20px_rgba(255,107,0,0.55)] scale-102'
                          : 'bg-[#181820] border border-white/10 hover:border-white/30 text-zinc-400'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full ${
                          isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={`font-space text-xs font-semibold uppercase ${
                        isSelected ? 'text-white' : 'text-zinc-300'
                      }`}>
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Spec dynamic readout */}
              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5 text-xs font-space text-[#ffaa00]">
                <Palette size={16} className="text-[#ff6b00] shrink-0" />
                <span>
                  <strong>Active Spec:</strong> {selectedColor.name} ({selectedColor.subname}) — {selectedColor.finish}
                </span>
              </div>
            </div>

            {/* Custom Spec Quick Specs Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#181820] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase font-space font-bold block">CHASSIS PLATE</span>
                <span className="font-anton text-lg text-white">#012 / 300</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181820] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase font-space font-bold block">CURB WEIGHT</span>
                <span className="font-anton text-lg text-[#ff6b00]">1,340 KG</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181820] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase font-space font-bold block">POWER/WEIGHT</span>
                <span className="font-anton text-lg text-[#ffaa00]">376 BHP/TON</span>
              </div>
            </div>
          </div>

          {/* Studio Teaser Box / Badge Action (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 rounded-2xl bg-[#171720] border border-white/10 shadow-xl">
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('cockpit')}
                  className={`px-3 py-1 rounded-full text-[11px] font-space uppercase tracking-wider font-semibold ${
                    activeTab === 'cockpit' ? 'bg-[#ff6b00] text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Cockpit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('exterior')}
                  className={`px-3 py-1 rounded-full text-[11px] font-space uppercase tracking-wider font-semibold ${
                    activeTab === 'exterior' ? 'bg-[#ff6b00] text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Exterior Spec
                </button>
              </div>

              <span className="text-[10px] font-space uppercase text-zinc-400">STUDIO PREVIEW</span>
            </div>

            <div className="relative w-full h-56 rounded-xl overflow-hidden group">
              <img
                src={
                  activeTab === 'cockpit'
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKvXyvhFhS69bfwDICO4aJd3pBQneLPi_p8zkqSCSKmr8u88TXFWwYFRM0_JhYGDedZ1fGcvL4k4SMWsqnBPkZlGruc079MfRhHAMvl5rqmWGUs_J_0Q3_-nBoU7VXv2I4Ug4Nd2RaR6SQMf248auoI50m_xOf7-9rsaWo4Z4QnN92v0vQ-YkiAHGjPxe-BE0MN1LOJ8mJngONCCDhPMUjiHTtEhBgbYlCWlqIKrKFpsQZEcddiEsNzA'
                    : selectedColor.image
                }
                alt="Apex MK-IV Interior Cockpit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                <span className="font-space text-[11px] font-bold text-white tracking-widest uppercase">
                  {activeTab === 'cockpit'
                    ? 'COCKPIT OPTION // TRACK RECARO SPEC'
                    : `EXTERIOR // ${selectedColor.name.toUpperCase()}`}
                </span>
              </div>
            </div>

            {/* Production Allocation Bar (from reference image) */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-space">
                <span className="text-zinc-400">Production Allocation</span>
                <span className="text-[#ff6b00] font-bold">18 of 300 Remaining</span>
              </div>
              <div className="w-full bg-[#252530] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] h-full w-[94%] rounded-full shadow-[0_0_8px_#ff6b00]"
                />
              </div>
            </div>

            {/* Launch Configurator Button */}
            <button
              type="button"
              onClick={onOpenConfigurator}
              className="w-full py-4 rounded-full bg-[#ff6b00] hover:bg-[#ffaa00] text-black font-anton text-base uppercase tracking-wider text-center transition-all shadow-[0_0_24px_rgba(255,107,0,0.5)] hover:shadow-[0_0_36px_rgba(255,170,0,0.8)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sliders size={18} />
              <span>Launch 3D Configurator</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
