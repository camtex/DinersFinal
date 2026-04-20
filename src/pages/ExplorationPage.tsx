import type { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageIntro } from '@/components/layout/PageIntro';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { ExplorationSection } from '@/components/sections/ExplorationSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import type { Role } from '@/types';
import { saveStoredQuizTraits } from '@/lib/dashboardStorage';
import { getSelectionsFromTraits } from '@/data/mockData';

type ExplorationPageProps = {
  selectedSkills: string[];
  setSelectedSkills: Dispatch<SetStateAction<string[]>>;
  selectedInterests: string[];
  setSelectedInterests: Dispatch<SetStateAction<string[]>>;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  selectedRole: Role | null;
  setSelectedRole: Dispatch<SetStateAction<Role | null>>;
  filteredRoles: (Role & { score?: number })[];
  scrollToExploration: () => void;
};

export const ExplorationPage = ({
  selectedSkills,
  setSelectedSkills,
  selectedInterests,
  setSelectedInterests,
  showResults,
  setShowResults,
  selectedRole,
  setSelectedRole,
  filteredRoles,
  scrollToExploration,
}: ExplorationPageProps) => {
  return (
    <>
      <PageIntro
        eyebrow=""
        title="Explora rutas, habilidades e intereses por separado"
        description="Ahora esta experiencia tiene su propia página. Podrás descubrir rutas, realizar el test vocacional y ver tus resultados de forma organizada, para una navegación más clara y sencilla.."
        imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
      />

      <CategoriesSection />

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
          saveStoredQuizTraits(traits);
          const { skills, interests } = getSelectionsFromTraits(traits);

          setSelectedSkills(skills);
          setSelectedInterests(interests);
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
            className="border-t border-diners-gray-1 bg-diners-white-sand py-20"
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
    </>
  ); // <--- Cerramos el return
}; // <--- Cerramos el componente ExplorationPage
