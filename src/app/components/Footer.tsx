import { Link } from "react-router";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import logoLight from "figma:asset/aa1ba75230506f31800d027742b495f059fdb329.png";

export function Footer() {
  return (
    <footer className="bg-[#0B1C2C] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src={logoLight}
              alt="BLUJEANSZ"
              className="h-8 w-auto mb-6"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              A global marketing communications consultancy helping brands connect with culture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase">Office Locations</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <div className="font-medium text-white">South Africa</div>
                <div>Johannesburg</div>
              </li>
              <li>
                <div className="font-medium text-white">Nigeria</div>
                <div>Lagos</div>
              </li>
              <li>
                <div className="font-medium text-white">United Kingdom</div>
                <div>London</div>
              </li>
              <li>
                <div className="font-medium text-white">UAE</div>
                <div>Sharjah</div>
              </li>
              <li>
                <div className="font-medium text-white">Rwanda</div>
                <div>Kigali</div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to receive our latest insights and updates.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-[#0B1C2C] text-sm font-semibold rounded-sm hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-gray-400 text-sm">
              © 2026 BLUJEANSZ. All rights reserved.
            </p>
            <a href="mailto:hello@blujeansz.com" className="text-gray-400 hover:text-white transition-colors text-sm">
              hello@blujeansz.com
            </a>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-6">
            <a 
              href="https://www.linkedin.com/company/blujeansz/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors" 
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/blu.jeansz?igsh=MmlxanRnZGczZXZt" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors" 
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61576709128838" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors" 
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}