/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SectionId, LabExperiment, ObservationLog } from './types';
import { DEFAULT_EXPERIMENTS } from './data/defaultExperiments';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EcoCleanSection } from './components/EcoCleanSection';
import { EcoBioSection } from './components/EcoBioSection';
import { EcoCompostSection } from './components/EcoCompostSection';
import { EcoFertilizerSection } from './components/EcoFertilizerSection';
import { EcoFoodSection } from './components/EcoFoodSection';
import { EcoLabSection } from './components/EcoLabSection';
import { EcoQuizSection } from './components/EcoQuizSection';
import { WasteExplorerSection } from './components/WasteExplorerSection';
import { ImpactCalculator } from './components/ImpactCalculator';
import { ScientificDisclaimerModal } from './components/ScientificDisclaimerModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'ecogenius_kz_experiments_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  // Load experiments from localStorage or defaults
  const [experiments, setExperiments] = useState<LabExperiment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return DEFAULT_EXPERIMENTS;
  });

  // Save experiments to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [experiments]);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddExperiment = (newExpData: Omit<LabExperiment, 'id' | 'logs'>) => {
    const newExp: LabExperiment = {
      ...newExpData,
      id: `exp-${Date.now()}`,
      logs: []
    };
    setExperiments((prev) => [newExp, ...prev]);
  };

  const handleQuickAddExperiment = (data: {
    title: string;
    category: LabExperiment['category'];
    categoryLabelKz: string;
    wasteUsed: string;
    hypothesis: string;
  }) => {
    const newExp: LabExperiment = {
      id: `exp-${Date.now()}`,
      title: data.title,
      category: data.category,
      categoryLabelKz: data.categoryLabelKz,
      wasteUsed: data.wasteUsed,
      startDate: new Date().toISOString().split('T')[0],
      durationDays: 14,
      status: 'active',
      hypothesis: data.hypothesis,
      safetyConfirmed: true,
      logs: [
        {
          id: `log-${Date.now()}`,
          dayNumber: 1,
          date: new Date().toISOString().split('T')[0],
          notes: 'Тәжірибе дайындалып, бақылауға қойылды.',
          color: 'Бастапқы күй',
          odor: 'Бастапқы күй'
        }
      ]
    };
    setExperiments((prev) => [newExp, ...prev]);
  };

  const handleAddLog = (experimentId: string, logData: Omit<ObservationLog, 'id'>) => {
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id === experimentId) {
          const newLog: ObservationLog = {
            ...logData,
            id: `log-${Date.now()}`
          };
          return {
            ...exp,
            logs: [...exp.logs, newLog]
          };
        }
        return exp;
      })
    );
  };

  const handleCompleteExperiment = (experimentId: string, conclusion: string) => {
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id === experimentId) {
          return {
            ...exp,
            status: 'completed',
            conclusion
          };
        }
        return exp;
      })
    );
  };

  const handleDeleteExperiment = (experimentId: string) => {
    if (confirm('Бұл тәжірибені күнделіктен өшіруді қалайсыз ба?')) {
      setExperiments((prev) => prev.filter((exp) => exp.id !== experimentId));
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Бастапқы үлгілік тәжірибелерді қайта жүктейсіз бе?')) {
      setExperiments(DEFAULT_EXPERIMENTS);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800">
      {/* Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        {activeSection === 'home' && (
          <HeroSection
            onNavigate={handleNavigate}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          />
        )}

        {activeSection === 'ecoclean' && (
          <EcoCleanSection
            onAddExperimentToLab={handleQuickAddExperiment}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'ecobio' && (
          <EcoBioSection
            onAddExperimentToLab={handleQuickAddExperiment}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'ecocompost' && (
          <EcoCompostSection
            onAddExperimentToLab={handleQuickAddExperiment}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'ecofertilizer' && (
          <EcoFertilizerSection
            onAddExperimentToLab={handleQuickAddExperiment}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'ecofood' && (
          <EcoFoodSection
            onAddExperimentToLab={handleQuickAddExperiment}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'ecolab' && (
          <EcoLabSection
            experiments={experiments}
            onAddExperiment={handleAddExperiment}
            onAddLog={handleAddLog}
            onCompleteExperiment={handleCompleteExperiment}
            onDeleteExperiment={handleDeleteExperiment}
            onResetDefaults={handleResetDefaults}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          />
        )}

        {activeSection === 'ecoquiz' && (
          <EcoQuizSection />
        )}

        {activeSection === 'explorer' && (
          <WasteExplorerSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'calculator' && (
          <ImpactCalculator />
        )}
      </main>

      {/* Scientific Disclaimer & Safety Modal */}
      <ScientificDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      {/* Clean Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />
    </div>
  );
}
