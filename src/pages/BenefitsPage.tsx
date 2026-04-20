import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageIntro } from '@/components/layout/PageIntro'; // Importamos el componente estándar

const benefits = [
  { icon: GraduationCap, title: 'Crecimiento Exponencial', desc: 'Certificaciones y rutas de carrera claras.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' },
  { icon: HeartPulse, title: 'Bienestar Integral', desc: 'Equilibrio real entre vida y oficina.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
  { icon: Home, title: 'Cultura Flexible', desc: 'Modelos híbridos adaptados a ti.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
];

export const BenefitsPage = () => (
  <main className="bg-white">
    {/* HERO SECTION: Ahora usa PageIntro para consistencia total */}
    <PageIntro
      variant="diners-blue"
      eyebrow=""
      title="Tu carrera merece un estandar superior"
      description="No solo ofrecemos beneficios; construimos un ecosistema donde el talento digital y financiero encuentra su maxima expresion con un nivel de excelencia internacional."
      imageSrc="./imagen3.png" // Imagen profesional/editorial
    />

    {/* BENEFICIOS: Cards con Imagen y Efecto de Elevación */}
    <section className="py-24 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(4,30,66,0.05)] border border-diners-gray-1/20"
            >
              <img src={b.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={b.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-diners-twilight via-diners-twilight/30 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                  <b.icon className="text-diners-blue-sky w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{b.title}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* DIFERENCIALES: Split Layout con Imagen Flotante Estilo Vacantes */}
    <section className="py-28 bg-diners-twilight text-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Imagen Principal con bordes extra redondeados */}
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border-[12px] border-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Cultura profesional Diners"
              />
            </div>

            {/* Floating Badge Card - Estilo Vacantes */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -bottom-6 -right-6 lg:-right-12 bg-diners-blue-sky p-8 rounded-[2.5rem] shadow-3xl max-w-[280px]"
            >
              <Sparkles className="text-diners-twilight mb-4 w-8 h-8" />
              <p className="font-black text-diners-twilight text-xl leading-tight tracking-tight">
                Elevamos tu perfil al estándar internacional.
              </p>
            </motion.div>
          </div>

          <div className="space-y-12">
            <div>
              <span className="text-diners-blue-sky text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                Por qué Diners Club
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                Un ecosistema de <br />
                <span className="text-diners-blue-sky font-light">alto rendimiento.</span>
              </h2>
            </div>

            <div className="grid gap-10">
              {[
                { t: 'Talento con Aceleración', d: 'Proyectos visibles desde el día uno con impacto real en la región.' },
                { t: 'Marca de Prestigio', d: 'Respaldo de una red global con ejecucion local de estandar superior.' },
                { t: 'Rutas de Proyección', d: 'Mentorías directas con líderes que están transformando el sector financiero.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-diners-blue-sky group-hover:border-diners-blue-sky transition-all duration-500">
                    <CheckCircle2 className="w-5 h-5 text-diners-blue-sky group-hover:text-diners-twilight" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1 uppercase tracking-wider text-white">{item.t}</h4>
                    <p className="text-white/50 font-light leading-relaxed text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA FINAL: Reutilizando el estilo de tarjetas de vacantes */}
    <section className="py-32 bg-diners-white-sand">
      <div className="container">
        <div className="mx-auto max-w-4xl bg-white border border-diners-gray-1/50 rounded-[4rem] p-12 md:p-20 text-center shadow-[0_30px_60px_rgba(4,30,66,0.08)] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-diners-twilight mb-6 tracking-tight">¿Listo para el siguiente paso?</h2>
            <p className="text-lg font-light text-diners-twilight-65 mb-10 max-w-xl mx-auto">
              Explora nuestras vacantes y encuentra el lugar donde tu talento brillará bajo la cultura Diners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/postula"
                className="bg-[#00A3E0] border border-[#00A3E0] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#006C73] hover:border-[#006C73] transition-all"
              >                Postulación Rápida
              </Link>
            </div>
          </div>
          {/* Elemento decorativo sutil */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-diners-blue-sky/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </section>
  </main>
);
