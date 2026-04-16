import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QUIZ_QUESTIONS } from '../../data/mockData';

export const QuizSection = ({ onComplete }: { onComplete: (traits: string[]) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (trait: string) => {
    const newAnswers = [...answers, trait];
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-diners-lakefront/20 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-black text-diners-lakefront uppercase tracking-widest">Paso {currentStep + 1} de {QUIZ_QUESTIONS.length}</span>
          <div className="flex gap-1">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentStep ? 'bg-diners-lakefront' : 'bg-diners-gray-1'}`} />
            ))}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-diners-twilight">{QUIZ_QUESTIONS[currentStep].question}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
          <Button 
            key={i} 
            variant="outline" 
            className="h-16 justify-start text-left px-6 border-diners-gray-4 hover:border-diners-lakefront hover:bg-diners-lakefront/5 text-diners-twilight font-medium"
            onClick={() => handleAnswer(opt.trait)}
          >
            {opt.text}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
