
import { motion } from 'framer-motion'
import {
  Search,
  BookOpen,
  Trophy,
  MessageSquare,
  FileText,
  Rocket
} from 'lucide-react';

export const EcosystemSection = () => (
  <section className="py-32 bg-diners-twilight text-white overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-diners-lakefront via-transparent to-transparent" />
    </div>

    <div className="container relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-20">
        {/* <div className="inline-block px-4 py-1.5 bg-diners-blue-sky/20 text-diners-blue-sky text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
          El Ecosistema ELLAS DIGITAL
        </div>*/}
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">De la Exploración al <br /><span className="text-diners-blue-sky">Éxito Profesional</span></h2>
        <p className="text-lg font-light text-diners-gray-1">Integramos cada etapa de tu crecimiento para transformar tu aprendizaje en una trayectoria real.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: <Search className="w-6 h-6" />, title: "Quiz Vocacional", desc: "Identifica tus fortalezas y áreas de interés en el mundo digital.", color: "bg-diners-lakefront" },
          { icon: <BookOpen className="w-6 h-6" />, title: "Rutas de Aprendizaje", desc: "Cursos especializados diseñados por expertos de Diners Club.", color: "bg-diners-tidepool" },
          { icon: <Trophy className="w-6 h-6" />, title: "Retos Prácticos", desc: "Resuelve problemas reales del sector financiero y gana puntos.", color: "bg-diners-blue-sky" },
          { icon: <MessageSquare className="w-6 h-6" />, title: "Mentoría", desc: "Conecta con líderes de Diners que guiarán tu crecimiento.", color: "bg-diners-twilight-65" },
          { icon: <FileText className="w-6 h-6" />, title: "Portafolio", desc: "Construye una vitrina de tus logros y proyectos realizados.", color: "bg-diners-gray-7" },
          { icon: <Rocket className="w-6 h-6" />, title: "Empleabilidad", desc: "Acceso directo a vacantes y programas de semilleros.", color: "bg-diners-lakefront" }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
            <p className="text-sm font-light text-diners-gray-1 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
