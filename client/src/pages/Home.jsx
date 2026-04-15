import { useState, useEffect } from 'react';
import { useGetProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data: products, isLoading } = useGetProducts();
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();

  const heroImages = [
    "https://res.cloudinary.com/dwt1u991q/image/upload/v1775730004/hero/iqfkgvizlwynonrufakk.jpg",
    "https://res.cloudinary.com/dwt1u991q/image/upload/v1775730003/hero/lmladkdufmzwdfloyz72.jpg",
    "https://res.cloudinary.com/dwt1u991q/image/upload/v1776143064/hero1_sxdyxc.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextHero = () => setHeroIndex(heroIndex === heroImages.length - 1 ? 0 : heroIndex + 1);
  const prevHero = () => setHeroIndex(heroIndex === 0 ? heroImages.length - 1 : heroIndex - 1);

  const getDisplayProducts = () => {
    if (!products) return [];

    const seriesBrands = ['Baofeng', 'Motorola', 'Kenwood'];
    const seenBrands = new Set();
    const filtered = [];

    products.forEach(product => {
      if (seriesBrands.includes(product.brand)) {
        if (!seenBrands.has(product.brand)) {
          // Create a special "Series" card object
          filtered.push({
            ...product,
            id: `brand-${product.brand.toLowerCase()}`,
            name: `${product.brand} Series`,
            isBrandGroup: true,
            originalBrand: product.brand
          });
          seenBrands.add(product.brand);
        }
      } else {
        filtered.push(product);
      }
    });

    return filtered;
  };

  const displayProducts = getDisplayProducts();

  return (
    <div className="pb-20 bg-brand-black">
      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-brand-orange/5">
        
        {/* SLIDESHOW LAYER */}
        <div className="absolute inset-0 z-0">
  <AnimatePresence mode="wait">
    <motion.div
      key={heroIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 w-full h-full" // Removed padding to let image go edge-to-edge
    >
      <img 
        src={heroImages[heroIndex].replace('/upload/', '/upload/f_auto,q_auto:best,w_1920,c_fill/')} 
        alt="ONEWAVE AFRICA Hero" 
        // CHANGE: object-cover makes it fill the entire width and height
        // brightness and contrast added to make it "Cinematic"
        className="w-full h-full object-cover pointer-events-none brightness-[0.6] contrast-[1.1]"
      />
      {/* VITAL: The overlay ensures the "Ghost Text" remains readable on a full-blown image */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black" />
    </motion.div>
  </AnimatePresence>
</div>

        {/* GHOST TEXT OVERLAY */}
        <div className="relative z-10 text-center px-4 max-w-5xl pointer-events-none">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            className="text-brand-orange font-black tracking-[0.4em] text-[10px] md:text-xs uppercase mb-6 block"
          >
            Tactical Solutions for Africa
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-display font-black leading-none tracking-tighter uppercase italic text-white drop-shadow-2xl"
          >
            ONEWAVE <br /> <span className="text-brand-orange">AFRICA</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
            className="max-w-2xl mx-auto mt-6 text-gray-200 text-sm md:text-xl leading-relaxed px-4 font-medium"
          >
            We simplify technology for businesses by providing reliable equipment. 
            From communication systems to POS devices, we help you work faster and safer.
          </motion.p>
        </div>

        {/* MANUAL CONTROLS */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-20">
          <button onClick={prevHero} className="p-3 md:p-5 rounded-full bg-white/5 hover:bg-brand-orange text-white transition-all backdrop-blur-sm border border-white/10 group">
            <FiChevronLeft size={24} className="group-active:scale-90" />
          </button>
          <button onClick={nextHero} className="p-3 md:p-5 rounded-full bg-white/5 hover:bg-brand-orange text-white transition-all backdrop-blur-sm border border-white/10 group">
            <FiChevronRight size={24} className="group-active:scale-90" />
          </button>
        </div>

        {/* PROGRESS DOTS */}
        <div className="absolute bottom-10 flex gap-2 z-20">
          {heroImages.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${i === heroIndex ? 'w-8 bg-brand-orange' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>
      </section>

      {/* --- OUR PRODUCTS SECTION --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 mt-24">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white">
            OUR <span className="text-brand-orange">PRODUCTS</span>
          </h2>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-brand-orange/50 to-transparent" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(n => <div key={n} className="h-[450px] bg-brand-darkGrey animate-pulse rounded-[3rem]" />)}
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
            {displayProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => product.isBrandGroup ? navigate(`/brand/${product.originalBrand}`) : null}
                className={product.isBrandGroup ? 'cursor-pointer' : ''}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;