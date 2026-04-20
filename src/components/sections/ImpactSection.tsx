import { motion } from 'framer-motion';
import { Laptop, TrendingDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ImpactSection = () => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const femalePercentage = 30;
  const offset = circumference - (circumference * femalePercentage) / 100;

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-diners-lakefront/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-diners-twilight/5 rounded-full blur-[150px] -z-10" />

      <div className="container px-6">
        {/* Header con Badge */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-diners-lakefront" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-diners-twilight/60">Impacto Social 2026</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-diners-twilight tracking-tighter leading-[1.1] mb-6">
            Cerrando la brecha de <br />
            <span className="text-diners-lakefront relative">
              oportunidades STEAM.
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-diners-lakefront/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>
          <p className="text-lg font-light text-slate-500 leading-relaxed max-w-xl mx-auto">
            En Diners Club, creemos que la innovación no tiene género. Estamos transformando el panorama digital integrando el talento femenino en el núcleo de la tecnología.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-12 gap-6 max-w-6xl mx-auto">

          {/* 1. Main Stat Card (Círculo) - Ocupa 5 columnas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8 }}
            className="md:col-span-5 relative p-10 rounded-[2.5rem] bg-[#041E42] text-white overflow-hidden shadow-[0_20px_50px_rgba(4,30,66,0.2)] group"
          >
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-44 h-44 mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r={radius} fill="none" className="stroke-white/5" strokeWidth="8" />
                  <motion.circle
                    cx="60" cy="60" r={radius}
                    fill="none"
                    stroke="#00A3E0"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    transition={{ duration: 2, ease: "circOut" }}
                    style={{ strokeDasharray: circumference }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tracking-tighter text-white">3<span className="text-diners-lakefront">/</span>10</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mujeres</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Brecha de Talento</h3>
              <p className="text-sm font-light text-white/60 text-center leading-relaxed">
                De cada 10 profesionales en ciencia y tecnología en el Perú, solo 3 son mujeres. Cambiemos la cifra.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 w-full text-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30 italic">Fuente: CONCYTEC</span>
              </div>
            </div>
            {/* Efecto de luz interna */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-diners-lakefront/20 blur-[60px] rounded-full" />
          </motion.div>

          {/* 2. Secondary Stat Card - Ocupa 7 columnas arriba */}
          <div className="md:col-span-7 grid grid-rows-2 gap-6">

            {/* Subcard: 90% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-200 flex items-center gap-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Laptop className="w-10 h-10 text-diners-twilight" />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-black text-diners-twilight tracking-tighter">90%</span>
                  <span className="text-sm font-bold text-diners-lakefront uppercase">Exigencia</span>
                </div>
                <p className="text-slate-500 font-light leading-snug">
                  De los empleos actuales demandan competencias digitales avanzadas. La preparación es la clave del éxito.
                </p>
              </div>
            </motion.div>

            {/* Subcard: CTA y Urgencia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[2.5rem] bg-diners-lakefront text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,163,224,0.25)]"
            >
              <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-white/60" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Acción Inmediata</span>
                </div>
                <h4 className="text-2xl font-bold leading-tight">Es momento de liderar el cambio.</h4>
              </div>
              <Link
                to="/postula"
                className="group relative flex items-center justify-center gap-3 bg-[#041E42] text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:pr-10 active:scale-95 overflow-hidden"
              >
                <span>Únete a ELLAS DIGITAL</span>
                <ArrowUpRight className="w-4 h-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Footer de Sección */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />
          <p className="text-2xl md:text-3xl font-black text-diners-twilight text-center max-w-2xl tracking-tighter">
            Rompiendo barreras:<span className="text-diners-lakefront"> nuestro talento no tiene límites y con nuestros códigos abrimos camino hacia donde merecemos.</span>
          </p>
        </div>
      </div>
    </section>
  );
};