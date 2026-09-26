import React, { useState } from 'react';
import { X, Check, Sliders, Shield, Zap, Sparkles, Download } from 'lucide-react';
import {
  COLOR_OPTIONS,
  ColorOption,
  WHEEL_OPTIONS,
  AERO_PACKS,
  COCKPIT_OPTIONS,
} from '../data/carData';

interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: ColorOption;
  onSelectColor: (c: ColorOption) => void;
  onReserveFromConfig: () => void;
}

export const ConfiguratorModal: React.FC<ConfiguratorModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  onSelectColor,
  onReserveFromConfig,
}) => {
  const [selectedWheel, setSelectedWheel] = useState(WHEEL_OPTIONS[0]);
  const [selectedAero, setSelectedAero] = useState(AERO_PACKS[0]);
  const [selectedCockpit, setSelectedCockpit] = useState(COCKPIT_OPTIONS[0]);
  const [activeView, setActiveView] = useState<'front' | 'side' | 'interior'>('front');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Real-time calculated specs
  const calculatedWeight =
    selectedWheel.id === 'carbon-aero'
      ? 1332
      : selectedWheel.id === 'mag-forged'
      ? 1340
      : 1348;

  const calculatedDownforce =
    selectedAero.id === 'time-attack-swan'
      ? '495 KG'
      : selectedAero.id === 'track-active'
      ? '380 KG'
      : '210 KG';

  const handleDownloadSpec = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#0f0f14] border border-white/15 p-6 lg:p-10 shadow-2xl text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col gap-1 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00] animate-pulse" />
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              HOMOLOGATION CUSTOM LAB // 3D VISUALIZER
            </span>
          </div>
          <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-tight text-white">
            SPECIFY YOUR APEX MK-IV
          </h2>
          <p className="font-space text-xs sm:text-sm text-zinc-400">
            Tailor exterior livery, aerodynamic composites, lightweight forged wheels, and race cockpit.
          </p>
        </div>

        {/* Studio Visualizer & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Main Visualizer Stage (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* View Switcher */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveView('front')}
                className={`px-3.5 py-1.5 rounded-full font-space text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeView === 'front'
                    ? 'bg-[#ff6b00] text-black shadow-[0_0_12px_#ff6b00]'
                    : 'bg-[#181822] text-zinc-400 hover:text-white'
                }`}
              >
                Front Studio
              </button>
              <button
                type="button"
                onClick={() => setActiveView('side')}
                className={`px-3.5 py-1.5 rounded-full font-space text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeView === 'side'
                    ? 'bg-[#ff6b00] text-black shadow-[0_0_12px_#ff6b00]'
                    : 'bg-[#181822] text-zinc-400 hover:text-white'
                }`}
              >
                Aerodynamic Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveView('interior')}
                className={`px-3.5 py-1.5 rounded-full font-space text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeView === 'interior'
                    ? 'bg-[#ff6b00] text-black shadow-[0_0_12px_#ff6b00]'
                    : 'bg-[#181822] text-zinc-400 hover:text-white'
                }`}
              >
                Cockpit Recaro
              </button>
            </div>

            {/* Visualizer Image Canvas */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#07070a] border border-white/10 flex items-center justify-center group shadow-2xl">
              <img
                src={
                  activeView === 'interior'
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKvXyvhFhS69bfwDICO4aJd3pBQneLPi_p8zkqSCSKmr8u88TXFWwYFRM0_JhYGDedZ1fGcvL4k4SMWsqnBPkZlGruc079MfRhHAMvl5rqmWGUs_J_0Q3_-nBoU7VXv2I4Ug4Nd2RaR6SQMf248auoI50m_xOf7-9rsaWo4Z4QnN92v0vQ-YkiAHGjPxe-BE0MN1LOJ8mJngONCCDhPMUjiHTtEhBgbYlCWlqIKrKFpsQZEcddiEsNzA'
                    : activeView === 'side'
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPtjParMg8RXO23MC7DwJuiAq2MvvKKnc4nMC2c_AvOUhTOAs1qxDecv0Y3-FonJMUYCErG1Rxw9iSFkXNmW0bwhqzkfFYia4duVRIp-kxF2xOZOX2Gd3gZhtpfjuSBxWFXd5-lNTqfwswM9Zr_D_6sRq9IwWRmGJUXPzdVmcmJzebow-6ghfGT5XQPkRsFH8iO3BO2ujl2YLOW8mjs2XIuyfXjnbmxvb2MGg-Y2dKCtBhvrcyf-ulwA'
                    : selectedColor.image
                }
                alt="Apex MK-IV Configuration Visualizer"
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Ambient Studio Lighting Stripes Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5 justify-between">
                <div>
                  <span className="font-space text-xs font-bold text-[#ff6b00] uppercase tracking-wider block">
                    {selectedColor.name}
                  </span>
                  <span className="font-space text-[11px] text-zinc-300">
                    {selectedWheel.name} • {selectedAero.name}
                  </span>
                </div>
                <span className="font-anton text-xl text-white px-3 py-1 rounded bg-black/60 border border-white/10">
                  SLOT #012
                </span>
              </div>
            </div>

            {/* Live Real-time Calculated Specs Bar */}
            <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-[#14141a] border border-white/10">
              <div>
                <span className="text-[10px] font-space text-zinc-400 uppercase font-bold block">POWER</span>
                <span className="font-anton text-xl text-[#ff6b00]">505 BHP</span>
              </div>
              <div>
                <span className="text-[10px] font-space text-zinc-400 uppercase font-bold block">CURB MASS</span>
                <span className="font-anton text-xl text-white">{calculatedWeight} KG</span>
              </div>
              <div>
                <span className="text-[10px] font-space text-zinc-400 uppercase font-bold block">DOWNFORCE</span>
                <span className="font-anton text-xl text-[#ffaa00]">{calculatedDownforce}</span>
              </div>
              <div>
                <span className="text-[10px] font-space text-zinc-400 uppercase font-bold block">0-60 MPH</span>
                <span className="font-anton text-xl text-white">3.4 SEC</span>
              </div>
            </div>
          </div>

          {/* Configuration Selection Controls (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. Exterior Color Swatches */}
            <div>
              <label className="text-xs font-space font-bold uppercase text-zinc-400 block mb-2.5">
                1. Exterior Homologation Finish
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_OPTIONS.map((c) => {
                  const isSel = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onSelectColor(c)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                        isSel
                          ? 'bg-[#22222e] border-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.5)]'
                          : 'bg-[#15151c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 ring-1 ring-white"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="overflow-hidden">
                        <span className="font-space text-xs font-bold text-white block truncate">
                          {c.name}
                        </span>
                        <span className="font-space text-[10px] text-zinc-400 block truncate">
                          {c.subname}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Wheel Options */}
            <div>
              <label className="text-xs font-space font-bold uppercase text-zinc-400 block mb-2.5">
                2. Unsprung Mass // Wheel Design
              </label>
              <div className="space-y-2">
                {WHEEL_OPTIONS.map((wheel) => {
                  const isSel = selectedWheel.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      type="button"
                      onClick={() => setSelectedWheel(wheel)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                        isSel
                          ? 'bg-[#22222e] border-[#ffaa00] shadow-[0_0_12px_rgba(255,170,0,0.4)]'
                          : 'bg-[#15151c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-space text-xs font-bold text-white block">
                          {wheel.name}
                        </span>
                        <span className="font-space text-[10px] text-zinc-400">
                          {wheel.weight} • {wheel.finish}
                        </span>
                      </div>
                      {isSel && <Check size={16} className="text-[#ffaa00]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Aerodynamics Package */}
            <div>
              <label className="text-xs font-space font-bold uppercase text-zinc-400 block mb-2.5">
                3. Aerodynamics Composite Package
              </label>
              <div className="space-y-2">
                {AERO_PACKS.map((aero) => {
                  const isSel = selectedAero.id === aero.id;
                  return (
                    <button
                      key={aero.id}
                      type="button"
                      onClick={() => setSelectedAero(aero)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                        isSel
                          ? 'bg-[#22222e] border-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.4)]'
                          : 'bg-[#15151c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-space text-xs font-bold text-white block">
                          {aero.name}
                        </span>
                        <span className="font-space text-[10px] text-[#ffb693]">
                          {aero.downforce}
                        </span>
                      </div>
                      <span className="text-[10px] font-space text-zinc-400">{aero.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReserveFromConfig();
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] text-black font-anton text-base uppercase tracking-wider shadow-[0_0_24px_rgba(255,107,0,0.6)] hover:shadow-[0_0_36px_rgba(255,107,0,0.9)] hover:scale-[1.01] active:scale-98 transition-all cursor-pointer text-center"
              >
                Lock Build Spec &amp; Reserve Slot #012
              </button>

              <button
                type="button"
                onClick={handleDownloadSpec}
                className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-space text-xs uppercase tracking-wider font-semibold border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download size={14} />
                <span>{downloadSuccess ? 'Build Spec Dossier Saved!' : 'Save Build Dossier (PDF)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
