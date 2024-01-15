import ApiService from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function useFetchSingleUser(user_id: number) {
  async function fetchSingleUser() {
    const res = await ApiService.get<User>(`user/${user_id}`);
    return res.data;
  }
  return useQuery({ queryKey: ['user', user_id], queryFn: fetchSingleUser });
}
