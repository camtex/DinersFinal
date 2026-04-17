import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Home, Sparkles, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: GraduationCap, title: 'Crecimiento Exponencial', desc: 'Certificaciones y rutas de carrera claras.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' },
  { icon: HeartPulse, title: 'Bienestar Integral', desc: 'Equilibrio real entre vida y oficina.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
  { icon: Home, title: 'Cultura Flexible', desc: 'Modelos híbridos adaptados a ti.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
];

export const BenefitsPage = () => (
  <main className="bg-white">
    {/* HERO SECTION: Refinado y Editorial */}
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-diners-lakefront text-[10px] font-black uppercase tracking-[0.4em] mb-6 block"
          >
            People & Culture
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-diners-twilight tracking-tighter leading-[0.95] mb-8"
          >
            Tu carrera merece un <br />
            <span className="text-diners-lakefront italic font-light">estándar premium.</span>
          </motion.h1>
          <p className="text-xl font-light text-diners-twilight-65 max-w-2xl leading-relaxed">
            No solo ofrecemos beneficios; construimos un ecosistema donde el talento digital y financiero encuentra su máxima expresión.
          </p>
        </div>
      </div>
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-diners-white-sand/50 -z-0 rounded-l-[5rem]" />
    </section>

    {/* BENEFICIOS: Cards con Imagen y Hover Efecto */}
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img src={b.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={b.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-diners-twilight via-diners-twilight/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <b.icon className="text-diners-blue-sky w-10 h-10 mb-4" />
                <h3 className="text-2xl font-black text-white mb-2">{b.title}</h3>
                <p className="text-white/70 font-light text-sm">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* DIFERENCIALES: Split Layout Dinámico */}
    <section className="py-24 bg-diners-twilight text-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[4rem] overflow-hidden border-[12px] border-white/5">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Diners Professional"
              />
            </div>
            {/* Float Card */}
            <div className="absolute -bottom-10 -right-10 bg-diners-lakefront p-8 rounded-[2rem] shadow-2xl max-w-xs hidden md:block">
              <Sparkles className="text-white mb-4 w-8 h-8" />
              <p className="font-bold text-lg leading-tight">Elevamos tu perfil al estándar internacional.</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-6">¿Por qué elegirnos?</h2>
              <div className="h-1 w-20 bg-diners-blue-sky" />
            </div>

            <div className="grid gap-8">
              {[
                { t: 'Talento con Aceleración', d: 'Proyectos visibles desde el día uno con impacto real.' },
                { t: 'Marca de Prestigio', d: 'Respaldo de una red global con ejecución local premium.' },
                { t: 'Rutas de Proyección', d: 'Mentorías directas con líderes que transforman el sector.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-diners-blue-sky transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-diners-blue-sky group-hover:text-diners-twilight" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1 uppercase tracking-wider">{item.t}</h4>
                    <p className="text-white/50 font-light leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* PILARES: Grid Minimalista */}
    <section className="py-32">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-diners-twilight tracking-tight">Cultura y Estabilidad</h2>
          <div className="mt-4 flex justify-center gap-10">
            {[
              { v: '+30', l: 'Años de historia' },
              { v: '+500', l: 'Colaboradores' },
              { v: '#1', l: 'Top Employer' }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-diners-lakefront">{s.v}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-diners-twilight-65">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Formación Continua', 'Tecnología IA-First', 'Liderazgo Humano', 'Balance Híbrido'
          ].map((p, i) => (
            <div key={i} className="p-8 border border-diners-gray-1 rounded-[2rem] hover:bg-diners-white-sand/30 transition-colors">
              <div className="w-2 h-2 bg-diners-lakefront rounded-full mb-4" />
              <h4 className="font-bold text-diners-twilight uppercase text-xs tracking-[0.2em]">{p}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA FINAL: Elegante */}
    <section className="pb-32">
      <div className="container">
        <div className="bg-diners-blue-sky/10 rounded-[4rem] p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-diners-twilight mb-6">¿Lista para el siguiente paso?</h2>
            <p className="text-lg font-light text-diners-twilight-65 mb-10 max-w-xl mx-auto">
              Explora nuestras vacantes y encuentra el lugar donde tu talento brillará con fuerza.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/vacantes" className="bg-diners-twilight text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-diners-lakefront transition-all">
                Ver Vacantes Activas
              </Link>
              <Link to="/postula" className="border border-diners-twilight text-diners-twilight px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-diners-twilight hover:text-white transition-all">
                Postulación Espontánea
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-diners-lakefront/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </section>
  </main>
);