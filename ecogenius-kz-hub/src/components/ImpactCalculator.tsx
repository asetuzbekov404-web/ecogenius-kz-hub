import React, { useState } from 'react';
import { Calculator, HelpCircle, Leaf, Sparkles, Scale, Info, ArrowUpRight } from 'lucide-react';

export const ImpactCalculator: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [activeDaysPerWeek, setActiveDaysPerWeek] = useState<number>(7);
  const [customDailyWasteGrams, setCustomDailyWasteGrams] = useState<number>(350); // grams per person per day

  // Annual calculation
  const totalDaysPerYear = (activeDaysPerWeek / 7) * 365;
  const annualWasteKg = Math.round((familyMembers * (customDailyWasteGrams / 1000) * totalDaysPerYear));
  
  // Assumptions & Coefficients
  // 1. Compost yield: ~38% of organic waste turns into rich finished humic soil
  const compostYieldKg = Math.round(annualWasteKg * 0.38);

  // 2. Methane / CO2 eq avoided: Organic waste decaying anaerobically in landfills produces methane. 
  // Diverting 1 kg organic waste saves ~0.52 kg CO2 equivalent greenhouse emissions.
  const co2AvoidedKg = Math.round(annualWasteKg * 0.52);

  // 3. Plastic bottles of chemical cleaner saved: ~1 bottle (500ml) per 2 months for an average household
  const plasticBottlesSaved = Math.round((annualWasteKg / 40) + 4);

  return (
    <div className="space-y-10 text-left pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
          <Calculator className="w-3.5 h-3.5" />
          <span>ЭКОЛОГИЯЛЫҚ КАЛЬКУЛЯТОР</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Қалдықты азайту мен экологиялық үлес калькуляторы
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Сіздің отбасыңыздың асүй қалдықтарын сұрыптап қайта өңдеуі табиғатқа қаншалықты пайда әкеледі? Мөлшерді анықтап, нақты сандармен көріңіз.
        </p>
      </div>

      {/* Sliders Input Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Отбасыңыздың деректерін енгізіңіз
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Family members slider */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label htmlFor="family-members-slider" className="text-slate-700">Отбасы мүшелерінің саны:</label>
              <span className="text-emerald-700 font-bold text-base tabular-nums">
                {familyMembers} адам
              </span>
            </div>
            <input
              id="family-members-slider"
              type="range"
              min={1}
              max={10}
              step={1}
              value={familyMembers}
              onChange={(e) => setFamilyMembers(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">
              1-ден 10 адамға дейінгі ауқым
            </span>
          </div>

          {/* Days per week slider */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label htmlFor="active-days-slider" className="text-slate-700">Қалдықты сұрыптау жиілігі:</label>
              <span className="text-teal-700 font-bold text-base tabular-nums">
                аптасына {activeDaysPerWeek} күн
              </span>
            </div>
            <input
              id="active-days-slider"
              type="range"
              min={1}
              max={7}
              step={1}
              value={activeDaysPerWeek}
              onChange={(e) => setActiveDaysPerWeek(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">
              {activeDaysPerWeek === 7 ? 'Күнделікті 100% сұрыптау' : 'Ішінара сұрыптау'}
            </span>
          </div>

        </div>

        {/* Results 4-card grid */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-900 block mb-3 uppercase tracking-wider">
            Сіздің 1 жылдағы болжамды экологиялық нәтижеңіз:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <span className="text-xs font-medium text-emerald-800">Полигоннан сақталған қалдық:</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tabular-nums">
                {annualWasteKg} кг
              </p>
              <span className="text-[11px] text-emerald-700 block">қоқыс полигонына бармайды</span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <span className="text-xs font-medium text-amber-800">Алынған құнарлы гумус:</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-900 tabular-nums">
                ~ {compostYieldKg} кг
              </p>
              <span className="text-[11px] text-amber-700 block">табиғи қарашірік тыңайтқыш</span>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
              <span className="text-xs font-medium text-teal-800">Ауаға шықпаған CO₂-баламасы:</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-900 tabular-nums">
                ~ {co2AvoidedKg} кг
              </p>
              <span className="text-[11px] text-teal-700 block">парниктік метанның алдын алу</span>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
              <span className="text-xs font-medium text-blue-800">Үнемделген химиялық бөтелке:</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-900 tabular-nums">
                ~ {plasticBottlesSaved} құты
              </p>
              <span className="text-[11px] text-blue-700 block">пластик қаптама өндірісі азайды</span>
            </div>

          </div>
        </div>
      </div>

      {/* Clearly Explained Assumptions */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Info className="w-4 h-4 text-emerald-600" />
          <span>Есептеулердің ғылыми негіздемесі мен қабылданған шарттары (Assumptions)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <strong className="text-slate-800 block">1. Адам басына шаққандағы асүй қалдығы:</strong>
            <p>
              Қазақстанның қалалық статистикасына сәйкес бір тұрғын күніне орта есеппен 300–400 г (орташа 350 г) көкөніс, жеміс, шай және басқа да органикалық асүй қалдығын түзеді.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-800 block">2. Компосттың шығымдылығы (~38%):</strong>
            <p>
              Органикалық қалдықтардың 60-70%-ы ылғалдан (судан) тұрады. Ыдырау және булану процесінен кейін 100 кг шикі қалдықтан шамамен 35–40 кг жоғары сапалы құнарлы гумус түзіледі.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-800 block">3. Метан газының алдын алу (0.52 кг CO₂-экв):</strong>
            <p>
              Қалдық полигонда ауасыз (анаэробты) шірігенде метан газын бөледі. Метан СО₂-ге қарағанда 25 есе күштірек парниктік әсер береді. Оны ашық компосттау осы зиянды шығарындыны бейтараптандырады.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-800 block">4. Пластик пен химияны алмастыру:</strong>
            <p>
              Цитрус спрейі мен табиғи тұнбаларды үйде дайындау арқылы отбасы жылына дүкеннен сатып алынатын 4-8 дана бір реттік синтетикалық тазартқыш құтысын пайдаланудан бас тартады.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
