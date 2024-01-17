import ApiService from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  async function updateUser(id: number, body: Partial<User>) {
    return ApiService.patch(`/user/${id}`, body);
  }
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ id, body }: { id: number; body: Partial<User> }) => updateUser(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
