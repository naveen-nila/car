import React, { useState } from 'react';
import { X, Check, ShieldCheck, Bolt, Car, Award, Download } from 'lucide-react';
import { ColorOption } from '../data/carData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: ColorOption;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plateInscription, setPlateInscription] = useState('CHASSIS #012 // N. DUKE');
  const [deliveryCircuit, setDeliveryCircuit] = useState('Nürburgring Nordschleife Pitlane');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setConfirmed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {!confirmed ? (
          <div>
            {/* Header */}
            <div className="flex flex-col gap-1 pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e28] border border-white/10 w-fit">
                <Bolt size={14} className="text-[#ff6b00]" />
                <span className="font-space text-[10px] font-bold uppercase text-[#ff6b00] tracking-wider">
                  HOMOLOGATION BUILD SLOT ALLOCATION
                </span>
              </div>
              <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-white mt-1">
                RESERVE CHASSIS SLOT #012
              </h2>
              <p className="font-space text-xs sm:text-sm text-zinc-400 font-light">
                Limited series of 300 individually numbered chassis worldwide. 18 slots currently unassigned.
              </p>
            </div>

            {/* Spec summary badge */}
            <div className="my-5 p-4 rounded-2xl bg-[#16161f] border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div>
                  <span className="font-space text-xs font-bold text-white block">
                    {selectedColor.name} ({selectedColor.subname})
                  </span>
                  <span className="font-space text-[11px] text-zinc-400 block">
                    Twin-Turbo 3.0L • 505 BHP • Carbon Monocoque
                  </span>
                </div>
              </div>
              <span className="font-anton text-sm text-[#ffaa00] px-3 py-1 rounded bg-[#ffaa00]/10 shrink-0">
                SERIES NO. 012/300
              </span>
            </div>

            {/* Reservation Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Full Driver Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Naveen Duke"
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Direct Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="driver@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Custom Titanium Chassis Plate Inscription
                </label>
                <input
                  type="text"
                  value={plateInscription}
                  onChange={(e) => setPlateInscription(e.target.value)}
                  placeholder="e.g. CHASSIS #012 // N. DUKE"
                  maxLength={36}
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00] uppercase tracking-wider transition-colors"
                />
                <span className="text-[10px] text-zinc-500 font-space mt-1 block">
                  Engraved in solid aircraft-grade titanium on center tunnel console.
                </span>
              </div>

              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Preferred Handover Circuit
                </label>
                <select
                  value={deliveryCircuit}
                  onChange={(e) => setDeliveryCircuit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00] transition-colors"
                >
                  <option value="Nürburgring Nordschleife Pitlane">Nürburgring Nordschleife (Germany)</option>
                  <option value="Suzuka Circuit Paddock">Suzuka International Circuit (Japan)</option>
                  <option value="WeatherTech Raceway Laguna Seca">Laguna Seca Corkscrew (USA)</option>
                  <option value="Silverstone Circuit Wing">Silverstone Circuit (UK)</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] text-black font-anton text-base uppercase tracking-wider shadow-[0_0_24px_rgba(255,107,0,0.6)] hover:shadow-[0_0_36px_rgba(255,107,0,0.9)] hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
                >
                  Confirm Allocation &amp; Secure Slot #012
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 font-space text-center leading-normal">
                No immediate payment required. Factory liaison will contact you within 24 hours with your VIP credential token and custom homologation dossier.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation State with Digital Certificate */
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#ff6b00]/20 flex items-center justify-center text-[#ff6b00] mb-4 shadow-[0_0_24px_rgba(255,107,0,0.5)]">
              <Check size={32} />
            </div>

            <span className="font-space text-xs font-bold uppercase text-[#ffaa00] tracking-widest">
              HOMOLOGATION ALLOCATION SECURED
            </span>

            <h3 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
              WELCOME TO APEX RACING CLUB
            </h3>

            <p className="font-space text-sm text-zinc-300 max-w-md mt-2 font-light">
              Driver <strong>{name}</strong>, your build slot for Apex MK-IV chassis #012 has been reserved.
            </p>

            {/* Titanium Chassis Badge Preview */}
            <div className="w-full my-6 p-6 rounded-2xl bg-gradient-to-br from-[#252530] to-[#121216] border-2 border-zinc-500 text-left shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <span className="font-anton text-xl tracking-wider text-white">APEX MK-IV HOMOLOGATION</span>
                <span className="text-[10px] font-space text-[#ffaa00] font-bold">LIMITED SERIES // 012 OF 300</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-space">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">DRIVER RECIPIENT</span>
                  <span className="font-bold text-white uppercase">{name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">FINISH COAT</span>
                  <span className="font-bold text-[#ff6b00]">{selectedColor.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">CHASSIS ENGRAVING</span>
                  <span className="font-bold text-white tracking-widest">{plateInscription}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">DELIVERY VENUE</span>
                  <span className="font-bold text-zinc-300">{deliveryCircuit}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded-full bg-[#ff6b00] hover:bg-[#ffaa00] text-black font-anton text-sm uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(255,107,0,0.5)]"
            >
              Return to Performance Lab
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
