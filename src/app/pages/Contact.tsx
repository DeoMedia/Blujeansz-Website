import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

const offices = [
  {
    city: "Johannesburg",
    country: "South Africa",
    address: "1st Floor Eagle Canyon Office Park, Cnr. Dolfyn & Christian De Wet St. Randpark Ridge, Randburg 2156",
    email: "hello@blujeansz.com",
    phone: "+27 11 123 4567",
  },
  {
    city: "Lagos",
    country: "Nigeria",
    address: "Olabode House, 217/219 Ikorodu Road, Ilupeju, Lagos",
    email: "hello@blujeansz.com",
    phone: "+234 1 234 5678",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "Deo Media Limited UK, Springhead Road, Northfleet, Kent, DA11 8HN",
    email: "hello@blujeansz.com",
    phone: "+44 20 1234 5678",
  },
  {
    city: "Sharjah",
    country: "United Arab Emirates",
    address: "Trading as Sanafre FZC LLC, Business Centre, Sharjah Publishing City Free Zone, Sharjah",
    email: "hello@blujeansz.com",
    phone: "+971 4 123 4567",
  },
  {
    city: "Kigali",
    country: "Rwanda",
    address: "14th floor, KN 2 street, Avenue du commerce, Kigali",
    email: "hello@blujeansz.com",
    phone: "+250 788 123 456",
  },
];

export function Contact() {
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
              Let's Talk
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Ready to transform your brand? We'd love to hear about your project
              and explore how we can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Our Offices - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">Our Offices</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {offices.map((office) => (
                  <div key={office.city}>
                    <h3 className="font-bold text-[#0B1C2C] mb-2">
                      {office.country}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{office.address}</p>
                      <p className="text-[#0B1C2C] font-semibold">{office.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-8">
                Get in touch
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors appearance-none bg-white"
                    >
                      <option value="">Select Country</option>
                      <option value="south-africa">South Africa</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="united-kingdom">United Kingdom</option>
                      <option value="uae">United Arab Emirates</option>
                      <option value="rwanda">Rwanda</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm text-gray-700 mb-2">
                    Reason for Contact
                  </label>
                  <select
                    id="reason"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors appearance-none bg-white"
                  >
                    <option value="">Select Reason</option>
                    <option value="brand-strategy">Brand Strategy</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="public-relations">Public Relations</option>
                    <option value="content-marketing">Content Marketing</option>
                    <option value="media-strategy">Media Strategy & Buying</option>
                    <option value="brand-activations">Brand Activations & Experiences</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors resize-none"
                    placeholder="Your inquiry details or project details"
                  />
                </div>

                <button
                  type="submit"
                  className="group px-8 py-4 bg-[#0b1c2c] text-white font-semibold rounded-sm hover:bg-[#1a2f42] transition-all duration-300"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}