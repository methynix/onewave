import { useGetProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { data: products, isLoading } = useGetProducts();

  return (
    <div className="pb-20">
      {/* HERO SECTION - Responsive text sizes */}
     <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-white/5">
  
  {/* THE BACKGROUND IMAGE - Tactical & Relatable */}
  <div className="absolute inset-0 z-0">
    <img 
      src="https://res.cloudinary.com/dwt1u991q/image/upload/v1774332599/onewave_walkie_talkies/uv5r-5.jpg" 
      alt="Tactical Comms" 
      className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/60 to-brand-black" />
  </div>

  <div className="relative z-10 max-w-5xl">
    <motion.span 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-brand-orange font-black tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs uppercase mb-6 block"
    >
      Tactical Solutions for Africa
    </motion.span>

    <motion.h1 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-display font-black leading-[0.85] mb-8 tracking-tighter uppercase italic text-white drop-shadow-2xl"
    >
      ONE WAVE <br /> <span className="text-brand-orange">AFRICA</span>
    </motion.h1>

    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="max-w-2xl mx-auto text-gray-300 text-sm md:text-xl leading-relaxed px-4 font-medium"
    >
      We simplify technology for businesses by providing reliable equipment. 
      From communication systems to POS devices, we help you work faster and safer 
      across the continent.
    </motion.p>

    {/* NEW: Sexy Scroll Indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="mt-16 flex flex-col items-center gap-2 opacity-30"
    >
      <div className="w-[1px] h-12 bg-gradient-to-b from-brand-orange to-transparent" />
      <span className="text-[8px] font-black uppercase tracking-widest">Explore Inventory</span>
    </motion.div>
  </div>
</section>

      {/* PRODUCT GRID - Responsive columns */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map(n => <div key={n} className="h-80 md:h-96 bg-brand-darkGrey animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;