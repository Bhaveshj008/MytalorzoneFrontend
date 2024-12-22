import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
   
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
              <p className="text-gray-400">Get the latest updates and offers</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">⚡️ Mytalorzone</h3>
              <p className="text-gray-400 mb-6">Empowering your digital journey with innovative solutions and exceptional service.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Pricing', 'Features', 'Resources', 'Case Studies', 'Testimonials'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Press', 'News', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-red-500" />
                <span>contact@mytalorzone.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-red-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-red-500" />
                <span>123 Business Ave, Suite 100<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mytalorzone. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;