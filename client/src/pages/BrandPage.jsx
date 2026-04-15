import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient';
import ProductCard from '../components/ProductCard';

const BrandPage = () => {
  const { brandName } = useParams();
  
  const { data: models } = useQuery({
    queryKey: ['brand', brandName],
    queryFn: async () => {
      const { data } = await supabase.from('products').select('*').eq('brand', brandName);
      return data;
    }
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 
    md:px-10 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-24 min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                   font-display font-black uppercase italic 
                   leading-tight tracking-tight">{brandName} Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                    gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10 md:mt-12">
        {models?.map(m => <ProductCard key={m.id} product={m} />)}
      </div>
    </div>
  );
};

export default BrandPage;