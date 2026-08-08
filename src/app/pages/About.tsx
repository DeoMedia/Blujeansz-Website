import { motion } from "motion/react";
import { Target, Globe, Users, Award, Lightbulb, Rocket } from "lucide-react";
import fabianImage from "figma:asset/3932b9868c075c3539c2aa1bea11129a2ef0cab9.png";
import olanrewajuImage from "figma:asset/cf9dd0fda2f9b5f875e45d96e7d36295593480ef.png";
import kennyImage from "figma:asset/f315f9be7d6e65ecf7fcb7670bbd080514b7848d.png";
import lebogangImage from "figma:asset/7b1f1ff202cb3bf2d7c3712ec8a49238a564b14a.png";
import gustavImage from "../../imports/Gustav-modified.webp";
import adelolaImage from "figma:asset/879fd1ebf614d4bc365fd77abeabeb8d8f620cc0.png";
import anitaImage from "figma:asset/87172be16eb2df464d14b1ad2cee883533a82c0e.png";
import yandisaImage from "figma:asset/69f0a745a4d575372aaebcace35182ee83b1bfae.png";
import norbiImage from "figma:asset/8c9690080d14e47651faa25df9b81c24af32fc16.png";
import shivaniImage from "figma:asset/bd54bd941d4e0bcf4252ee460d6d55d61929531c.png";
import johnyImage from "figma:asset/f41a712849b18f03ad6b39af3fe61ebed66f1be8.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "We believe in the power of brands to create positive change and meaningful connections.",
  },
  {
    icon: Globe,
    title: "Globally Minded",
    description: "Our diverse, international team brings cultural intelligence to every project.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We work as an extension of your team, fostering partnerships built on trust.",
  },
  {
    icon: Award,
    title: "Excellence Focused",
    description: "We deliver exceptional work that drives measurable results and lasting impact.",
  },
];

const stats = [
  { number: "12+", label: "Years of Excellence" },
  { number: "200+", label: "Brands Served" },
  { number: "45+", label: "Countries Reached" },
  { number: "98%", label: "Client Retention" },
];

export function About() {
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
              We Are BLUJEANSZ
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              A global marketing communications consultancy that transforms how brands
              connect with culture, engage diverse markets, and achieve sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C] mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging digital intelligence and traditional expertise to deliver marketing solutions that drive measurable impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-[#e8f5e5] p-8 lg:p-10 rounded-sm hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-sm mb-6">
                <Lightbulb className="w-8 h-8 text-[#0B1C2C]" />
              </div>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-4">
                Our Approach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We bridge the gap between digital intelligence and traditional expertise to deliver marketing solutions that drive measurable impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-[#e8f5e5] p-8 lg:p-10 rounded-sm hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-sm mb-6">
                <Rocket className="w-8 h-8 text-[#0B1C2C]" />
              </div>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-4">
                Global Reach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With our strategic partnerships and sister companies, we extend our expertise beyond borders, servicing brands and clients in emerging markets across Africa, the Americas, and the minority segments in the UK and USA.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 lg:py-32 bg-[#131042]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl lg:text-6xl font-bold text-white mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C] mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define who we are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#e8f5e5] p-8 lg:p-10 rounded-sm hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-sm mb-6">
                  <value.icon className="w-8 h-8 text-[#0B1C2C]" />
                </div>

                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-4">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              To empower brands to thrive in an increasingly diverse and interconnected
              world by bridging culture, creativity, and commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C] mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Talented professionals and strategic partners bringing diverse expertise and perspectives to every project.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { name: "Fabian A. Lojede", role: "Founder | Deo Media (UK, South Africa, Nigeria) | Executive Creative Director | Communications Strategist", image: fabianImage },
              { name: "Olanrewaju Olalekan", role: "Head | Global Operations", image: olanrewajuImage },
              { name: "Kenny Olaleye", role: "PMP, PMI-ACP, MBCS Founder & Deputy CEO | Scrum Master | Agile Practitioner | Project Manager", image: kennyImage },
              { name: "Lebogang Ramphele", role: "Head | Global Operations", image: lebogangImage },
              { name: "Gustav Mdluli", role: "Graphic Designer | Brand Developer | Business Administrator", image: gustavImage },
              { name: "Adelola Chu-Osakwe", role: "Head of Account Management", image: adelolaImage },
              { name: "Anita Isioma Chukwuma", role: "Executive Assistant | Business Operations Manager", image: anitaImage },
              { name: "Yandisa Hlangwana", role: "Frontend Developer", image: yandisaImage },
              { name: "Norbi Zylberberg", role: "Partner | Socialsssima", image: norbiImage },
              { name: "Shivani Naidoo", role: "Partner | Global Media Strategy", image: shivaniImage },
              { name: "Jonny Cohen", role: "Partner | Pathfinder", image: johnyImage },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    // Initials rather than a stock photo: an Unsplash portrait
                    // here would put a stranger's face under a colleague's name.
                    <div
                      className="w-full h-full flex items-center justify-center bg-[#0B1C2C] text-white"
                      aria-label={member.name}
                    >
                      <span className="text-3xl font-bold tracking-wider">
                        {member.name
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-[#0B1C2C] mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}