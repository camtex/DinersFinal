import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Link2,
  LogOut,
  Mail,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { subscribeToAllApplications } from '@/lib/firestoreApplications';
import { signOutSession } from '@/auth';
import type { UserProfile, VacancyApplication } from '@/types';

type ApplicantSummary = {
  applicantUid: string;
  fullName: string;
  applicantEmail: string;
  applicationsCount: number;
  latestAppliedAt: string;
};

export const AdminDashboardPage = ({ profile }: { profile: UserProfile }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [applications, setApplications] = useState<VacancyApplication[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(
    () =>
      subscribeToAllApplications(
        nextApplications => {
          setApplications(nextApplications);
          setErrorMessage('');
        },
        error => {
          setErrorMessage(`No pudimos cargar las postulaciones: ${error.message}`);
        },
      ),
    [],
  );

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return applications;

    return applications.filter(application =>
      [
        application.fullName,
        application.applicantEmail,
        application.vacancyTitle,
        application.area,
        application.linkedinUrl,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [applications, query]);

  const applicantsSummary = useMemo(() => {
    const grouped = new Map<string, ApplicantSummary>();

    filteredApplications.forEach(application => {
      const existing = grouped.get(application.applicantUid);

      if (!existing) {
        grouped.set(application.applicantUid, {
          applicantUid: application.applicantUid,
          fullName: application.fullName,
          applicantEmail: application.applicantEmail,
          applicationsCount: 1,
          latestAppliedAt: application.appliedAt,
        });
        return;
      }

      grouped.set(application.applicantUid, {
        ...existing,
        applicationsCount: existing.applicationsCount + 1,
        latestAppliedAt:
          new Date(application.appliedAt).getTime() > new Date(existing.latestAppliedAt).getTime()
            ? application.appliedAt
            : existing.latestAppliedAt,
      });
    });

    return Array.from(grouped.values()).sort(
      (left, right) => right.applicationsCount - left.applicationsCount,
    );
  }, [filteredApplications]);

  const handleLogout = async () => {
    await signOutSession();
    navigate('/');
  };

  return (
    <>
      <PageIntro
        variant="diners-blue"
        eyebrow="Admin"
        title="Panel de postulaciones"
        description="Visualiza todas las postulaciones realizadas por usuarios con rol postulante desde un dashboard administrativo."
        imageSrc="/perfil.jpg"
      />

      <section className="bg-white py-12">
        <div className="container space-y-8">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[2.5rem] border border-diners-gray-1/20 bg-[#041E42] p-8 text-white shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <ShieldCheck className="h-6 w-6 text-diners-blue-sky" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-diners-blue-sky">Administrador</p>
                    <h2 className="text-xl font-black">{profile.fullName}</h2>
                    <p className="text-sm text-white/60">{profile.email}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-9 w-9 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/55">Total postulaciones</p>
                  <p className="mt-2 text-3xl font-black">{applications.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/55">Postulantes unicos</p>
                  <p className="mt-2 text-3xl font-black">
                    {new Set(applications.map(application => application.applicantUid)).size}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-diners-gray-1/20 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-diners-blue-sky">Seguimiento</p>
                  <h3 className="mt-2 text-2xl font-black text-diners-twilight">Registro centralizado</h3>
                  <p className="mt-2 max-w-2xl text-sm text-diners-twilight-65">
                    El administrador puede ver nombre, correo de contacto, LinkedIn y cuantas postulaciones tiene cada persona.
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-diners-twilight-65" />
                  <Input
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Buscar por nombre, correo o vacante"
                    className="h-11 rounded-full border-diners-gray-1/30 pl-10 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-diners-twilight-65">
                <UserRound className="h-3 w-3" /> Resumen por postulante
              </h3>

              <div className="space-y-3">
                {applicantsSummary.length > 0 ? applicantsSummary.map(applicant => (
                  <div key={applicant.applicantUid} className="rounded-[2rem] border border-diners-gray-1/20 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-base font-black text-diners-twilight">{applicant.fullName}</h4>
                        <div className="inline-flex items-center gap-2 text-sm text-diners-twilight-65">
                          <Mail className="h-4 w-4 text-diners-blue-sky" />
                          {applicant.applicantEmail}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-diners-blue-sky/10 px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-diners-blue-sky">Postulaciones</p>
                        <p className="text-xl font-black text-diners-twilight">{applicant.applicationsCount}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-diners-twilight-65">
                      Ultima postulacion: {new Date(applicant.latestAppliedAt).toLocaleString('es-PE')}
                    </p>
                  </div>
                )) : (
                  <Card className="rounded-[2rem] border border-dashed border-diners-gray-1/60 bg-white p-8 text-center">
                    <CardContent className="p-0 text-sm text-diners-twilight-65">
                      No hay postulantes para mostrar en el resumen.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {errorMessage && (
                <Card className="rounded-[2rem] border border-red-200 bg-red-50 p-4">
                  <CardContent className="p-0 text-sm text-red-700">
                    {errorMessage}
                  </CardContent>
                </Card>
              )}

              <h3 className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-diners-twilight-65">
                <Briefcase className="h-3 w-3" /> Todas las postulaciones
              </h3>

              <div className="grid gap-4">
                {filteredApplications.length > 0 ? filteredApplications.map(application => (
                  <div key={application.id} className="rounded-[2rem] border border-diners-gray-1/20 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-diners-blue-sky/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-diners-blue-sky">
                            {application.area}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-diners-twilight-65">
                            {new Date(application.appliedAt).toLocaleString('es-PE')}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg font-black text-diners-twilight">{application.vacancyTitle}</h4>
                          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-diners-twilight-65">{application.description}</p>
                        </div>
                      </div>

                      <div className="grid gap-3 rounded-[1.5rem] bg-diners-white-sand/60 p-4 xl:min-w-[360px]">
                        <div className="inline-flex items-center gap-2 text-sm font-bold text-diners-twilight">
                          <UserRound className="h-4 w-4 text-diners-blue-sky" />
                          {application.fullName}
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm text-diners-twilight-65">
                          <Mail className="h-4 w-4 text-diners-blue-sky" />
                          {application.applicantEmail}
                        </div>
                        {application.linkedinUrl ? (
                          <div className="inline-flex items-center gap-2 text-sm text-diners-twilight-65 break-all">
                            <Link2 className="h-4 w-4 text-diners-blue-sky" />
                            <a
                              href={application.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-diners-blue-sky hover:underline"
                            >
                              {application.linkedinUrl}
                            </a>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 text-sm text-diners-twilight-65">
                            <Link2 className="h-4 w-4 text-diners-blue-sky" />
                            Sin LinkedIn registrado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <Card className="rounded-[2rem] border border-dashed border-diners-gray-1/60 bg-white p-8 text-center">
                    <CardContent className="p-0 text-sm text-diners-twilight-65">
                      No hay postulaciones registradas o no coinciden con tu filtro actual.
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
