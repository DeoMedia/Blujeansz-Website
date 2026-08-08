import { motion } from "motion/react";
import { Link } from "react-router";
import { Palette, Target, Globe, Mic, Video, Layers, MapPin, Heart, ArrowRight } from "lucide-react";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";
import brandDevelopmentImg from "figma:asset/a46883ce42b2c6c66b5246078b2eb918f614503a.png";
import marketingStrategyImg from "figma:asset/09fb6f7c8c0ab9a96b26cc820c9f5409961feb10.png";
import digitalMarketingImg from "figma:asset/6b7853d0632fdac31e9de717413c79174d5dafad.png";
import publicRelationsImg from "figma:asset/9dc7fcef08b18fc1205e6a09d02e59f1399f317c.png";
import contentMarketingImg from "figma:asset/6d5926168e3f6b9d83f291be275d95dd5808b8ca.png";
import throughTheLineImg from "figma:asset/6429566939c3ca7588e5c1bdd09ddd8173be7493.png";
import onGroundActivationsImg from "figma:asset/170aa4913897b313fae3dc93e248614513f5e3c1.png";
import ngoBehavioralChangeImg from "figma:asset/d7af56f035f9af5a76beee9b0d91af00f618c317.png";

const services = [
  {
    icon: Palette,
    title: "Brand Development",
    description: "We build distinctive brand identities designed to stand out, resonate with audiences, and endure over time.",
    image: brandDevelopmentImg,
    features: [
      "Brand positioning & architecture",
      "Visual identity & design systems",
      "Brand strategy & guidelines",
      "Market research & competitive analysis",
    ],
  },
  {
    icon: Target,
    title: "Marketing Strategy",
    description: "Data-driven strategies that uncover opportunities, guide decision-making, and deliver measurable business growth.",
    image: marketingStrategyImg,
    features: [
      "Market analysis & insights",
      "Customer segmentation & targeting",
      "Campaign planning & execution",
      "Performance measurement & optimization",
    ],
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "From SEO to social media and performance campaigns, we help brands succeed across the entire digital ecosystem.",
    image: digitalMarketingImg,
    features: [
      "Search engine optimization (SEO)",
      "Social media marketing & management",
      "Pay-per-click (PPC) advertising",
      "Email marketing & automation",
    ],
  },
  {
    icon: Mic,
    title: "Public Relations",
    description: "We craft compelling narratives that build trust, shape perception, and connect brands with their stakeholders.",
    image: publicRelationsImg,
    features: [
      "Media relations & press outreach",
      "Crisis communications management",
      "Influencer & partnership programs",
      "Reputation management",
    ],
  },
  {
    icon: Video,
    title: "Content Marketing",
    description: "We develop impactful content strategies across multiple platforms including YouTube, TikTok, and subscription-based content such as THE AFROTODS and NMC.",
    image: contentMarketingImg,
    features: [
      "Multi-platform content strategy",
      "YouTube & TikTok content creation",
      "Subscription-based content programs",
      "Editorial & copywriting services",
    ],
  },
  {
    icon: Layers,
    title: "Through-The-Line Campaigns",
    description: "From concept development to above-the-line execution, media deployment, and on-ground activations, we deliver fully integrated marketing campaigns.",
    image: throughTheLineImg,
    features: [
      "Integrated campaign development",
      "Above-the-line (ATL) advertising",
      "Media planning & buying",
      "Below-the-line (BTL) activations",
    ],
  },
  {
    icon: MapPin,
    title: "On-Ground Activations",
    description: "We have successfully launched brands across Africa, including product launches for Teranis Novus Limited at the Lagos International Trade Fair.",
    image: onGroundActivationsImg,
    features: [
      "Product launch events",
      "Trade fair & exhibition management",
      "Brand experience activations",
      "Experiential marketing campaigns",
    ],
  },
  {
    icon: Heart,
    title: "NGO & Behavioral Change Campaigns",
    description: "With over 20 years of experience, we design communication campaigns that drive behavioral change on critical issues including health awareness, gender equality, and social development.",
    image: ngoBehavioralChangeImg,
    features: [
      "Health & social awareness campaigns",
      "Gender equality communications",
      "Community engagement programs",
      "Impact measurement & reporting",
    ],
  },
];

export function Services() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-[#07007b] text-white relative overflow-hidden">
        {/* Background Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: '100%',
            backgroundPosition: 'left top',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'scroll',
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
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Integrated Marketing Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              End-to-end marketing solutions designed to elevate your brand,
              engage your audience, and accelerate measurable business results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Image */}
                <div className="mb-5 overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <service.icon className="w-8 h-8 text-[#0B1C2C]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#0B1C2C] mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Hover Overlay with Features */}
                <div className="absolute inset-0 bg-[#0B1C2C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 text-white rounded-xl">
                  <h4 className="text-lg font-bold mb-4">{service.title}</h4>
                  <div className="space-y-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <p key={feature} className="text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's discuss how our services can help you achieve your marketing goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0B1C2C] font-semibold rounded-sm hover:bg-gray-100 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}