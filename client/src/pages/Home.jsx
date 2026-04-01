import { useGetProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { data: products, isLoading } = useGetProducts();

  const heroItems = [
    { name: "Android POS", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/aprinter_(1)" },
    { name: "Security Baton", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/baton_(1)" },
    { name: "Tactical Earpiece", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_walkie_talkies/earpiece1" },
    { name: "Thermal Printer", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/H806_(3)" },
    { name: "Discrete Comms", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_walkie_talkies/K11-2" },
    { name: "Metal Detector", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/metaldetector_(1)" },
    { name: "POS Monitor", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/posmonitor_(2)" },
    { name: "Mobile Radio", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/radiobase_(1)" },
    { name: "Barcode Scanner", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/scanner_(1)" },
    { name: "Alcohol Tester", src: "https://res.cloudinary.com/dwt1u991q/image/upload/v1/onewave_industrial_inventory/n6ziqgtpmofypzapezam" },
  ];

  const infiniteLoop = [...heroItems, ...heroItems, ...heroItems];

  return (
    <div className="pb-20 bg-brand-black">
      {/* CINEMATIC HERO */}
       <section className="relative h-[80svh] md:h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* THE CONTINUOUS MARQUEE */}
         <div className="absolute inset-0 z-0 flex items-center">
          <motion.div 
            className="flex h-full"
            animate={{ x: ["0%", "-33.33%"] }} // Smoothly slides half the total width
            transition={{ 
              ease: "linear", 
              duration: 10, // "Adorable Speed" - adjust for cinematic feel
              repeat: Infinity 
            }}
          >
            {infiniteLoop.map((item, index) => (
              <div key={index} className="relative w-[100vw] md:w-[80vw] lg:w-[60vw] h-full flex-shrink-0 flex flex-col items-center justify-center p-12">
                <img 
                  src={item.src.replace('/upload/', '/upload/f_auto,q_auto:best,w_2000/')} 
                  className="relative w-[100vw] h-full flex-shrink-0 flex flex-col items-center justify-center p-8 md:p-12"
                  alt="" 
                />
                {/* NAME OVERLAY BELOW IMAGE */}
                <div className="absolute bottom-10 text-brand-orange/40 font-black uppercase tracking-[0.8em] text-[10px] md:text-sm">
                  {item.name}
                </div>
              </div>
            ))}
          </motion.div>

          {/* VITAL CINEMATIC OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black" />
          <div className="absolute inset-0 bg-brand-black/20 backdrop-blur-[1px]" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-6xl pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            className="text-6xl sm:text-8xl lg:text-[12rem] font-display font-black leading-none tracking-tighter uppercase italic text-white drop-shadow-2xl"
          >
            ONEWAVE <br /> <span className="text-brand-orange">AFRICA</span>
          </motion.h1>
          <p className="max-w-xl mx-auto mt-6 text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-50">
            Professional Equipment for the Digital Frontier
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <div className="mt-20 px-4 md:px-0">
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
    </div>
  );
};

export default Home;