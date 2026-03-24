// src/components/Footer.jsx
import { FiInstagram, FiFacebook, FiMessageCircle, FiMail } from 'react-icons/fi';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-black uppercase tracking-tighter italic">
            ONEWAVE<span className="text-brand-orange">AFRICA</span>
          </h2>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Premium distributor of tactical communication hardware and industrial solutions across the African continent.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/onewaveafrica" className="w-12 h-12 rounded-xl bg-brand-darkGrey flex items-center justify-center hover:bg-brand-orange transition-all"><FiInstagram size={20} /></a>
            <a href="https://facebook.com/onewaveafrica" className="w-12 h-12 rounded-xl bg-brand-darkGrey flex items-center justify-center hover:bg-brand-orange transition-all"><FiFacebook size={20} /></a>
            <a href="https://wa.me/255712345678" className="w-12 h-12 rounded-xl bg-brand-darkGrey flex items-center justify-center hover:bg-brand-orange transition-all"><FiMessageCircle size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Products</h4>
            <ul className="text-sm text-gray-500 space-y-2 uppercase font-bold">
              <li><Link to="/category/radio-base" className="hover:text-white">Radios</Link></li>
              <li><Link to="/category/pos-printer" className="hover:text-white">Printers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Support</h4>
            <ul className="text-sm text-gray-500 space-y-2 uppercase font-bold">
              <li><a href="/home" className="hover:text-white">Technical Specs</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-brand-darkGrey p-8 rounded-[2rem] border border-white/5 space-y-4">
          <h4 className="font-display font-bold text-xl">Need a Custom Quote?</h4>
          <p className="text-sm text-gray-400">Send us a direct message for bulk orders and institutional pricing.</p>
          <a href="mailto:info@onewave.africa" className="flex items-center gap-3 text-brand-orange font-black text-sm uppercase tracking-widest group">
            <FiMail /> onewaveafrica@gmail.com
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
      </div>

      <div className="text-center mt-20 text-[10px] text-gray-700 uppercase tracking-[0.5em] font-bold">
        © {new Date().getFullYear()} One Wave Africa • Rugged Solutions for the Continent
      </div>
    </footer>
  );
};

export default Footer;