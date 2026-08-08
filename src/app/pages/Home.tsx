import { HeroSection } from "../components/home/HeroSection";
import { ClientSection } from "../components/home/ClientSection";
import { CaseStudiesSection } from "../components/home/CaseStudiesSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { ApproachSection } from "../components/home/ApproachSection";
import { GlobalFootprintSection } from "../components/home/GlobalFootprintSection";
import { InsightsSection } from "../components/home/InsightsSection";
import { ContactSection } from "../components/home/ContactSection";

export function Home() {
  return (
    <div>
      <HeroSection />
      <ClientSection />
      <CaseStudiesSection />
      <ServicesSection />
      <ApproachSection />
      <GlobalFootprintSection />
      <InsightsSection />
      <ContactSection />
    </div>
  );
}