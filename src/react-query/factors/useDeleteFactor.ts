import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useDeleteFactor() {
  const queryClient = useQueryClient();

  async function deleteOrder(id: number) {
    const res = await Axios.delete(`/factor/${id}`);
    return res.data;
  }
  return useMutation({
    mutationKey: ['factors', 'delete'],
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factors'] });
      toast.success('فاکتور با موفقیت حذف شد');
    },
  });
}
