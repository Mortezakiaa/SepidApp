import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFactorStatistics() {
  async function fetchStatistics() {
    const res = await Axios.get<OrderStatistics>('/factor/statistics');
    return res.data;
  }
  return useQuery({ queryKey: ['factors', 'statistics'], queryFn: fetchStatistics });
}
