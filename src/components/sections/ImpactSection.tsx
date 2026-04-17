import { motion } from 'framer-motion';
import { Laptop, TrendingDown } from 'lucide-react';

export const ImpactSection = () => {
  // Configuración del gráfico circular animado (SVG)
  const radius = 50; // Radio del círculo
  const circumference = 2 * Math.PI * radius; // Circunferencia total
  const femalePercentage = 30; // 3 de cada 10 = 30%
  const offset = circumference - (circumference * femalePercentage) / 100; // El "stroke-dashoffset" para el 30%

  return (
    <section className="py-20 bg-white overflow-hidden border-b border-diners-gray-1">
      <div className="container">
        {/* Encabezado Compacto y Centrado */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-3xl md:text-4xl font-black text-diners-twilight tracking-tight leading-tight">
            Cerrando la brecha de <span className="text-diners-lakefront italic">Oportunidades STEAM.</span>
          </h2>
          <p className="mt-5 text-base font-light text-diners-twilight-65 leading-relaxed max-w-xl mx-auto">
            El talento no tiene género, pero las oportunidades hoy sí. Estamos perdiendo innovación crucial al no integrar a más mujeres en la creación tecnológica.
          </p>
        </div>

        {/* Layout Horizontal y Compacto (Bento List) */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">

          {/* 1. GRÁFICO CIRCULAR ANIMADO (3 de cada 10) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-[2rem] bg-diners-twilight text-white flex flex-col items-center justify-center text-center shadow-lg relative group"
          >
            {/* SVG Radial Progress */}
            <div className="relative w-36 h-36 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Círculo base (fondo gris) */}
                <circle
                  cx="60" cy="60" r={radius}
                  fill="none"
                  className="stroke-white/10"
                  strokeWidth="10"
                />
                {/* Círculo animado (progreso azul) */}
                <motion.circle
                  cx="60" cy="60" r={radius}
                  fill="none"
                  className="stroke-diners-blue-sky"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ strokeDasharray: circumference }}
                />
              </svg>
              {/* Texto central dentro del SVG */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black tracking-tighter text-diners-blue-sky">3/10</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-white/60">STEAM Perú</span>
              </div>
            </div>

            <p className="text-xs font-light text-white/70 leading-relaxed max-w-xs">
              De cada 10 profesionales en ciencia y tecnología, solo 3 son mujeres.
            </p>
            <span className="mt-4 text-[8px] font-bold text-white/30 uppercase tracking-widest">Fuente: CONCYTEC</span>
          </motion.div>

          {/* 2. STAT CARD: Demanda Digital (Más chica) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-[2rem] bg-white border border-diners-gray-1 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-diners-lakefront/10 text-diners-lakefront flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-diners-twilight-65 uppercase tracking-widest mb-3">Habilidades Exigidas</h4>
              <div className="text-4xl font-black text-diners-twilight mb-3 tracking-tighter">
                90% <span className="text-xl text-diners-twilight-65">de empleos</span>
              </div>
              <p className="text-xs font-light text-diners-twilight-65 leading-relaxed max-w-xs">
                actuales ya requieren competencias digitales avanzadas para postular.
              </p>
            </div>
            <span className="mt-6 text-[8px] font-bold text-diners-gray-1 uppercase tracking-widest">OIT / WEF</span>
          </motion.div>

          {/* 3. CTA CARD (Urgencia) */}
          <motion.div
            whileHover={{ scale: 0.99 }}
            className="p-8 rounded-[2rem] bg-diners-white-sand/50 border border-diners-gray-1 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-diners-twilight mb-2">Es el momento.</h4>
              <p className="text-xs font-light text-diners-twilight-65 leading-relaxed mb-6">
                La pérdida de talento femenino frena la innovación corporativa. Necesitamos tu visión.
              </p>
            </div>
            <button className="w-full bg-diners-twilight hover:bg-diners-lakefront text-white px-6 py-3 rounded-full font-bold text-xs transition-colors shadow-md">
              Únete a ELLAS DIGITAL
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};