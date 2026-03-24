import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiInstagram, FiFacebook, FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    {
      group: "Communications",
      items: [
        { name: 'Walkie Talkies', slug: 'walkie-talkie' },
        { name: 'Radio Base Stations', slug: 'radio-base' },
        { name: 'Marine Radios', slug: 'marine-radio' },
        { name: 'Satellite Finders', slug: 'satellite-finder' },
      ]
    },
    {
      group: "Security Gear",
      items: [
        { name: 'Security Torches', slug: 'security-torch' },
        { name: 'Metal Detectors', slug: 'metal-detector' },
        { name: 'Tactical Batons', slug: 'baton' },
        { name: 'Alcohol Testers', slug: 'alcohol-tester' },
      ]
    },
    {
      group: "Business POS",
      items: [
        { name: 'POS Printers', slug: 'pos-printer' },
        { name: 'POS Monitors', slug: 'pos-monitor' },
        { name: 'Barcode Scanners', slug: 'barcode-scanner' },
        { name: 'Android Handhelds', slug: 'android-printer' },
      ]
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 h-20 md:h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex flex-col leading-none">
          <div className="flex items-center space-x-3">
          <img src="one wave final 2.png" className="h-12 w-12"/>
          <div className="flex flex-col space-y-1">
          <span className="text-xl md:text-2xl font-display font-black tracking-tighter uppercase">
            ONE<span className="text-brand-orange">WAVE</span>
          </span>
          <span className="text-[8px] md:text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase">Africa</span>
        </div>
        </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
          {categories.map((catGroup) => (
            <div 
              key={catGroup.group} 
              className="relative group py-4"
              onMouseEnter={() => setActiveDropdown(catGroup.group)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-orange transition-colors">
                {catGroup.group} <FiChevronDown />
              </button>
              
              {/* DROPDOWN */}
              <AnimatePresence>
                {activeDropdown === catGroup.group && (
                  <motion.div 
  initial={{ x: '100%' }} 
  animate={{ x: 0 }} 
  exit={{ x: '100%' }}
  transition={{ type: "spring", damping: 25, stiffness: 200 }}
  className="fixed inset-0 top-20 bg-brand-black z-50 lg:hidden overflow-y-auto px-6 py-10 h-[calc(100vh-80px)]"
>
                    {catGroup.items.map(item => (
                      <Link 
                        key={item.slug} 
                        to={`/category/${item.slug}`}
                        className="block py-3 px-4 hover:bg-white/5 rounded-xl text-xs font-bold transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link to="/about" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange">About</Link>
          <Link to="/contact" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange">Contact</Link>
        </div>

        {/* MOBILE TOGGLE & WHATSAPP */}
        <div className="flex items-center gap-4">
          <a href="https://wa.me/255752773798" className="hidden sm:flex bg-brand-orange text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest items-center gap-2">
            <FiMessageCircle /> WhatsApp
          </a>
          <button className="lg:hidden text-brand-orange p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (RESPONSIVE DRAWER) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed inset-0 top-20 bg-brand-black z-50 lg:hidden overflow-y-auto px-6 py-10"
          >
            {categories.map(group => (
              <div key={group.group} className="mb-10">
                <h3 className="text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] mb-4">{group.group}</h3>
                <div className="flex flex-col gap-4">
                  {group.items.map(item => (
                    <Link 
                      key={item.slug} 
                      to={`/category/${item.slug}`} 
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-display font-black uppercase italic"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="h-px bg-white/5 my-10" />
            <div className="flex flex-col gap-6">
               <Link to="/about" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase">About Us</Link>
               <Link to="/contact" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase">Contact</Link>
               <div className="flex gap-6 mt-4">
                  <FiInstagram size={24} className="text-gray-500" />
                  <FiFacebook size={24} className="text-gray-500" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;