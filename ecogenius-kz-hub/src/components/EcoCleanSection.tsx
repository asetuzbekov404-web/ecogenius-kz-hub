import React, { useState } from 'react';
import { SectionId } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Clock, FlaskConical, Beaker, ArrowRight, Sparkles, Plus } from 'lucide-react';
import cleanImg from '../assets/images/ecoclean_citrus_jar_1791737518027.jpg';

interface EcoCleanSectionProps {
  onAddExperimentToLab: (exp: {
    title: string;
    category: 'cleaner';
    categoryLabelKz: string;
    wasteUsed: string;
    hypothesis: string;
  }) => void;
  onNavigate: (section: SectionId) => void;
}

export const EcoCleanSection: React.FC<EcoCleanSectionProps> = ({
  onAddExperimentToLab,
  onNavigate
}) => {
  const [jarVolume, setJarVolume] = useState<number>(1000); // ml
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculations based on jar volume
  const citrusPeelsCount = Math.round((jarVolume / 1000) * 4);
  const vinegarMl = Math.round(jarVolume * 0.7);
  const dilutionWaterMl = vinegarMl; // 1:1 dilution

  const timelineDays = [
    {
      day: 1,
      title: '1-күн: Шикізатты тығыздап құю',
      status: 'Бастапқы күй',
      desc: 'Апельсин қабықтары шыны ыдысқа толтырылып, 9% ақ сірке суы құйылды. Ерітінді мөлдір, өткір сірке иісі басым. Қабықтар үстіне қалқып шығуы мүмкін.',
      colorClass: 'bg-amber-50 text-amber-900 border-amber-200',
      action: 'Қақпағын тығыздап жауып, күніне 1 рет шайқау.'
    },
    {
      day: 5,
      title: '5-күн: D-лимонен эфир майының бөлінуі',
      status: 'Экстракция басталды',
      desc: 'Қышқыл орта қабықтың сыртқы май бездерін ерітіп, түсі ашық сарыға айнала бастады. Сірке суының өткірлігі цитрус хошымен жұмсарады.',
      colorClass: 'bg-amber-100/70 text-amber-950 border-amber-300',
      action: 'Банканы қараңғы шкафтан алып 5 секунд жайлап шайқау.'
    },
    {
      day: 10,
      title: '10-күн: Қанық түс пен хош иіс',
      status: 'Белсенді фаза',
      desc: 'Сұйықтық алтын сары түске енеді. Қабықтардың тығыздығы өзгеріп, сұйықтыққа толық қанығады. Майды еріту коэффициенті жоғарылайды.',
      colorClass: 'bg-orange-100 text-orange-950 border-orange-300',
      action: 'Тұнбаның көгермегенін тексеру (қабықтар су астында болуы шарт).'
    },
    {
      day: 14,
      title: '14-күн: Сүзу және сумен сұйылту',
      status: 'Дайын өнім',
      desc: 'Экстракт дайын! Сүзгіден өткізіп, 1:1 қатынасында таза сумен араластырамыз. Бүріккіш спрейге құйып тұрмыстық тазалыққа қолданамыз.',
      colorClass: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      action: 'Спрей бөтелкесіне құйып, жапсырмаға дайындалған күнін жазу.'
    }
  ];

  const handleAddToLab = () => {
    onAddExperimentToLab({
      title: 'Апельсин қабығы мен сірке суы тазартқышының 14 күндік экстракциясы',
      category: 'cleaner',
      categoryLabelKz: 'Eco Clean (Тазартқыш)',
      wasteUsed: `${citrusPeelsCount} апельсин қабығы, ${vinegarMl} мл сірке суы (${jarVolume} мл банка)`,
      hypothesis: '14 күнде қабықтан бөлінген D-лимонен майлы ластануды синтетикалық химиясыз 1:1 сұйылтылған күйде толық ерітеді.'
    });
    setToastMessage('Тәжірибе Eco Lab күнделігіне сәтті қосылды!');
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 bg-orange-100/80 px-3 py-1 rounded-full">
              <span>🍊 ECO CLEAN — Үй тазалығы мен химиясыз тұрмыс</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Цитрус қабығынан жасалған әмбебап табиғи тазартқыш
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Апельсин, мандарин немесе лимон қабығын тастаудың орнына оны асүй мен жуынатын бөлмеге арналған май еріткіш эко-спрейге айналдырыңыз. Мұндағы құпия — қабықтың табиғи D-лимонен майы мен сірке қышқылының қуатты әрекеттесуінде.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleAddToLab}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Осы тәжірибені күнделікке енгізу</span>
              </button>
              <button
                onClick={() => onNavigate('ecolab')}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                <span>ECO LAB күнделігін қарау</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100">
              <img
                src={cleanImg}
                alt="Цитрус қабығы мен сірке суы тұнбасы"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Ingredient Calculator */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-emerald-600" />
            Ингредиенттерді есептеу калькуляторы
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Өзіңізде бар шыны ыдыстың көлемін таңдаңыз, жүйе пропорцияны дәл есептеп береді:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[500, 1000, 2000].map((volume) => (
            <button
              key={volume}
              onClick={() => setJarVolume(volume)}
              className={`p-4 rounded-xl border text-left transition-all ${
                jarVolume === volume
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <span className="text-xs font-semibold text-slate-500 uppercase block">Ыдыс көлемі</span>
              <span className="text-lg font-bold text-slate-900">
                {volume === 500 ? '0.5 литр' : volume === 1000 ? '1.0 литр (стандарт)' : '2.0 литр (үлкен)'}
              </span>
            </button>
          ))}
        </div>

        {/* Calculated Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500">Қажетті қабықтар саны:</span>
            <p className="text-xl font-extrabold text-orange-600 tabular-nums">
              ~ {citrusPeelsCount} дана апельсин
            </p>
            <span className="text-[11px] text-slate-400 block">жуылған, туралып тығыздалған</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500">Ақ сірке суы (9%):</span>
            <p className="text-xl font-extrabold text-emerald-700 tabular-nums">
              {vinegarMl} мл
            </p>
            <span className="text-[11px] text-slate-400 block">қабықтар толық батуы тиіс</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500">Сүзілген соң қосылатын су:</span>
            <p className="text-xl font-extrabold text-teal-700 tabular-nums">
              {dilutionWaterMl} мл
            </p>
            <span className="text-[11px] text-slate-400 block">1:1 қатынаста сұйылту үшін</span>
          </div>
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Қадамдық дайындау нұсқаулығы
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              01
            </span>
            <h3 className="text-sm font-bold text-slate-900">Қабықты дайындау</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Апельсин қабықтарын сумен мұқият шайып, 2-3 см бөлшектерге кесіңіз. Шыны банкаға тығыздап салыңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              02
            </span>
            <h3 className="text-sm font-bold text-slate-900">Сірке суын құю</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Үстінен 9% тағамдық сірке суын қабықтар толық батып тұратындай етіп құйып, қақпағын мықтап бұраңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              03
            </span>
            <h3 className="text-sm font-bold text-slate-900">14 күн тұндыру</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Күн сәулесі түспейтін салқын жерге қойыңыз. Күніне 1 рет ақырын шайқап тұрыңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              04
            </span>
            <h3 className="text-sm font-bold text-slate-900">Сүзу және сұйылту</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Дәке арқылы сүзіп, таза сумен 1:1 араластырып пульверизатор құтысына құйыңыз. Дайын!
            </p>
          </div>
        </div>
      </section>

      {/* 14-Day Timeline Tracker Interactive */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            14 күндік экстракцияның виртуалды кезеңдері
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Тұндыру кезіндегі физика-химиялық өзгерістерді бақылау үшін күнді таңдаңыз:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {timelineDays.map((item) => (
            <button
              key={item.day}
              onClick={() => setActiveDayTab(item.day)}
              className={`p-3 rounded-xl border text-center transition-all ${
                activeDayTab === item.day
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-xs block text-slate-400">Кезең</span>
              <span className="text-sm font-semibold">{item.day}-күн</span>
            </button>
          ))}
        </div>

        {/* Active Stage Details */}
        {(() => {
          const currentStage = timelineDays.find((d) => d.day === activeDayTab) || timelineDays[0];
          return (
            <div className={`p-5 rounded-2xl border ${currentStage.colorClass} space-y-3 animate-in fade-in duration-150`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold">{currentStage.title}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white/80 border border-current">
                  {currentStage.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{currentStage.desc}</p>
              <div className="pt-2 border-t border-black/10 flex items-center gap-2 text-xs font-semibold">
                <span>Әрекет:</span>
                <span>{currentStage.action}</span>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Surface Compatibility Guide: Where to use vs Where NOT to use */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Беттермен үйлесімділік кестесі
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Can use */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>ҚОЛДАНУҒА БОЛАДЫ (Қауіпсіз және тиімді)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-950/90 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Асүй кафелі мен керамикалық плиткалар:</strong> Май мен сабын қақтарын лезде ерітеді.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Шыны және айналар:</strong> Жолақ қалдырмай жылтыратады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Тот баспайтын болат (раковина, плита):</strong> Су мен әк дақтарын тазартады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Қоқыс шелегі мен тоңазытқыш сөрелері:</strong> Жағымсыз иістерді жойып, дезинфекциялайды.</span>
              </li>
            </ul>
          </div>

          {/* CANNOT USE */}
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>ҚОЛДАНУҒА БОЛМАЙДЫ (Бетке зақым келеді)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-950/90 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Мәрмәр (мрамор) және гранит:</strong> Қышқыл тастың кальцитін ерітіп, күңгірт дақ қалдырады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Өңделмеген табиғи ағаш:</strong> Қышқыл қорғаныс лагын жеп, ағаш талшығын ісіндіруі мүмкін.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Смартфон, ноутбук, ТД экрандары:</strong> Олеофобты және антиблик жабынын бұзады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Хлорлы ағартқышпен қосуға ТЫЙЫМ САЛЫНАДЫ:</strong> Қауіпті хлор газы бөлінеді!</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Scientific Principle callout */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3">
        <FlaskConical className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">Ғылыми түсіндірме: D-лимонен химиясы</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            D-лимонен (C₁₀H₁₆) — цитрус қабығының май бездеріндегі монотерпенді қосылыс. Оның полярлы емес молекулалық құрылымы майлы дақтарды тез тұзақтап, сірке қышқылымен бірге органикалық ластануларды сулы ортада шаюға мүмкіндік береді.
          </p>
        </div>
      </div>
    </div>
  );
};
