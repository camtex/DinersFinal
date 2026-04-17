import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSearch, Link2, LogOut, Search, Sparkles, Upload,
  UserRound, Briefcase, ChevronRight, RotateCcw, Trash2
} from 'lucide-react';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRAIT_LABELS, VACANCIES } from '@/data/mockData';
import {
  clearPendingVacancyApplication,
  clearStoredUserProfile,
  getPendingVacancyApplication,
  getStoredApplications,
  getStoredQuizTraits,
  getStoredUserProfile,
  savePendingVacancyApplication,
  saveVacancyApplication,
} from '@/lib/dashboardStorage';
import { signOutSession } from '@/auth';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Estados reactivos para que la UI se actualice al borrar
  const [applications, setApplications] = useState(getStoredApplications());
  const [quizTraits, setQuizTraits] = useState(getStoredQuizTraits());
  const [pendingVacancy, setPendingVacancy] = useState(getPendingVacancyApplication());

  const profile = getStoredUserProfile();
  const fullName = profile?.fullName || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Talento Diners';

  const [applicationForm, setApplicationForm] = useState({
    fullName,
    linkedinUrl: '',
    cvFileName: '',
  });

  // --- LÓGICA DE RESET SUTIL ---
  const handleFullReset = () => {
    // Borramos datos específicos de la demo pero mantenemos la sesión del usuario
    localStorage.removeItem('diners_applications');
    localStorage.removeItem('diners_quiz_traits');
    localStorage.removeItem('diners_pending_vacancy');

    // Actualizamos estados locales
    setApplications([]);
    setQuizTraits([]);
    setPendingVacancy(null);

    // Opcional: feedback visual o recarga
    console.log("Demo reiniciada");
  };

  const handleRemoveSingleApplication = (vacancyId: string) => {
    const current = JSON.parse(localStorage.getItem('diners_applications') || '[]');
    const filtered = current.filter((app: any) => app.vacancyId !== vacancyId);
    localStorage.setItem('diners_applications', JSON.stringify(filtered));
    setApplications(filtered);
  };
  // -----------------------------

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
    const selectedVacancy = VACANCIES.find(v => v.id === vacancyId);
    if (!selectedVacancy) return;
    setPendingVacancy(savePendingVacancyApplication(selectedVacancy));
  };

  const handleSubmitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pendingVacancy || !applicationForm.fullName || !applicationForm.linkedinUrl || !applicationForm.cvFileName) return;

    const nextApps = saveVacancyApplication({
      vacancyId: pendingVacancy.vacancyId,
      vacancyTitle: pendingVacancy.vacancyTitle,
      area: pendingVacancy.area,
      fullName: applicationForm.fullName,
      linkedinUrl: applicationForm.linkedinUrl,
      cvFileName: applicationForm.cvFileName,
    });

    setApplications(nextApps);
    clearPendingVacancyApplication();
    setPendingVacancy(null);
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
        eyebrow="Dashboard"
        title="Tu espacio personal"
        description="Gestiona tu carrera y descubre nuevas oportunidades."
        imageSrc="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070"
      />

      <section className="bg-white py-12">
        <div className="container grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">

          <div className="space-y-8">
            {/* CARD DE PERFIL CON RESET SUTIL */}
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

                {/* BOTONES DE ACCIÓN SUTILES */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFullReset}
                    title="Reiniciar Demo"
                    className="h-9 w-9 rounded-full text-diners-twilight-65 hover:bg-orange-50 hover:text-orange-500 transition-colors"
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
                <div className="rounded-2xl bg-diners-white-sand/40 p-4 border border-diners-gray-1/10">
                  <p className="text-[9px] font-black uppercase text-diners-twilight-65">Postulaciones</p>
                  <p className="text-xl font-black text-diners-twilight">{applications.length}</p>
                </div>
                <div className="rounded-2xl bg-diners-white-sand/40 p-4 border border-diners-gray-1/10">
                  <p className="text-[9px] font-black uppercase text-diners-twilight-65">Afinidades</p>
                  <p className="text-xl font-black text-diners-twilight">{quizTraits.length}</p>
                </div>
              </div>
            </div>

            {/* FORMULARIO PENDIENTE */}
            {pendingVacancy && (
              <Card className="rounded-[2rem] border-2 border-diners-blue-sky/30 bg-white p-1 shadow-xl shadow-blue-900/5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-diners-blue-sky" />
                    <h3 className="font-bold text-sm text-diners-twilight uppercase">Postular a {pendingVacancy.vacancyTitle}</h3>
                  </div>
                  <form onSubmit={handleSubmitApplication} className="space-y-3">
                    <Input
                      placeholder="LinkedIn URL"
                      value={applicationForm.linkedinUrl}
                      onChange={e => setApplicationForm(p => ({ ...p, linkedinUrl: e.target.value }))}
                      className="rounded-xl h-10 text-sm"
                    />
                    <Input
                      type="file"
                      onChange={e => setApplicationForm(p => ({ ...p, cvFileName: e.target.files?.[0]?.name || '' }))}
                      className="rounded-xl h-10 text-[10px] file:bg-[#041E42] file:text-white file:border-none file:rounded file:px-2 file:mr-2"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 rounded-full bg-diners-blue-sky h-9 text-xs">Enviar</Button>
                      <Button type="button" variant="ghost" onClick={() => setPendingVacancy(null)} className="rounded-full h-9 text-xs">Cancelar</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* HISTORIAL CON OPCIÓN DE BORRAR INDIVIDUAL */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-diners-twilight-65 flex items-center gap-2 px-2">
                <Briefcase className="h-3 w-3" /> Historial
              </h3>
              <div className="space-y-2">
                {applications.map(app => (
                  <div key={app.id} className="group flex items-center justify-between rounded-2xl border border-diners-gray-1/20 bg-white p-4 transition-all hover:border-diners-blue-sky/30">
                    <div>
                      <p className="text-sm font-bold text-diners-twilight">{app.vacancyTitle}</p>
                      <p className="text-[10px] text-diners-twilight-65 uppercase">{app.area}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSingleApplication(app.vacancyId)}
                      className="h-8 w-8 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* AFINIDADES DINÁMICAS */}
            <div className="rounded-[2.5rem] bg-[#041E42] p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-4 w-4 text-diners-blue-sky" />
                <h3 className="text-base font-black uppercase tracking-wider">Afinidades</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizTraits.length > 0 ? quizTraits.map(t => (
                  <span key={t} className="rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold border border-white/5">
                    {TRAIT_LABELS[t] || t}
                  </span>
                )) : (
                  <div className="w-full text-center py-4">
                    <p className="text-xs text-white/40 mb-3 italic text-balance">Haz el test para personalizar tus recomendaciones.</p>
                    <Button
                      onClick={() => navigate('/explora')}
                      className="rounded-full bg-diners-blue-sky text-white hover:bg-white hover:text-[#041E42] h-9 px-6 text-[11px] font-bold transition-all shadow-lg shadow-blue-400/20 border-none"
                    >
                      Descubrir mis rasgos
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* LISTA DE VACANTES */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-diners-twilight">Vacantes</h3>
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-diners-twilight-65" />
                  <Input
                    placeholder="Filtrar..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="h-9 rounded-full pl-9 text-xs border-diners-gray-1/30"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {filteredVacancies.map(vacancy => {
                  const isApplied = applications.some(a => a.vacancyId === vacancy.id);
                  return (
                    <div key={vacancy.id} className="group rounded-[2rem] border border-diners-gray-1/30 bg-white p-6 transition-all hover:border-diners-blue-sky/50 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-diners-blue-sky">{vacancy.area}</span>
                          <h4 className="text-lg font-black text-diners-twilight">{vacancy.title}</h4>
                        </div>

                        <Button
                          onClick={() => handleApply(vacancy.id)}
                          disabled={isApplied}
                          className={`rounded-full h-9 text-xs px-6 ${isApplied ? 'bg-green-50 text-green-600 border border-green-100 hover:bg-green-50' : 'bg-[#041E42] hover:bg-diners-blue-sky shadow-md'}`}
                        >
                          {isApplied ? 'Postulado' : 'Aplicar'}
                          {!isApplied && <ChevronRight className="ml-1 h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};