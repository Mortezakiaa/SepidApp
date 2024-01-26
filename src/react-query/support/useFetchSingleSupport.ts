import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchSingleSupport(id: number) {
  async function fetchSingleSupport() {
    const res = await Axios.get(`support/${id}`);
    return res.data;
  }
  return useQuery({
    queryKey: ['single_support', id],
    queryFn: fetchSingleSupport,
  });
}
