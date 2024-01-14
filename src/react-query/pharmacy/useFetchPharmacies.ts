import { useQuery } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';

export default function useFetchPharmacies() {
  return useQuery({
    queryKey: ['pharmacies'],
    queryFn: async () => {
      const res = await ApiService.get<Pharmacy[]>('/pharmacy');
      return res.data;
    },
    retry: 2,
  });
}
