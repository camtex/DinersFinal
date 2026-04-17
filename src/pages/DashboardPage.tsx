import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, FileSearch, Link2, Search, Sparkles, Upload, UserRound } from 'lucide-react';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRAIT_LABELS, VACANCIES } from '@/data/mockData';
import {
  clearPendingVacancyApplication,
  getStoredApplications,
  getPendingVacancyApplication,
  getStoredQuizTraits,
  getStoredUserProfile,
  savePendingVacancyApplication,
  saveVacancyApplication,
} from '@/lib/dashboardStorage';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [applications, setApplications] = useState(getStoredApplications);
  const [pendingVacancy, setPendingVacancy] = useState(getPendingVacancyApplication);
  const [applicationMessage, setApplicationMessage] = useState('');

  const profile = getStoredUserProfile();
  const quizTraits = getStoredQuizTraits();
  const fullName = profile?.fullName || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Talento Diners';
  const [applicationForm, setApplicationForm] = useState({
    fullName,
    linkedinUrl: '',
    cvFileName: '',
  });

  const filteredVacancies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return VACANCIES;

    return VACANCIES.filter(vacancy =>
      [vacancy.title, vacancy.area, vacancy.type, vacancy.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const handleApply = (vacancyId: string) => {
    const selectedVacancy = VACANCIES.find(vacancy => vacancy.id === vacancyId);
    if (!selectedVacancy) return;

    setApplicationMessage('');
    setPendingVacancy(savePendingVacancyApplication(selectedVacancy));
  };

  const handleSubmitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pendingVacancy || !applicationForm.fullName || !applicationForm.linkedinUrl || !applicationForm.cvFileName) {
      setApplicationMessage('Completa tu nombre, LinkedIn y adjunta tu CV para enviar la postulacion.');
      return;
    }

    const nextApplications = saveVacancyApplication({
      vacancyId: pendingVacancy.vacancyId,
      vacancyTitle: pendingVacancy.vacancyTitle,
      area: pendingVacancy.area,
      fullName: applicationForm.fullName,
      linkedinUrl: applicationForm.linkedinUrl,
      cvFileName: applicationForm.cvFileName,
    });

    setApplications(nextApplications);
    setApplicationMessage('Tu postulacion fue enviada correctamente y ya aparece en tu historial.');
    clearPendingVacancyApplication();
    setPendingVacancy(null);
  };

  return (
    <>
      <PageIntro
        variant="light"
        eyebrow="Dashboard"
        title="Tu espacio personal para seguir tu ruta"
        description="Aqui puedes revisar tu perfil, tus postulaciones, el resultado de tu test y explorar nuevas vacantes sin salir de la plataforma."
        imageSrc="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070"
      />

      <section className="bg-diners-white-sand py-16">
        <div className="container grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <Card className="rounded-[2rem] border border-diners-gray-1/80 shadow-[0_16px_40px_rgba(4,30,66,0.06)]">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-diners-blue-sky/10 text-diners-blue-sky">
                    <UserRound className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-diners-tidepool">Perfil</p>
                    <CardTitle className="text-2xl font-black text-diners-twilight">{fullName}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-[1.5rem] bg-diners-white-sand p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-diners-twilight-65">Correo</p>
                  <p className="mt-2 text-sm text-diners-twilight">{profile?.email || 'Aun no registras un correo en esta sesion.'}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-diners-blue-sky p-5 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/75">Vacantes postuladas</p>
                    <p className="mt-3 text-3xl font-black">{applications.length}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-diners-gray-1/80 bg-white p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-diners-twilight-65">Resultado del test</p>
                    <p className="mt-3 text-3xl font-black text-diners-twilight">{quizTraits.length || 0}</p>
                    <p className="mt-1 text-xs text-diners-twilight-65">rasgos destacados</p>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-diners-gray-1/80 bg-white p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-diners-hover/10 text-diners-hover">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-diners-tidepool">Postulacion</p>
                      <p className="text-lg font-black text-diners-twilight">
                        {pendingVacancy ? pendingVacancy.vacancyTitle : 'Selecciona una vacante para postular'}
                      </p>
                    </div>
                  </div>

                  {pendingVacancy ? (
                    <form onSubmit={handleSubmitApplication} className="space-y-4">
                      <div className="rounded-[1.2rem] bg-diners-white-sand p-4 text-sm text-diners-twilight-65">
                        Estas postulando a <span className="font-bold text-diners-twilight">{pendingVacancy.vacancyTitle}</span> en {pendingVacancy.area}.
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.16em] text-diners-twilight-65">Nombre completo</Label>
                        <Input
                          value={applicationForm.fullName}
                          onChange={event => setApplicationForm(prev => ({ ...prev, fullName: event.target.value }))}
                          className="h-12 rounded-2xl border-diners-gray-1 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-diners-twilight-65">
                          <Link2 className="h-3.5 w-3.5" />
                          LinkedIn
                        </Label>
                        <Input
                          type="url"
                          placeholder="https://www.linkedin.com/in/tu-perfil"
                          value={applicationForm.linkedinUrl}
                          onChange={event => setApplicationForm(prev => ({ ...prev, linkedinUrl: event.target.value }))}
                          className="h-12 rounded-2xl border-diners-gray-1 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.16em] text-diners-twilight-65">Adjuntar CV</Label>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="h-12 rounded-2xl border-diners-gray-1 bg-white file:font-bold"
                          onChange={event => {
                            const fileName = event.target.files?.[0]?.name || '';
                            setApplicationForm(prev => ({ ...prev, cvFileName: fileName }));
                          }}
                        />
                      </div>

                      {applicationMessage && (
                        <div className="rounded-[1.2rem] bg-diners-blue-sky/8 p-4 text-sm text-diners-twilight">
                          {applicationMessage}
                        </div>
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button type="submit">Enviar postulacion</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            clearPendingVacancyApplication();
                            setPendingVacancy(null);
                            setApplicationMessage('');
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="rounded-[1.2rem] border border-diners-gray-1/80 border-dashed bg-diners-white-sand p-4 text-sm text-diners-twilight-65">
                      Elige una vacante y aqui se habilitara el formulario de postulacion con nombre completo, LinkedIn y CV.
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-diners-tidepool">Historial de postulacion</p>
                    <Link to="/vacantes" className="text-xs font-bold text-diners-blue-sky hover:text-diners-hover">Ver vacantes</Link>
                  </div>
                  <div className="space-y-3">
                    {applications.length > 0 ? (
                      applications.map(application => (
                        <div key={application.id} className="rounded-[1.35rem] border border-diners-gray-1/80 bg-white p-4">
                          <p className="font-bold text-diners-twilight">{application.vacancyTitle}</p>
                          <p className="mt-1 text-sm text-diners-twilight-65">{application.area}</p>
                          <p className="mt-2 text-xs text-diners-twilight-65">CV: {application.cvFileName}</p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[1.35rem] border border-diners-gray-1/80 border-dashed bg-white p-5 text-sm text-diners-twilight-65">
                        Aun no has postulado a una vacante. Puedes hacerlo desde las tarjetas de vacantes o desde este dashboard.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-[2rem] border border-diners-gray-1/80 shadow-[0_16px_40px_rgba(4,30,66,0.06)]">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-diners-hover/10 text-diners-hover">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-diners-tidepool">Resultado del test</p>
                    <CardTitle className="text-2xl font-black text-diners-twilight">Tus afinidades actuales</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {quizTraits.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {quizTraits.map(trait => (
                      <div key={trait} className="rounded-full bg-diners-blue-sky/10 px-4 py-2 text-sm font-bold text-diners-blue-sky">
                        {TRAIT_LABELS[trait] || trait}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-diners-gray-1/80 border-dashed bg-diners-white-sand p-6 text-sm text-diners-twilight-65">
                    Todavia no tenemos un resultado guardado. Haz el quiz en la seccion de rutas y aqui apareceran tus rasgos principales.
                    <div className="mt-4">
                      <Button onClick={() => navigate('/explora')}>Hacer el quiz</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-diners-gray-1/80 shadow-[0_16px_40px_rgba(4,30,66,0.06)]">
              <CardHeader className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-diners-tidepool">Vacantes disponibles</p>
                    <CardTitle className="text-2xl font-black text-diners-twilight">Busca oportunidades manualmente</CardTitle>
                  </div>
                  <div className="rounded-full bg-diners-white-sand px-4 py-2 text-sm font-bold text-diners-twilight">
                    {filteredVacancies.length} resultados
                  </div>
                </div>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-diners-twilight-65" />
                  <Input
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Buscar por cargo, area o modalidad"
                    className="h-12 rounded-full border-diners-gray-1 bg-white pl-11"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredVacancies.length > 0 ? (
                  filteredVacancies.map(vacancy => {
                    const applied = applications.some(item => item.vacancyId === vacancy.id);

                    return (
                      <article key={vacancy.id} className="rounded-[1.6rem] border border-diners-gray-1/80 bg-white p-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full bg-diners-blue-sky/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-diners-blue-sky">
                                {vacancy.area}
                              </span>
                              <span className="rounded-full bg-diners-hover/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-diners-hover">
                                {vacancy.type}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-diners-twilight">{vacancy.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-diners-twilight-65">{vacancy.description}</p>
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-col gap-2 md:items-end">
                            <Button type="button" onClick={() => handleApply(vacancy.id)} disabled={applied}>
                              {applied ? 'Ya postulaste' : 'Postula'}
                            </Button>
                            <Link to="/vacantes" className="inline-flex items-center gap-2 text-xs font-bold text-diners-blue-sky hover:text-diners-hover">
                              <BriefcaseBusiness className="h-4 w-4" />
                              Ver detalle
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="rounded-[1.6rem] border border-diners-gray-1/80 border-dashed bg-diners-white-sand p-8 text-center">
                    <FileSearch className="mx-auto h-10 w-10 text-diners-blue-sky" />
                    <p className="mt-4 text-lg font-bold text-diners-twilight">No encontramos vacantes con esa busqueda.</p>
                    <p className="mt-2 text-sm text-diners-twilight-65">Prueba con otra palabra clave como data, desarrollo, seguridad o UX.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
