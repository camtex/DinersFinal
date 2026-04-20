import { Target, Zap, TrendingUp, Award } from 'lucide-react'; // Iconos para dar peso visual

export const ImpactExpectedSection = () => (
  <section className="py-24 bg-diners-twilight text-white relative overflow-hidden">
    {/* Decoración sutil de fondo */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-diners-blue-sky/5 blur-[120px] rounded-full" />

    <div className="container relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black">Tu evolucion con nosotros.</h2>
          <p className="mt-4 text-white/50 font-light max-w-xl mx-auto">
            No solo buscamos talento, diseñamos el entorno para que alcances tu máximo potencial dentro de la corporación.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Evaluacion real",
              desc: "Tu perfil se evalua con criterios precisos para conectarte con oportunidades relevantes.",
              icon: <Target className="w-5 h-5" />,
              tag: "Analisis aplicado"
            },
            {
              title: "Rutas agiles",
              desc: "Procesos de seleccion optimizados: menos burocracia y mas foco en tu talento.",
              icon: <Zap className="w-5 h-5" />,
              tag: "Eficiencia"
            },
            {
              title: "Desarrollo continuo",
              desc: "Acceso a rutas de aprendizaje alineadas con las vacantes del manana.",
              icon: <TrendingUp className="w-5 h-5" />,
              tag: "Crecimiento"
            },
            {
              title: "Certificacion",
              desc: "Validamos tus competencias con el estandar de Diners Club.",
              icon: <Award className="w-5 h-5" />,
              tag: "Excelencia"
            }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-diners-blue-sky/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-diners-blue-sky/10 flex items-center justify-center text-diners-blue-sky mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-3">{item.title}</h4>
              <p className="text-sm font-light text-white/50 leading-relaxed mb-6">{item.desc}</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-diners-blue-sky/60">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
