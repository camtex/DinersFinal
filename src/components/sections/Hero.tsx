import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeroProps = {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  imageSrc?: string;
};

export const Hero = ({ onPrimaryAction, onSecondaryAction, imageSrc }: HeroProps) => {
  // Imagen por defecto con ganadores, alineada al contexto premium
  const heroVisual = imageSrc || "https://dinersclub.pe/sites/default/files/styles/21_9_desktop_l/public/2025-07/ganadores_curva.jpg.webp?itok=i0g0G2i5";

  return (
    <section id="inicio" className="relative overflow-hidden bg-white pb-20 pt-12">

      {/* BACKGROUND DECOR TOTALMENTE INTEGRADO */}
      <div className="absolute inset-x-0 top-0 z-0 h-[35rem] bg-[radial-gradient(circle_at_top_right,rgba(0,166,166,0.08),transparent_70%)]" />

      {/* Bloque de color sólido a la derecha donde se integra la imagen */}
      <div className="absolute top-0 right-0 z-0 h-full w-[45%] rounded-l-[5rem] bg-diners-white-sand/40 md:w-[40%]" />

      <div className="container relative z-10 px-6">
        {/* Ajuste de grilla para dar más aire (gap-16) */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          {/* COLUMNA DE TEXTO: Animación sutil de entrada */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] w-12 bg-diners-lakefront" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-diners-lakefront">
                Propuesta de Talento e Innovación
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-diners-twilight md:text-5xl xl:text-[4rem]">
              Una propuesta digital <br />
              <span className="text-diners-lakefront font-light">alineada a Diners Club</span>
            </h1>

            <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-diners-twilight-65 md:text-lg">
              Reordenamos la experiencia en páginas claras, con una navegación más corporativa
              y espacios visuales listos para mostrar talento, marca y oportunidades.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-12 rounded-full bg-diners-blue-sky px-8 text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-diners-hover"
                onClick={onPrimaryAction}
              >
                Explorar rutas
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-diners-blue-sky/20 bg-transparent px-8 text-sm font-bold text-diners-blue-sky transition-all hover:bg-diners-blue-sky/5"
                onClick={onSecondaryAction}
              >
                Ver propuesta
              </Button>
            </div>
          </motion.div>

          {/* COLUMNA DE IMAGEN: Presentación Asimétrica y Minimalista */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative h-full"
          >
            {/* NUEVA FORMA DE PRESENTAR LA IMAGEN:
              - Eliminamos contenedores con bordes gruesos y blur.
              - Usamos clip-path para un recorte angular/curvo elegante a la izquierda.
              - Se integra directamente con el bloque decorativo de fondo.
            */}
            <div
              className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_30px_70px_rgba(4,30,66,0.15)] lg:aspect-[3.5/4]"
              style={{
                clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)', // Recorte diagonal a la izquierda
                borderRadius: '0 3rem 3rem 0', // Bordes redondeados solo a la derecha
              }}
            >
              <img
                src={heroVisual}
                alt="Ganadores Diners Club"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-110"
              />
              {/* Superposición sutil para integrar con la marca */}
              <div className="absolute inset-0 bg-diners-twilight/5 mix-blend-multiply" />
            </div>

            {/* Acento decorativo flotante mínimo (un punto azul) */}
            <div className="absolute -bottom-5 -left-5 h-10 w-10 rounded-full bg-diners-blue-sky/20 blur-xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
