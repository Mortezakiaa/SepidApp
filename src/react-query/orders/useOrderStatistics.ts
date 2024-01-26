import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useOrderStatistics() {
  async function fetchStatistics() {
    const res = await Axios.get<OrderStatistics>('/order/statistics');
    return res.data;
  }
  return useQuery({ queryKey: ['order', 'statistics'], queryFn: fetchStatistics });
}
