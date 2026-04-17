import type {
  PendingVacancyApplication,
  UserProfile,
  Vacancy,
  VacancyApplication,
} from "@/types";

const USER_PROFILE_KEY = "diners.userProfile";
const QUIZ_TRAITS_KEY = "diners.quizTraits";
const APPLICATIONS_KEY = "diners.vacancyApplications";
const PENDING_VACANCY_KEY = "diners.pendingVacancy";
const POST_LOGIN_REDIRECT_KEY = "diners.postLoginRedirect";

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStoredUserProfile = () => readJson<UserProfile | null>(USER_PROFILE_KEY, null);

export const saveStoredUserProfile = (profile: UserProfile) => {
  writeJson(USER_PROFILE_KEY, profile);
};

export const clearStoredUserProfile = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(USER_PROFILE_KEY);
  }
};

export const getStoredQuizTraits = () => readJson<string[]>(QUIZ_TRAITS_KEY, []);

export const saveStoredQuizTraits = (traits: string[]) => {
  writeJson(QUIZ_TRAITS_KEY, traits);
};

export const getStoredApplications = () => readJson<VacancyApplication[]>(APPLICATIONS_KEY, []);

export const isUserRegistered = () => Boolean(getStoredUserProfile());

export const getPostLoginRedirect = () => readJson<string | null>(POST_LOGIN_REDIRECT_KEY, null);

export const setPostLoginRedirect = (path: string) => {
  writeJson(POST_LOGIN_REDIRECT_KEY, path);
};

export const consumePostLoginRedirect = () => {
  const redirect = getPostLoginRedirect();
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
  }
  return redirect;
};

export const getPendingVacancyApplication = () =>
  readJson<PendingVacancyApplication | null>(PENDING_VACANCY_KEY, null);

export const savePendingVacancyApplication = (vacancy: Vacancy | PendingVacancyApplication) => {
  const payload: PendingVacancyApplication = {
    vacancyId: "id" in vacancy ? vacancy.id : vacancy.vacancyId,
    vacancyTitle: "title" in vacancy ? vacancy.title : vacancy.vacancyTitle,
    area: vacancy.area,
    type: vacancy.type,
    description: vacancy.description,
  };

  writeJson(PENDING_VACANCY_KEY, payload);
  return payload;
};

export const clearPendingVacancyApplication = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(PENDING_VACANCY_KEY);
  }
};

export const saveVacancyApplication = (application: Omit<VacancyApplication, "id" | "appliedAt">) => {
  const applications = getStoredApplications();
  const alreadyApplied = applications.some(item => item.vacancyId === application.vacancyId);

  if (alreadyApplied) return applications;

  const nextApplications = [
    {
      id: `${application.vacancyId}-${Date.now()}`,
      vacancyId: application.vacancyId,
      vacancyTitle: application.vacancyTitle,
      area: application.area,
      appliedAt: new Date().toISOString(),
      fullName: application.fullName,
      linkedinUrl: application.linkedinUrl,
      cvFileName: application.cvFileName,
    },
    ...applications,
  ];

  writeJson(APPLICATIONS_KEY, nextApplications);
  return nextApplications;
};

// Esta función elimina una postulación específica por su ID de vacante
export const removeVacancyApplication = (vacancyId: string) => {
  const current = JSON.parse(localStorage.getItem('diners_applications') || '[]');
  const filtered = current.filter((app: any) => app.vacancyId !== vacancyId);
  localStorage.setItem('diners_applications', JSON.stringify(filtered));
  return filtered;
};