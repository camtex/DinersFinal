import { PageIntro } from '@/components/layout/PageIntro';
import { MentorshipSection } from '@/components/sections/MentorshipSection';
import { CareerPathSection } from '@/components/sections/CareerPathSection';
import { ImpactExpectedSection } from '@/components/sections/ImpactEpectedSection';

export const EcosystemPage = () => (
  <>
    <PageIntro
      eyebrow=''
      variant="diners-blue" // Activa el fondo azul y la diagonal
      title="Una experiencia corporativa, modular y coherente con la marca"
      description="Esta vista concentra el valor de la propuesta: acompañamiento, rutas, impacto esperado y mecanismos de crecimiento dentro de un ecosistema visual alineado con Diners Club Perú."
      // Agregamos la imagen que se mostrará con el recorte diagonal a la derecha
      imageSrc="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070"
    />
    <MentorshipSection />
    <CareerPathSection />
    <ImpactExpectedSection />
  </>
);