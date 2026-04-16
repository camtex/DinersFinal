
import { Badge } from '@/components/ui/badge';

export const ImpactExpectedSection = () => (
  <section className="py-20 bg-diners-twilight text-white">
    <div className="container">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black mb-12">Nuestro Impacto Esperado</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Participación", desc: "Incremento femenino en tecnología", source: "UNICEF / UNESCO" },
            { title: "Habilidades", desc: "Desarrollo de competencias digitales", source: "WEF" },
            { title: "Empleabilidad", desc: "Mejora en inserción laboral juvenil", source: "OIT" },
            { title: "Equidad", desc: "Reducción de brechas de género", source: "UNICEF" }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-diners-blue-sky mb-2">{item.title}</h4>
              <p className="text-xs font-light text-diners-gray-1 mb-4">{item.desc}</p>
              <Badge variant="outline" className="text-[10px] font-medium border-white/20 text-white/60">{item.source}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
