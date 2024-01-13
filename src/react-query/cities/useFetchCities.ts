import { useQuery } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';
import useChooseProvince from '@/zustand/cities/useChooseProvince.ts';

export default function useFetchCities() {
  const id = useChooseProvince((state) => state.provinceId);
  async function fetchCities() {
    if (!id) return null;
    const res = await ApiService.get<City[]>(`/province/${id}/cities`);
    return res.data;
  }
  return useQuery({ queryKey: ['cities', id], queryFn: fetchCities });
}
