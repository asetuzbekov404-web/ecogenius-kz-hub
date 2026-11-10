import React, { useState } from 'react';
import { SectionId } from '../types';
import { CheckCircle2, XCircle, Sprout, Wind, Droplet, RefreshCw, AlertTriangle, Plus, FlaskConical, Layers } from 'lucide-react';
import compostImg from '../assets/images/ecocompost_layers_bin_1791737551757.jpg';

interface EcoCompostSectionProps {
  onAddExperimentToLab: (exp: {
    title: string;
    category: 'compost';
    categoryLabelKz: string;
    wasteUsed: string;
    hypothesis: string;
  }) => void;
  onNavigate: (section: SectionId) => void;
}

interface CompostLayer {
  id: string;
  type: 'green' | 'brown';
  name: string;
}

export const EcoCompostSection: React.FC<EcoCompostSectionProps> = ({
  onAddExperimentToLab,
  onNavigate
}) => {
  // Sandbox State
  const [layers, setLayers] = useState<CompostLayer[]>([
    { id: '1', type: 'brown', name: 'Құрғақ жапырақ пен бұтақтар (дренаж)' },
    { id: '2', type: 'green', name: 'Асүй көкөніс қабықтары' },
    { id: '3', type: 'brown', name: 'Ұнтақталған картон' }
  ]);
  const [moistureLevel, setMoistureLevel] = useState<number>(55); // 0-100%
  const [aerationTurns, setAerationTurns] = useState<number>(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const greenCount = layers.filter((l) => l.type === 'green').length;
  const brownCount = layers.filter((l) => l.type === 'brown').length;

  // Calculate C:N balance status
  let balanceStatus = 'Жақсы теңгерім';
  let balanceAdvice = 'Азот пен көміртек қатынасы оңтайлы. Гумус белсенді түзілуде.';
  let balanceBadgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-300';

  if (greenCount === 0 && brownCount === 0) {
    balanceStatus = 'Бос жәшік';
    balanceAdvice = 'Қабаттарды қосыңыз (түбіне қоңыр қабаттан бастаңыз).';
    balanceBadgeClass = 'bg-slate-100 text-slate-700 border-slate-300';
  } else if (greenCount > brownCount) {
    balanceStatus = 'Азот шамадан көп (Тым ылғал)';
    balanceAdvice = 'Асүй қалдықтары басым. Жағымсыз иіс шықпас үшін көбірек қоңыр құрғақ жапырақ немесе картон қосыңыз!';
    balanceBadgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
  } else if (brownCount > greenCount * 3) {
    balanceStatus = 'Көміртек өте көп (Баяу ыдырау)';
    balanceAdvice = 'Қоңыр қалдық тым көп болғандықтан шіру баяу жүреді. Аздаған асүй қалдықтары мен ылғал қосыңыз.';
    balanceBadgeClass = 'bg-blue-100 text-blue-900 border-blue-300';
  }

  const addGreenLayer = (name: string) => {
    if (layers.length >= 8) return;
    setLayers((prev) => [...prev, { id: Date.now().toString(), type: 'green', name }]);
    setMoistureLevel((prev) => Math.min(prev + 5, 90));
  };

  const addBrownLayer = (name: string) => {
    if (layers.length >= 8) return;
    setLayers((prev) => [...prev, { id: Date.now().toString(), type: 'brown', name }]);
    setMoistureLevel((prev) => Math.max(prev - 4, 20));
  };

  const resetLayers = () => {
    setLayers([
      { id: '1', type: 'brown', name: 'Құрғақ жапырақ (базалық қабат)' },
      { id: '2', type: 'green', name: 'Жеміс-көкөніс қалдықтары' }
    ]);
    setMoistureLevel(55);
    setAerationTurns(1);
  };

  const turnCompost = () => {
    setAerationTurns((prev) => prev + 1);
    setToastMessage('Компост араластырылды! Оттегі қосылып, микроорганизмдер жанданды.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToLab = () => {
    onAddExperimentToLab({
      title: 'Үй/мектеп органикалық компостының ыдырауын және температурасын бақылау',
      category: 'compost',
      categoryLabelKz: 'Eco Compost (Құнарлы топырақ)',
      wasteUsed: 'Асүй қалдықтары (жасыл) + кепкен жапырақтар мен картон (қоңыр), арақатынасы 1:2',
      hypothesis: 'Қабаттарды дұрыс кезектестіріп, аптасына 1 рет араластырғанда жағымсыз иіссіз 6-8 аптада қоректік қара топырақ түзіледі.'
    });
    setToastMessage('Компост тәжірибесі Eco Lab күнделігіне қосылды!');
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
              <span>🌱 ECO COMPOST — Қалдықтан құнарлы қарашірікке</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Компост дайындау өнері: табиғи био-фабрика
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Компост — бұл органикалық қалдықтардың бактериялар, саңырауқұлақтар және жауын құрттары арқылы толық ыдырап, аса құнарлы топыраққа (гумусқа) айналу процесі. Дұрыс жасалған компост ешқашан сасымайды, керісінше жаңбырдан кейінгі орман топырағындай хош иіс шығарады!
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleAddToLab}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Осы бақылауды күнделікке енгізу</span>
              </button>
              <button
                onClick={() => onNavigate('ecolab')}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                <span>ECO LAB нәтижелерін көру</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100">
              <img
                src={compostImg}
                alt="Компост қабаттары мен топырақ түзілу диаграммасы"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox: Layering simulator */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Интерактивті компост қабаты симуляторы
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            «Жасыл» (азот) және «Қоңыр» (көміртек) қалдықтарды батырмалар арқылы қосып, тепе-теңдікті бақылаңыз:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Deck (Left) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Green buttons */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                «Жасыл» қабат қосу (Азот — Ылғал мен қорек)
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addGreenLayer('Асүй жеміс/көкөніс қалдықтары')}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300 transition-colors"
                >
                  + Көкөніс қабығы
                </button>
                <button
                  onClick={() => addGreenLayer('Кофе мен шай қалдығы')}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300 transition-colors"
                >
                  + Кофе тұнбасы
                </button>
                <button
                  onClick={() => addGreenLayer('Жаңа шабылған шөп')}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300 transition-colors"
                >
                  + Жаңа шөп
                </button>
              </div>
            </div>

            {/* Brown buttons */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700"></span>
                «Қоңыр» қабат қосу (Көміртек — Ауа мен құрылым)
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addBrownLayer('Кепкен жапырақ пен бұтақшалар')}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-amber-100 text-amber-950 rounded-lg border border-amber-300 transition-colors"
                >
                  + Кепкен жапырақ
                </button>
                <button
                  onClick={() => addBrownLayer('Майдаланған картон / қағаз')}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-amber-100 text-amber-950 rounded-lg border border-amber-300 transition-colors"
                >
                  + Ұсақ картон
                </button>
                <button
                  onClick={() => addBrownLayer('Ағаш үгіндісі (опилки)')}
                  className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-amber-100 text-amber-950 rounded-lg border border-amber-300 transition-colors"
                >
                  + Ағаш үгіндісі
                </button>
              </div>
            </div>

            {/* Aeration & Reset Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={turnCompost}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Араластыру (Аэрация +1)</span>
              </button>
              <button
                onClick={resetLayers}
                className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Қайта бастау
              </button>
            </div>

            {/* Balance Status card */}
            <div className={`p-4 rounded-2xl border ${balanceBadgeClass} space-y-2`}>
              <div className="flex justify-between items-center text-xs font-bold">
                <span>Күй: {balanceStatus}</span>
                <span className="tabular-nums">Жасыл: {greenCount} | Қоңыр: {brownCount}</span>
              </div>
              <p className="text-xs leading-relaxed">{balanceAdvice}</p>
            </div>

          </div>

          {/* Compost Bin Graphic (Right) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-100/80 p-5 rounded-3xl border-2 border-dashed border-slate-300 min-h-[300px] flex flex-col justify-end space-y-2">
              <span className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider block mb-2">
                Виртуалды компост жәшігі ({layers.length}/8 қабат)
              </span>

              {layers.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">
                  Жәшік әзірге бос. Сол жақтағы батырмалар арқылы қабаттарды жинаңыз!
                </div>
              ) : (
                layers.map((layer, index) => (
                  <div
                    key={layer.id}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between border shadow-2xs transition-all animate-in slide-in-from-bottom-2 duration-150 ${
                      layer.type === 'green'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-amber-800 text-amber-50 border-amber-900'
                    }`}
                  >
                    <span>{layer.name}</span>
                    <span className="text-[10px] opacity-80 uppercase">
                      {layer.type === 'green' ? 'Жасыл (N)' : 'Қоңыр (C)'}
                    </span>
                  </div>
                ))
              )}

              <div className="h-3 bg-amber-950/60 rounded-b-xl border-t border-amber-900 text-center text-[9px] text-amber-200">
                Жәшік түбі (дренажды топырақ)
              </div>
            </div>

            {/* Meters strip */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-blue-600" />
                  Ылғал деңгейі:
                </span>
                <strong className="text-slate-900 tabular-nums text-sm block">{moistureLevel}% (Қалыпты: 40-60%)</strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-teal-600" />
                  Оттегімен қамту:
                </span>
                <strong className="text-slate-900 tabular-nums text-sm block">{aerationTurns} рет араластырылды</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What to compost vs What NOT to compost */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Компостқа не салуға болады және не салғанға тыйым салынады?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Can compost */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>САЛУҒА БОЛАДЫ (Органикалық тыңайтқыш)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-950/90 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Көкөніс пен жеміс қалдықтары:</strong> Қабықтар, қияр, картоп, сәбіз, алма өзегі.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Шәй жапырағы мен кофе тұнбасы:</strong> Азотқа бай, құрттар өте жақсы көреді.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Жұмыртқа қабығы:</strong> Кальций көзі (ұсақталған күйде).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Кепкен күзгі жапырақтар, картон қораптар:</strong> Табиғи көміртек қабаты.</span>
              </li>
            </ul>
          </div>

          {/* DO NOT compost */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>САЛУҒА МҮЛДЕМ БОЛМАЙДЫ (Қауіпті немесе зиянды)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-950/90 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Ет, сүйек, балық қалдықтары:</strong> Өткір шірік иісін шығарып, тышқандар мен шыбын тартады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Сүт, ірімшік, майлы соустар:</strong> Ауа айналымын бітеп, анаэробты шіру тудырады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Ауру өсімдіктер (фитофторозды қызанақ):</strong> Патогендер топырақта сақталып қалады.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span><strong>Үй жануарларының (ит/мысық) нәжісі:</strong> Паразиттер мен қауіпті бактериялар қаупі бар.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};
