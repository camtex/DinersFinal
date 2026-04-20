import { PageIntro } from '@/components/layout/PageIntro';
import { TalentForm } from '@/components/sections/TalentForm';

export const TalentPage = () => (
  <>
    <PageIntro
      variant="centered-blue"
      eyebrow=""
      title="Donde tu potencial encuentra su próximo gran escenario."
      description="Tu carrera merece un entorno a la altura de tus ambiciones. Únete a Diners Club y transforma tu visión en soluciones de impacto global dentro de una cultura de excelencia."
    />
    <TalentForm />
  </>
);

