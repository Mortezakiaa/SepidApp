import { useQuery } from '@tanstack/react-query';
import axios from '@utils/axios.ts';

export default function useInitAuth() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get<User>('/user/me');
      return res.data;
    },
    retry: 2,
  });
}
