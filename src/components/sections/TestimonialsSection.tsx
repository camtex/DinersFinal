

export const TestimonialsSection = () => (
  <section className="py-32 bg-white">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-block px-4 py-1.5 bg-diners-blue-sky/10 text-diners-blue-sky text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
          Voces que Inspiran
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-diners-twilight mb-6 tracking-tight">Historias de <span className="text-diners-lakefront">Éxito</span></h2>
        <p className="text-lg font-light text-diners-twilight-65">Experiencias reales de jóvenes que ya están transformando su futuro con nosotros.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            quote: "Antes no sabía si la tecnología era para mí. Ahora entiendo que puedo desarrollarme en este campo y liderar el cambio.",
            author: "Participante +ChicasTec",
            org: "UNICEF Perú"
          },
          {
            quote: "La mentoría me ayudó a entender qué habilidades necesito para trabajar en tecnología y cómo proyectar mi carrera.",
            author: "Joven en Formación",
            org: "Women in Tech / UNICEF"
          },
          {
            quote: "Ver roles reales me permitió proyectarme hacia el mundo laboral con confianza y claridad sobre mi futuro.",
            author: "Aspirante ELLAS DIGITAL",
            org: "Testimonio Aspiracional"
          }
        ].map((t, i) => (
          <div key={i} className="relative p-10 rounded-[2.5rem] bg-diners-white-sand/30 border border-diners-gray-1 flex flex-col h-full">
            <div className="text-6xl font-serif text-diners-lakefront/20 absolute top-6 left-6 leading-none">“</div>
            <p className="text-xl font-serif italic text-diners-twilight mb-10 leading-relaxed relative z-10">
              {t.quote}
            </p>
            <div className="mt-auto pt-6 border-t border-diners-gray-1">
              <p className="font-bold text-diners-twilight text-sm mb-1">{t.author}</p>
              <p className="text-xs font-black text-diners-lakefront uppercase tracking-widest">{t.org}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
