import { Link, useNavigate } from 'react-router-dom';
import { PageIntro } from '@/components/layout/PageIntro';
import { CareerPathSection } from '@/components/sections/CareerPathSection';
import { Button } from '@/components/ui/button';
import { VACANCIES } from '@/data/mockData';
import {
  isUserRegistered,
  savePendingVacancyApplication,
  setPostLoginRedirect,
} from '@/lib/dashboardStorage';

export const VacanciesPage = () => {
  const navigate = useNavigate();

  const handleApply = (vacancyId: string) => {
    const selectedVacancy = VACANCIES.find(vacancy => vacancy.id === vacancyId);
    if (!selectedVacancy) return;

    savePendingVacancyApplication(selectedVacancy);
    setPostLoginRedirect('/dashboard');
    navigate(isUserRegistered() ? '/dashboard' : '/postula');
  };

  return (
  <>
    <PageIntro
      variant="diners-blue"
      eyebrow="Vacantes"
      title="Oportunidades conectadas con una linea de carrera real"
      description="Esta seccion toma como base el lenguaje del CareerPathSection para presentar vacantes y crecimiento dentro de una misma narrativa."
      imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070"
    />

    <CareerPathSection />

    <section className="border-t border-diners-gray-1/60 bg-white py-20">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.28em] text-diners-tidepool">
              Vacantes destacadas
            </span>
            <h2 className="text-3xl font-black tracking-tight text-diners-twilight md:text-4xl">
              Posiciones pensadas para distintos puntos de entrada
            </h2>
          </div>
          <Link
            to="/postula"
            className="inline-flex w-fit items-center justify-center rounded-full bg-diners-twilight px-7 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-diners-lakefront"
          >
            Iniciar
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {VACANCIES.map(opening => (
            <article
              key={opening.id}
              className="rounded-[2rem] border border-diners-gray-1/70 bg-diners-white-sand p-7 shadow-[0_16px_34px_rgba(4,30,66,0.05)]"
            >
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-diners-lakefront/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-diners-lakefront">
                  {opening.area}
                </span>
                <span className="rounded-full bg-diners-tidepool/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-diners-tidepool">
                  {opening.type}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-black tracking-tight text-diners-twilight">
                {opening.title}
              </h3>
              <p className="mb-6 text-sm font-light leading-relaxed text-diners-twilight-65">
                {opening.description}
              </p>

              <Button
                type="button"
                variant="link"
                className="h-auto px-0 py-0 text-[11px] font-black uppercase tracking-[0.2em]"
                onClick={() => handleApply(opening.id)}
              >
                Iniciar postulacion
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};
