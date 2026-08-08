import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import prodxculatorImage from "figma:asset/4f902cc33d2ecf96a8fb8789e6487f51b394b7f9.png";
import afrotodsImage from "figma:asset/f8fc589b341bceef9f3d4ecdd7ffff1dbe313315.png";
import nollywoodImage from "figma:asset/a62e4ba09adba0e5a10a00ad71595970ad8b69d9.png";
import seplatImage from "figma:asset/950a079cba5a897289a0cf77f52bf17d7211de37.png";
import aradelImage from "figma:asset/11fbf1a032a8aab768e187a201c60266413a5415.png";
import ngxImage from "figma:asset/f13ae73b3fabd7f73036e9f18bb45acf48045b15.png";
import gtbankImage from "figma:asset/9a37bbefc22c97686a0c29a4eebe35e07692b244.png";
import covidImage from "figma:asset/735116d3624db5615089c87aa462449bb6152024.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";
import taranisImage from "figma:asset/29fe49afeadc2f210df2788fc059baf1b0498d1b.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const caseStudies = [
  {
    id: 1,
    image: prodxculatorImage,
    client: "Prodculator",
    title: "Film Finance Platform Design & Launch",
    category: "Branding · Digital",
    location: "South Africa",
    description: "Platform architecture and UI design that demystifies film tax rebates for film producers globally. Strategic communications positioned Prodculator as a game-changer bridging film producers and global financiers, securing coverage in key entertainment and finance media outlets.",
    link: "/case-studies/prodculator",
    metrics: [
      { label: "Global Launch", value: "Success" },
      { label: "Media Coverage", value: "Major Outlets" },
      { label: "Project Scope", value: "Full Stack" },
    ],
  },
  {
    id: 2,
    image: afrotodsImage,
    client: "THE AFROTODS",
    title: "Digital Learning Platform & Global Growth",
    category: "Branding · Digital · TV",
    location: "South Africa",
    description: "Full web application development (WordPress, WooCommerce) for African-inspired animated storybooks, creating a seamless purchase-to-playback experience. Leading digital marketing and global growth strategy with targeted paid media campaigns across North America, Asia, and South America.",
    link: "/case-studies/the-afrotods",
    metrics: [
      { label: "Continents Reached", value: "3" },
      { label: "Platform Type", value: "E-commerce" },
      { label: "Content Distribution", value: "Global" },
    ],
  },
  {
    id: 3,
    image: nollywoodImage,
    client: "Nollywood Masterclass (NMC)",
    title: "Online Education Platform Launch",
    category: "Branding · Digital",
    location: "Nigeria",
    description: "Branding and digital platform development for Africa's premier film education destination. The platform connects aspiring creatives with industry Masters through expert-led masterclasses covering production, editing, acting, writing, directing, and more.",
    link: "/case-studies/nollywood-masterclass",
    metrics: [
      { label: "Platform Type", value: "E-Learning" },
      { label: "Industry Focus", value: "Entertainment" },
      { label: "Audience", value: "Pan-African" },
    ],
  },
  {
    id: 4,
    image: seplatImage,
    client: "Seplat Energy",
    title: "Hybrid Event Experience & Digital Ecosystem",
    category: "Branding · Activations",
    location: "Nigeria",
    description: "End-to-end event management for a hybrid experience including creative design of event collateral, advertising strategy, website development, and professional live streaming services for one of Africa's leading energy companies.",
    link: "/case-studies/seplat-energy",
    metrics: [
      { label: "Event Type", value: "Hybrid" },
      { label: "Services", value: "Full-Scale" },
      { label: "Live Streaming", value: "Multi-Platform" },
    ],
  },
  {
    id: 5,
    image: aradelImage,
    client: "ARADEL (formerly NDEP)",
    title: "Comprehensive Corporate Rebranding",
    category: "Branding · Digital",
    location: "Nigeria",
    description: "Complete brand transformation capturing ARADEL's evolving vision and commitment to innovation. Deliverables included new name, logo, tagline, comprehensive brand manual, website redesign, photography, video production, and social media content creation and management.",
    link: "/case-studies/aradel",
    metrics: [
      { label: "Brand Identity", value: "Complete" },
      { label: "Website", value: "Redesign" },
      { label: "Social Media", value: "Integrated" },
    ],
  },
  {
    id: 6,
    image: ngxImage,
    client: "NGX Group",
    title: "Nigerian Stock Exchange Rebrand & Relaunch",
    category: "Branding · Outdoor · TV",
    location: "Nigeria",
    description: "Rebranding and relaunch of the Nigerian Stock Exchange as NGX Group, marking a significant post-demutualization transformation. Strategic campaign elevated brand affinity and stakeholder engagement, amplifying visibility as a leading force in African capital markets.",
    link: "/case-studies/ngx-group",
    metrics: [
      { label: "Transformation", value: "Historic" },
      { label: "Campaign", value: "Integrated" },
      { label: "Visibility", value: "National" },
    ],
  },
  {
    id: 7,
    image: gtbankImage,
    client: "GT Bank",
    title: "Cape Town Airport Branding",
    category: "Outdoor · Digital",
    location: "South Africa",
    description: "Strategic outdoor branding deployment at Cape Town International Airport, maximizing brand visibility to millions of international and domestic travelers annually. Secured premium advertising spaces in high-traffic zones.",
    link: "/case-studies/gtbank-airport",
    metrics: [
      { label: "Placement", value: "Premium" },
      { label: "Impressions", value: "Millions" },
      { label: "Visibility", value: "International" },
    ],
  },
  {
    id: 8,
    image: covidImage,
    client: "COVID-19 Prevention Network",
    title: "Global Vaccine Education Campaign",
    category: "Creative · Digital · TV",
    location: "South Africa",
    description: "Through-the-line global campaign to educate people about the COVID vaccine. Strategy and execution developed in partnership with Socialisma USA, inspiring hope and collective action during a critical period in public health.",
    link: "/case-studies/covid-prevention",
    metrics: [
      { label: "Campaign", value: "Global" },
      { label: "Reach", value: "TTL" },
      { label: "Impact", value: "Public Health" },
    ],
  },
  {
    id: 9,
    image: gtbankImage,
    client: "GT Bank Nigeria",
    title: "Television Advertising Campaign",
    category: "Creative · Digital · TV",
    location: "Nigeria",
    description: "Developed and executed TV ads in conjunction with comprehensive media placements across Nigeria. Creative strategy and production delivered in partnership with Deo Media for one of Nigeria's leading banks.",
    link: "/case-studies/gtbank-nigeria",
    metrics: [
      { label: "Production", value: "TV" },
      { label: "Media", value: "Multi-Channel" },
      { label: "Reach", value: "National" },
    ],
  },
  {
    id: 10,
    image: taranisImage,
    client: "Taranis Nouvus Africa",
    title: "Corporate Website & Custom CRM Platform",
    category: "Digital · Web Development · CRM",
    location: "Africa",
    description: "Complete digital ecosystem including corporate website at tnlafrica.com and custom-built CRM tool for managing Lithtech sales operations. Enterprise-grade platform enabling sales process optimization and data-driven decision making.",
    link: "/case-studies/taranis-nouvus-africa",
    metrics: [
      { label: "Website", value: "Corporate" },
      { label: "CRM", value: "Custom" },
      { label: "Platform", value: "Enterprise" },
    ],
  },
];

export function CaseStudies() {
  const featured = caseStudies[0];
  const rest = caseStudies.slice(1);

  return (
    <div className="pt-20 lg:pt-24">
      
      {/* HERO */}
      <section className="py-20 lg:py-28 bg-[#07007b] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
          }}
        />

        <style>{`
          @media (min-width: 768px) {
            .pt-20 > section:first-child > div[style*="backgroundImage"] {
              background-size: 60% !important;
            }
          }
          @media (min-width: 1024px) {
            .pt-20 > section:first-child > div[style*="backgroundImage"] {
              background-size: 42% !important;
            }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Work
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Case studies that prove our ability to drive real business impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center bg-gray-50 rounded-2xl p-8 lg:p-12 shadow-sm"
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div>
              <span className="text-sm text-blue-600 font-semibold uppercase">
                Featured Case
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mt-3 mb-4">
                {featured.title}
              </h2>

              <p className="text-gray-600 mb-6">
                {featured.description}
              </p>

              {/* METRICS */}
              <div className="flex flex-wrap gap-4 mb-6">
                {featured.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-lg font-bold text-[#0B1C2C]">
                      {m.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={featured.link}
                className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-6 py-3 rounded-sm hover:bg-[#1a3a52]"
              >
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CASE GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((study) => (
              <motion.div
                key={study.id}
                whileHover={{ y: -6 }}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  {typeof study.image === 'string' && study.image.startsWith('http') ? (
                    <ImageWithFallback
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <span className="text-xs text-gray-500 uppercase">
                    {study.client}
                  </span>

                  <h3 className="text-lg font-semibold text-[#0B1C2C] mt-2 mb-2">
                    {study.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {study.description}
                  </p>

                  {/* METRICS TAGS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.metrics.slice(0, 2).map((m) => (
                      <span
                        key={m.label}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {m.value}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={study.link}
                    className="text-blue-600 text-sm font-semibold inline-flex items-center"
                  >
                    View Case
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1C2C] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Create Your Success Story
          </h2>
          <p className="text-gray-300 mb-6">
            Ready to achieve similar results? Let's talk.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0B1C2C] px-6 py-3 rounded-sm"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}