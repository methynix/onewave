import { motion } from 'framer-motion';
import { FiTarget, FiShield, FiCpu, FiGlobe, FiZap,FiMapPin,FiNavigation } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const values = [
    {
      icon: <FiShield className="text-brand-orange" size={32} />,
      title: "Tactical Reliability",
      desc: "Our equipment is tested for the unique terrains of Africa, from dense urban centers to remote rural landscapes."
    },
    {
      icon: <FiZap className="text-brand-orange" size={32} />,
      title: "Energy Independence",
      desc: "Combining communication with solar innovation to ensure your mission stays powered, even off-the-grid."
    },
    {
      icon: <FiCpu className="text-brand-orange" size={32} />,
      title: "Authorized Hardware",
      desc: "Direct partnerships with brands like Baofeng, Quansheng, and YJT to guarantee 100% genuine products."
    }
  ];

  const stats = [
    { label: "Products Catalogued", value: "50+" },
    { label: "Active Regions", value: "Pan-Africa" },
    { label: "Support Response", value: "< 2hrs" },
  ];

  return (
    <div className="min-h-screen pb-20 overflow-hidden">
      {/* 1. HERO SECTION - BOLD & IMPACTFUL */}
     <section className="py-20 lg:py-32 border-b border-white/5 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* UPANDE WA KUSHOTO: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <span className="text-brand-orange font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              The Mission Briefing
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter italic leading-[0.85] mb-10">
              Connecting <br /> 
              <span className="text-brand-orange">The Continent .</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-medium mb-8">
              OneWave Africa Technologies Ltd is a premier provider of professional communications. 
              Based in the heart of Dar es Salaam, we equip the professional frontier.
            </p>

            {/* Address Details Badge */}
            <div className="inline-flex items-start gap-4 bg-brand-darkGrey p-6 rounded-3xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Base Operations</p>
                <p className="text-sm font-bold text-white">39A New Bagamoyo Rd, Dar es Salaam</p>
              </div>
            </div>
          </motion.div>

          {/* UPANDE WA KULIA: THE INTERACTIVE MAP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] lg:h-[500px] w-full group"
          >
            {/* Map Frame Decoration */}
            <div className="absolute -inset-2 bg-brand-orange/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 bg-brand-darkGrey shadow-2xl">
              {/* GOOGLE MAPS IFRAME */}
              <iframe 
                title="OneWave Africa Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.944747530656!2d39.252033!3d-6.776605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c490000000000%3A0x0000000000000000!2sOneWave%20Africa%20Technologies%20Ltd!5e0!3m2!1sen!2stz!4v1234567890"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              ></iframe>

              {/* Map Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest">Dar es Salaam, TZ</span>
                <a 
                  href="https://maps.google.com/?q=OneWave+Africa+Technologies+Ltd+New+Bagamoyo+Rd" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-brand-orange text-white p-2 rounded-lg hover:scale-110 transition-transform"
                >
                  <FiNavigation size={18} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
      {/* 2. CORE VALUES - ICON GRID */}
      <section className="py-24 grid md:grid-cols-3 gap-8">
        {values.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-brand-darkGrey p-10 rounded-[3rem] border border-white/5 hover:border-brand-orange/20 transition-all group"
          >
            <div className="mb-6 transform group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4 italic">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* 3. THE "WHY" - SPLIT SECTION */}
      <section className="py-24 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="aspect-video bg-brand-darkGrey rounded-[3rem] overflow-hidden border border-white/10">
             {/* Imagine a high-quality rugged radio in a safari or construction setting */}
             <img 
               src="https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=2070&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
               alt="Industrial Comms"
             />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand-orange p-8 rounded-[2rem] hidden md:block">
            <FiTarget size={40} className="text-white" />
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter italic leading-none">
            Beyond <span className="text-brand-orange">Commerce .</span>
          </h2>
          <div className="space-y-6 text-gray-400 text-lg">
            <p>
              We realized that standard consumer-grade equipment often fails when subjected to the 
              intense heat, dust, and remote conditions of African operations.
            </p>
            <p>
              From security firms in Nairobi to wildlife conservancies in the Serengeti, 
              we provide the hardware that allows communication to flow when it matters most.
            </p>
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION - THE FINALE */}
      <section className="mt-20 py-20 bg-brand-orange rounded-[4rem] text-center space-y-8 px-6">
        <FiGlobe className="mx-auto text-white/30" size={80} />
        <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-brand-black leading-none">
          Equipping the <br /> Professional Frontier .
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            to="/" 
            className="w-full md:w-auto bg-brand-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
          >
            Explore Inventory
          </Link>
          <Link 
            to="/contact" 
            className="w-full md:w-auto border-2 border-brand-black text-brand-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all"
          >
            Contact Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;