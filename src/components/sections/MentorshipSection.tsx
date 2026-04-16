
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MentorshipSection = () => (
  <section className="py-32 bg-white">
    <div className="container">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-diners-lakefront/10 text-diners-lakefront text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Acompañamiento Experto
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-6 tracking-tight">La Mentoría: Tu <span className="text-diners-lakefront">Puente al Éxito</span></h2>
          <p className="text-lg font-light text-diners-twilight-65 max-w-2xl mx-auto">
            En ELLAS DIGITAL, la mentoría no es solo un consejo, es el factor clave que acelera tu crecimiento profesional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { value: "77%", label: "Permanencia", desc: "Más probabilidad de continuar en tecnología.", source: "Anita Borg Institute", color: "text-diners-lakefront" },
            { value: "5x", label: "Crecimiento", desc: "Más probabilidad de crecimiento profesional.", source: "LinkedIn Learning", color: "text-diners-tidepool" },
            { value: "89%", label: "Factor Clave", desc: "De mujeres considera la mentoría clave para su carrera.", source: "Women Who Tech", color: "text-diners-blue-sky" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-xl bg-diners-white-sand/30 rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-all">
              <CardHeader className="text-center pt-10">
                <div className={`text-5xl font-black ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>{stat.value}</div>
                <CardTitle className="text-base font-bold text-diners-twilight uppercase tracking-widest">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-8 pb-10">
                <p className="text-sm font-light text-diners-twilight-65 mb-4 leading-relaxed">
                  {stat.desc}
                </p>
                <div className="text-[10px] font-bold text-diners-gray-7 uppercase tracking-wider">{stat.source}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);
