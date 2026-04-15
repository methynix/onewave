import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient';
import { 
  FiMessageCircle, FiChevronLeft, FiCheckCircle, 
  FiShield, FiZap, FiCpu, FiAward 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(null);

  // 1. Fetch Product Data
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  });

  // 2. Set first image as active when data loads
  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImg(product.images[0]);
    }
  }, [product]);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-brand-black">
      <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (isError || !product) return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-display font-black uppercase mb-4">Equipment Not Found</h2>
      <Link to="/" className="bg-brand-orange px-8 py-4 rounded-2xl font-black uppercase">Return to Base</Link>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 pt-10">
      {/* NAVIGATION */}
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-brand-orange mb-12 transition-colors">
        <FiChevronLeft /> Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        
        {/* LEFT: VISUAL SHOWCASE */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-brand-darkGrey rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={activeImg ? activeImg.replace('/upload/', '/upload/f_auto,q_auto:best,w_1200/') : ''} 
                className="max-w-full max-h-full object-scale-down p-6"
                alt={product.name} 
              />
            </AnimatePresence>
          </motion.div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 
                  ${activeImg === img ? 'border-brand-orange scale-95' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="max-w-full max-h-full object-scale-down p-6" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT & CONVERSION */}
        <div className="flex flex-col space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-orange/20">
                {product.brand}
              </span>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest italic">
                {product.category.replace('-', ' ')}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-tighter italic leading-[0.9] mb-6">
              {product.name}
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed font-medium italic">
              {product.short_description}
            </p>
          </div>

          {/* ANTI-BOREDOM: VALUE POINTS */}
          <div className="space-y-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Capabilities Briefing</h4>
            {product.description_points?.map((point, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <FiCheckCircle className="text-brand-orange mt-1 shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-gray-300 font-semibold leading-tight text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>

          {/* TECHNICAL SPECIFICATIONS GRID */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="bg-brand-darkGrey p-6 rounded-3xl border border-white/5 hover:border-brand-orange/10 transition-colors">
                <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-1">{key.replace('_', ' ')}</p>
                <p className="text-white font-black uppercase italic text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* WHATSAPP CONVERSION */}
          <div className="pt-6">
            <a 
              href={`https://wa.me/255752773798?text=I am interested in the ${product.name}. Please send more details.`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-brand-orange text-white py-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-brand-orange transition-all shadow-2xl shadow-brand-orange/20 transform active:scale-95 group"
            >
              <FiMessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
              Request Expert Quote
            </a>
            <div className="flex items-center justify-center gap-6 mt-6 opacity-30">
              <FiShield /> <FiAward /> <FiCpu /> <FiZap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;