import { PageIntro } from '@/components/layout/PageIntro';
import { MentorshipSection } from '@/components/sections/MentorshipSection';
import { CareerPathSection } from '@/components/sections/CareerPathSection';
import { ImpactExpectedSection } from '@/components/sections/ImpactEpectedSection';
import { LearningAndChallenges } from '@/components/sections/LearningAndChallenges';

export const EcosystemPage = () => (
  <>
    <PageIntro
      eyebrow="Propuesta"
      title="Una experiencia corporativa, modular y coherente con la marca"
      description="Esta vista concentra el valor de la propuesta: acompanamiento, rutas, impacto esperado y mecanismos de crecimiento dentro de un ecosistema visual alineado con Diners Club Peru."
    />
    <MentorshipSection />
    <CareerPathSection />
    <ImpactExpectedSection />
    <LearningAndChallenges />
  </>
);
