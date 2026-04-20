import { PageIntro } from '@/components/layout/PageIntro';
import { MentorshipSection } from '@/components/sections/MentorshipSection';
import { ImpactExpectedSection } from '@/components/sections/ImpactEpectedSection';

export const EcosystemPage = () => (
  <>
    <PageIntro
      eyebrow=''
      variant="diners-blue" // Activa el fondo azul y la diagonal
      title="Una experiencia corporativa, modular y coherente con la marca"
      description="Esta vista concentra el valor de la propuesta: acompañamiento, rutas, impacto esperado y mecanismos de crecimiento dentro de un ecosistema visual alineado con Diners Club Perú."
      // Agregamos la imagen que se mostrará con el recorte diagonal a la derecha
      imageSrc="https://stakeholders.com.pe/wp-content/uploads/2023/03/group-of-businesswomen-at-meeting-in-office-2022-02-02-04-51-28-utc-scaled.jpg"
    />
    <MentorshipSection />
    <ImpactExpectedSection />
  </>
);