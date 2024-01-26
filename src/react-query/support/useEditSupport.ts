import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import { useRouter } from 'next/router';

export default function useEditSupport() {
  const queryClient = useQueryClient();
  const router = useRouter();

  async function editSupport(id: number, data: Partial<Support>) {
    const res = await Axios.patch<Support>(`/support/${id}`, data);
    return res.data;
  }
  return useMutation({
    mutationFn: ({ data, id }: { id: number; data: Partial<Support> }) => editSupport(id, data),
    mutationKey: ['edit_support'],
    onSuccess: () => {
      toast.success('سرویس با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['supports'] });
      queryClient.invalidateQueries({ queryKey: ['single_support'] });
      router.push(PATH_DASHBOARD.support.list);
    },
  });
}
