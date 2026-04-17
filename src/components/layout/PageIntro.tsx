type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  variant?: 'light' | 'diners-blue' | 'centered-blue';
};

export const PageIntro = ({
  eyebrow,
  title,
  description,
  imageSrc,
  variant = 'light'
}: PageIntroProps) => {

  const isCenteredBlue = variant === 'centered-blue';
  // Ahora ambas variantes comparten la lógica de "fondo oscuro"
  const hasDarkBackground = variant === 'diners-blue' || variant === 'light';

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 min-h-[450px] flex items-center
      ${hasDarkBackground || isCenteredBlue
          ? 'bg-[#041E42] text-white'
          : 'bg-white text-diners-twilight'
        }`}
    >
      <div
        className={`container relative z-10 w-full
        ${isCenteredBlue
            ? 'flex flex-col items-center text-center'
            : 'grid items-center gap-10 lg:grid-cols-2'
          }`}
      >
        {/* TEXTO */}
        <div
          className={`
            flex flex-col justify-center py-20
            ${isCenteredBlue ? 'items-center text-center' : 'lg:min-h-[450px]'}
          `}
        >
          <div
            className={`mb-6 inline-flex w-fit rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em]
            ${hasDarkBackground || isCenteredBlue
                ? 'bg-white/10 text-[#00A3E0]'
                : 'bg-diners-lakefront/10 text-diners-lakefront'
              }`}
          >
            {eyebrow}
          </div>

          <h1
            className={`mb-6 font-black leading-[1.05] tracking-tighter
            ${isCenteredBlue
                ? 'text-4xl md:text-6xl max-w-3xl'
                : 'text-4xl md:text-5xl lg:text-4xl max-w-xl'
              }`}
          >
            {title}
          </h1>

          <p className="text-lg font-light leading-relaxed text-white/60 max-w-lg">
            {description}
          </p>
        </div>

        {/* IMAGEN CON CORTE EDITORIAL */}
        {!isCenteredBlue && (
          <div className="relative h-[400px] w-full lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[50%]">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url(${imageSrc || 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62'})`,
                clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)"
              }}
            >
              {/* Overlay para dar profundidad */}
              <div className="h-full w-full bg-gradient-to-r from-[#041E42]/40 to-transparent" />
            </div>
          </div>
        )}
      </div>

      {/* Acento inferior Diners */}
      {(hasDarkBackground) && (
        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#004C97]" />
      )}
    </section>
  );
};