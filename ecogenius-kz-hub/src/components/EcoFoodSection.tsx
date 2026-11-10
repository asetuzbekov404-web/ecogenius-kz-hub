import React, { useState } from 'react';
import { SectionId } from '../types';
import { 
  Sparkles, 
  Scale, 
  Flame, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  FlaskConical,
  Clock,
  ShieldCheck
} from 'lucide-react';
import foodImg from '../assets/images/ecofood_veggie_seasoning_1791826516267.jpg';

interface EcoFoodSectionProps {
  onAddExperimentToLab: (exp: {
    title: string;
    category: 'food';
    categoryLabelKz: string;
    wasteUsed: string;
    hypothesis: string;
  }) => void;
  onNavigate: (section: SectionId) => void;
}

interface IngredientRow {
  id: string;
  name: string;
  initialMass: number | '';
  finalMass: number | '';
}

interface FoodDiaryLog {
  id: string;
  date: string;
  timeSpent: string;
  temperature: string;
  colorObservation: string;
  odorObservation: string;
  textureNote: string;
}

export const EcoFoodSection: React.FC<EcoFoodSectionProps> = ({
  onAddExperimentToLab,
  onNavigate
}) => {
  // Table rows for ingredient drying mass measurements
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { id: '1', name: 'Таза сәбіз қабығы', initialMass: '', finalMass: '' },
    { id: '2', name: 'Тәтті болгар бұрышы', initialMass: '', finalMass: '' },
    { id: '3', name: 'Сарымсақ (ұсақталған)', initialMass: '', finalMass: '' },
    { id: '4', name: 'Жаңа аскөк (укроп)', initialMass: '', finalMass: '' }
  ]);

  // Diary observation logs
  const [diaryLogs, setDiaryLogs] = useState<FoodDiaryLog[]>([
    {
      id: 'log-1',
      date: new Date().toISOString().split('T')[0],
      timeSpent: '0-сағат (Басталуы)',
      temperature: 'Бөлме (22°C)',
      colorObservation: 'Сәбіз — қанық қызғылт сары, бұрыш — ашық қызыл, аскөк — жасыл.',
      odorObservation: 'Жаңа піскен көкөністердің шырынды хош иісі.',
      textureNote: 'Барлық шикізат ылғалды, серпімді, шырынды күйде.'
    }
  ]);

  // Diary form states
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newTimeSpent, setNewTimeSpent] = useState<string>('Кептіруден 6 сағат соң');
  const [newTemperature, setNewTemperature] = useState<string>('55°C (Дегидратор)');
  const [newColor, setNewColor] = useState<string>('');
  const [newOdor, setNewOdor] = useState<string>('');
  const [newTexture, setNewTexture] = useState<string>('');
  const [conclusion, setConclusion] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle ingredient input change
  const handleMassChange = (id: string, field: 'initialMass' | 'finalMass', value: string) => {
    const num = value === '' ? '' : parseFloat(value);
    setIngredients((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: isNaN(num as number) ? '' : num } : row))
    );
  };

  const handleNameChange = (id: string, value: string) => {
    setIngredients((prev) =>
      prev.map((row) => (row.id === id ? { ...row, name: value } : row))
    );
  };

  const addIngredientRow = () => {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'Жаңа көкөніс үлесі', initialMass: '', finalMass: '' }
    ]);
  };

  const removeIngredientRow = (id: string) => {
    if (ingredients.length <= 1) return;
    setIngredients((prev) => prev.filter((r) => r.id !== id));
  };

  // Pre-fill realistic sample measurements for testing (user can also clear)
  const loadSampleMeasurements = () => {
    setIngredients([
      { id: '1', name: 'Таза сәбіз қабығы', initialMass: 150, finalMass: 18 },
      { id: '2', name: 'Тәтті болгар бұрышы', initialMass: 120, finalMass: 11 },
      { id: '3', name: 'Сарымсақ (ұсақталған)', initialMass: 30, finalMass: 10 },
      { id: '4', name: 'Жаңа аскөк (укроп)', initialMass: 40, finalMass: 5 }
    ]);
    setToastMessage('Үлгілік ғылыми өлшем деректері кестеге жүктелді!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const clearMeasurements = () => {
    setIngredients((prev) =>
      prev.map((row) => ({ ...row, initialMass: '', finalMass: '' }))
    );
  };

  // Add a new diary log
  const handleAddDiaryLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColor.trim() && !newOdor.trim() && !newTexture.trim()) return;

    const log: FoodDiaryLog = {
      id: Date.now().toString(),
      date: newDate,
      timeSpent: newTimeSpent,
      temperature: newTemperature,
      colorObservation: newColor || 'Өзгеріссіз',
      odorObservation: newOdor || 'Өзгеріссіз',
      textureNote: newTexture || 'Қалыпты'
    };

    setDiaryLogs((prev) => [...prev, log]);
    setNewColor('');
    setNewOdor('');
    setNewTexture('');
    setToastMessage('Бақылау жазбасы күнделікке енгізілді!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculate totals
  const totalInitial = ingredients.reduce((sum, item) => sum + (typeof item.initialMass === 'number' ? item.initialMass : 0), 0);
  const totalFinal = ingredients.reduce((sum, item) => sum + (typeof item.finalMass === 'number' ? item.finalMass : 0), 0);
  const totalDiff = totalInitial > 0 && totalFinal >= 0 ? totalInitial - totalFinal : null;
  const totalReductionPct = totalInitial > 0 && totalDiff !== null ? ((totalDiff / totalInitial) * 100) : null;

  // Send to ECO LAB
  const handleSaveToEcoLab = () => {
    const hasData = totalInitial > 0;
    const summaryWaste = ingredients
      .filter((i) => typeof i.initialMass === 'number')
      .map((i) => `${i.name} (${i.initialMass}г)`)
      .join(', ') || 'Сәбіз қабығы, тәтті бұрыш, сарымсақ, аскөк';

    onAddExperimentToLab({
      title: 'Көкөніс қалдықтарынан табиғи дәмдеуіш жасау және дегидрацияны зерттеу',
      category: 'food',
      categoryLabelKz: 'Eco Food (Табиғи дәмдеуіш)',
      wasteUsed: summaryWaste,
      hypothesis: 'Көкөніс қалдықтары 55-60°C температурада кепкен кезде құрамындағы 85-90% суды жоғалтып, концентрлі хош иісті табиғи дәмдеуішке айналады.'
    });

    setToastMessage('Тәжірибе Eco Lab зертханалық күнделігіне сәтті жіберілді!');
    setTimeout(() => setToastMessage(null), 3500);
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
              <span>🥕 ECO FOOD — Асүй қалдығынан құнды дәмдеуіш</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Көкөніс қабықтарынан табиғи ас дәмдеуішін дайындау
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Таза сәбіз қабығы, тәтті болгар бұрышы, сарымсақ және аскөкті тастамай, олардан дәмді әрі витаминге бай табиғи құрғақ дәмдеуіш жасауға болады. Бұл ғылыми зерттеуде көкөністердің кептіруге дейінгі және кейінгі массасын өлшеп, ылғалдың булану пайызын автоматты түрде есептей аласыз.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleSaveToEcoLab}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Осы зерттеуді ECO LAB күнделігіне сақтау</span>
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
                src={foodImg}
                alt="Көкөніс қалдықтарынан жасалған табиғи дәмдеуіш зертханасы"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 1. List of Ingredients */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            1. Ингредиенттер мен қажетті жабдықтар тізімі
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Дәмдеуіш жасау үшін тек таза әрі сапалы көкөніс шикізаты таңдалады:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <span className="text-2xl block">🥕</span>
            <h3 className="text-sm font-bold text-slate-900">Таза сәбіз қабығы</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Мұқият жуылған сәбіздің жұқа қабығы. Құрамында бета-каротин мен табиғи тәттілік беретін қанттар бар.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <span className="text-2xl block">🫑</span>
            <h3 className="text-sm font-bold text-slate-900">Тәтті болгар бұрышы</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Қызыл не сары болгар бұрышының етті бөліктері. Ашық түс, C дәрумені және қанық паприка дәмін қосады.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl block">🧄</span>
            <h3 className="text-sm font-bold text-slate-900">Сарымсақ (аз мөлшерде)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              2-3 тіс сарымсақ. Құрамындағы аллицин табиғи бактерицидтік қасиет пен өткір тәбет ашар хош иіс сыйлайды.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <span className="text-2xl block">🌿</span>
            <h3 className="text-sm font-bold text-slate-900">Жаңа аскөк (укроп)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Сабақтары мен жапырақтары. Эфир майларына бай, жасыл реңк пен табиғи шөптік балғындық береді.
            </p>
          </div>
        </div>

        {/* Equipment bar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Қажетті құралдар:</strong> Дәлдігі 0.1–1 г электронды асүй таразысы, дегидратор немесе пеш, кофеүккіш/блендер, таза шыны құты.</span>
          </div>
          <div className="text-emerald-700 font-semibold">
            Қосымша: 1 шымшым теңіз тұзы (сақтау мерзімін ұзарту үшін)
          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Experiment Instructions */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          2. Тәжірибенің қадамдық орындалу реті
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              01
            </span>
            <h3 className="text-sm font-bold text-slate-900">Жуу және кесу</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Сәбіз бен бұрышты ағын су астында щеткамен жуыңыз. Сәбіз қабығын жұқа лента күйінде, бұрыш пен сарымсақты 2 мм жұқа тілімдеп тураңыз. Аскөкті майдалаңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              02
            </span>
            <h3 className="text-sm font-bold text-slate-900">Бастапқы массаны өлшеу</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Әрбір ингредиентті кептіруге салмас бұрын таразыға қойып, бастапқы массасын (m₁) грамм түрінде төмендегі кестеге жазыңыз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              03
            </span>
            <h3 className="text-sm font-bold text-slate-900">Дегидрация (Кептіру)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Шикізатты бір қабат етіп жайып, дегидраторда 55–60°C температурада немесе электр пешінде 60°C (есігін сәл ашып) 6–8 сағат кептіріңіз.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              04
            </span>
            <h3 className="text-sm font-bold text-slate-900">Соңғы масса & Ұнтақтау</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Кепкен көкөністерді өлшеп (m₂), кестеге енгізіңіз. Салқындаған соң блендерде ұнтақтап, құрғақ шыны құтыға салыңыз.
            </p>
          </div>
        </div>
      </section>

      {/* 3 & 4. Table to enter mass + Automatic Calculation */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              3. Кептіруге дейінгі және кейінгі массаны енгізу кестесі
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Формула бойынша автоматты есептеу: Масса айырмасы = m₁ − m₂ | Кему пайызы = (Δm / m₁) × 100
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSampleMeasurements}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 transition-colors"
            >
              Үлгілік деректерді жүктеу
            </button>
            <button
              onClick={clearMeasurements}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Тазарту</span>
            </button>
          </div>
        </div>

        {/* Formula Explanatory Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Масса айырмасы:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-emerald-700 font-bold">
              Δm = m₁ (бастапқы) − m₂ (соңғы)
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Массаның кему пайызы:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-teal-700 font-bold">
              % = (Δm / m₁) × 100
            </code>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-3.5">Ингредиент атауы</th>
                <th className="p-3.5 whitespace-nowrap">Бастапқы масса (m₁, г)</th>
                <th className="p-3.5 whitespace-nowrap">Соңғы масса (m₂, г)</th>
                <th className="p-3.5 whitespace-nowrap">Масса айырмасы (Δm, г)</th>
                <th className="p-3.5 whitespace-nowrap">Кему пайызы (%)</th>
                <th className="p-3.5 text-center">Әрекет</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ingredients.map((item) => {
                const initialVal = typeof item.initialMass === 'number' ? item.initialMass : null;
                const finalVal = typeof item.finalMass === 'number' ? item.finalMass : null;
                
                // Pure formula calculations without inventing results
                const diff = initialVal !== null && finalVal !== null ? initialVal - finalVal : null;
                const pct = initialVal !== null && diff !== null && initialVal > 0 ? ((diff / initialVal) * 100) : null;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleNameChange(item.id, e.target.value)}
                        className="w-full bg-transparent font-medium text-slate-900 focus:outline-none focus:border-b focus:border-emerald-500"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="0.0"
                          value={item.initialMass}
                          onChange={(e) => handleMassChange(item.id, 'initialMass', e.target.value)}
                          className="w-24 p-2 bg-white border border-slate-200 rounded-lg text-slate-900 tabular-nums focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <span className="text-slate-400 text-xs">г</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="0.0"
                          value={item.finalMass}
                          onChange={(e) => handleMassChange(item.id, 'finalMass', e.target.value)}
                          className="w-24 p-2 bg-white border border-slate-200 rounded-lg text-slate-900 tabular-nums focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <span className="text-slate-400 text-xs">г</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold tabular-nums text-slate-800">
                      {diff !== null ? (
                        <span className="text-emerald-700">
                          {diff >= 0 ? diff.toFixed(1) : `${diff.toFixed(1)} (қате)`} г
                        </span>
                      ) : (
                        <span className="text-slate-300 font-normal">—</span>
                      )}
                    </td>
                    <td className="p-3.5 font-bold tabular-nums">
                      {pct !== null ? (
                        <span className="text-teal-700">
                          {pct >= 0 ? `${pct.toFixed(1)}%` : '0%'}
                        </span>
                      ) : (
                        <span className="text-slate-300 font-normal">—</span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => removeIngredientRow(item.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Жолды өшіру"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Summary Totals Row */}
            <tfoot>
              <tr className="bg-emerald-50/50 border-t-2 border-emerald-200 font-bold text-slate-900 text-xs sm:text-sm">
                <td className="p-3.5">
                  ЖАЛПЫ ҚОРЫТЫНДЫ (Барлық көкөніс)
                </td>
                <td className="p-3.5 tabular-nums text-slate-800">
                  {totalInitial > 0 ? `${totalInitial.toFixed(1)} г` : '—'}
                </td>
                <td className="p-3.5 tabular-nums text-slate-800">
                  {totalFinal > 0 ? `${totalFinal.toFixed(1)} г` : '—'}
                </td>
                <td className="p-3.5 tabular-nums text-emerald-800">
                  {totalDiff !== null ? `${totalDiff.toFixed(1)} г` : '—'}
                </td>
                <td className="p-3.5 tabular-nums text-teal-800">
                  {totalReductionPct !== null ? `${totalReductionPct.toFixed(1)}% (буланды)` : '—'}
                </td>
                <td className="p-3.5"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={addIngredientRow}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Жаңа көкөніс қосу</span>
          </button>

          <span className="text-[11px] text-slate-400">
            * Деректер енгізілген бойда нәтижелер нақты уақытта есептеледі
          </span>
        </div>

        {/* 4. Automatic Result Cards */}
        {totalInitial > 0 && totalFinal > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-medium text-slate-500">Бастапқы ылғалды шикізат:</span>
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {totalInitial.toFixed(1)} г
              </p>
              <span className="text-[11px] text-slate-400 block">100% бастапқы салмақ</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <span className="text-xs font-medium text-emerald-800">Алынған құрғақ дәмдеуіш (m₂):</span>
              <p className="text-2xl font-extrabold text-emerald-900 tabular-nums">
                {totalFinal.toFixed(1)} г
              </p>
              <span className="text-[11px] text-emerald-700 block">дайын концентрлі өнім</span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
              <span className="text-xs font-medium text-teal-800">Буланған су мөлшері (ылғал шығыны):</span>
              <p className="text-2xl font-extrabold text-teal-900 tabular-nums">
                {totalReductionPct?.toFixed(1)}%
              </p>
              <span className="text-[11px] text-teal-700 block">көкөністердегі табиғи су үлесі</span>
            </div>
          </div>
        )}
      </section>

      {/* 5. Experiment Diary for recording observations, dates & conclusions */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              5. Тәжірибелік бақылау күнделігі және қорытынды
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Кептіру кезіндегі түс, иіс, құрылым өзгерістерін және аспаздық сынақ нәтижелерін тіркеңіз:
            </p>
          </div>

          <button
            onClick={handleSaveToEcoLab}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ECO LAB-қа экспорттау</span>
          </button>
        </div>

        {/* Existing Diary Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-3 whitespace-nowrap">Күні & Уақыты</th>
                <th className="p-3 whitespace-nowrap">Температура</th>
                <th className="p-3">Түсінің өзгеруі</th>
                <th className="p-3">Иісі / Аромат</th>
                <th className="p-3">Құрылымы (текстурасы)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {diaryLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                    <div>{log.date}</div>
                    <div className="text-[11px] font-normal text-slate-400">{log.timeSpent}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap text-slate-600 font-mono text-xs">
                    {log.temperature}
                  </td>
                  <td className="p-3 text-slate-700 leading-relaxed">
                    {log.colorObservation}
                  </td>
                  <td className="p-3 text-slate-700 leading-relaxed">
                    {log.odorObservation}
                  </td>
                  <td className="p-3 text-slate-700 leading-relaxed">
                    {log.textureNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Observation Log Form */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Жаңа бақылау жазбасын қосу:
          </h3>

          <form onSubmit={handleAddDiaryLog} className="space-y-3.5 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">Күні:</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">Кезең / Уақыт:</label>
                <input
                  type="text"
                  value={newTimeSpent}
                  onChange={(e) => setNewTimeSpent(e.target.value)}
                  placeholder="Мысалы: 4 сағат кептірілгенде"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">Температура / Әдіс:</label>
                <input
                  type="text"
                  value={newTemperature}
                  onChange={(e) => setNewTemperature(e.target.value)}
                  placeholder="Мысалы: 55°C дегидратор"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">Түс бақылауы:</label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Қоңырланбады, табиғи түсі сақталды"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">Иіс бақылауы:</label>
                <input
                  type="text"
                  value={newOdor}
                  onChange={(e) => setNewOdor(e.target.value)}
                  placeholder="Қанық сарымсақ және аскөк иісі"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">Құрылымы (текстура):</label>
                <input
                  type="text"
                  value={newTexture}
                  onChange={(e) => setNewTexture(e.target.value)}
                  placeholder="Қытырлақ құрғақ чипстерге айналды"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
              >
                Жазбаны күнделікке енгізу
              </button>
            </div>
          </form>
        </div>

        {/* Conclusion Box */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Зерттеу қорытындысы мен аспаздық бағалау:</span>
          </div>

          <textarea
            rows={3}
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            placeholder="Тәжірибе нәтижесі бойынша қорытындыңызды жазыңыз (мысалы: Таза сәбіз қабығы мен болгар бұрышы 55°C-та кепкенде массасының 88%-ын жоғалтып, сорпа мен тағамға тамаша табиғи дәмдеуіш болды)..."
            className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900 pt-1">
            <span>
              💡 <strong>Кеңес:</strong> Дайын дәмдеуішті ылғал кірмейтін герметикалық шыны құтыда қараңғы шкафта 6 айға дейін сақтауға болады.
            </span>
            <button
              onClick={() => {
                if (!conclusion.trim()) return;
                setToastMessage('Қорытынды сәтті бекітілді!');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Қорытындыны бекіту
            </button>
          </div>
        </div>
      </section>

      {/* Safety & Food Hygiene Notice */}
      <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-950">
            Тағамдық қауіпсіздік пен гигиена ережелері
          </h4>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            1. Тек бұзылмаған, көгермеген, таза жуылған сәбіз қабықтарын пайдаланыңыз.<br />
            2. Кептіру процесі толық аяқталуы керек: егер көкөністе тіпті аздаған ылғал қалса, сақтау барысында көгеру (зең) пайда болады.<br />
            3. Пешпен жұмыс істегенде міндетті түрде ересектердің көмегіне жүгініңіз.
          </p>
        </div>
      </div>
    </div>
  );
};
