import { useQuery } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';

export default function useFetchSinglePharmacy(id: number) {
  return useQuery({
    queryKey: ['pharmacy', { id }],
    queryFn: async () => {
      const res = await ApiService.get<Pharmacy>(`/pharmacy/${id}`, { relation: { city: { province: true } } });
      return res.data;
    },
    retry: 2,
  });
}
