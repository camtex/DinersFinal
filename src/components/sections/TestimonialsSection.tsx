import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      title: "Descubriendo mi camino",
      quote: "Antes no sabía si la tecnología era para mí. Ahora entiendo que puedo desarrollarme en este campo y liderar el cambio.",
      author: "Participante +ChicasTec",
      org: "UNICEF Perú",
      image: "https://cdn-3.expansion.mx/dims4/default/8bfa83f/2147483647/strip/true/crop/1253x836+0+0/resize/1200x801!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F03%2F15%2F135401ad49818a7925af973a3db3%2Fmujeres-stem-tecnologia.jpg"
    },
    {
      title: "Liderazgo en Ciberseguridad",
      quote: "La implementación del CERT híbrido me permitió entender la importancia de la respuesta ante incidentes en el sector financiero regional.",
      author: "Analista de Seguridad",
      org: "AndesFin S.A.",
      image: "https://cyberseccluster.org/wp-content/uploads/2025/08/ciberseguridad-costa-rica.jpg"
    },
    {
      title: "Orientación para crecer",
      quote: "La mentoría me ayudó a entender qué habilidades necesito para trabajar en tecnología y cómo proyectar mi carrera.",
      author: "Joven en Formación",
      org: "Women in Tech / UNICEF",
      image: "https://grupoclave.es/wp-content/uploads/2025/05/pexels-fauxels-3182778-scaled-1.jpg"
    },
    {
      title: "Innovación con Propósito",
      quote: "Poder diseñar soluciones que impactan directamente en la experiencia del socio Diners Club es lo que más me motiva cada día.",
      author: "Desarrollador Fullstack",
      org: "Diners Club Perú",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
    },
    {
      title: "Visualizando el futuro",
      quote: "Ver roles reales me permitió proyectarme hacia el mundo laboral con confianza y claridad sobre mi futuro profesional.",
      author: "Aspirante ELLAS DIGITAL",
      org: "Testimonio Aspiracional",
      image: "https://impulsodigital.mashumano.org/wp-content/uploads/2024/09/1-de-cada-mujeres-encuentran-empleo-con-Impulso-Digital.jpg"
    }
  ];

  const prev = () => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const t = testimonials[index];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container">

        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <span className="text-diners-lakefront text-[10px] font-black uppercase tracking-[0.3em] block mb-3x">
            Voces que Inspiran
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-diners-twilight tracking-tight">
            Historias de <span className="text-diners-lakefront">Impacto</span>
          </h2>
        </div>

        {/* CARRUSEL HORIZONTAL */}
        <div className="relative max-w-5xl mx-auto">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="grid lg:grid-cols-12 gap-0 rounded-[2.5rem] overflow-hidden border border-diners-gray-1 bg-white shadow-2xl"
            >

              {/* IMAGEN IZQUIERDA */}
              <div className="lg:col-span-5 h-[300px] lg:h-[450px] relative">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-diners-twilight/10 mix-blend-multiply" />
              </div>

              {/* CONTENIDO DERECHA */}
              <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center relative bg-white">
                <Quote className="absolute top-10 right-10 text-diners-gray-1/20 w-20 h-20 -z-0" />

                <div className="relative z-10">
                  <h3 className="text-xl font-black text-diners-lakefront mb-4 uppercase tracking-wider text-sm">
                    {t.title}
                  </h3>

                  <p className="text-xl lg:text-2xl font-light text-diners-twilight mb-8 leading-relaxed">
                    “{t.quote}”
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-diners-gray-1/50">
                    <div className="w-10 h-1 bg-diners-lakefront rounded-full" />
                    <div>
                      <p className="font-bold text-diners-twilight text-base">
                        {t.author}
                      </p>
                      <p className="text-xs font-black text-diners-twilight-65 uppercase tracking-widest">
                        {t.org}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLES FLOTANTES ABAJO */}
          <div className="absolute -bottom-6 right-10 flex gap-3">
            <button
              onClick={prev}
              className="bg-white border border-diners-gray-1 text-[#00A3E0] shadow-xl w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#00A3E0] hover:text-white transition-all"            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={next}
              className="bg-[#00A3E0] border border-diners-gray-1 text-white shadow-xl w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#00A3E0] hover:text-white transition-all"            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* INDICADORES LATERALES */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1 transition-all duration-300 rounded-full ${i === index
                  ? "h-12 bg-[#00A3E0]"
                  : "h-4 bg-diners-gray-1/40 hover:bg-[#006C73]"
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};