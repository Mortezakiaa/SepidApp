import { useMutation } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';

export default function useCreateUser() {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (data: Partial<User>) => {
      const res = await ApiService.post<User>('/user', data);
      return res.data;
    },
  });
}
