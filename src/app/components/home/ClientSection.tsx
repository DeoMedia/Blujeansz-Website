import { motion } from "motion/react";
import gtbankLogo from "figma:asset/886cc7898fa84eab26d7e149727c7a94412fe0a1.png";
import afrotodsLogo from "figma:asset/048da79e04ad5867815670407e558d1a227d902f.png";
import zenithLogo from "figma:asset/974a5c97df597935698f426e81547583e0763fc5.png";
import intercontinentalLogo from "figma:asset/4c30fefbce14c124f2877487541c88a68b80a998.png";
import taranisLogo from "figma:asset/94dcf5822ec1f8b0aa9e6ad1eee030a74b04aea0.png";
import aradelLogo from "figma:asset/938695c56c913436505a80fb0c8c2d9039111a20.png";
import ngxLogo from "figma:asset/eeddcdce33bea5c6a3ead50529146d58db8d64ab.png";
import prodculatorLogo from "figma:asset/9abc7baa4e15dce98b4849308a06111ef52456b0.png";
import seplatLogo from "figma:asset/09ab0d26bbdf2650924d272a8be42776af4634ed.png";

const clients = [
  { 
    name: "GTBank", 
    logo: gtbankLogo,
    description: "Leading African financial institution with presence across West Africa"
  },
  { 
    name: "The Afrotods", 
    logo: afrotodsLogo,
    description: "Contemporary African fashion and lifestyle brand"
  },
  { 
    name: "Zenith Bank", 
    logo: zenithLogo,
    description: "Nigeria's leading financial services provider with international operations"
  },
  { 
    name: "Intercontinental Bank", 
    logo: intercontinentalLogo,
    description: "Pan-African banking institution delivering innovative financial solutions"
  },
  { 
    name: "Taranis Novus", 
    logo: taranisLogo,
    description: "Energy and infrastructure development company"
  },
  { 
    name: "Aradel Holdings", 
    logo: aradelLogo,
    description: "Integrated energy company focused on oil and gas exploration"
  },
  { 
    name: "NGX", 
    logo: ngxLogo,
    description: "Nigerian Exchange Group - Africa's premier securities exchange"
  },
  { 
    name: "Prodculator", 
    logo: prodculatorLogo,
    description: "Digital productivity and calculation tools platform"
  },
  { 
    name: "Seplat Energy", 
    logo: seplatLogo,
    description: "Leading indigenous energy company in Nigeria's oil and gas sector"
  },
];

export function ClientSection() {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1C2C] text-center"
        >
          Trusted by brands that move markets.
        </motion.h2>
      </div>

      {/* Scrolling Logo Strip */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 md:gap-8 animate-scroll items-center w-max">
          {/* First set */}
          {clients.map((client, index) => (
            <div
              key={`client-1-${index}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex flex-col items-center justify-center relative group"
              style={{ width: '160px', height: '140px' }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-[50px] max-w-[130px] w-auto h-auto object-contain mb-3"
              />
              {/* Hover overlay with name and description */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                <h3 className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: '#07007b' }}>
                  {client.name}
                </h3>
                <p className="text-[10px] text-gray-600 leading-tight">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`client-2-${index}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex flex-col items-center justify-center relative group"
              style={{ width: '160px', height: '140px' }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-[50px] max-w-[130px] w-auto h-auto object-contain mb-3"
              />
              {/* Hover overlay with name and description */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                <h3 className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: '#07007b' }}>
                  {client.name}
                </h3>
                <p className="text-[10px] text-gray-600 leading-tight">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}