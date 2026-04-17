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

  const isBlue = variant === 'diners-blue';
  const isCenteredBlue = variant === 'centered-blue';

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500
      ${isCenteredBlue
          ? 'bg-[#041E42] text-white py-20'
          : isBlue
            ? 'bg-[#041E42] text-white min-h-[350px]'
            : 'bg-white text-diners-twilight border-b border-diners-gray-1/30 min-h-[350px]'
        }`}
    >

      <div
        className={`container relative z-10
        ${isCenteredBlue
            ? 'flex flex-col items-center text-center'
            : 'grid items-center gap-10 lg:grid-cols-2'
          }`}
      >

        {/* TEXTO */}
        <div
          className={`
            flex flex-col justify-center
            ${isCenteredBlue
              ? 'items-center text-center'
              : 'py-12 lg:min-h-[350px]'
            }
          `}
        >
          <div
            className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]
            ${isBlue || isCenteredBlue
                ? 'bg-white/10 text-diners-blue-sky'
                : 'bg-diners-lakefront/10 text-diners-lakefront'
              }`}
          >
            {eyebrow}
          </div>

          <h1
            className={`mb-4 font-black leading-[1.1] tracking-tight
            ${isCenteredBlue
                ? 'text-4xl md:text-5xl max-w-2xl'
                : 'text-3xl md:text-4xl max-w-md'
              }`}
          >
            {title}
          </h1>

          <p
            className={`text-sm font-light leading-relaxed
            ${isCenteredBlue
                ? 'text-white/70 max-w-xl'
                : isBlue
                  ? 'text-white/70 max-w-md'
                  : 'text-diners-twilight-65 max-w-md'
              }`}
          >
            {description}
          </p>

          {/* botón 
          {(isBlue || isCenteredBlue) && (
            <div className="mt-6">
              <button className="rounded-full bg-[#00A9E0] px-7 py-2 text-[10px] font-bold text-white uppercase tracking-wider">
                Saber más
              </button>
            </div>
          )}*/}
        </div>

        {(imageSrc || isBlue) && !isCenteredBlue && (
          <div className="relative h-full min-h-[300px] w-full lg:absolute lg:right-0 lg:top-0 lg:w-[50%]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${imageSrc || 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62'})`,
                clipPath: isBlue ? "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)" : "none"
              }}
            >
              <div className="h-full w-full bg-black/5" />
            </div>
          </div>
        )}

      </div>

      {isBlue && (
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#004C97]" />
      )}
    </section>
  );
};