import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase';
import type { UserProfile, VacancyApplication } from '@/types';

type CreateApplicationInput = Omit<
  VacancyApplication,
  'id' | 'appliedAt' | 'applicantUid' | 'applicantEmail' | 'applicantRole'
>;

const APPLICATIONS_COLLECTION = 'applications';

const sortApplications = (applications: VacancyApplication[]) =>
  [...applications].sort(
    (left, right) => new Date(right.appliedAt).getTime() - new Date(left.appliedAt).getTime(),
  );

const mapApplicationDoc = (
  id: string,
  data: Record<string, unknown>,
): VacancyApplication => ({
  id,
  applicantUid: String(data.applicantUid ?? ''),
  applicantEmail: String(data.applicantEmail ?? ''),
  applicantRole: (data.applicantRole as VacancyApplication['applicantRole']) ?? 'postulante',
  vacancyId: String(data.vacancyId ?? ''),
  vacancyTitle: String(data.vacancyTitle ?? ''),
  area: String(data.area ?? ''),
  type: String(data.type ?? ''),
  description: String(data.description ?? ''),
  appliedAt: String(data.appliedAt ?? ''),
  fullName: String(data.fullName ?? ''),
  linkedinUrl: String(data.linkedinUrl ?? ''),
  cvFileName: String(data.cvFileName ?? ''),
});

const getApplicationsCollection = () => collection(db, APPLICATIONS_COLLECTION);

export const subscribeToUserApplications = (
  userId: string,
  onUpdate: (applications: VacancyApplication[]) => void,
  onError?: (error: Error) => void,
) =>
  onSnapshot(
    query(getApplicationsCollection(), where('applicantUid', '==', userId)),
    snapshot => {
      const applications = snapshot.docs
        .map(item => mapApplicationDoc(item.id, item.data()))

      onUpdate(sortApplications(applications));
    },
    error => {
      onError?.(error);
    },
  );

export const subscribeToAllApplications = (
  onUpdate: (applications: VacancyApplication[]) => void,
  onError?: (error: Error) => void,
) =>
  onSnapshot(
    getApplicationsCollection(),
    snapshot => {
      const applications = snapshot.docs
        .map(item => mapApplicationDoc(item.id, item.data()))
        .filter(item => item.applicantRole === 'postulante');

      onUpdate(sortApplications(applications));
    },
    error => {
      onError?.(error);
    },
  );

export const createVacancyApplication = async ({
  application,
  profile,
}: {
  application: CreateApplicationInput;
  profile: UserProfile;
}) => {
  if (!profile.uid) {
    throw new Error('No encontramos un usuario autenticado para registrar la postulacion.');
  }

  await addDoc(getApplicationsCollection(), {
    applicantUid: profile.uid,
    applicantEmail: profile.email,
    applicantRole: profile.role,
    vacancyId: application.vacancyId,
    vacancyTitle: application.vacancyTitle,
    area: application.area,
    type: application.type,
    description: application.description,
    appliedAt: new Date().toISOString(),
    fullName: application.fullName,
    linkedinUrl: application.linkedinUrl,
    cvFileName: application.cvFileName,
    createdAt: serverTimestamp(),
  });
};

export const deleteVacancyApplication = async (applicationId: string) => {
  await deleteDoc(doc(db, APPLICATIONS_COLLECTION, applicationId));
};
