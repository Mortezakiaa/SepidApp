import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import { useRouter } from 'next/router';

export default function useCreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();
  async function createProduct(body: Partial<Product>) {
    const res = await Axios.post<Product>('/product', body);
    return res.data;
  }
  return useMutation({
    mutationKey: ['product'],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('محصول با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push(PATH_DASHBOARD.product.list);
    },
  });
}
