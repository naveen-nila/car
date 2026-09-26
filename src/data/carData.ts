export interface DriveMode {
  id: string;
  name: string;
  boostBar: number;
  boostOffset: number;
  powerHp: number;
  torqueLbFt: number;
  revLimit: number;
  shiftLatencyMs: number;
  exhaustNote: string;
  activeAeroAngle: string;
  tractionControl: string;
  description: string;
}

export const DRIVE_MODES: Record<string, DriveMode> = {
  street: {
    id: 'street',
    name: 'Street',
    boostBar: 1.2,
    boostOffset: 160,
    powerHp: 410,
    torqueLbFt: 400,
    revLimit: 7200,
    shiftLatencyMs: 140,
    exhaustNote: 'Valved Quiet (Bypass Closed)',
    activeAeroAngle: '12° Low Drag',
    tractionControl: 'Full Stability Control',
    description: 'Compliant damper valving, linear electronic throttle mapping, and quiet cruising exhaust note.',
  },
  sport: {
    id: 'sport',
    name: 'Sport Plus',
    boostBar: 1.8,
    boostOffset: 105,
    powerHp: 465,
    torqueLbFt: 450,
    revLimit: 7800,
    shiftLatencyMs: 110,
    exhaustNote: 'Aggressive Pops & Bangs',
    activeAeroAngle: '24° Balanced',
    tractionControl: 'Dynamic Slip Mode',
    description: 'Sharpened steering ratio, heightened wastegate preload, and stiffer magnetorheological damping.',
  },
  track: {
    id: 'track',
    name: 'Track Mode',
    boostBar: 2.4,
    boostOffset: 65,
    powerHp: 505,
    torqueLbFt: 490,
    revLimit: 8200,
    shiftLatencyMs: 90,
    exhaustNote: 'Unrestricted Screamer Pipe',
    activeAeroAngle: '38° Maximum Apex Downforce',
    tractionControl: 'Motorsport 9-Stage Slip',
    description: 'Full 2.4 bar overboost with anti-lag calibration, 380 kg downforce at 150 mph, and instantaneous paddle response.',
  },
  drift: {
    id: 'drift',
    name: 'Drift Protocol',
    boostBar: 2.1,
    boostOffset: 85,
    powerHp: 485,
    torqueLbFt: 510,
    revLimit: 8000,
    shiftLatencyMs: 100,
    exhaustNote: 'High RPM Flamethrower',
    activeAeroAngle: '18° Yaw Optimized',
    tractionControl: 'Rear e-LSD 100% Lock',
    description: 'Optimized torque curve at 3,500 RPM for instant breakaway, wide steering lock angle, and electronic hydraulic handbrake.',
  },
};

export interface ColorOption {
  id: string;
  name: string;
  subname: string;
  hex: string;
  finish: string;
  image: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'sunset-ember',
    name: 'Sunset Ember',
    subname: 'Heritage Metallic Orange',
    hex: '#ff6b00',
    finish: 'Multi-stage metallic pearl with amber flake and ceramic clearcoat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCApQR51T8oWao4kMkjifBz78Ci63zh7DVJkeaTiALZymqZX-FaVzLtvxGwORV0bvzfapq9eZ8IiBrLoz8aC4oC3sejbMduKlNIEfi4oKxc1INzT4I0oenMcs8JPsVGZPM6NspuHMLnnNwE0uCVwtsmdTjn0K1mPgZw_XQvz3P4PY1au94hLSUVLz6uYXIi-sv0Zt-HC6hfkmxqA0O21iABKnEG-Rk1jrkKQC2uddAn_EBLUNfMKduQ9DrvwszRjXK0j7A',
  },
  {
    id: 'midnight-onyx',
    name: 'Midnight Onyx',
    subname: 'Deep Asphalt Metallic',
    hex: '#141418',
    finish: 'Triple-layer deep metallic black with exposed glossy forged carbon weave',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPtjParMg8RXO23MC7DwJuiAq2MvvKKnc4nMC2c_AvOUhTOAs1qxDecv0Y3-FonJMUYCErG1Rxw9iSFkXNmW0bwhqzkfFYia4duVRIp-kxF2xOZOX2Gd3gZhtpfjuSBxWFXd5-lNTqfwswM9Zr_D_6sRq9IwWRmGJUXPzdVmcmJzebow-6ghfGT5XQPkRsFH8iO3BO2ujl2YLOW8mjs2XIuyfXjnbmxvb2MGg-Y2dKCtBhvrcyf-ulwA',
  },
  {
    id: 'suzuka-pearl',
    name: 'Suzuka Pearl',
    subname: 'Championship Pure White',
    hex: '#eae7e3',
    finish: 'Historic Japanese circuit championship pearl white with subtle blue undertones',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCApQR51T8oWao4kMkjifBz78Ci63zh7DVJkeaTiALZymqZX-FaVzLtvxGwORV0bvzfapq9eZ8IiBrLoz8aC4oC3sejbMduKlNIEfi4oKxc1INzT4I0oenMcs8JPsVGZPM6NspuHMLnnNwE0uCVwtsmdTjn0K1mPgZw_XQvz3P4PY1au94hLSUVLz6uYXIi-sv0Zt-HC6hfkmxqA0O21iABKnEG-Rk1jrkKQC2uddAn_EBLUNfMKduQ9DrvwszRjXK0j7A',
  },
  {
    id: 'tarmac-slate',
    name: 'Tarmac Slate',
    subname: 'Gunmetal Titanium Matte',
    hex: '#47474f',
    finish: 'Satin matte titanium grey inspired by aircraft radar-absorbent coatings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCApQR51T8oWao4kMkjifBz78Ci63zh7DVJkeaTiALZymqZX-FaVzLtvxGwORV0bvzfapq9eZ8IiBrLoz8aC4oC3sejbMduKlNIEfi4oKxc1INzT4I0oenMcs8JPsVGZPM6NspuHMLnnNwE0uCVwtsmdTjn0K1mPgZw_XQvz3P4PY1au94hLSUVLz6uYXIi-sv0Zt-HC6hfkmxqA0O21iABKnEG-Rk1jrkKQC2uddAn_EBLUNfMKduQ9DrvwszRjXK0j7A',
  },
];

export const WHEEL_OPTIONS = [
  { id: 'mag-forged', name: 'Forged Mag-Alloy 19"/20"', weight: '7.8 kg / corner', finish: 'Satin Bronze / Black' },
  { id: 'carbon-aero', name: 'Full Carbon Aero Turbofan', weight: '6.9 kg / corner', finish: 'Gloss 3K Carbon' },
  { id: 'heritage-5spoke', name: 'GT Heritage 5-Spoke', weight: '8.2 kg / corner', finish: 'Brushed Silver Center' },
];

export const AERO_PACKS = [
  { id: 'track-active', name: 'Active Aero Carbon Wing', downforce: '+380 KG @ 150 MPH', price: 'Included in MK-IV Spec' },
  { id: 'clubsport-ducktail', name: 'Clubsport Carbon Ducktail', downforce: '+210 KG @ 150 MPH', price: 'Option No-Cost' },
  { id: 'time-attack-swan', name: 'Time-Attack Swan Neck GT Wing', downforce: '+495 KG @ 150 MPH', price: '+ $14,500' },
];

export const COCKPIT_OPTIONS = [
  { id: 'recaro-orange', name: 'Track Recaro Spec (Sunset Orange Stitching)', seats: 'Carbon Shell Bucket', harness: '6-Point Schroth Racing' },
  { id: 'alcantara-stealth', name: 'Midnight Alcantara & Matte Carbon', seats: 'Touring Comfort Adaptive', harness: 'Standard 3-Point + Isofix' },
  { id: 'clubsport-cage', name: 'Clubsport FIA Titanium Half-Cage', seats: 'Nomex Fireproof Shells', harness: 'Full Harness System' },
];

export const TELEMETRY_LAP_DATA = {
  track: 'Nürburgring Nordschleife (Bridge-to-Gantry)',
  lapTime: '1:24.08 (GP Short Circuit) / 6:58.2 (Full Nordschleife)',
  topSpeedApex: '298 km/h (185 mph) on Döttinger Höhe',
  lateralG: '1.68 G Peak Lateral in Karussell',
  brakingG: '1.92 G Peak Longitudinal into Schwedenkreuz',
  sectors: [
    { sector: 'Sector 1 (Hatzenbach & Flugplatz)', time: '23.41s', delta: '-0.38s', apexSpeed: '214 km/h' },
    { sector: 'Sector 2 (Adenauer Forst & Wehrseifen)', time: '31.18s', delta: '-0.62s', apexSpeed: '168 km/h' },
    { sector: 'Sector 3 (Bergwerk & Karussell)', time: '41.22s', delta: '-0.45s', apexSpeed: '128 km/h' },
    { sector: 'Sector 4 (Pflanzgarten & Döttinger)', time: '34.80s', delta: '-0.81s', apexSpeed: '298 km/h' },
  ],
};
