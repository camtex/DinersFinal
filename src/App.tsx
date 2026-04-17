import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { ScrollToTop } from './components/layout/ScrollToTop.tsx';
import { HomePage } from './pages/HomePage';
import { EcosystemPage } from './pages/EcosystemPage';
import { ExplorationPage } from './pages/ExplorationPage';
import { TalentPage } from './pages/TalentPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { VacanciesPage } from './pages/VacanciesPage';
import { DashboardPage } from './pages/DashboardPage';
import { ROLES } from './data/mockData';
import { isUserRegistered, setPostLoginRedirect } from './lib/dashboardStorage';
import { auth } from './firebase';
import type { Role } from './types';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedDashboardRoute = () => {
  if (isUserRegistered()) {
    return <DashboardPage />;
  }

  setPostLoginRedirect('/dashboard');
  return <Navigate to="/postula" replace />;
};

export default function App() {
  const brandLogoSrc = '';
  const heroImageSrc = '';
  const [isLoggedIn, setIsLoggedIn] = useState(isUserRegistered());

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filteredRoles = useMemo(() => {
    if (selectedSkills.length === 0 && selectedInterests.length === 0) return [];

    return ROLES.map(role => {
      const skillMatch = role.skills.filter(skill => selectedSkills.includes(skill)).length;
      const interestMatch = role.interests.filter(interest => selectedInterests.includes(interest)).length;
      return { ...role, score: skillMatch + interestMatch };
    })
      .filter(role => (role.score ?? 0) > 0)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }, [selectedSkills, selectedInterests]);

  const scrollToExploration = () => {
    document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(Boolean(user) || isUserRegistered());
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-diners-white-sand font-sans selection:bg-diners-blue-sky/30">
      <ScrollToTop />
      <Navbar logoSrc={brandLogoSrc} isLoggedIn={isLoggedIn} />

      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage heroImageSrc={heroImageSrc} />} />
          <Route path="/ecosistema" element={<EcosystemPage />} />
          <Route path="/beneficios" element={<BenefitsPage />} />
          <Route
            path="/explora"
            element={
              <ExplorationPage
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                showResults={showResults}
                setShowResults={setShowResults}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                filteredRoles={filteredRoles}
                scrollToExploration={scrollToExploration}
              />
            }
          />
          <Route path="/vacantes" element={<VacanciesPage />} />
          <Route path="/dashboard" element={<ProtectedDashboardRoute />} />
          <Route path="/postula" element={<TalentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer logoSrc={brandLogoSrc} />
    </div>
  );
}
