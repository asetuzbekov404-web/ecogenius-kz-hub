import React, { useState } from 'react';
import { WASTE_ITEMS } from '../data/wasteData';
import { WasteItem, SectionId } from '../types';
import { Search, Sparkles, AlertTriangle, ArrowRight, BookOpen, CheckCircle2, XCircle, FlaskConical } from 'lucide-react';

interface WasteExplorerSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const WasteExplorerSection: React.FC<WasteExplorerSectionProps> = ({
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItemId, setSelectedItemId] = useState<string>(WASTE_ITEMS[0].id);

  const filteredItems = WASTE_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keyNutrients.some((n) => n.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && item.category === selectedCategory;
  });

  const activeItem: WasteItem = WASTE_ITEMS.find((i) => i.id === selectedItemId) || WASTE_ITEMS[0];

  return (
    <div className="space-y-8 sm:space-y-10 text-left pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span>WASTE EXPLORER — Асүй қалдықтарының анықтамалығы</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Асүй қалдығының түрін таңдаңыз
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
          Қолыңызда қандай асүй қалдығы бар? Оны қалай тиімді қайта өңдеуге болатынын, қандай тыңайтқыш не тазартқыш шығатынын және оның ғылыми құрамын лезде біліңіз.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Қалдық түрін не элементін іздеу (мысалы: банан, крахмал, кальций)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Барлығы' },
            { id: 'жеміс-жидек', label: 'Жемістер' },
            { id: 'көкөніс', label: 'Көкөністер' },
            { id: 'сусын-дән', label: 'Кофе/Шай' },
            { id: 'басқа', label: 'Басқа' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-column layout: Items Grid (Left) & Detailed Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Scrollable Items List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
              Сұранысыңыз бойынша ешқандай қалдық түрі табылмады.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-3xl shrink-0 p-1">{item.icon}</span>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Active Item In-Depth Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
            
            {/* Header info */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
              <span className="text-4xl p-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                {activeItem.icon}
              </span>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-slate-400 italic block">
                  {activeItem.latinOrScientific}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {activeItem.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {activeItem.description}
                </p>
              </div>
            </div>

            {/* Nutrients Pills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 block">
                Құрамындағы басты биологиялық / химиялық компоненттер:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeItem.keyNutrients.map((nutrient, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium"
                  >
                    {nutrient}
                  </span>
                ))}
              </div>
            </div>

            {/* Potential Uses List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 block">
                Қайта пайдаланудың мүмкін тәсілдері:
              </span>
              <div className="space-y-2">
                {activeItem.potentialUses.map((use, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs sm:text-sm font-bold text-slate-900">
                          {use.title}
                        </strong>
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                          {use.difficulty} · {use.timeRequired}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {use.description}
                      </p>
                    </div>

                    {use.sectionLink && (
                      <button
                        onClick={() => onNavigate(use.sectionLink!)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-lg transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto"
                      >
                        <span>Бөлімге өту</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recipe Steps */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{activeItem.stepByStepRecipe.title}</span>
              </h3>

              <div className="text-xs text-emerald-900 space-y-1">
                <strong className="block text-emerald-950">Қажетті құралдар мен заттар:</strong>
                <ul className="list-disc list-inside space-y-0.5 pl-1 opacity-90">
                  {activeItem.stepByStepRecipe.materials.map((mat, i) => (
                    <li key={i}>{mat}</li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-emerald-950 space-y-1.5 pt-2 border-t border-emerald-200/60">
                <strong className="block">Орындалу реті:</strong>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-700">
                  {activeItem.stepByStepRecipe.steps.map((st, i) => (
                    <li key={i} className="leading-relaxed">{st}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-2 text-xs text-amber-900 flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Сақтық ережесі:</strong> {activeItem.stepByStepRecipe.safetyTip}</span>
              </div>
            </div>

            {/* What NOT to do & Science Insight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 text-rose-950">
                <strong className="font-bold flex items-center gap-1.5 text-rose-900">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  Не істеуге болмайды?
                </strong>
                <p className="leading-relaxed">{activeItem.whatNotToDo}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-slate-800">
                <strong className="font-bold flex items-center gap-1.5 text-slate-900">
                  <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />
                  Ғылыми түсіндірме:
                </strong>
                <p className="leading-relaxed text-slate-600">{activeItem.scientificInsight}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
