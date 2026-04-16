
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Hero = ({ onStart }: { onStart: () => void }) => (
  <section id="inicio" className="relative pt-32 pb-40 overflow-hidden bg-white">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-diners-white-sand/50 -skew-x-12 translate-x-1/4 z-0" />
    <div className="absolute top-40 right-20 w-64 h-64 bg-diners-blue-sky/5 rounded-full blur-3xl" />
    <div className="absolute bottom-20 left-20 w-96 h-96 bg-diners-lakefront/5 rounded-full blur-3xl" />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-diners-lakefront" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-diners-lakefront">Talento & Innovación</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-diners-twilight leading-[0.9] mb-8 tracking-tighter">
            Tu Camino en <br />
            <span className="text-diners-lakefront">Diners Club</span>
          </h1>
          
          <p className="text-xl font-light text-diners-twilight-65 mb-12 leading-relaxed max-w-2xl">
            Diseñamos el futuro financiero con un propósito claro: empoderar a la próxima generación. Si buscas transformar el mundo digital, este es tu punto de partida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg" 
              className="bg-diners-twilight hover:bg-diners-lakefront text-white rounded-full px-10 h-16 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group"
              onClick={onStart}
            >
              Comenzar Exploración
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-diners-gray-4 text-diners-twilight hover:bg-diners-white-sand rounded-full px-10 h-16 text-lg font-bold transition-all"
            >
              Conoce ELLAS DIGITAL
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
