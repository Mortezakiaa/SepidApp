import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '@utils/axios.ts';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '@routes/paths.tsx';

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ['product_delete'],
    mutationFn: (id: number) => {
      return Axios.delete(`/product/${id}`);
    },
    onSuccess: () => {
      toast.success('محصول با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push(PATH_DASHBOARD.product.list);
    },
  });
}
