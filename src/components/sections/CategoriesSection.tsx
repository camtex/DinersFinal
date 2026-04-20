import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from '../../data/mockData';

export const CategoriesSection = () => (
  <section id="categorias" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
    {/* Decoración de fondo sutil */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-diners-lakefront/5 rounded-full blur-[120px] -z-10" />

    <div className="container px-6">
      {/* Encabezado con estilo */}
      <div className="max-w-2xl mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-diners-lakefront" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-diners-lakefront">Ecosistema</span>
        </div>
        <h2 className="text-4xl font-black text-diners-twilight tracking-tighter mb-4">
          Explora nuestras <span className="text-diners-lakefront">Áreas de Impacto.</span>
        </h2>
        <p className="text-slate-500 font-light text-lg">
          Descubre dónde tu talento puede transformar la experiencia financiera en Diners Club Perú.
        </p>
      </div>

      {/* Grid de Categorías mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <Card className="h-full border-none bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] overflow-hidden relative">
              {/* Borde sutil de luz al hacer hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-diners-lakefront/10 rounded-[2.5rem] transition-colors duration-500" />

              {/* Contenido centrado verticalmente */}
              <CardContent className="p-10 flex flex-col items-center justify-center text-center h-full min-h-[320px]">

                {/* Icono con contenedor estilizado y animación de escala */}
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 text-diners-twilight flex items-center justify-center mb-8 group-hover:bg-diners-twilight group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                  <div className="scale-125">
                    {cat.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-diners-twilight tracking-tight group-hover:text-diners-lakefront transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-[13px] text-slate-500 font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer de sección sutil */}
      <div className="mt-20 flex flex-col items-center">
        <div className="h-px w-20 bg-slate-200 mb-8" />
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.2em]">
          Innovación constante • Excelencia • Compromiso
        </p>
      </div>
    </div>
  </section>
);