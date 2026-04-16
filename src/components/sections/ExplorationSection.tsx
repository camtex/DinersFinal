import { useState } from 'react'
import { Sparkles, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { QuizSection } from './QuizSection'
import { ALL_SKILLS, ALL_INTERESTS } from '../../data/mockData'

export const ExplorationSection = ({ 
  selectedSkills, 
  setSelectedSkills, 
  selectedInterests, 
  setSelectedInterests,
  onShowResults,
  onQuizComplete
}: any) => {

  const [mode, setMode] = useState<'manual' | 'quiz'>('quiz')

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev: string[]) => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev: string[]) => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  return (
    <section id="explorar" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 bg-diners-lakefront/10 text-diners-lakefront text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Explora tu Potencial
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-6 tracking-tight">
            ¿Cómo quieres empezar?
          </h2>

          <p className="text-lg font-light text-diners-twilight-65">
            Elige el camino que prefieras para descubrir tu futuro en Diners Club.
          </p>
          
          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={() => setMode('quiz')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                mode === 'quiz'
                  ? 'bg-diners-twilight text-white shadow-lg'
                  : 'bg-diners-white-sand text-diners-twilight hover:bg-diners-gray-1'
              }`}
            >
              Quiz Vocacional
            </button>

            <button 
              onClick={() => setMode('manual')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                mode === 'manual'
                  ? 'bg-diners-twilight text-white shadow-lg'
                  : 'bg-diners-white-sand text-diners-twilight hover:bg-diners-gray-1'
              }`}
            >
              Selección Manual
            </button>
          </div>
        </div>

        {mode === 'quiz' ? (
          <QuizSection onComplete={onQuizComplete} />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-12">

              {/* SKILLS */}
              <Card className="border-diners-gray-1 shadow-sm rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-diners-twilight">
                    <Sparkles className="w-6 h-6 text-diners-blue-sky" />
                    Habilidades y Conocimientos
                  </CardTitle>
                  <CardDescription className="font-light">
                    Tus herramientas técnicas y soft skills.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {ALL_SKILLS.map((skill: string) => (
                      <Badge 
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer py-2 px-4 rounded-full transition-all text-xs ${
                          selectedSkills.includes(skill) 
                            ? "bg-diners-lakefront hover:bg-diners-lakefront/90 border-transparent" 
                            : "border-diners-gray-4 text-diners-twilight-65 hover:border-diners-lakefront hover:text-diners-lakefront"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* INTERESTS */}
              <Card className="border-diners-gray-1 shadow-sm rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-diners-twilight">
                    <Target className="w-6 h-6 text-diners-tidepool" />
                    Intereses y Pasiones
                  </CardTitle>
                  <CardDescription className="font-light">
                    Lo que te motiva a crecer profesionalmente.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {ALL_INTERESTS.map((interest: string) => (
                      <Badge 
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer py-2 px-4 rounded-full transition-all text-xs ${
                          selectedInterests.includes(interest) 
                            ? "bg-diners-tidepool hover:bg-diners-tidepool/90 border-transparent" 
                            : "border-diners-gray-4 text-diners-twilight-65 hover:border-diners-tidepool hover:text-diners-tidepool"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            <div className="mt-16 text-center">
              <Button 
                size="lg" 
                className="bg-diners-twilight hover:bg-diners-lakefront text-white rounded-full px-16 h-16 text-lg font-bold shadow-xl transition-all"
                onClick={onShowResults}
                disabled={selectedSkills.length === 0 && selectedInterests.length === 0}
              >
                Ver Oportunidades
              </Button>
            </div>
          </>
        )}

      </div>
    </section>
  )
}