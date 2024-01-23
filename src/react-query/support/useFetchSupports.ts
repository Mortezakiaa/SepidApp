import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchSupports() {
  async function fetchSupports() {
    const res = await Axios.get<Support[]>('/support');
    return res.data;
  }
  return useQuery({ queryKey: ['support'], queryFn: fetchSupports });
}
