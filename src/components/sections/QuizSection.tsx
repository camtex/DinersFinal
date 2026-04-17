import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Asegúrate de tener framer-motion instalado
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QUIZ_QUESTIONS } from '../../data/mockData';

export const QuizSection = ({ onComplete }: { onComplete: (traits: string[]) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUIZ_QUESTIONS.length).fill(-1));

  const question = QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;
  const selectedOption = answers[currentStep];

  const handleSelect = (optionIndex: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentStep] = optionIndex;
      return next;
    });

    // Auto-avanzar suavemente tras elegir una opción
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 400);
    }
  };

  const handleFinish = () => {
    if (selectedOption === -1) return;

    // Calcular rasgos dominantes basados en los scores del mockData
    const scoreMap = answers.reduce<Record<string, number>>((acc, answerIndex, index) => {
      const option = QUIZ_QUESTIONS[index].options[answerIndex];
      if (!option) return acc;

      Object.entries(option.scores).forEach(([trait, value]) => {
        acc[trait] = (acc[trait] ?? 0) + (value as number);
      });

      return acc;
    }, {});

    const dominantTraits = Object.entries(scoreMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([trait]) => trait);

    onComplete(dominantTraits);
  };

  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">

      {/* Barra de progreso minimalista en el borde superior */}
      <div className="h-1.5 w-full bg-slate-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-[#00A3E0]"
        />
      </div>

      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header del paso actual */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Pregunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex items-center gap-1.5 bg-[#00A3E0]/10 px-3 py-1 rounded-full">
                <Sparkles size={12} className="text-[#00A3E0]" />
                <span className="text-[10px] font-bold text-[#00A3E0] uppercase">
                  {question.category}
                </span>
              </div>
            </div>

            {/* Pregunta */}
            <h3 className="mb-8 text-xl sm:text-2xl font-black leading-tight text-slate-900 tracking-tight">
              {question.question}
            </h3>

            {/* Opciones */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={`${question.id}-${index}`}
                    onClick={() => handleSelect(index)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${isSelected
                        ? 'border-[#00A3E0] bg-[#00A3E0]/[0.03] ring-1 ring-[#00A3E0]'
                        : 'border-slate-100 bg-white hover:border-slate-300'
                      }`}
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-colors ${isSelected
                        ? 'bg-[#00A3E0] border-[#00A3E0] text-white'
                        : 'border-slate-200 text-slate-400'
                      }`}>
                      {String.fromCharCode(65 + index)}
                    </div>

                    <p className={`text-[14px] leading-snug ${isSelected ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                      {option.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de Navegación */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-50 pt-6">
          <button
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest transition-colors ${currentStep === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-slate-900'
              }`}
          >
            <ChevronLeft size={16} />
            Atrás
          </button>

          {currentStep === QUIZ_QUESTIONS.length - 1 ? (
            <Button
              onClick={handleFinish}
              disabled={selectedOption === -1}
              className="bg-[#00A3E0] hover:bg-[#006C73] text-white rounded-full px-8 py-5 h-auto text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
            >
              Ver Oportunidades
            </Button>
          ) : (
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              {Math.round(progress)}% Listo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
