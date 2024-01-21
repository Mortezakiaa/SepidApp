import { useQuery } from '@tanstack/react-query';
import axios from '@utils/axios.ts';
import { getToken } from '@utils/jwt.ts';

export default function useInitAuth() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get<User>('/user/me', {}, { Authorization: `Bearer ${getToken()}` });
      return res.data;
    },
    retry: 2,
  });
}
