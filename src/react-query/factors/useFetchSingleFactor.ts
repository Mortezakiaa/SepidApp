import { useQuery } from '@tanstack/react-query';
import Axios from '@utils/axios.ts';

export default function useFetchSingleFactor(id: number) {
  async function fetchSingleFactor() {
    const res = await Axios.get<Factor>(`/factor/${id}`, { relation: { factor_items: true } });
    return res.data;
  }
  return useQuery({
    queryKey: ['factor', id],
    queryFn: fetchSingleFactor,
  });
}
