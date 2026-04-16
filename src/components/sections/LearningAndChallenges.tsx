import { BookOpen, Trophy, Globe, TrendingUp, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LEARNING_PATHS, CHALLENGES } from '@/data/mockData'


export const LearningAndChallenges = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-diners-lakefront flex items-center justify-center text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-diners-twilight">Rutas de Aprendizaje</h3>
          </div>
          <div className="space-y-4">
            {LEARNING_PATHS.map((path, i) => (
              <Card key={i} className="border-diners-gray-1 hover:border-diners-lakefront transition-colors">
                <CardHeader className="flex flex-row items-center gap-4 py-4">
                  <div className="p-2 rounded-full bg-diners-gray-1 text-diners-twilight">
                    {path.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{path.title}</CardTitle>
                    <CardDescription>{path.duration}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2">
                    {path.modules.map(m => <Badge key={m} variant="secondary" className="text-[10px]">{m}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-diners-tidepool flex items-center justify-center text-white">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-diners-twilight">Retos Prácticos</h3>
          </div>
          <div className="space-y-4">
            {CHALLENGES.map((challenge, i) => (
              <Card key={i} className="border-diners-gray-1 bg-diners-white-sand/50">
                <CardHeader className="py-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-diners-tidepool">{challenge.difficulty}</Badge>
                    <span className="text-xs font-bold text-diners-twilight">{challenge.points} pts</span>
                  </div>
                  <CardTitle className="text-base">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-diners-twilight-65">{challenge.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 text-diners-tidepool h-auto">Aceptar Reto</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
