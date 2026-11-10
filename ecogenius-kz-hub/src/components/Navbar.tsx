import React, { useState } from 'react';
import { SectionId } from '../types';
import { Menu, X, Leaf, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenDisclaimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenDisclaimer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Басты бет' },
    { id: 'ecoclean', label: 'Eco Clean' },
    { id: 'ecobio', label: 'Eco Bio' },
    { id: 'ecocompost', label: 'Eco Compost' },
    { id: 'ecofertilizer', label: 'Тыңайтқыш' },
    { id: 'ecofood', label: 'Eco Food' },
    { id: 'ecolab', label: 'Eco Lab' },
    { id: 'ecoquiz', label: 'Викторина' },
    { id: 'explorer', label: 'Қалдық гиді' },
    { id: 'calculator', label: 'Калькулятор' }
  ];

  const handleNavClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 transition-all shadow-[0_2px_12px_rgba(16,185,129,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones with gap-8 */}
        <div className="flex items-center justify-between gap-6 h-18">
          
          {/* Zone 1: Single Brand Wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Leaf className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block">
                ECOGENIUS KZ
              </span>
              <span className="text-[11px] font-medium text-emerald-700 block -mt-1 tracking-wide">
                Қалдықтан — құндылыққа
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('ecolab')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-200" />
              <span>Зертхана күнделігі</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Мәзірді ашу"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-3 px-2 space-y-1 bg-white/95 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('ecolab')}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg shadow-xs"
              >
                Зертхана күнделігін ашу
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDisclaimer();
                }}
                className="w-full text-center px-4 py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100"
              >
                Ғылыми тексеру туралы ескертпе
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
