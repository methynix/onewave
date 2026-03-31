import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  // 1. Tunanasa picha ya kwanza kwa usalama
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "https://via.placeholder.com/800x800?text=No+Image+Available"; // Fallback kama picha haipo

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-brand-darkGrey rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand-orange/30 transition-all duration-500"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden bg-brand-lightGrey relative">
          <img 
  src={product.images[0].replace('/upload/', '/upload/f_auto,q_auto:best,w_800/')} 
  alt={product.name} 
  className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
  onError={(e) => { e.target.src = "https://via.placeholder.com/800x800?text=Image+Error"; }}
/>
        </div>

        <div className="p-8">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-2 block">
            {product.brand || 'One Wave Pro'}
          </span>
          <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">
              View Tactical Details
            </span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all">
              <FiArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;