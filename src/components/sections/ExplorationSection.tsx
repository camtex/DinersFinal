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
      <div className="container">

        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-6 inline-block rounded-full bg-diners-lakefront/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-diners-lakefront">
            Explora tu Potencial
          </div>

          <h2 className="mb-6 text-4xl font-black tracking-tight text-diners-twilight md:text-5xl">
            Como quieres empezar?
          </h2>

          <p className="text-lg font-light text-diners-twilight-65">
            Elige el camino que prefieras para descubrir tu futuro en Diners Club.
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <button
              onClick={() => setMode('quiz')}
              type="button"
              className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                mode === 'quiz'
                  ? 'bg-diners-blue-sky text-white shadow-lg'
                  : 'bg-diners-white-sand text-diners-twilight hover:bg-diners-blue-sky/10 hover:text-diners-hover'
              }`}
            >
              Quiz Vocacional
            </button>

            <button
              onClick={() => setMode('manual')}
              type="button"
              className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                mode === 'manual'
                  ? 'bg-diners-blue-sky text-white shadow-lg'
                  : 'bg-diners-white-sand text-diners-twilight hover:bg-diners-blue-sky/10 hover:text-diners-hover'
              }`}
            >
              Seleccion Manual
            </button>
          </div>
        </div>

        {mode === 'quiz' ? (
          <QuizSection onComplete={onQuizComplete} />
        ) : (
          <>
            <div className="grid gap-12 md:grid-cols-2">
              <Card className="overflow-hidden rounded-[2rem] border-diners-gray-1 shadow-sm">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-diners-twilight">
                    <Sparkles className="w-6 h-6 text-diners-blue-sky" />
                    Habilidades y Conocimientos
                  </CardTitle>
                  <CardDescription className="font-light">
                    Tus herramientas tecnicas y soft skills.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {ALL_SKILLS.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer rounded-full px-4 py-2 text-xs transition-all ${
                          selectedSkills.includes(skill)
                            ? "border-transparent bg-diners-blue-sky hover:bg-diners-hover"
                            : "border-diners-gray-4 text-diners-twilight-65 hover:border-diners-blue-sky hover:text-diners-blue-sky"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-[2rem] border-diners-gray-1 shadow-sm">
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
                        className={`cursor-pointer rounded-full px-4 py-2 text-xs transition-all ${
                          selectedInterests.includes(interest)
                            ? "border-transparent bg-diners-blue-sky hover:bg-diners-hover"
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
                className="h-16 rounded-full bg-diners-blue-sky px-16 text-lg font-bold text-white shadow-xl transition-all hover:bg-diners-hover"
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
