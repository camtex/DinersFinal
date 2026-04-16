type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const PageIntro = ({ eyebrow, title, description }: PageIntroProps) => (
  <section className="relative overflow-hidden border-b border-diners-gray-1/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,247,247,0.85)_100%)] py-20">
    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(0,76,151,0.12),transparent_68%)]" />
    <div className="container relative z-10">
      <div className="max-w-3xl">
        <div className="mb-6 inline-flex rounded-full bg-diners-lakefront/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-diners-lakefront">
          {eyebrow}
        </div>
        <h1 className="mb-5 text-4xl font-black tracking-tight text-diners-twilight md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-diners-twilight-65">
          {description}
        </p>
      </div>
    </div>
  </section>
);
