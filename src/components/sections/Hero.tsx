import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeroProps = {
  onStart: () => void;
  imageSrc?: string;
};

export const Hero = ({ onStart, imageSrc }: HeroProps) => (
  <section id="inicio" className="relative overflow-hidden bg-white pt-32 pb-40">
    <div className="absolute top-0 right-0 z-0 h-full w-1/2 translate-x-1/4 -skew-x-12 bg-diners-white-sand/50" />
    <div className="absolute top-40 right-20 h-64 w-64 rounded-full bg-diners-blue-sky/5 blur-3xl" />
    <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-diners-lakefront/5 blur-3xl" />

    <div className="container relative z-10">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-diners-lakefront" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-diners-lakefront">Talento e Innovacion</span>
          </div>

          <h1 className="mb-8 text-6xl font-black leading-[0.9] tracking-tighter text-diners-twilight md:text-8xl">
            Tu Camino en <br />
            <span className="text-diners-lakefront">Diners Club</span>
          </h1>

          <p className="mb-12 max-w-2xl text-xl font-light leading-relaxed text-diners-twilight-65">
            Disenamos el futuro financiero con un proposito claro: empoderar a la proxima generacion. Si buscas transformar el mundo digital, este es tu punto de partida.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row">
            <Button
              size="lg"
              className="group h-16 rounded-full bg-diners-twilight px-10 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-diners-lakefront hover:shadow-2xl"
              onClick={onStart}
            >
              Comenzar Exploracion
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 rounded-full border-diners-gray-4 px-10 text-lg font-bold text-diners-twilight transition-all hover:bg-diners-white-sand"
            >
              Conoce ELLAS DIGITAL
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-diners-gray-1 bg-gradient-to-br from-diners-white-sand via-white to-diners-blue-sky/10 p-4 shadow-[0_30px_80px_rgba(4,30,66,0.12)]">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-diners-twilight">
              {imageSrc ? (
                <img src={imageSrc} alt="Hero Diners Club" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top,_rgba(0,163,224,0.3),_transparent_45%),linear-gradient(160deg,_rgba(4,30,66,0.96),_rgba(0,76,151,0.88))] p-8 text-white">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/65">
                    <span>Espacio Hero</span>
                    <span>Imagen</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-px w-16 bg-white/30" />
                    <p className="max-w-xs text-3xl font-black leading-tight tracking-tight">
                      Aqui puedes colocar la imagen principal de la campana.
                    </p>
                    <p className="max-w-sm text-sm font-light leading-relaxed text-white/70">
                      Cuando tengas el archivo listo, solo asigna su ruta a <strong>heroImageSrc</strong> en <strong>App.tsx</strong>.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Formato</p>
                      <p className="mt-2 text-base font-medium">PNG / JPG / WEBP</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Uso</p>
                      <p className="mt-2 text-base font-medium">Visual principal</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
