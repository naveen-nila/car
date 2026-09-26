import React, { useState } from 'react';
import { Wind, Disc, CircleDot, ShieldCheck, Eye } from 'lucide-react';

export const AerodynamicsSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>('splitter');
  const [showWindTunnel, setShowWindTunnel] = useState<boolean>(false);

  const hotspots = [
    {
      id: 'splitter',
      x: '38%',
      y: '78%',
      title: 'Active Carbon Splitter',
      desc: 'Dynamic carbon fiber front splitter channels airflow beneath the flat undertray while feeding dual brake cooling ducts.',
    },
    {
      id: 'headlight',
      x: '75%',
      y: '48%',
      title: 'Jeweled Matrix Headlamps',
      desc: 'Integrated micro-intakes surrounding the LED cluster channel high-pressure air through wheel wells to reduce front lift.',
    },
    {
      id: 'canards',
      x: '22%',
      y: '60%',
      title: 'Twin Dive Planes',
      desc: 'Creates localized high-pressure vortex over the front axle, generating 65 kg of front-end bite in high-speed sweeps.',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Visual Spec Car Cutout / Aerodynamics Detail with Hotspots */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPtjParMg8RXO23MC7DwJuiAq2MvvKKnc4nMC2c_AvOUhTOAs1qxDecv0Y3-FonJMUYCErG1Rxw9iSFkXNmW0bwhqzkfFYia4duVRIp-kxF2xOZOX2Gd3gZhtpfjuSBxWFXd5-lNTqfwswM9Zr_D_6sRq9IwWRmGJUXPzdVmcmJzebow-6ghfGT5XQPkRsFH8iO3BO2ujl2YLOW8mjs2XIuyfXjnbmxvb2MGg-Y2dKCtBhvrcyf-ulwA"
              alt="Close-up technical shot of automotive carbon fiber front splitter, air canards, and glowing LED headlight housing on Apex MK-IV"
              className="w-full h-[480px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent opacity-80" />

            {/* Wind Tunnel CFD Flow Simulation Overlay */}
            {showWindTunnel && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-500/10 via-[#ff6b00]/15 to-transparent flex flex-col justify-around p-4 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ffaa00] to-transparent animate-pulse"
                    style={{
                      animationDuration: `${1.2 + i * 0.3}s`,
                      transform: `translateY(${i * 8}px) skewX(-20deg)`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Interactive Hotspots */}
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveHotspot(spot.id)}
                style={{ left: spot.x, top: spot.y }}
                className={`absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all ${
                  activeHotspot === spot.id
                    ? 'bg-[#ff6b00] text-black scale-125 shadow-[0_0_16px_#ff6b00]'
                    : 'bg-black/70 border border-white/40 text-white hover:scale-110'
                }`}
                title={spot.title}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </button>
            ))}

            {/* Hotspot Floating Detail Tag */}
            {activeHotspot && (
              <div className="absolute top-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs font-space">
                <span className="text-[#ff6b00] font-bold uppercase tracking-wider block">
                  {hotspots.find((h) => h.id === activeHotspot)?.title}
                </span>
                <span className="text-zinc-300 mt-1 block">
                  {hotspots.find((h) => h.id === activeHotspot)?.desc}
                </span>
              </div>
            )}

            {/* CFD Wind Tunnel Toggle Button */}
            <button
              type="button"
              onClick={() => setShowWindTunnel(!showWindTunnel)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-[10px] uppercase font-space font-bold tracking-wider text-white border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye size={12} className={showWindTunnel ? 'text-[#ff6b00]' : 'text-zinc-400'} />
              <span>{showWindTunnel ? 'CFD Flow Active' : 'Simulate CFD Flow'}</span>
            </button>

            {/* Downforce Telemetry Tag (from reference image) */}
            <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-[#0e0e11]/90 backdrop-blur-md border border-white/10 shadow-2xl">
              <span className="font-space text-[10px] text-[#ff6b00] uppercase tracking-wider font-bold">
                AERODYNAMIC LOAD
              </span>
              <p className="font-anton text-2xl text-white mt-0.5">
                380 KG <span className="font-space text-xs text-zinc-400 font-normal">@ 150 MPH</span>
              </p>
            </div>
          </div>
        </div>

        {/* Technical Breakdown Specs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-space text-xs font-bold uppercase text-[#ff6b00] tracking-widest">
              // AEROSPACE COMPOSITES
            </span>
            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-tight mt-1 leading-tight">
              SURGICAL AERODYNAMICS &amp; RIGIDITY
            </h2>
            <p className="font-space text-sm sm:text-base text-zinc-400 mt-3 font-light leading-relaxed">
              Every curve and duct directly manages boundary-layer turbulence. The active carbon wing adjusts its angle of attack dynamically across 4 circuit states to balance maximum drag reduction and braking downforce.
            </p>
          </div>

          {/* 3 Specific Technical Feature Blocks */}
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 flex items-start gap-4 hover:border-[#ff6b00]/50 hover:bg-[#191922] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#ff6b00]/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Wind size={24} className="text-[#ff6b00]" />
              </div>
              <div>
                <h3 className="font-space text-base font-bold text-white uppercase tracking-wide">
                  Active Ground-Effect Venturi Tunnels
                </h3>
                <p className="font-space text-xs sm:text-sm text-zinc-400 mt-1 font-light leading-relaxed">
                  Full flat underfloor with carbon rear diffuser extracting high-velocity air for supreme stability through high-G apexes.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 flex items-start gap-4 hover:border-[#ffaa00]/50 hover:bg-[#191922] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#ffaa00]/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Disc size={24} className="text-[#ffaa00]" />
              </div>
              <div>
                <h3 className="font-space text-base font-bold text-white uppercase tracking-wide">
                  Carbon-Ceramic Matrix Braking
                </h3>
                <p className="font-space text-xs sm:text-sm text-zinc-400 mt-1 font-light leading-relaxed">
                  390mm cross-drilled rotors clamped by Brembo 6-piston monoblock calipers ensuring zero fade across consecutive 25-lap stints.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 flex items-start gap-4 hover:border-white/40 hover:bg-[#191922] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#ffb693]/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CircleDot size={24} className="text-[#ffb693]" />
              </div>
              <div>
                <h3 className="font-space text-base font-bold text-white uppercase tracking-wide">
                  Forged Monoblock Mag-Alloy Wheels
                </h3>
                <p className="font-space text-xs sm:text-sm text-zinc-400 mt-1 font-light leading-relaxed">
                  Ultra-low rotational unsprung mass. Staggered 19" front / 20" rear wrapped in bespoke Michelin Pilot Sport Cup 2R tires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
