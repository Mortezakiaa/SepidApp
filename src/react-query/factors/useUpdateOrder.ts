import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import toast from 'react-hot-toast';

export default function useUpdateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  function updateOrder(id: number, body: Partial<Order>) {
    return Axios.patch<Order>('order/' + id, body);
  }
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<Order> }) => updateOrder(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push(PATH_DASHBOARD.invoice.list);
      toast.success('فاکتور با موفقیت بروزرسانی شد');
    },
  });
}
