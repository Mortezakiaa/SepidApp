import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import useFilterProduct from '@/zustand/products/useFilterProduct.ts';
import { useShallow } from 'zustand/react/shallow';
import useProductPagination from '@/zustand/products/useProductPagination.ts';

export default function useFetchProducts() {
  const title = useFilterProduct((state) => state.title);
  const { rowPerPage, page } = useProductPagination(
    useShallow((state) => ({ page: state.activePage, rowPerPage: state.rowPerPage }))
  );
  async function fetchProducts() {
    const res = await Axios.get<Product[]>('/product', { filter: { title }, take: rowPerPage, page });
    return res.data;
  }
  return useQuery({ queryKey: ['products', { title, rowPerPage, page }], queryFn: fetchProducts });
}
