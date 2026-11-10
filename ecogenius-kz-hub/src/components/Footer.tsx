import React from 'react';
import { SectionId } from '../types';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDisclaimer
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-left pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                ECOGENIUS KZ HUB
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              «Қалдықтан — құндылыққа!» — мектеп оқушылары мен отбасыларға асүй қалдықтарын қайта өңдеуді үйрететін интерактивті танымдық платформа.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Бөлімдер
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('ecoclean')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Clean — Цитрус тазартқышы
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ecobio')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Bio — Картоп биопластигі
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ecocompost')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Compost — Компост симуляторы
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ecofertilizer')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Fertilizer — Өсімдік дәрігері
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ecofood')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Food — Көкөніс дәмдеуіші
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Интерактивті құралдар
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('ecolab')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Lab — Зертхана күнделігі
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ecoquiz')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eco Quiz — Викторина
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explorer')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Waste Explorer — Қалдық анықтамалығы
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Калькулятор — Экологиялық әсер
                </button>
              </li>
            </ul>
          </div>

          {/* Zero Waste 5R principles */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Zero-Waste қағидалары
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              1. <strong>Бас тарт</strong> (Refuse) — артық пластиктен.<br />
              2. <strong>Азайт</strong> (Reduce) — тұтынуды оңтайландыр.<br />
              3. <strong>Қайта пайдалан</strong> (Reuse) — құндылық жаса.<br />
              4. <strong>Компостта</strong> (Rot) — топыраққа қайтар!
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenDisclaimer}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ғылыми бақылау ережелері</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 ECOGENIUS KZ HUB. Барлық құқықтар қорғалған.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Табиғатты аялап, болашақты бірге сақтайық</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
