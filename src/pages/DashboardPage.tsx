import { Navigate } from 'react-router-dom';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { CandidateDashboardPage } from '@/pages/CandidateDashboardPage';
import { getStoredUserProfile } from '@/lib/dashboardStorage';

export const DashboardPage = () => {
  const profile = getStoredUserProfile();

  if (!profile) {
    return <Navigate to="/postula" replace />;
  }

  if (profile.role === 'admin') {
    return <AdminDashboardPage profile={profile} />;
  }

  return <CandidateDashboardPage profile={profile} />;
};
