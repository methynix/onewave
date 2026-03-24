import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { cat } = useParams(); // 'walkie-talkie', 'thermal-printer', etc.

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', cat],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', cat);
      if (error) throw error;
      return data;
    }
  });

 const categoryTitles = {
    'walkie-talkie': 'Tactical Walkie Talkies',
    'security-torch': 'High-Power Security Torches',
    'radio-base': 'Radio Base Stations',
    'pos-printer': 'Professional POS Printers',
    'pos-monitor': 'Touch POS Monitors',
    'metal-detector': 'Security Metal Detectors',
    'baton': 'Tactical Security Batons',
    'satellite-finder': 'Digital Satellite Finders',
    'barcode-scanner': 'Desktop Barcode Scanners',
    'android-printer': 'Android Handheld POS',
    'alcohol-tester': 'Digital Alcohol Testers',
    'marine-radio': 'VHF Marine Radios'
};

  return (
    <div className="py-20">
      <h1 className="text-6xl font-display font-black uppercase italic mb-12">
        {categoryTitles[cat] || cat} <span className="text-brand-orange">.</span>
      </h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[1,2,3].map(n => <div key={n} className="h-96 bg-brand-darkGrey animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;