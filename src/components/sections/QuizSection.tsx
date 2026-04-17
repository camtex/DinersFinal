import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QUIZ_QUESTIONS } from '../../data/mockData';

export const QuizSection = ({ onComplete }: { onComplete: (traits: string[]) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUIZ_QUESTIONS.length).fill(-1));

  const question = QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;
  const selectedOption = answers[currentStep];

  const answeredCount = useMemo(
    () => answers.filter(answer => answer !== -1).length,
    [answers],
  );

  const handleSelect = (optionIndex: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentStep] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (selectedOption === -1) return;

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    const scoreMap = answers.reduce<Record<string, number>>((acc, answerIndex, index) => {
      const option = QUIZ_QUESTIONS[index].options[answerIndex];
      if (!option) return acc;

      Object.entries(option.scores).forEach(([trait, value]) => {
        acc[trait] = (acc[trait] ?? 0) + value;
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
    <Card className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-diners-gray-1/80 bg-white shadow-[0_18px_45px_rgba(0,76,151,0.08)]">
      <CardHeader className="space-y-5 border-b border-diners-gray-1/70 bg-[linear-gradient(180deg,rgba(0,163,224,0.06)_0%,rgba(255,255,255,1)_100%)] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-diners-blue-sky/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-diners-blue-sky">
              <Sparkles className="h-3.5 w-3.5" />
              Quiz Vocacional
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-diners-tidepool">
                {question.category} · Paso {currentStep + 1} de {QUIZ_QUESTIONS.length}
              </p>
              <CardTitle className="max-w-2xl text-2xl font-bold leading-tight text-diners-twilight md:text-[2rem]">
                {question.question}
              </CardTitle>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-diners-twilight-65">
              {question.helper || 'Elige la opción que más se parezca a ti. No hay respuestas correctas o incorrectas.'}
            </p>
          </div>

          <div className="min-w-[170px] rounded-[1.5rem] border border-diners-gray-1/80 bg-white/90 px-4 py-3 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-diners-twilight-65">
              Progreso
            </p>
            <p className="mt-2 text-xl font-bold text-diners-twilight">
              {Math.round(progress)}%
            </p>
            <p className="mt-1 text-xs text-diners-twilight-65">
              {answeredCount} respuestas guardadas
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-diners-gray-1/70">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#00A3E0_0%,#006C73_100%)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-diners-twilight-65">
            Responde con calma. El resultado se adapta según tus elecciones.
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;

            return (
              <button
                key={`${question.id}-${index}`}
                type="button"
                onClick={() => handleSelect(index)}
                className={`group flex w-full items-start gap-4 rounded-[1.5rem] border px-4 py-4 text-left transition-all ${
                  isSelected
                    ? 'border-diners-blue-sky bg-diners-blue-sky/6 shadow-[0_10px_24px_rgba(0,163,224,0.12)]'
                    : 'border-diners-gray-1/80 bg-white hover:border-diners-blue-sky/45 hover:bg-diners-white-sand'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all ${
                    isSelected
                      ? 'border-diners-blue-sky bg-diners-blue-sky text-white'
                      : 'border-diners-gray-1 bg-diners-white-sand text-diners-twilight-65 group-hover:border-diners-blue-sky/45'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                      isSelected
                        ? 'bg-white text-diners-blue-sky'
                        : 'bg-diners-blue-sky/8 text-diners-blue-sky'
                    }`}>
                      {option.tag}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed md:text-[15px] ${
                    isSelected ? 'font-medium text-diners-twilight' : 'text-diners-twilight-65'
                  }`}>
                    {option.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-diners-gray-1/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="h-11 px-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            disabled={selectedOption === -1}
            className="h-11 px-8"
          >
            {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Ver resultado' : 'Continuar'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
