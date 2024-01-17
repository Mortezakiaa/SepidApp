import ApiService from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeletePharmacy() {
  const queryClient = useQueryClient();
  async function deletePharmacy(id: number) {
    return ApiService.delete<Pharmacy>(`/pharmacy/${id}`);
  }
  return useMutation({
    mutationKey: ['deletePharmacy'],
    mutationFn: deletePharmacy,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pharmacies'] });
    },
  });
}
