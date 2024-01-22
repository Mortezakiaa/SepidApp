import ApiService from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function useFetchSingleUser(user_id: number) {
  async function fetchSingleUser() {
    if (user_id) {
      const res = await ApiService.get<User>(`user/${user_id}`);
      return res.data;
    }
    return null;
  }
  return useQuery({ queryKey: ['user', user_id], queryFn: fetchSingleUser });
}
