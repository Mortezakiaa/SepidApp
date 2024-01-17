import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@utils/axios.ts';
import { setSession } from '@utils/jwt.ts';
import { useRouter } from 'next/router';

export default function useLoginMutation() {
  return useMutation({
    mutationKey: ['auth_login'],
    mutationFn: (loginDto: LoginDto) => axios.post('auth/login-step-one', loginDto),
  });
}
export function useLoginStepTwoMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ['auth_login_step_two'],
    mutationFn: async (loginDto: LoginDto) => {
      const res = await axios.post<LoginRes>('auth/login-step-two', loginDto);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.access_token) {
        setSession(data.access_token, data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/dashboard');
      }
    },
  });
}
