import { useGetProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { data: products, isLoading } = useGetProducts();

  return (
    <div className="pb-20">
      {/* HERO SECTION - Responsive text sizes */}
      <section className="py-16 md:py-32 flex flex-col items-center text-center px-4">
        <motion.span className="text-brand-orange font-bold tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs uppercase mb-4">
          Tactical Solutions for Africa
        </motion.span>
        <motion.h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-black leading-[0.9] mb-8 tracking-tighter uppercase italic">
          ONE WAVE <br /> <span className="text-brand-orange">AFRICA</span>
        </motion.h1>
        <p className="max-w-2xl text-gray-400 text-sm md:text-lg leading-relaxed px-4">
          We simplify technology for businesses by providing reliable equipment. 
          From communication systems to POS devices, we help you work faster and safer.
        </p>
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