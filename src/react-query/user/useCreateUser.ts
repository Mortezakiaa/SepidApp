import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';

export default function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (data: Partial<User>) => {
      const res = await ApiService.post<User>('/user', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pharmacyUsers'] });
    },
  });
}
