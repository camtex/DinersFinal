import { useState } from "react";

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      title: "Descubriendo mi camino",
      quote:
        "Antes no sabía si la tecnología era para mí. Ahora entiendo que puedo desarrollarme en este campo y liderar el cambio.",
      author: "Participante +ChicasTec",
      org: "UNICEF Perú",
      image:
        "https://cdn-3.expansion.mx/dims4/default/8bfa83f/2147483647/strip/true/crop/1253x836+0+0/resize/1200x801!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F03%2F15%2F135401ad49818a7925af973a3db3%2Fmujeres-stem-tecnologia.jpg"
    },
    {
      title: "Orientación para crecer",
      quote:
        "La mentoría me ayudó a entender qué habilidades necesito para trabajar en tecnología y cómo proyectar mi carrera.",
      author: "Joven en Formación",
      org: "Women in Tech / UNICEF",
      image:
        "https://grupoclave.es/wp-content/uploads/2025/05/pexels-fauxels-3182778-scaled-1.jpg"
    },
    {
      title: "Visualizando el futuro",
      quote:
        "Ver roles reales me permitió proyectarme hacia el mundo laboral con confianza y claridad sobre mi futuro.",
      author: "Aspirante ELLAS DIGITAL",
      org: "Testimonio Aspiracional",
      image:
        "https://impulsodigital.mashumano.org/wp-content/uploads/2024/09/1-de-cada-mujeres-encuentran-empleo-con-Impulso-Digital.jpg"
    }
  ];

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const t = testimonials[index];

  return (
    <section className="py-32 bg-white">
      <div className="container">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 bg-diners-blue-sky/10 text-diners-blue-sky text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Voces que Inspiran
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-6 tracking-tight">
            Historias de <span className="text-diners-lakefront">Éxito</span>
          </h2>

          <p className="text-lg font-light text-diners-twilight-65">
            Experiencias reales de jóvenes que ya están transformando su futuro con nosotros.
          </p>
        </div>

        {/* CARRUSEL */}
        <div className="relative max-w-xl mx-auto">

          {/* CARD */}
          <div className="rounded-[2.5rem] overflow-hidden border border-diners-gray-1 bg-white shadow-lg transition-all duration-500">

            {/* IMAGEN */}
            <div className="relative h-[250px]">
              <img
                src={t.image}
                alt={t.author}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* CONTENIDO */}
            <div className="p-8">
              <h3 className="text-xl font-extrabold text-diners-twilight mb-3">
                {t.title}
              </h3>

              <p className="text-lg font-serif italic text-diners-twilight mb-8 leading-relaxed">
                “{t.quote}”
              </p>

              <div className="pt-4 border-t border-diners-gray-1">
                <p className="font-bold text-diners-twilight text-sm mb-1">
                  {t.author}
                </p>
                <p className="text-xs font-black text-diners-lakefront uppercase tracking-widest">
                  {t.org}
                </p>
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            ›
          </button>

          {/* INDICADORES */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${i === index
                    ? "w-6 bg-diners-lakefront"
                    : "w-2 bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};