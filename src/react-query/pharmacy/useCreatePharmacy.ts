import ApiService from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useFormContext } from 'react-hook-form';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import { useRouter } from 'next/router';

export default function useCreatePharmacy() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function createPharmacy(data: Partial<Pharmacy>) {
    return ApiService.post<Pharmacy>('/pharmacy', data);
  }
  return useMutation({
    mutationFn: createPharmacy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pharmacies'] });
      toast.success('داروخانه با موفقیت ساخته شد!');
      router.push(PATH_DASHBOARD.pharmacy.list);
    },
  });
}
