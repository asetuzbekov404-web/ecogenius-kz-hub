import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

export const EcoQuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selected: number; isCorrect: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: idx, isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  };

  // Badge determination
  const total = QUIZ_QUESTIONS.length;
  let badgeTitle = 'Бастаушы Эко-Дос';
  let badgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
  if (score === total) {
    badgeTitle = '«ECOGENIUS KZ» Алтын Зерттеушісі';
    badgeColor = 'text-emerald-800 bg-emerald-50 border-emerald-300';
  } else if (score >= total * 0.75) {
    badgeTitle = 'Жас Эко-Маман';
    badgeColor = 'text-teal-800 bg-teal-50 border-teal-300';
  } else if (score >= total * 0.5) {
    badgeTitle = 'Эко-Ізденуші';
    badgeColor = 'text-blue-800 bg-blue-50 border-blue-300';
  }

  return (
    <div className="space-y-10 text-left pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" />
          <span>ECO QUIZ — Білімді тексеру алаңы</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Асүй қалдықтары мен Zero-Waste викторинасы
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Сұрақтарға жауап беріп, өзіңіздің эко-интеллект деңгейіңізді анықтаңыз және әр жауаптың ғылыми мәнін түсініңіз.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Progress bar and counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span className="uppercase tracking-wider text-emerald-700 font-bold">
                {currentQ.category}
              </span>
              <span className="tabular-nums">
                Сұрақ {currentIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-400';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {hasAnswered && (
            <div className={`p-4 rounded-2xl border space-y-1.5 animate-in fade-in duration-200 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Түсіндірме:</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Келесі сұрақ' : 'Нәтижені көру'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Summary & Badge Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Викторина сәтті аяқталды!
            </h2>
            <p className="text-sm text-slate-500">
              Сіз {QUIZ_QUESTIONS.length} сұрақтың <strong className="text-slate-900 tabular-nums">{score}</strong> сұрағына дұрыс жауап бердіңіз.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border inline-block max-w-sm ${badgeColor}`}>
            <span className="text-[11px] font-semibold uppercase tracking-wider block opacity-75">
              Тағайындалған мәртебе:
            </span>
            <span className="text-lg font-bold block mt-1">
              {badgeTitle}
            </span>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Қайта тапсыру</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
