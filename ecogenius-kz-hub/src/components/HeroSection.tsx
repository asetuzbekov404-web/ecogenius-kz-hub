import React from 'react';
import { SectionId } from '../types';
import { Sparkles, ArrowRight, Beaker, Recycle, Sprout, ShieldAlert, Award, Calculator, Search } from 'lucide-react';
import heroImg from '../assets/images/hero_ecogenius_nature_1791737500662.jpg';

interface HeroSectionProps {
  onNavigate: (section: SectionId) => void;
  onOpenDisclaimer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenDisclaimer
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Split Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200/80 px-3 py-1 rounded-full">
              <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Қазақстанның экологиялық білім кеңістігі</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                ECOGENIUS KZ HUB
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-emerald-700 tracking-tight">
                «Қалдықтан — құндылыққа!»
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Оқушылар, отбасылар және мектеп қауымдастығына арналған интерактивті экожүйе. Асүйден шығатын органикалық қалдықтарды қоқыс жәшігіне емес, үй тазартқыштарына, биопластикке, құнарлы компост пен өсімдік тыңайтқыштарына айналдырудың ғылыми әрі практикалық жолдары.
            </p>

            {/* Zero-Waste Concept Highlight */}
            <div className="p-4 sm:p-5 bg-white border border-emerald-100 rounded-2xl shadow-xs space-y-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Recycle className="w-4 h-4 text-emerald-600" />
                «Zero-Waste» (Нөлдік қалдық) философиясы деген не?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Бұл — табиғаттағы барлық ресурстарды толық циклімен пайдалану, яғни қалдықтың соңғы нүктесі қоқыс полигоны емес, жаңа өнімнің бастапқы шикізаты болатын айналмалы (циркулярлы) экономика моделі.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('ecoclean')}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <span>Жобаларды зерттеу</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('explorer')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all flex items-center gap-2 shadow-xs"
              >
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Қалдық түрін таңдау</span>
              </button>

              <button
                onClick={onOpenDisclaimer}
                className="px-4 py-3 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Ғылыми бақылау ережесі</span>
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-100 shadow-md bg-emerald-50 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
              <img
                src={heroImg}
                alt="ECOGENIUS KZ — Табиғи цикл мен қалдықты қайта өңдеу лабораториясы"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-5">
                <div className="text-white text-left space-y-1">
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300">
                    Үй және мектеп зертханасы
                  </span>
                  <p className="text-sm sm:text-base font-bold leading-snug">
                    Цитрус қабығы, картоп крахмалы, компост және құнарлы топырақ
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Key Educational Sections Navigator Bento */}
      <section className="space-y-6">
        <div className="text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Негізгі танымдық бағыттар
          </h2>
          <p className="text-sm text-slate-500">
            Әрбір бөлім қадамдық нұсқаулықтар, қауіпсіздік ережелері және интерактивті құралдармен қамтылған
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          
          {/* Card 1: Eco Clean */}
          <div 
            onClick={() => onNavigate('ecoclean')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                🍊
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                ECO CLEAN
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Апельсин мен цитрус қабықтарынан табиғи май еріткіш әмбебап үй тазартқыш спрей жасау.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Нұсқаулықты оқу</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Eco Bio */}
          <div 
            onClick={() => onNavigate('ecobio')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 text-xl font-bold">
                🥔
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                ECO BIO
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Картоп қалдығынан алынған крахмал негізінде ыдырайтын биопластик пленкасын дайындау тәжірибесі.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Экспериментті бастау</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Eco Compost */}
          <div 
            onClick={() => onNavigate('ecocompost')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold">
                🌱
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                ECO COMPOST
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Жасыл және қоңыр қабаттардың қатынасы, ылғалдылық пен температураны реттейтін виртуалды симулятор.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Компост симуляторы</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Eco Fertilizer */}
          <div 
            onClick={() => onNavigate('ecofertilizer')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 text-xl font-bold">
                🪴
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                ECO FERTILIZER
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Жұмыртқа қабығынан кальций, бананнан калий, кофе тұнбасынан микроэлементтер алу әдістемесі.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Гүлдер дәрігері</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Eco Food */}
          <div 
            onClick={() => onNavigate('ecofood')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 text-xl font-bold">
                🥕
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                ECO FOOD
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Таза сәбіз қабығы, тәтті бұрыш, сарымсақ және аскөктен табиғи құрғақ дәмдеуіш жасау зерттеуі.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Дәмдеуіш зерттеуі</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Tool Highlights (Lab + Quiz + Calculator) */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white text-left relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-800/60 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            <span>Интерактивті оқу құралдары</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Тәжірибелік күнделік және білімді бағалау
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Шынайы зерттеуші барлық өлшемдерді қағазға немесе цифрлық күнделікке жазады. ECO LAB бөлімінде сіздің тәжірибелеріңіз автоматты түрде браузерде сақталады. Викторина арқылы біліміңізді тексеріп, эко-есептегішпен отбасыңыздың жылдық үлесін есептеңіз.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('ecolab')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Beaker className="w-4 h-4 text-emerald-700" />
              <span>ECO LAB күнделігіне өту</span>
            </button>

            <button
              onClick={() => onNavigate('ecoquiz')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-xl transition-all border border-emerald-600/40 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Эко-викторина тапсыру</span>
            </button>

            <button
              onClick={() => onNavigate('calculator')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-xl transition-all border border-emerald-600/40 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span>Қалдық калькуляторы</span>
            </button>
          </div>
        </div>
      </section>

      {/* Scientific Principle Reminder Strip */}
      <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-amber-950">
              Ғылыми адалдық пен бақылау міндеті
            </h4>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Үйде дайындалған құралдар зертханалық сертификатталған өнім емес. Кез келген нәтижені бақылау, салыстыру және қауіпсіздік сынағы арқылы тексеру міндетті.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenDisclaimer}
          className="px-4 py-2 text-xs font-semibold text-amber-900 bg-white hover:bg-amber-100 border border-amber-300/60 rounded-lg shrink-0 transition-colors"
        >
          Ережелермен танысу
        </button>
      </section>
    </div>
  );
};
