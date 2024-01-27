import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import toast from 'react-hot-toast';

export default function useUpdateFactor() {
  const queryClient = useQueryClient();
  const router = useRouter();
  function updateOrder(id: number, body: Partial<Factor>) {
    return Axios.patch<Factor>('/factor/' + id, body);
  }
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<Factor> }) => updateOrder(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factors'] });
      queryClient.invalidateQueries({ queryKey: ['factor'] });
      router.push(PATH_DASHBOARD.invoice.list);
      toast.success('فاکتور با موفقیت بروزرسانی شد');
    },
  });
}
