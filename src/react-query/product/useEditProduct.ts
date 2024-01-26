import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';

export default function useEditProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  function editProduct(id: number, data: Partial<Product>) {
    return Axios.patch<Product>(`/product/${id}`, data);
  }

  return useMutation({
    mutationKey: ['product'],
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => editProduct(id, data),
    onSuccess: () => {
      toast.success('محصول با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push(PATH_DASHBOARD.product.list);
    },
  });
}
