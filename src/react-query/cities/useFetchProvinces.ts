import ApiService from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchProvinces() {
  async function fetchProvinces() {
    const res = await ApiService.get<Province[]>(`/province`, { take: 100 });
    return res.data.result;
  }
  return useQuery({ queryKey: ['provinces'], queryFn: fetchProvinces });
}
