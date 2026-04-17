import { useNavigate } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

type HomePageProps = {
  heroImageSrc?: string;
};

export const HomePage = ({ heroImageSrc }: HomePageProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        imageSrc={heroImageSrc}
        onPrimaryAction={() => navigate('/explora')}
        onSecondaryAction={() => navigate('/ecosistema')}
      />
      <ImpactSection />
      <EcosystemSection />
      <TestimonialsSection />
      {/*<Conclusion Section />*/}
    </>
  );
};
