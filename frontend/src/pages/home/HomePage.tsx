// src/pages/home/HomePage.tsx
import { useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import QuickActionsSection from './sections/QuickActionsSection';
import CTABannerSection from './sections/CTABannerSection';
import NewsSection from './sections/NewsSection';
import WhoWeAreSection from './sections/WhoWeAreSection';
import OpportunitiesSection from './sections/OpportunitiesSection';
import PublicationsCTASection from './sections/PublicationsCTASection';
import PartnersSection from './sections/PartnersSection';

const HomePage = () => {
  /*useEffect(() => {
    document.title = ' Public Service Commission';
  }, []);*/

  return (
    <>
      <HeroSection />
      <QuickActionsSection />
      <CTABannerSection />
      <NewsSection />
      <WhoWeAreSection />
      <OpportunitiesSection />
      <PublicationsCTASection />
      <PartnersSection />
    </>
  );
};

export default HomePage;