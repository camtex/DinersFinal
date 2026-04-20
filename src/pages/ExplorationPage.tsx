import type { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageIntro } from '@/components/layout/PageIntro';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { ExplorationSection } from '@/components/sections/ExplorationSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import type { Role } from '@/types';
import { saveStoredQuizTraits } from '@/lib/dashboardStorage';

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
  const quizMappings: Record<string, { skills: string[]; interests: string[] }> = {
    tech: {
      skills: ['React', 'Node.js', 'Cloud'],
      interests: ['Programacion', 'Arquitectura'],
    },
    finance: {
      skills: ['SQL', 'Data Governance', 'Politicas de Datos'],
      interests: ['Datos', 'Estrategia'],
    },
    design: {
      skills: ['Figma', 'User Research', 'Prototipado'],
      interests: ['Diseno', 'Experiencia de Usuario'],
    },
    cyber: {
      skills: ['SOC', 'Pentesting', 'ISO 27001'],
      interests: ['Seguridad', 'Investigacion'],
    },
    ops: {
      skills: ['Agile', 'DevOps', 'Gestion de Equipos'],
      interests: ['Calidad', 'Liderazgo Tecnico'],
    },
    commercial: {
      skills: ['Innovacion', 'Liderazgo Ejecutivo', 'Gestion de Portafolio'],
      interests: ['Transformacion Digital', 'Liderazgo'],
    },
    talent: {
      skills: ['Mentoring', 'Vision Estrategica'],
      interests: ['Aprendizaje', 'Mentoria'],
    },
  };

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
          const selectedMappings = traits
            .map(trait => quizMappings[trait])
            .filter(Boolean);

          const mergedSkills = Array.from(new Set(selectedMappings.flatMap(item => item.skills)));
          const mergedInterests = Array.from(new Set(selectedMappings.flatMap(item => item.interests)));

          setSelectedSkills(mergedSkills);
          setSelectedInterests(mergedInterests);
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
