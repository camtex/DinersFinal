import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Search,
  Sparkles,
  Upload,
  UserRound,
  Briefcase,
  ChevronRight,
  RotateCcw,
  Trash2,
  FileText,
  Link2,
} from 'lucide-react';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  TRAIT_LABELS,
  ROLES,
  getCategoryNameById,
  getRecommendedRolesFromTraits,
} from '@/data/mockData';
import {
  clearPendingVacancyApplication,
  clearStoredApplications,
  clearStoredQuizTraits,
  clearStoredUserProfile,
  getPendingVacancyApplication,
  getStoredApplications,
  getStoredQuizTraits,
  getStoredUserProfile,
  removeVacancyApplication,
  savePendingVacancyApplication,
  saveVacancyApplication,
} from '@/lib/dashboardStorage';
import { signOutSession } from '@/auth';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [applications, setApplications] = useState(getStoredApplications());
  const [quizTraits, setQuizTraits] = useState(getStoredQuizTraits());
  const [pendingVacancy, setPendingVacancy] = useState(getPendingVacancyApplication());

  const profile = getStoredUserProfile();
  const fullName =
    profile?.fullName || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Talento Diners';

  const [applicationForm, setApplicationForm] = useState({
    fullName,
    linkedinUrl: '',
    cvFileName: '',
  });

  const recommendedRoles = useMemo(() => {
    const rolesByAffinity = quizTraits.length > 0
      ? getRecommendedRolesFromTraits(quizTraits)
      : ROLES.map(role => ({ ...role, score: 0 }));

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return rolesByAffinity;

    return rolesByAffinity.filter(role =>
      [role.title, role.description, getCategoryNameById(role.category)]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, quizTraits]);

  const handleFullReset = () => {
    clearStoredApplications();
    clearPendingVacancyApplication();
    clearStoredQuizTraits();
    setApplications([]);
    setQuizTraits([]);
    setPendingVacancy(null);
  };

  const handleRemoveSingleApplication = (vacancyId: string) => {
    setApplications(removeVacancyApplication(vacancyId));
  };

  const handleApply = (roleId: string) => {
    const selectedRole = ROLES.find(role => role.id === roleId);
    if (!selectedRole) return;

    setPendingVacancy(savePendingVacancyApplication({
      vacancyId: `role-${selectedRole.id}`,
      vacancyTitle: selectedRole.title,
      area: getCategoryNameById(selectedRole.category),
      type: 'Ruta recomendada',
      description: selectedRole.description,
    }));
  };

  const handleSubmitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pendingVacancy || !applicationForm.fullName.trim() || !applicationForm.cvFileName) return;

    const nextApps = saveVacancyApplication({
      vacancyId: pendingVacancy.vacancyId,
      vacancyTitle: pendingVacancy.vacancyTitle,
      area: pendingVacancy.area,
      type: pendingVacancy.type,
      description: pendingVacancy.description,
      fullName: applicationForm.fullName.trim(),
      linkedinUrl: applicationForm.linkedinUrl.trim(),
      cvFileName: applicationForm.cvFileName,
    });

    setApplications(nextApps);
    clearPendingVacancyApplication();
    setPendingVacancy(null);
    setApplicationForm({
      fullName,
      linkedinUrl: '',
      cvFileName: '',
    });
  };

  const handleLogout = async () => {
    await signOutSession();
    clearStoredUserProfile();
    navigate('/');
  };

  return (
    <>
      <PageIntro
        variant="diners-blue"
        eyebrow="Perfil"
        title="Tu espacio personal"
        description="Gestiona tu carrera, revisa tus afinidades y postula a puestos alineados con tu perfil."
        imageSrc="/perfil.jpg"
      />

      <section className="bg-white py-12">
        <div className="container grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-8">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-diners-gray-1/30 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#041E42] text-white">
                    <UserRound className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00A3E0]">Candidato</span>
                    <h2 className="text-xl font-black text-diners-twilight">{fullName}</h2>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFullReset}
                    title="Reiniciar demo"
                    className="h-9 w-9 rounded-full text-diners-twilight-65 transition-colors hover:bg-orange-50 hover:text-orange-500"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-9 w-9 rounded-full text-diners-twilight-65 hover:bg-red-50 hover:text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-diners-gray-1/10 bg-diners-white-sand/40 p-4">
                  <p className="text-[9px] font-black uppercase text-diners-twilight-65">Postulaciones</p>
                  <p className="text-xl font-black text-diners-twilight">{applications.length}</p>
                </div>
                <div className="rounded-2xl border border-diners-gray-1/10 bg-diners-white-sand/40 p-4">
                  <p className="text-[9px] font-black uppercase text-diners-twilight-65">Afinidades</p>
                  <p className="text-xl font-black text-diners-twilight">{quizTraits.length}</p>
                </div>
              </div>
            </div>

            {pendingVacancy && (
              <Card className="rounded-[2rem] border-2 border-diners-blue-sky/30 bg-white p-1 shadow-xl shadow-blue-900/5">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-diners-blue-sky" />
                    <h3 className="text-sm font-bold uppercase text-diners-twilight">Postular a {pendingVacancy.vacancyTitle}</h3>
                  </div>

                  <div className="rounded-2xl bg-diners-white-sand/70 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-diners-blue-sky">{pendingVacancy.area}</p>
                    <p className="mt-2 text-sm leading-relaxed text-diners-twilight-65">{pendingVacancy.description}</p>
                  </div>

                  <form onSubmit={handleSubmitApplication} className="space-y-3">
                    <Input
                      placeholder="Nombre del postulante"
                      value={applicationForm.fullName}
                      onChange={e => setApplicationForm(prev => ({ ...prev, fullName: e.target.value }))}
                      className="h-10 rounded-xl text-sm"
                    />
                    <Input
                      placeholder="Enlace de LinkedIn (opcional)"
                      value={applicationForm.linkedinUrl}
                      onChange={e => setApplicationForm(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      className="h-10 rounded-xl text-sm"
                    />
                    <Input
                      type="file"
                      onChange={e => setApplicationForm(prev => ({ ...prev, cvFileName: e.target.files?.[0]?.name || '' }))}
                      className="h-10 rounded-xl text-[10px] file:mr-2 file:rounded file:border-none file:bg-[#041E42] file:px-2 file:text-white"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="h-9 flex-1 rounded-full bg-diners-blue-sky text-xs">Enviar</Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          clearPendingVacancyApplication();
                          setPendingVacancy(null);
                        }}
                        className="h-9 rounded-full text-xs"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-diners-twilight-65">
                <Briefcase className="h-3 w-3" /> Historial de postulaciones
              </h3>
              <div className="space-y-3">
                {applications.length > 0 ? applications.map(app => (
                  <div key={app.id} className="group flex items-start justify-between rounded-2xl border border-diners-gray-1/20 bg-white p-4 transition-all hover:border-diners-blue-sky/30">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-diners-twilight">{app.vacancyTitle}</p>
                      <p className="text-[10px] uppercase text-diners-twilight-65">{app.area}</p>
                      <p className="text-xs leading-relaxed text-diners-twilight-65">{app.description}</p>
                      <div className="flex flex-wrap gap-3 text-[11px] text-diners-twilight-65">
                        <span className="inline-flex items-center gap-1">
                          <UserRound className="h-3.5 w-3.5" />
                          {app.fullName}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {app.cvFileName}
                        </span>
                        {app.linkedinUrl && (
                          <span className="inline-flex items-center gap-1">
                            <Link2 className="h-3.5 w-3.5" />
                            {app.linkedinUrl}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSingleApplication(app.vacancyId)}
                      className="h-8 w-8 rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )) : (
                  <Card className="rounded-[2rem] border border-dashed border-diners-gray-1/60 bg-white p-6">
                    <CardContent className="p-0 text-sm text-diners-twilight-65">
                      Aun no registras postulaciones. Elige un puesto recomendado y completa tu formulario.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2.5rem] bg-[#041E42] p-8 text-white shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-diners-blue-sky" />
                <h3 className="text-base font-black uppercase tracking-wider">Afinidades</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizTraits.length > 0 ? quizTraits.map(trait => (
                  <span key={trait} className="rounded-full border border-white/5 bg-white/10 px-4 py-1.5 text-[11px] font-bold">
                    {TRAIT_LABELS[trait] || trait}
                  </span>
                )) : (
                  <div className="w-full py-4 text-center">
                    <p className="mb-3 text-xs text-white/40 text-balance">Haz el test para personalizar tus recomendaciones.</p>
                    <Button
                      onClick={() => navigate('/explora')}
                      className="h-9 rounded-full border-none bg-diners-blue-sky px-6 text-[11px] font-bold text-white shadow-lg shadow-blue-400/20 transition-all hover:bg-white hover:text-[#041E42]"
                    >
                      Ir al test
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 px-2">
                <div>
                  <h3 className="text-xl font-black text-diners-twilight">Puestos recomendados</h3>
                  <p className="text-sm text-diners-twilight-65">
                    {quizTraits.length > 0
                      ? 'Se calculan con la misma logica que usaste al responder el test.'
                      : 'Todavia no tienes afinidades guardadas, asi que puedes explorar todos los roles.'}
                  </p>
                </div>
                <div className="relative w-52">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-diners-twilight-65" />
                  <Input
                    placeholder="Filtrar puestos..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="h-9 rounded-full border-diners-gray-1/30 pl-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {recommendedRoles.length > 0 ? recommendedRoles.map(role => {
                  const applicationId = `role-${role.id}`;
                  const isApplied = applications.some(app => app.vacancyId === applicationId);

                  return (
                    <div key={role.id} className="group rounded-[2rem] border border-diners-gray-1/30 bg-white p-6 shadow-sm transition-all hover:border-diners-blue-sky/50">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-black uppercase text-diners-blue-sky">
                              {getCategoryNameById(role.category)}
                            </span>
                            {'score' in role && role.score > 0 && (
                              <span className="rounded-full bg-diners-blue-sky/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-diners-blue-sky">
                                Afinidad {role.score}
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-black text-diners-twilight">{role.title}</h4>
                          <p className="max-w-2xl text-sm leading-relaxed text-diners-twilight-65">{role.description}</p>
                        </div>

                        <Button
                          onClick={() => handleApply(role.id)}
                          disabled={isApplied}
                          className={`h-9 rounded-full px-6 text-xs ${isApplied ? 'border border-green-100 bg-green-50 text-green-600 hover:bg-green-50' : 'bg-[#041E42] shadow-md hover:bg-diners-blue-sky'}`}
                        >
                          {isApplied ? 'Postulado' : 'Postular'}
                          {!isApplied && <ChevronRight className="ml-1 h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  );
                }) : (
                  <Card className="rounded-[2rem] border border-dashed border-diners-gray-1/60 bg-white p-8 text-center">
                    <CardContent className="p-0 text-sm text-diners-twilight-65">
                      No encontramos puestos que coincidan con tu busqueda actual.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
