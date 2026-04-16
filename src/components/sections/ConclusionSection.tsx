import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConclusionSection = () => (
  <section className="border-t border-diners-gray-1 bg-diners-white-sand/30 py-32">
    <div className="container max-w-4xl text-center">
      <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-diners-lakefront/10 rotate-3">
        <CheckCircle2 className="h-10 w-10 text-diners-lakefront" />
      </div>
      <h2 className="mb-8 text-4xl font-black tracking-tight text-diners-twilight md:text-5xl">
        Una Solucion Integral para tu <span className="text-diners-lakefront">Futuro</span>
      </h2>
      <p className="mx-auto mb-12 max-w-3xl text-xl font-light leading-relaxed text-diners-twilight-65">
        ELLAS DIGITAL conecta orientacion, formacion y empleabilidad basada en evidencia real del mercado. Con Diners Club Peru como referente, nuestras usuarias no solo aprenden, sino que comprenden como ingresar y crecer en el mundo tecnologico.
      </p>
      <Button size="lg" className="h-14 rounded-full bg-diners-blue-sky px-16 text-lg font-bold text-white shadow-2xl transition-all hover:bg-diners-hover">
        Unete a la Revolucion Digital
      </Button>
    </div>
  </section>
);
