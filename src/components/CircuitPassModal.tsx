import React, { useState } from 'react';
import { X, Check, Calendar, Trophy, User, Mail, MapPin } from 'lucide-react';

interface CircuitPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'circuit-pass' | 'concierge';
}

export const CircuitPassModal: React.FC<CircuitPassModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [venue, setVenue] = useState('Nürburgring Nordschleife');
  const [experience, setExperience] = useState('Intermediate Circuit Track Days (10-25 days)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-8 shadow-2xl text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex flex-col gap-1 pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e28] border border-white/10 w-fit">
                <Trophy size={14} className="text-[#ff6b00]" />
                <span className="font-space text-[10px] font-bold uppercase text-[#ff6b00] tracking-wider">
                  {mode === 'circuit-pass' ? 'VIP EVALUATION PASS' : 'DRIVER CONCIERGE DESK'}
                </span>
              </div>
              <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-white mt-1">
                {mode === 'circuit-pass'
                  ? 'REQUEST CIRCUIT EVALUATION'
                  : 'DIRECT CONCIERGE LIAISON'}
              </h2>
              <p className="font-space text-xs sm:text-sm text-zinc-400 font-light">
                {mode === 'circuit-pass'
                  ? 'Book a private telemetry debrief and prototype driving stint with an official Apex factory test driver.'
                  : 'Connect with a personal client advisor regarding bespoke paint-to-sample, factory pickup, and racing club entry.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Driver Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Naveen Duke"
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="driver@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Target Circuit Destination
                </label>
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00]"
                >
                  <option value="Nürburgring Nordschleife">Nürburgring Nordschleife (Germany)</option>
                  <option value="Suzuka International Circuit">Suzuka International Circuit (Japan)</option>
                  <option value="Laguna Seca">Laguna Seca Raceway (California, USA)</option>
                  <option value="Silverstone GP">Silverstone GP Circuit (UK)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Track Driving Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00]"
                >
                  <option value="Advanced / Competition Racing License">Advanced / Competition Racing License (FIA / SCCA / IMSA)</option>
                  <option value="Intermediate Circuit Track Days (10-25 days)">Intermediate Circuit Track Days (10-25 days)</option>
                  <option value="Novice Enthusiast / High Performance Driver Education">Novice Enthusiast / High Performance Driver Education</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-space font-semibold uppercase text-zinc-400 mb-1.5">
                  Specific Requests or Questions
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Requesting seat molding session, passenger hot lap with chief engineer..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181822] text-white text-sm font-space border border-white/15 focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] text-black font-anton text-base uppercase tracking-wider shadow-[0_0_20px_rgba(255,107,0,0.6)] hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
                >
                  Submit VIP Pass Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#ffaa00]/20 flex items-center justify-center text-[#ffaa00] mb-4 shadow-[0_0_24px_rgba(255,170,0,0.5)]">
              <Check size={32} />
            </div>
            <h3 className="font-anton text-3xl text-white uppercase tracking-tight">
              VIP REQUEST RECORDED
            </h3>
            <p className="font-space text-sm text-zinc-300 max-w-sm mt-2 font-light">
              Thank you, <strong>{name}</strong>. Your request for <strong>{venue}</strong> evaluation has been dispatched to the Apex Chief Instructor.
            </p>
            <p className="text-xs font-space text-[#ffaa00] mt-3">
              Expect a briefing dossier and slot confirmation within 1 business day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-full bg-[#ff6b00] text-black font-anton text-xs uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
