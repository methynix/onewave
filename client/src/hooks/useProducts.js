import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/products');
      return data.data.products;
    }
  });
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data.data.product;
    },
    enabled: !!id
  });
};