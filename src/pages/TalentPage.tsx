import { PageIntro } from '@/components/layout/PageIntro';
import { TalentForm } from '@/components/sections/TalentForm';

export const TalentPage = () => (
  <>
    <PageIntro
      eyebrow="Postula"
      title="Un punto de entrada claro para captar talento"
      description="La pagina de postulacion queda separada del resto de la propuesta para que el llamado a la accion tenga mas foco y una lectura mas cercana a una experiencia corporativa real."
    />
    <TalentForm />
  </>
);
