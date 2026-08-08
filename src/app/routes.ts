import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { CaseStudies } from "./pages/CaseStudies";
import { Insights } from "./pages/Insights";
import { Contact } from "./pages/Contact";
import { Prodculator } from "./pages/case-studies/Prodculator";
import { TheAfrotods } from "./pages/case-studies/TheAfrotods";
import { NollywoodMasterclass } from "./pages/case-studies/NollywoodMasterclass";
import { SeplatEnergy } from "./pages/case-studies/SeplatEnergy";
import { Aradel } from "./pages/case-studies/Aradel";
import { NGXGroup } from "./pages/case-studies/NGXGroup";
import { GTBankAirport } from "./pages/case-studies/GTBankAirport";
import { CovidPrevention } from "./pages/case-studies/CovidPrevention";
import { GTBankNigeria } from "./pages/case-studies/GTBankNigeria";
import { TaranisNouvusAfrica } from "./pages/case-studies/TaranisNouvusAfrica";
import { CulturalTrends2026 } from "./pages/insights/CulturalTrends2026";
import { YouthCultureGrowthLever } from "./pages/insights/YouthCultureGrowthLever";
import { ScalingAfricanBrands } from "./pages/insights/ScalingAfricanBrands";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "case-studies", Component: CaseStudies },
      { path: "case-studies/prodculator", Component: Prodculator },
      { path: "case-studies/the-afrotods", Component: TheAfrotods },
      { path: "case-studies/nollywood-masterclass", Component: NollywoodMasterclass },
      { path: "case-studies/seplat-energy", Component: SeplatEnergy },
      { path: "case-studies/aradel", Component: Aradel },
      { path: "case-studies/ngx-group", Component: NGXGroup },
      { path: "case-studies/gtbank-airport", Component: GTBankAirport },
      { path: "case-studies/covid-prevention", Component: CovidPrevention },
      { path: "case-studies/gtbank-nigeria", Component: GTBankNigeria },
      { path: "case-studies/taranis-nouvus-africa", Component: TaranisNouvusAfrica },
      { path: "insights", Component: Insights },
      { path: "insights/cultural-trends-2026", Component: CulturalTrends2026 },
      { path: "insights/youth-culture-growth-lever", Component: YouthCultureGrowthLever },
      { path: "insights/scaling-african-brands", Component: ScalingAfricanBrands },
      { path: "contact", Component: Contact },
    ],
  },
]);