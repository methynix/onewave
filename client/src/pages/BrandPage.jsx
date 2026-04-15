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
    <div className="py-20">
      <h1 className="text-6xl font-display font-black uppercase italic">{brandName} Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
        {models?.map(m => <ProductCard key={m.id} product={m} />)}
      </div>
    </div>
  );
};

export default BrandPage;