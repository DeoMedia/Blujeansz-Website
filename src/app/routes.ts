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
import { InsightArticle } from "./pages/insights/InsightArticle";
import { NotFound } from "./pages/NotFound";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminLogin } from "./admin/Login";
import { Dashboard } from "./admin/Dashboard";
import { InsightsList } from "./admin/InsightsList";
import { InsightEditor } from "./admin/InsightEditor";
import {
  CaseStudiesList,
  AuthorsList,
  StaffList,
  MediaLibrary,
  UsersList,
  SettingsScreen,
} from "./admin/screens";

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
      // One dynamic route now serves every article, including the three that
      // previously had bespoke pages — their old slugs redirect (see
      // LEGACY_SLUG_REDIRECTS), so existing links keep working.
      { path: "insights/:slug", Component: InsightArticle },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
  // The admin area sits outside the public Layout: its own shell, no public
  // nav or footer, so nothing here can affect the public site's design.
  { path: "/admin/login", Component: AdminLogin },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "insights", Component: InsightsList },
      { path: "insights/new", Component: InsightEditor },
      { path: "insights/:id/edit", Component: InsightEditor },
      { path: "case-studies", Component: CaseStudiesList },
      { path: "authors", Component: AuthorsList },
      { path: "staff", Component: StaffList },
      { path: "media", Component: MediaLibrary },
      { path: "users", Component: UsersList },
      { path: "settings", Component: SettingsScreen },
    ],
  },
]);