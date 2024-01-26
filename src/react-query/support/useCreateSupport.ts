import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';

export default function useCreateSupport() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function createSupport(data: Partial<Support>) {
    const res = await Axios.post('/support', data);
    return res.data;
  }
  return useMutation({
    mutationFn: createSupport,
    mutationKey: ['create_support'],
    onSuccess: () => {
      toast.success('سرویس با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['supports'] });
      router.push(PATH_DASHBOARD.support.list);
    },
  });
}
