import React, { useState } from 'react';
import { SectionId } from '../types';
import { Sparkles, FlaskConical, AlertTriangle, ShieldCheck, CheckCircle2, Sliders, ArrowRight, Plus } from 'lucide-react';
import bioImg from '../assets/images/ecobio_potato_starch_1791737534653.jpg';

interface EcoBioSectionProps {
  onAddExperimentToLab: (exp: {
    title: string;
    category: 'bioplastic';
    categoryLabelKz: string;
    wasteUsed: string;
    hypothesis: string;
  }) => void;
  onNavigate: (section: SectionId) => void;
}

export const EcoBioSection: React.FC<EcoBioSectionProps> = ({
  onAddExperimentToLab,
  onNavigate
}) => {
  // Interactive recipe sliders
  const [starchGrams, setStarchGrams] = useState<number>(10);
  const [waterMl, setWaterMl] = useState<number>(60);
  const [vinegarMl, setVinegarMl] = useState<number>(5);
  const [glycerinMl, setGlycerinMl] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute predicted film characteristics
  const glycerinRatio = glycerinMl / (starchGrams || 1);
  let flexibilityLabel = 'Орташа серпімді';
  let brittlenessNote = 'Қалыпты тепе-теңдік (қолдануға қолайлы пленка)';
  let dryingTime = '24-36 сағат';

  if (glycerinRatio < 0.35) {
    flexibilityLabel = 'Қатты және сынғыш';
    brittlenessNote = 'Глицерин аз болғандықтан, кепкенде жарылып кетуі мүмкін.';
    dryingTime = '18-24 сағат';
  } else if (glycerinRatio > 0.75) {
    flexibilityLabel = 'Өте созылғыш, жұмсақ';
    brittlenessNote = 'Пластификатор көп: пленка өте иілгіш, бірақ жабысқақ болуы мүмкін.';
    dryingTime = '48 сағаттан астам';
  }

  const handleAddToLab = () => {
    onAddExperimentToLab({
      title: 'Картоп крахмалынан жасалған биопластиктің қасиеттері мен топырақта ыдырауы',
      category: 'bioplastic',
      categoryLabelKz: 'Eco Bio (Биополимер)',
      wasteUsed: `${starchGrams} г картоп крахмалы, ${glycerinMl} мл глицерин, ${vinegarMl} мл сірке суы, ${waterMl} мл су`,
      hypothesis: 'Глицерин мен сірке суы қосылған картоп крахмалы иілгіш пленка түзеді және топыраққа көмілгенде 30 күнде микроағзалар арқылы ыдырай бастайды.'
    });
    setToastMessage('Тәжірибе Eco Lab күнделігіне қосылды!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-10 sm:space-y-12 text-left pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-800 text-white px-5 py-3 rounded-xl shadow-lg border border-emerald-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
              <span>🥔 ECO BIO — Биополимерлер және ғылыми эксперимент</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Картоп қалдығынан биологиялық ыдырайтын биопластик жасау
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Картоп қабығы мен үгіндісінен крахмал полисахаридтерін бөліп алып, пластификатор (глицерин) қатысында қыздыру арқылы нағыз экологиялық биополимер пленкасын жасауға болады. Мұндай материал табиғатта микропластик қалдырмай, топырақта толық ыдырайды!
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleAddToLab}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Осы экспериментті күнделікке қосу</span>
              </button>
              <button
                onClick={() => onNavigate('ecolab')}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                <span>ECO LAB нәтижелерін ашу</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100">
              <img
                src={bioImg}
                alt="Картоп крахмалынан жасалған биопластик зертханалық үлгісі"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Safety Alert (Mandatory for heating experiment) */}
      <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-amber-950">
            МАҢЫЗДЫ ҚАУІПСІЗДІК ЕСКЕРТПЕСІ: Ересектердің қатысуы міндетті!
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            Бұл экспериментте плитада қыздыру және ыстық ерітіндімен жұмыс істеу кезеңі бар. Бастауыш сынып оқушылары тек ата-анасының немесе мұғалімнің тікелей бақылауымен ғана орындауы керек. Ыстық ыдысты ұстағанда арнайы қолғапты пайдаланыңыз.
          </p>
        </div>
      </div>

      {/* Interactive Formulation Sandbox */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            Интерактивті биопластик рецептура симуляторы
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Слайдерлерді жылжытып, компоненттердің арақатынасын өзгертіңіз және алынатын пленканың қасиеттерін бақылаңыз:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
          
          {/* Starch */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label htmlFor="starch-slider" className="text-slate-700">Крахмал (құрғақ):</label>
              <span className="text-emerald-700 font-bold tabular-nums">{starchGrams} г</span>
            </div>
            <input
              id="starch-slider"
              type="range"
              min={5}
              max={25}
              step={1}
              value={starchGrams}
              onChange={(e) => setStarchGrams(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">Полимер негізі</span>
          </div>

          {/* Water */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label htmlFor="water-slider" className="text-slate-700">Су (еріткіш):</label>
              <span className="text-teal-700 font-bold tabular-nums">{waterMl} мл</span>
            </div>
            <input
              id="water-slider"
              type="range"
              min={30}
              max={100}
              step={5}
              value={waterMl}
              onChange={(e) => setWaterMl(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">Сулы суспензия</span>
          </div>

          {/* Vinegar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label htmlFor="vinegar-slider" className="text-slate-700">Сірке суы (қышқыл):</label>
              <span className="text-amber-700 font-bold tabular-nums">{vinegarMl} мл</span>
            </div>
            <input
              id="vinegar-slider"
              type="range"
              min={2}
              max={10}
              step={1}
              value={vinegarMl}
              onChange={(e) => setVinegarMl(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">Полимер тізбегін ашады</span>
          </div>

          {/* Glycerin */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label htmlFor="glycerin-slider" className="text-slate-700">Глицерин (иілгіштік):</label>
              <span className="text-purple-700 font-bold tabular-nums">{glycerinMl} мл</span>
            </div>
            <input
              id="glycerin-slider"
              type="range"
              min={1}
              max={15}
              step={1}
              value={glycerinMl}
              onChange={(e) => setGlycerinMl(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">Пластификатор агенті</span>
          </div>

        </div>

        {/* Prediction Results Box */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-950">
              Болжамды нәтиже және биофильм сипаттамасы:
            </h4>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white text-emerald-800 border border-emerald-200">
              {flexibilityLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            {brittlenessNote}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/60 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Кебу уақыты (бөлме температурасында):</span>{' '}
              <strong className="text-slate-800">{dryingTime}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Топырақта биологиялық ыдырау мерзімі:</span>{' '}
              <strong className="text-emerald-700 font-bold">~ 30-60 күн</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Extraction & Polymer Cooking */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Эксперименттің 4 кезеңі
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="text-sm font-bold text-slate-900">Картоп қабығынан крахмал бөліп алу</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Картоп қабықтарын суық сумен блендерде үгітіп, дәке арқылы сұйықтығын сығыңыз. 40 минут тұндырғанда астына таза крахмал шөгеді. Суын төгіп, крахмалды кептіріңіз немесе ылғал күйінде өлшеңіз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="text-sm font-bold text-slate-900">Компоненттерді араластыру</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Кішкентай эмальды немесе болат кастрюльге крахмал, су, сірке суы және глицеринді құйыңыз. Барлық кесектер ерігенше салқын күйінде жақсылап араластырыңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="text-sm font-bold text-slate-900">Баяу отта қыздыру (Ересектермен!)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Қоспаны баяу отқа қойып, үздіксіз қасықпен араластырыңыз. 3-5 минутта сұйықтық қоюланып, мөлдір желім тәрізді гельге айналады. Қайнаған соң отты бірден сөндіріңіз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="text-sm font-bold text-slate-900">Пішінге құю және кептіру</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ыстық гельді фольга немесе майланған силикон тақтаға жұқа (1-2 мм) қабатпен біркелкі жағыңыз. Бөлме температурасында 24-48 сағат кептіріңіз. Кепкен соң иілгіш биопластик дайын!
            </p>
          </div>
        </div>
      </section>

      {/* Degradation Comparison: Fossil Plastic vs Bioplastic */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Ыдырау мерзімінің ғылыми салыстырмасы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-rose-950">Мұнай пластигі (Полиэтилен)</h3>
              <span className="text-xs font-bold text-rose-700">~ 450-500 жыл</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Табиғаттағы бактериялар оның көміртек-көміртек байланысын бұза алмайды. Тек микропластикке ұсақталып, су мен топырақты, жануарлар ағзасын улайды.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-emerald-950">Картоп биопластигі (Крахмал)</h3>
              <span className="text-xs font-bold text-emerald-700">~ 30-90 күн</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Топырақтағы және компосттағы микроағзалар крахмалды қорек ретінде пайдаланып, оны зиянсыз су мен CO₂ газына және пайдалы қарашірікке айналдырады.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
