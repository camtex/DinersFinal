import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { Hero } from './components/sections/Hero.tsx';
import { ImpactSection } from './components/sections/ImpactSection.tsx';
import { EcosystemSection } from './components/sections/EcosystemSection.tsx';
import { MentorshipSection } from './components/sections/MentorshipSection.tsx';
import { CareerPathSection } from './components/sections/CareerPathSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ImpactExpectedSection } from './components/sections/ImpactEpectedSection';
import { ExplorationSection } from './components/sections/ExplorationSection';
import { ResultsSection } from './components/sections/ResultsSection';
import { LearningAndChallenges } from './components/sections/LearningAndChallenges';
import { ConclusionSection } from './components/sections/ConclusionSection';
import { CategoriesSection } from './components/sections/CategoriesSection';
import { TalentForm } from './components/sections/TalentForm';
import { ROLES } from './data/mockData';
import type { Role } from './types';

export default function App() {
  const brandLogoSrc = '';
  const heroImageSrc = '';

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filteredRoles = useMemo(() => {
    if (selectedSkills.length === 0 && selectedInterests.length === 0) return [];

    return ROLES.map(Role => {
      const skillMatch = Role.skills.filter(s => selectedSkills.includes(s)).length;
      const interestMatch = Role.interests.filter(i => selectedInterests.includes(i)).length;
      return { ...Role, score: skillMatch + interestMatch };
    })
      .filter(Role => (Role.score ?? 0) > 0)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }, [selectedSkills, selectedInterests]);

  const scrollToExploration = () => {
    document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-diners-white-sand font-sans selection:bg-diners-blue-sky/30">
      <Navbar logoSrc={brandLogoSrc} />

      <main>
        <Hero onStart={scrollToExploration} imageSrc={heroImageSrc} />

        <ImpactSection />

        <EcosystemSection />

        <MentorshipSection />

        <CareerPathSection />

        <TestimonialsSection />

        <ImpactExpectedSection />

        <ExplorationSection
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          selectedInterests={selectedInterests}
          setSelectedInterests={setSelectedInterests}
          onShowResults={() => {
            setShowResults(true);
            setTimeout(() => {
              document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onQuizComplete={(traits: string[]) => {
            if (traits.includes('tech')) {
              setSelectedSkills(['React', 'TypeScript']);
              setSelectedInterests(['Innovación']);
            } else if (traits.includes('finance')) {
              setSelectedSkills(['Estadística', 'SQL']);
              setSelectedInterests(['Análisis de datos']);
            }
            setShowResults(true);
            setTimeout(() => {
              document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />

        <AnimatePresence>
          {showResults && (
            <motion.section
              id="resultados"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 bg-diners-white-sand border-t border-diners-gray-1"
            >
              <ResultsSection
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                filteredRoles={filteredRoles}
                setShowResults={setShowResults}
                setSelectedSkills={setSelectedSkills}
                setSelectedInterests={setSelectedInterests}
                scrollToExploration={scrollToExploration}
              />
            </motion.section>
          )}
        </AnimatePresence>

        <LearningAndChallenges />

        <ConclusionSection />

        <CategoriesSection />

        <TalentForm />
      </main>

      <Footer logoSrc={brandLogoSrc} />
    </div>
  );
}
