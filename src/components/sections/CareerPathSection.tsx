import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';

export const CareerPathSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const careerData = [
    {
      level: "Nivel 01",
      roles: ["Practicantes Pre-profesionales", "Practicantes Profesionales"],
      desc: "Inicia tu camino en un entorno de aprendizaje acelerado, participando en proyectos reales desde el primer día.",
      image: "https://www.universia.net/content/dam/universia/imagenes/2020/03/practicas_pre_profesionales/_jcr_content/renditions/thumb-xl.jpg"
    },
    {
      level: "Nivel 02",
      roles: ["Analistas de Sistemas", "Analistas de Datos"],
      desc: "Consolidación técnica. Serás responsable de la ejecución y el análisis de soluciones críticas para el negocio.",
      image: "https://st.depositphotos.com/18719442/53774/i/450/depositphotos_537744316-stock-photo-data-management-system-business-analytics.jpg"
    },
    {
      level: "Nivel 03",
      roles: ["Especialistas de Desarrollo", "Especialistas de Seguridad"],
      desc: "Dominio experto. Liderarás la arquitectura técnica y actuarás como mentor para los nuevos talentos.",
      image: "https://www.genetec.com/binaries/content/gallery/photostock_server-room_techinician_gettyimages-1334003868.jpg"
    },
    {
      level: "Nivel 04",
      roles: ["Jefe de Data Governance", "Jefes de Proyecto"],
      desc: "Gestión de impacto. Responsable de dirigir equipos multidisciplinarios y asegurar el cumplimiento de objetivos estratégicos.",
      image: "https://img.innovaciondigital360.com/wp-content/uploads/2021/11/29093218/080.jpg"
    },
    {
      level: "Nivel 05",
      roles: ["Subgerente de Desarrollo", "Subgerente de Ciberseguridad"],
      desc: "Liderazgo táctico. Toma de decisiones operativas de alto nivel y diseño de la hoja de ruta tecnológica.",
      image: "https://media.datacenterdynamics.com/media/images/GettyImages-1159763172.original.jpg"
    },
    {
      level: "Nivel 06",
      roles: ["Gerente de Tecnología", "Gerente de Soluciones"],
      desc: "Visión estratégica. Definición del futuro digital de Diners Club y liderazgo de la transformación organizacional.",
      image: "https://ekosnegocios.com/image/posts/October2023/Zfr44AiigxpoJClpcOLG.jpg"
    },
  ];

  const nextStep = () => setActiveStep((prev) => (prev + 1) % careerData.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + careerData.length) % careerData.length);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container">

        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-diners-lakefront text-[10px] font-black uppercase tracking-[0.3em] block mb-4">
              Crecimiento Exponencial
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-diners-twilight tracking-tight">
              Línea de <span className="text-diners-lakefront">Carrera</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={prevStep} className="p-3 rounded-full border border-diners-gray-1 hover:bg-diners-twilight hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextStep} className="p-3 rounded-full bg-diners-twilight text-white hover:bg-diners-lakefront transition-all shadow-lg">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carrusel de Enfoque */}
        <div className="relative grid lg:grid-cols-12 gap-12 items-center">

          {/* Lado Izquierdo: Información */}
          <div className="lg:col-span-5 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-diners-lakefront">
                  <Briefcase size={18} />
                  <span className="font-bold text-sm uppercase tracking-widest">{careerData[activeStep].level}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-diners-twilight leading-tight">
                  {careerData[activeStep].roles.map((role, idx) => (
                    <span key={idx} className="block">{role}</span>
                  ))}
                </h3>

                <p className="text-lg font-light text-diners-twilight-65 leading-relaxed">
                  {careerData[activeStep].desc}
                </p>

                {/* Indicadores de progreso */}
                <div className="flex gap-2 pt-6">
                  {careerData.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 transition-all duration-500 rounded-full ${i === activeStep ? 'w-12 bg-diners-lakefront' : 'w-4 bg-diners-gray-1'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Lado Derecho: Imagen con máscara Diners */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-4 bg-diners-blue-sky/5 rounded-[3rem] blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white"
              >
                <img
                  src={careerData[activeStep].image}
                  alt="Carrera Diners"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-diners-twilight/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Tarjeta flotante de "Siguiente" (Preview) */}
            <div className="absolute -bottom-6 -right-6 hidden md:block w-48 p-4 bg-white shadow-xl rounded-2xl border border-diners-gray-1 transform rotate-3">
              <p className="text-[8px] font-black uppercase text-diners-lakefront mb-1">Próximo paso</p>
              <p className="text-[10px] font-bold text-diners-twilight truncate">
                {careerData[(activeStep + 1) % careerData.length].roles[0]}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};