import ApiService from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import { useRouter } from 'next/router';

export default function useUpdatePharmacy() {
  const queryClient = useQueryClient();
  const router = useRouter();

  async function updatePharmacy(id: number, data: Partial<Pharmacy>) {
    return ApiService.patch<Pharmacy>(`/pharmacy/${id}`, data);
  }

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Pharmacy> }) => updatePharmacy(id, data),
    mutationKey: ['updatePharmacy'],
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['pharmacies'] });
      queryClient.invalidateQueries({ queryKey: ['pharmacy'] });
      toast.success('داروخانه با موفقیت تغییر کرد!');
      router.push(PATH_DASHBOARD.pharmacy.list);

      // queryClient.setQueryData(['pharmacy', { id: res.data.id }], res.data);
      // queryClient.setQueryData<BulkDataRes<Pharmacy[]>>(['pharmacies'], (queryData) => {
      //   queryData.result = queryData.result.map((pharmacy: Pharmacy) => {
      //     if (pharmacy.id === res.data.id) {
      //       return res.data;
      //     }
      //     return pharmacy;
      //   });
      //   return queryData;
      // });
    },
  });
}
