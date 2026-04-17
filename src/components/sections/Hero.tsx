import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeroProps = {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  imageSrc?: string;
};

export const Hero = ({ onPrimaryAction, onSecondaryAction, imageSrc }: HeroProps) => {
  const heroVisual = imageSrc || "https://dinersclub.pe/sites/default/files/styles/21_9_desktop_l/public/2025-07/ganadores_curva.jpg.webp?itok=i0g0G2i5";

  return (
    <section id="inicio" className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(247,247,247,0.72)_0%,#ffffff_32%,#f8f9fb_100%)] pb-16 pt-8">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 z-0 h-[20rem] bg-[radial-gradient(circle_at_top,rgba(0,76,151,0.1),transparent_60%)]" />
      <div className="absolute top-0 right-0 z-0 h-full w-[35%] translate-x-1/5 rounded-l-[4rem] bg-gradient-to-b from-diners-white-sand via-white to-diners-blue-sky/5" />

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Columna de Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[1px] w-10 bg-diners-lakefront" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-diners-lakefront">
                Propuesta de Talento e Innovación
              </span>
            </div>

            <h1 className="mb-5 text-3xl font-black leading-[1.1] tracking-tight text-diners-twilight md:text-5xl xl:text-[3.8rem]">
              Una propuesta digital <br />
              <span className="text-diners-lakefront">alineada a Diners Club</span>
            </h1>

            <p className="mb-7 max-w-xl text-sm font-light leading-relaxed text-diners-twilight-65 md:text-base">
              Reordenamos la experiencia en páginas claras, con una navegación más corporativa
              y espacios visuales listos para mostrar talento, marca y oportunidades.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-11 rounded-full bg-diners-blue-sky px-7 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-diners-hover"
                onClick={onPrimaryAction}
              >
                Explorar rutas
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-diners-blue-sky/30 bg-white/70 px-7 text-sm font-bold text-diners-blue-sky transition-all hover:bg-diners-blue-sky/5"
                onClick={onSecondaryAction}
              >
                Ver propuesta
              </Button>
            </div>
          </motion.div>

          {/* Columna de Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-white via-diners-white-sand to-diners-blue-sky/10 opacity-70 blur-lg" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/40 p-3 shadow-[0_20px_50px_rgba(4,30,66,0.12)] backdrop-blur-sm">
              <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-diners-twilight">
                <img
                  src={heroVisual}
                  alt="Ganadores Diners Club"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
