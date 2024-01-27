import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '@utils/axios.ts';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import toast from 'react-hot-toast';

export default function useCreateFactor() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function createOrder(data: Partial<Factor>) {
    const res = await Axios.post<Factor>('/factor', data);
    return res.data;
  }
  return useMutation({
    mutationKey: ['factor'],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factors'] });
      router.push(PATH_DASHBOARD.invoice.list);
      toast.success('فاکتور با موفقیت ایجاد شد');
    },
  });
}
