import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeroProps = {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  imageSrc?: string;
};

export const Hero = ({ onPrimaryAction, onSecondaryAction, imageSrc }: HeroProps) => (
  <section id="inicio" className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(247,247,247,0.72)_0%,#ffffff_32%,#f8f9fb_100%)] pb-24 pt-10">
    <div className="absolute inset-x-0 top-0 z-0 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(0,76,151,0.12),transparent_62%)]" />
    <div className="absolute top-0 right-0 z-0 h-full w-[42%] translate-x-1/5 rounded-l-[4rem] bg-gradient-to-b from-diners-white-sand via-white to-diners-blue-sky/10" />
    <div className="absolute top-28 right-20 h-64 w-64 rounded-full bg-diners-blue-sky/10 blur-3xl" />
    <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-diners-lakefront/5 blur-3xl" />

    <div className="container relative z-10">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-7 flex items-center gap-4">
            <div className="h-[1px] w-14 bg-diners-lakefront" />
            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-diners-lakefront">Propuesta de Talento e Innovacion</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-[0.96] tracking-tight text-diners-twilight md:text-6xl xl:text-[4.5rem]">
            Una propuesta digital <br />
            <span className="text-diners-lakefront">alineada a Diners Club</span>
          </h1>

          <p className="mb-9 max-w-2xl text-base font-light leading-relaxed text-diners-twilight-65 md:text-lg">
            Reordenamos la experiencia en paginas claras, con una navegacion mas corporativa, una estetica cercana a la web oficial y espacios visuales listos para mostrar talento, marca y oportunidades.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row">
            <Button
              size="lg"
              className="group h-12 rounded-full bg-diners-blue-sky px-9 text-base font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-diners-hover hover:shadow-2xl"
              onClick={onPrimaryAction}
            >
              Explorar rutas
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-diners-blue-sky/30 bg-white/70 px-9 text-base font-bold text-diners-blue-sky transition-all hover:border-diners-hover hover:bg-diners-blue-sky/8 hover:text-diners-hover"
              onClick={onSecondaryAction}
            >
              Ver propuesta
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[2.75rem] bg-gradient-to-br from-white via-diners-white-sand to-diners-blue-sky/15 opacity-80 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-white/80 p-4 shadow-[0_32px_90px_rgba(4,30,66,0.14)] backdrop-blur-sm">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-diners-twilight">
              {imageSrc ? (
                <img src={imageSrc} alt="Hero Diners Club" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(0,163,224,0.34),transparent_40%),linear-gradient(165deg,rgba(4,30,66,0.98),rgba(0,76,151,0.9))] p-8 text-white">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                    <span>Hero visual</span>
                    <span>Diners Club</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-px w-16 bg-white/30" />
                    <p className="max-w-xs text-3xl font-black leading-tight tracking-tight">
                      Espacio reservado para la imagen principal de la propuesta.
                    </p>
                    <p className="max-w-sm text-sm font-light leading-relaxed text-white/72">
                      Asigna la ruta del asset a <strong>heroImageSrc</strong> en <strong>App.tsx</strong> para reemplazar este bloque.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Tono</p>
                      <p className="mt-2 text-base font-medium">Corporativo</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Formato</p>
                      <p className="mt-2 text-base font-medium">PNG / JPG / WEBP</p>
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
