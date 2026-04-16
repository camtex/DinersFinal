
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConclusionSection = () => (
  <section className="py-32 bg-diners-white-sand/30 border-t border-diners-gray-1">
    <div className="container mx-auto px-6 text-center max-w-4xl">
      <div className="w-20 h-20 bg-diners-lakefront/10 rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-3">
        <CheckCircle2 className="w-10 h-10 text-diners-lakefront" />
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-8 tracking-tight">Una Solución Integral para tu <span className="text-diners-lakefront">Futuro</span></h2>
      <p className="text-xl font-light text-diners-twilight-65 leading-relaxed mb-12 max-w-3xl mx-auto">
        ELLAS DIGITAL conecta orientación, formación y empleabilidad basada en evidencia real del mercado. Con Diners Club Perú como referente, nuestras usuarias no solo aprenden, sino que comprenden cómo ingresar y crecer en el mundo tecnológico.
      </p>
      <Button size="lg" className="bg-diners-twilight hover:bg-diners-lakefront text-white rounded-full px-16 h-18 text-xl font-bold shadow-2xl hover:shadow-diners-lakefront/20 transition-all">
        Únete a la Revolución Digital
      </Button>
    </div>
  </section>
);
