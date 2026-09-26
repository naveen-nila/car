import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DynoCircuitBench } from './components/DynoCircuitBench';
import { AerodynamicsSection } from './components/AerodynamicsSection';
import { CustomStudioSection } from './components/CustomStudioSection';
import { HeritageSection } from './components/HeritageSection';
import { TestDriveSection } from './components/TestDriveSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { LapTelemetryModal } from './components/LapTelemetryModal';
import { ConfiguratorModal } from './components/ConfiguratorModal';
import { CircuitPassModal } from './components/CircuitPassModal';
import { COLOR_OPTIONS, ColorOption } from './data/carData';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [circuitPassState, setCircuitPassState] = useState<{
    open: boolean;
    mode: 'circuit-pass' | 'concierge';
  }>({ open: false, mode: 'circuit-pass' });
  const [currentSection, setCurrentSection] = useState('showcase');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['showcase', 'engineering', 'custom-studio', 'heritage', 'test-drive'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#f2eff0] font-space flex flex-col relative selection:bg-[#ff6b00] selection:text-black">
      {/* Navigation Header */}
      <Header
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        currentSection={currentSection}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        {/* Hero Section with authentic vertical racing stripes & telemetry */}
        <HeroSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
          onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        />

        {/* Live Dyno & Circuit Bench Matrix */}
        <DynoCircuitBench />

        {/* Surgical Aerodynamics & Aerospace Composites Section */}
        <AerodynamicsSection />

        {/* Custom Studio & Tailored Racing Homologation Spec */}
        <CustomStudioSection
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        />

        {/* Heritage Timeline Section */}
        <HeritageSection />

        {/* VIP Driver Concierge & Test Drive Pass */}
        <TestDriveSection
          onOpenBooking={() => setCircuitPassState({ open: true, mode: 'circuit-pass' })}
          onOpenConcierge={() => setCircuitPassState({ open: true, mode: 'concierge' })}
        />
      </main>

      {/* Full Footer with Newsletter & Performance Links */}
      <Footer />

      {/* Interactive Modals */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        selectedColor={selectedColor}
      />

      <LapTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

      <ConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        onReserveFromConfig={() => {
          setIsConfiguratorOpen(false);
          setIsReservationOpen(true);
        }}
      />

      <CircuitPassModal
        isOpen={circuitPassState.open}
        onClose={() => setCircuitPassState((prev) => ({ ...prev, open: false }))}
        mode={circuitPassState.mode}
      />
    </div>
  );
}
