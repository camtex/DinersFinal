import { useState } from 'react';
import { Sparkles, Target, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizSection } from './QuizSection';
import { ALL_SKILLS, ALL_INTERESTS } from '../../data/mockData';

export const ExplorationSection = ({
  selectedSkills,
  setSelectedSkills,
  selectedInterests,
  setSelectedInterests,
  onShowResults,
  onQuizComplete
}: any) => {
  const [mode, setMode] = useState<'manual' | 'quiz'>('quiz');

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev: string[]) =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev: string[]) =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  return (
    <section id="explorar" className="bg-[#F8FAFC] py-20">
      <div className="container px-4">

        {/* ENCABEZADO */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 inline-block rounded-full bg-[#00A3E0]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A3E0]">
            Descubre tu camino
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            ¿Cómo quieres empezar?
          </h2>

          {/* SELECTOR DE MODO COMPACTO */}
          <div className="mt-8 inline-flex p-1 bg-slate-200/50 rounded-full backdrop-blur-sm">
            <button
              onClick={() => setMode('quiz')}
              className={`rounded-full px-8 py-2.5 text-xs font-bold transition-all ${mode === 'quiz' ? 'bg-white text-[#00A3E0] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`rounded-full px-8 py-2.5 text-xs font-bold transition-all ${mode === 'manual' ? 'bg-white text-[#00A3E0] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Selección Manual
            </button>
          </div>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="mx-auto max-w-5xl">
          {mode === 'quiz' ? (
            <QuizSection onComplete={onQuizComplete} />
          ) : (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">

                {/* CARD HABILIDADES */}
                <Card className="overflow-hidden rounded-[2rem] border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg font-black text-slate-900">
                      <div className="p-2 bg-[#00A3E0]/10 rounded-lg text-[#00A3E0]">
                        <Sparkles size={18} />
                      </div>
                      Habilidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SKILLS.map((skill: string) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold transition-all border ${selectedSkills.includes(skill)
                            ? 'bg-[#00A3E0] border-[#00A3E0] text-white shadow-md shadow-[#00A3E0]/20'
                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                            }`}
                        >
                          {selectedSkills.includes(skill) && <Check size={12} />}
                          {skill}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* CARD INTERESES */}
                <Card className="overflow-hidden rounded-[2rem] border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg font-black text-slate-900">
                      <div className="p-2 bg-[#006C73]/10 rounded-lg text-[#006C73]">
                        <Target size={18} />
                      </div>
                      Intereses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {ALL_INTERESTS.map((interest: string) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold transition-all border ${selectedInterests.includes(interest)
                            ? 'bg-[#006C73] border-[#006C73] text-white shadow-md shadow-[#006C73]/20'
                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                            }`}
                        >
                          {selectedInterests.includes(interest) && <Check size={12} />}
                          {interest}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* BOTÓN DE ACCIÓN MANUAL */}
              <div className="text-center pt-4">
                <Button
                  onClick={onShowResults}
                  disabled={selectedSkills.length === 0 && selectedInterests.length === 0}
                  className="bg-[#00A3E0] hover:bg-[#006C73] text-white rounded-full px-12 py-6 h-auto text-sm font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-30"
                >
                  Ver Oportunidades
                </Button>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Seleccionaste {selectedSkills.length + selectedInterests.length} etiquetas
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
