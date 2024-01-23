import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';

export default function useDeleteSupport() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function deleteSupport(id: number) {
    const res = await Axios.delete(`/support/${id}`);
    return res.data;
  }
  return useMutation({
    mutationFn: deleteSupport,
    mutationKey: ['delete_support'],
    onSuccess: () => {
      toast.success('سرویس با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['supports'] });
      router.push(PATH_DASHBOARD.support.list);
    },
  });
}
