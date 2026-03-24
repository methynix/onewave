const supabase = require('../config/supabase');

const productRepository = {
  findAll: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  findById: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  },

  findByCategory: async (category) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true });
    if (error) throw error;
    return data;
  },

  create: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

module.exports = productRepository;