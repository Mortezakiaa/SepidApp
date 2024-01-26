import { useQuery } from '@tanstack/react-query';
import Axios from '@utils/axios.ts';

export default function useFetchSingleOrder(id: number) {
  async function fetchSingleOrder() {
    const res = await Axios.get(`/order/${id}`);
    return res.data;
  }
  return useQuery({
    queryKey: ['order', id],
    queryFn: fetchSingleOrder,
  });
}
