import React, { useState } from 'react';
import { LabExperiment, ObservationLog } from '../types';
import { Beaker, Plus, Calendar, CheckCircle2, Clock, Trash2, Printer, ShieldCheck, AlertCircle, FileText, ChevronRight, X } from 'lucide-react';

interface EcoLabSectionProps {
  experiments: LabExperiment[];
  onAddExperiment: (exp: Omit<LabExperiment, 'id' | 'logs'>) => void;
  onAddLog: (experimentId: string, log: Omit<ObservationLog, 'id'>) => void;
  onCompleteExperiment: (experimentId: string, conclusion: string) => void;
  onDeleteExperiment: (experimentId: string) => void;
  onResetDefaults: () => void;
  onOpenDisclaimer: () => void;
}

export const EcoLabSection: React.FC<EcoLabSectionProps> = ({
  experiments,
  onAddExperiment,
  onAddLog,
  onCompleteExperiment,
  onDeleteExperiment,
  onResetDefaults,
  onOpenDisclaimer
}) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experiments[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // New Experiment Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LabExperiment['category']>('cleaner');
  const [newWaste, setNewWaste] = useState('');
  const [newHypothesis, setNewHypothesis] = useState('');
  const [newStartDate, setNewStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [safetyChecked, setSafetyChecked] = useState(false);

  // New Log Entry Modal state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logDay, setLogDay] = useState<number>(1);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logNotes, setLogNotes] = useState('');
  const [logColor, setLogColor] = useState('');
  const [logOdor, setLogOdor] = useState('');
  const [logTexture, setLogTexture] = useState('');

  // Conclusion state
  const [conclusionText, setConclusionText] = useState('');
  const [isConcluding, setIsConcluding] = useState(false);

  const selectedExp = experiments.find((e) => e.id === selectedExpId) || experiments[0];

  const filteredExperiments = experiments.filter((exp) => {
    if (filterCategory === 'all') return true;
    return exp.category === filterCategory;
  });

  const handleCreateExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newWaste.trim() || !safetyChecked) return;

    const catLabels: Record<LabExperiment['category'], string> = {
      cleaner: 'Eco Clean (Тазартқыш)',
      bioplastic: 'Eco Bio (Биополимер)',
      compost: 'Eco Compost (Компост)',
      fertilizer: 'Eco Fertilizer (Тыңайтқыш)',
      food: 'Eco Food (Табиғи дәмдеуіш)',
      other: 'Эко-Эксперимент'
    };

    onAddExperiment({
      title: newTitle,
      category: newCategory,
      categoryLabelKz: catLabels[newCategory],
      wasteUsed: newWaste,
      startDate: newStartDate,
      durationDays: 14,
      status: 'active',
      hypothesis: newHypothesis || 'Нәтиже бақылау барысында анықталады.',
      safetyConfirmed: safetyChecked
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewWaste('');
    setNewHypothesis('');
    setSafetyChecked(false);
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExp || !logNotes.trim()) return;

    onAddLog(selectedExp.id, {
      dayNumber: Number(logDay),
      date: logDate,
      notes: logNotes,
      color: logColor || 'Өзгеріссіз',
      odor: logOdor || 'Өзгеріссіз',
      phOrTexture: logTexture || 'Қалыпты'
    });

    setIsLogModalOpen(false);
    setLogNotes('');
    setLogColor('');
    setLogOdor('');
    setLogTexture('');
  };

  const handleFinishExperiment = () => {
    if (!selectedExp || !conclusionText.trim()) return;
    onCompleteExperiment(selectedExp.id, conclusionText);
    setIsConcluding(false);
    setConclusionText('');
  };

  return (
    <div className="space-y-8 sm:space-y-10 text-left pb-12">
      {/* Top Scientific Method Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ғылыми бақылау қағидасы</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ECO LAB: Тәжірибелік зертхана күнделігі
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            «Нәтижелер нақты бақылау арқылы тексерілуі тиіс». Өз эксперименттеріңіздің басталу күнін, болжамын (гипотезасын), түсі мен иісінің өзгеруін тіркеңіз. Барлық деректер автоматты түрде браузерде сақталады.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Жаңа тәжірибе қосу</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-1.5"
            title="Есепті басып шығару"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Басып шығару</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Sidebar Experiments List & Right Active Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: List of experiments */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Тәжірибелер тізімі ({filteredExperiments.length})
            </h2>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none"
            >
              <option value="all">Барлық санаттар</option>
              <option value="cleaner">Eco Clean</option>
              <option value="bioplastic">Eco Bio</option>
              <option value="compost">Eco Compost</option>
              <option value="fertilizer">Тыңайтқыш</option>
              <option value="food">Eco Food</option>
            </select>
          </div>

          <div className="space-y-2.5">
            {filteredExperiments.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                Таңдалған санатта әзірге тәжірибелер жоқ.
              </div>
            ) : (
              filteredExperiments.map((exp) => {
                const isSelected = selectedExp?.id === exp.id;
                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`p-4 rounded-2xl border cursor-pointer text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                      <span>{exp.categoryLabelKz}</span>
                      <span className={`px-2 py-0.5 rounded-md ${
                        exp.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {exp.status === 'completed' ? 'Аяқталды' : 'Бақылануда'}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Басталды: {exp.startDate}</span>
                      <span>{exp.logs.length} бақылау жазбасы</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={onResetDefaults}
            className="w-full text-center py-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Бастапқы үлгілерді қалпына келтіру
          </button>
        </div>

        {/* Right column: Active Experiment Detailed View */}
        <div className="lg:col-span-8 space-y-6">
          {selectedExp ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              
              {/* Header details */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                    <span>{selectedExp.categoryLabelKz}</span>
                    <span>·</span>
                    <span>Басталған күні: {selectedExp.startDate}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedExp.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setLogDay(selectedExp.logs.length + 1);
                      setIsLogModalOpen(true);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Бақылау жазу</span>
                  </button>
                  <button
                    onClick={() => onDeleteExperiment(selectedExp.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Тәжірибені өшіру"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hypothesis & Materials Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Қолданылған шикізат:</strong>
                  <p className="text-slate-600">{selectedExp.wasteUsed}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Ғылыми болжам (Гипотеза):</strong>
                  <p className="text-slate-600">{selectedExp.hypothesis}</p>
                </div>
              </div>

              {/* Observation Logs Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Күнделікті бақылау кестесі
                  </h3>
                  <span className="text-xs text-slate-500 tabular-nums">
                    Барлығы: {selectedExp.logs.length} күн
                  </span>
                </div>

                {selectedExp.logs.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                    Әзірге бақылау жазбалары жоқ. «Бақылау жазу» батырмасын басып алғашқы өлшемдерді тіркеңіз!
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                          <th className="p-3 whitespace-nowrap">Күн №</th>
                          <th className="p-3 whitespace-nowrap">Күні</th>
                          <th className="p-3">Бақылау жазбасы</th>
                          <th className="p-3 whitespace-nowrap">Түсі</th>
                          <th className="p-3 whitespace-nowrap">Иісі</th>
                          <th className="p-3 whitespace-nowrap">Қасиеті / pH</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedExp.logs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3 font-bold text-emerald-800 whitespace-nowrap tabular-nums">
                              {log.dayNumber}-күн
                            </td>
                            <td className="p-3 text-slate-500 whitespace-nowrap tabular-nums">
                              {log.date}
                            </td>
                            <td className="p-3 text-slate-800 leading-relaxed font-medium">
                              {log.notes}
                            </td>
                            <td className="p-3 text-slate-600 whitespace-nowrap">
                              {log.color}
                            </td>
                            <td className="p-3 text-slate-600 whitespace-nowrap">
                              {log.odor}
                            </td>
                            <td className="p-3 text-slate-600 whitespace-nowrap">
                              {log.phOrTexture || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Conclusion or Finalize Button */}
              {selectedExp.conclusion ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Тәжірибелік қорытынды:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {selectedExp.conclusion}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  {!isConcluding ? (
                    <button
                      onClick={() => setIsConcluding(true)}
                      className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                    >
                      Экспериментті аяқтап, қорытынды жазу
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-800 block">
                        Тәжірибе нәтижесі бойынша қорытынды (гипотеза расталды ма?):
                      </label>
                      <textarea
                        rows={3}
                        value={conclusionText}
                        onChange={(e) => setConclusionText(e.target.value)}
                        placeholder="Мысалы: Бақылау нәтижесінде алынған биопластик топырақта 30 күнде шіри бастады..."
                        className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleFinishExperiment}
                          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
                        >
                          Қорытындыны сақтау
                        </button>
                        <button
                          onClick={() => setIsConcluding(false)}
                          className="px-3 py-2 text-xs text-slate-500 hover:text-slate-700"
                        >
                          Болдырмау
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-sm">
              Тәжірибені таңдаңыз немесе жаңасын қосыңыз.
            </div>
          )}
        </div>

      </div>

      {/* MODAL 1: Create New Experiment */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative text-left">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Жаңа ғылыми тәжірибе бастау
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Зерттелетін өнім мен болжамыңызды толтырыңыз
            </p>

            <form onSubmit={handleCreateExperiment} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Тәжірибе атауы:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Мысалы: Банан қабығы тұнбасының бөлме гүліне әсері"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Санаты:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="cleaner">Eco Clean (Тазартқыш)</option>
                    <option value="bioplastic">Eco Bio (Биополимер)</option>
                    <option value="compost">Eco Compost (Компост)</option>
                    <option value="fertilizer">Eco Fertilizer (Тыңайтқыш)</option>
                    <option value="food">Eco Food (Табиғи дәмдеуіш)</option>
                    <option value="other">Басқа зерттеу</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Басталу күні:</label>
                  <input
                    type="date"
                    required
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Қолданылатын шикізат пен мөлшері:</label>
                <input
                  type="text"
                  required
                  value={newWaste}
                  onChange={(e) => setNewWaste(e.target.value)}
                  placeholder="Мысалы: 2 банан қабығы, 1 литр бөлме суы"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ғылыми болжам (Гипотеза):</label>
                <textarea
                  rows={2}
                  value={newHypothesis}
                  onChange={(e) => setNewHypothesis(e.target.value)}
                  placeholder="Бұл эксперименттен қандай нәтиже күтесіз?"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              {/* Safety checkbox */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="safetyCheck"
                  checked={safetyChecked}
                  onChange={(e) => setSafetyChecked(e.target.checked)}
                  className="mt-0.5 accent-emerald-600 rounded"
                />
                <label htmlFor="safetyCheck" className="text-xs text-amber-950 leading-relaxed cursor-pointer">
                  <strong>Қауіпсіздік келісімі:</strong> Мен тәжірибенің қауіпсіздік ережелерін (көзге тигізбеу, ересектердің қатысуы) сақтауға және нәтижелерді нақты бақылаумен тексеруге келісемін.
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Болдырмау
                </button>
                <button
                  type="submit"
                  disabled={!safetyChecked}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-xs"
                >
                  Экспериментті бастау
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Observation Log */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative text-left">
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Күнделікті бақылау жазбасы
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Бүгінгі байқалған физикалық-химиялық өзгерістерді тіркеңіз
            </p>

            <form onSubmit={handleCreateLog} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Күн нөмірі:</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={logDay}
                    onChange={(e) => setLogDay(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Күні:</label>
                  <input
                    type="date"
                    required
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Бақылау жазбасы (сипаттама):</label>
                <textarea
                  rows={3}
                  required
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Бүгін не өзгерді? Сұйықтық мөлдір ме, тұнба бар ма?"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-700 font-semibold mb-1">Түсі:</label>
                  <input
                    type="text"
                    value={logColor}
                    onChange={(e) => setLogColor(e.target.value)}
                    placeholder="Сарғыш"
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-700 font-semibold mb-1">Иісі:</label>
                  <input
                    type="text"
                    value={logOdor}
                    onChange={(e) => setLogOdor(e.target.value)}
                    placeholder="Цитрус хошы"
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-700 font-semibold mb-1">pH не күйі:</label>
                  <input
                    type="text"
                    value={logTexture}
                    onChange={(e) => setLogTexture(e.target.value)}
                    placeholder="pH ~3.0"
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Болдырмау
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  Жазбаны енгізу
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
