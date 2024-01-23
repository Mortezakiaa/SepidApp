import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchSingleProduct(id: number) {
  async function fetchSingleProduct() {
    const res = await Axios.get<Product>(`/product/${id}`);
    return res.data;
  }
  return useQuery({ queryKey: ['product', id], queryFn: fetchSingleProduct });
}
