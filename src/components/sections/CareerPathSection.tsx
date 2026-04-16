
import { motion } from 'framer-motion';


export const CareerPathSection = () => (
  <section className="py-32 bg-diners-white-sand/20">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-block px-4 py-1.5 bg-diners-twilight/10 text-diners-twilight text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
          Línea de Carrera
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-6 tracking-tight">Tu Trayectoria en <span className="text-diners-lakefront">Diners</span></h2>
        <p className="text-lg font-light text-diners-twilight-65 leading-relaxed">
          Desde tus primeros pasos como practicante hasta roles de liderazgo estratégico, construimos caminos basados en el mérito y la innovación.
        </p>
      </div>
  
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-diners-gray-1 hidden md:block" />
        
        <div className="space-y-16">
          {[
            { level: "Gerencia", roles: ["Gerente de Tecnología", "Gerente de Soluciones Funcionales"], color: "bg-diners-twilight", desc: "Liderazgo estratégico y visión de futuro." },
            { level: "Subgerencia", roles: ["Subgerente de Desarrollo", "Subgerente de Infraestructura", "Subgerente de Ciberseguridad"], color: "bg-diners-lakefront", desc: "Gestión táctica y excelencia operativa." },
            { level: "Jefatura", roles: ["Jefe de Data Governance", "Jefes de Proyecto"], color: "bg-diners-tidepool", desc: "Liderazgo de equipos y ejecución de proyectos." },
            { level: "Especialista", roles: ["Especialistas de Desarrollo", "Especialistas de Seguridad"], color: "bg-diners-blue-sky", desc: "Dominio técnico y mentoría de talentos." },
            { level: "Analista", roles: ["Analistas de Sistemas", "Analistas de Datos"], color: "bg-diners-twilight-65", desc: "Ejecución técnica y análisis de soluciones." },
            { level: "Semillero", roles: ["Practicantes Pre-profesionales", "Practicantes Profesionales"], color: "bg-diners-gray-4", desc: "Primeros pasos y aprendizaje acelerado." },
          ].map((item, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-diners-lakefront z-10" />
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`p-8 rounded-[2rem] bg-white shadow-lg border border-diners-gray-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                >
                  
                  <h4 className="text-xl font-bold text-diners-twilight mb-3 leading-tight">{item.roles.join(" / ")}</h4>
                  <p className="text-sm font-light text-diners-twilight-65 leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>
              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
