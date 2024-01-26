import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '@utils/axios.ts';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import toast from 'react-hot-toast';

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function createOrder(data: Partial<Order>) {
    const res = await Axios.post<Order>('/order', data);
    return res.data;
  }
  return useMutation({
    mutationKey: ['order'],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push(PATH_DASHBOARD.invoice.list);
      toast.success('فاکتور با موفقیت ایجاد شد');
    },
  });
}
