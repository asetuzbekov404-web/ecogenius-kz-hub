import React, { useState } from 'react';
import { SectionId } from '../types';
import { Sprout, CheckCircle2, AlertCircle, Plus, FlaskConical, Sparkles, HeartHandshake } from 'lucide-react';

interface EcoFertilizerSectionProps {
  onAddExperimentToLab: (exp: {
    title: string;
    category: 'fertilizer';
    categoryLabelKz: string;
    wasteUsed: string;
    hypothesis: string;
  }) => void;
  onNavigate: (section: SectionId) => void;
}

export const EcoFertilizerSection: React.FC<EcoFertilizerSectionProps> = ({
  onAddExperimentToLab,
  onNavigate
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string>('potassium');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nutrientGuides = [
    {
      id: 'potassium',
      waste: 'Банан қабығы',
      nutrient: 'Калий (K) және Фосфор (P)',
      symptom: 'Бүршіктер ашылмайды, жапырақ жиектері сарғайған, гүлдеу бәсең',
      recipe: '2-3 банан қабығын 1 л суда 3 күн тұндырып, 1:2 қатынасында сумен араластырып суғару.',
      dosage: 'Айына 1-2 рет гүлдің түбіне 100-150 мл құю.',
      warning: 'Тұнбаны 4 күннен артық ашытпаңыз — жағымсыз иіс шығып, шыбындар пайда болуы мүмкін.',
      icon: '🍌'
    },
    {
      id: 'calcium',
      waste: 'Жұмыртқа қабығы',
      nutrient: 'Кальций (Ca)',
      symptom: 'Жас жапырақтар бұралып қалады, сабағы нәзік әрі тез сынады',
      recipe: 'Жуылған және пеште қыздырылып зарарсыздандырылған қабықты кофеүккіште ұнтақтау.',
      dosage: 'Құмыра топырағына 1 шай қасық сеуіп, үстіңгі қабатпен араластыру.',
      warning: 'Тек ұнтақталған күйде тиімді. Кесек күйінде өсімдік тамыры кальцийді сіңіре алмайды.',
      icon: '🥚'
    },
    {
      id: 'nitrogen',
      waste: 'Кептірілген кофе тұнбасы',
      nutrient: 'Азот (N) және топырақ аэрациясы',
      symptom: 'Өсімдіктің бойы өспейді, жапырақтары ұсақ әрі ақшыл жасыл',
      recipe: 'Толық кептірілген кофе қалдығын қара топырақ көлемінің 10%-нан асырмай араластыру.',
      dosage: 'Көктемде топырақты ауыстырғанда немесе 2 айда 1 рет бетіне жұқалап себу.',
      warning: 'Ылғал күйінде топыраққа төкпеңіз — бетіне қабыршақтанып ауа өткізбейді және зең басады.',
      icon: '☕'
    },
    {
      id: 'phytoncide',
      waste: 'Пияз қабығы',
      nutrient: 'Кверцетин және Фитонцидтер',
      symptom: 'Жапырақтарға біте (тля), өрмекші кенесі қаптаған немесе саңырауқұлақ споралары бар',
      recipe: '1 уыс құрғақ қабыққа 1 л ыстық су құйып, 24 сағат тұндырып, сүзгіден өткізу.',
      dosage: 'Жапырақтарды пульверизатормен аптасына 1 рет үсті-астынан шашып шығу.',
      warning: 'Тұнба тек 48 сағат ішінде жарамды, кейін биологиялық белсенділігі төмендейді.',
      icon: '🧅'
    }
  ];

  const currentGuide = nutrientGuides.find((g) => g.id === selectedSymptom) || nutrientGuides[0];

  const handleAddToLab = () => {
    onAddExperimentToLab({
      title: `${currentGuide.waste} тыңайтқышының өсімдік жапырағы мен өсуіне әсері`,
      category: 'fertilizer',
      categoryLabelKz: 'Eco Fertilizer (Табиғи тыңайтқыш)',
      wasteUsed: `${currentGuide.waste} (${currentGuide.nutrient})`,
      hypothesis: `${currentGuide.waste} тұнбасымен суғарылған бақылау өсімдігі қарапайым сумен суғарылғанға қарағанда тезірек өсіп, жапырақтары қанық жасыл болады.`
    });
    setToastMessage('Өсімдік тыңайтқышы тәжірибесі Eco Lab күнделігіне қосылды!');
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
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full">
            <span>🪴 ECO FERTILIZER — Жасыл әлемге органикалық күтім</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Асүй қалдықтарынан өсімдіктерге арналған табиғи тыңайтқыштар
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Синтетикалық химиялық тыңайтқыштар топырақтың табиғи микрофлорасын зақымдауы мүмкін. Асүйден қалған банан қабығы, жұмыртқа қабығы, кофе тұнбасы және пияз қабығы — бөлме гүлдері мен көшеттер үшін таптырмас микроэлементтердің қайнар көзі!
          </p>
        </div>
      </div>

      {/* Interactive Plant Doctor Selector */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            Интерактивті «Өсімдік дәрігері» диагнозы
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Өсімдігіңізде қандай белгі бар? Төмендегі түймелердің бірін басып, нақты рецептіні көріңіз:
          </p>
        </div>

        {/* Symptoms Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nutrientGuides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setSelectedSymptom(guide.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedSymptom === guide.id
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="space-y-2">
                <span className="text-2xl block">{guide.icon}</span>
                <span className="text-xs font-semibold text-slate-500 block">{guide.waste}</span>
                <span className="text-sm font-bold text-slate-900 block leading-tight">
                  {guide.nutrient}
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium pt-3 block">
                Рецептті көру →
              </span>
            </button>
          ))}
        </div>

        {/* Selected Prescription Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentGuide.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentGuide.waste} — {currentGuide.nutrient}
                </h3>
                <span className="text-xs text-slate-500">
                  Белгісі: {currentGuide.symptom}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToLab}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Осы тәжірибені күнделікке алу</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1 p-3.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-900 block font-bold">Дайындау әдісі:</strong>
              <p className="text-slate-600 leading-relaxed">{currentGuide.recipe}</p>
            </div>

            <div className="space-y-1 p-3.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-900 block font-bold">Қолдану мөлшері (дозировка):</strong>
              <p className="text-slate-600 leading-relaxed">{currentGuide.dosage}</p>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Ескерту және сақтық шарасы: </strong>
              <span>{currentGuide.warning}</span>
            </div>
          </div>
        </div>
      </section>

      {/* General Rules for Organic Plant Care */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Үй тыңайтқыштарын қауіпсіз қолданудың 3 алтын ережесі
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900">Өлшемді сақтау</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              «Көп болса жақсы» деген қағида өсімдіктерге жүрмейді. Артық қоректендіру (әсіресе азот пен тұз) тамырдың күюіне әкеледі.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-900">Алдын ала суғару</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Кез келген органикалық тұнбаны толық құрғақ топыраққа құймаңыз. Алдымен қарапайым таза сумен ылғалдап алып, содан соң тыңайтқышты құйыңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="text-sm font-bold text-slate-900">Тек дезинфекцияланған қабық</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Жұмыртқа қабығын міндетті түрде ыстық суда немесе пеште зарарсыздандырыңыз, көгерген не сасыған қалдықтарды пайдаланбаңыз.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
