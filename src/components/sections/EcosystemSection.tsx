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
  <section className="py-24 bg-diners-twilight text-white relative">

    <div className="container">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          De la Exploración al{" "}
          <span className="text-diners-blue-sky">Éxito Profesional</span>
        </h2>
        <p className="text-diners-gray-1">
          Integramos cada etapa de tu crecimiento para transformar tu aprendizaje en una trayectoria real.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[
          {
            icon: <Search className="w-5 h-5" />,
            title: "Test vocacional",
            desc: "Identifica tus fortalezas y áreas de interés en el mundo digital."
          },
          {
            icon: <BookOpen className="w-5 h-5" />,
            title: "Rutas de Aprendizaje",
            desc: "Cursos especializados diseñados por expertos de Diners Club."
          },
          {
            icon: <Trophy className="w-5 h-5" />,
            title: "Retos Prácticos",
            desc: "Resuelve problemas reales del sector financiero y gana puntos."
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            title: "Mentoría",
            desc: "Conecta con líderes de Diners que guiarán tu crecimiento."
          },
          {
            icon: <FileText className="w-5 h-5" />,
            title: "Portafolio",
            desc: "Construye una vitrina de tus logros y proyectos realizados."
          },
          {
            icon: <Rocket className="w-5 h-5" />,
            title: "Empleabilidad",
            desc: "Acceso directo a vacantes y programas de semilleros."
          }
        ].map((item, i) => (

          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:bg-white/10 hover:shadow-lg hover:shadow-black/20
                       transition-all duration-300"
          >

            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="text-base font-semibold text-white">
                {item.title}
              </h4>
            </div>

            {/* Description */}
            <p className="text-sm text-diners-gray-1 leading-relaxed">
              {item.desc}
            </p>

          </motion.div>

        ))}
      </div>

    </div>
  </section>
);
