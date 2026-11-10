import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface ScientificDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScientificDisclaimerModal: React.FC<ScientificDisclaimerModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Жабу"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Ғылыми негіздеме және қауіпсіздік ережесі
            </h3>
            <p className="text-xs text-slate-500">
              Эко-зерттеушінің алтын ережелері мен жауапкершілігі
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-emerald-900 text-xs sm:text-sm">
            <strong className="font-semibold block mb-1 flex items-center gap-1.5 text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Бақылау арқылы нақты тексеру қағидасы:
            </strong>
            Тәжірибелік нәтижелер теориямен ғана шектелмей, нақты көзбен көру, өлшеу, күнделікке жазу арқылы ғана дәлелденеді. Егер алынған биопластик немесе тазартқыш күткендей нәтиже бермесе, бұл қате емес, ғылыми ізденістің табиғи процесі!
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl text-amber-900 text-xs sm:text-sm">
            <strong className="font-semibold block mb-1 flex items-center gap-1.5 text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              Дәлелсіз қауіпсіздік кепілдігі берілмейді:
            </strong>
            Үйде дайындалған табиғи тазартқыштар мен биоөнімдердің абсолютті қауіпсіз немесе 100% ғылыми сертификатталған деп санауға болмайды. Оларды алдымен кішігірім аумақта байқап көру қажет.
          </div>

          <div className="text-xs text-slate-500 space-y-1.5 pt-1">
            <p className="font-semibold text-slate-700">Балалар мен отбасылар үшін міндетті қауіпсіздік:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Ыстық плитамен немесе қайнаған сумен жұмыс тек ата-ана не мұғалім қадағалауымен жүреді.</li>
              <li>Сірке қышқылын, эфир майларын көзге тигізбеңіз және балалардың қолы жетпейтін жерде сақтаңыз.</li>
              <li>Цитрус және сірке ерітіндісін мәрмәр/гранит тастарға қолданбаңыз.</li>
              <li>Зең немесе шірік иісі байқалған сәтсіз үлгілерді уақытылы утилизациялаңыз.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
          >
            Түсіндім, ережелерді сақтаймын
          </button>
        </div>
      </div>
    </div>
  );
};
