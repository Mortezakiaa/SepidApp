// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '@/hooks/useAuth';
import useIsMountedRef from '@/hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '@components/hook-form';
import { object, string } from 'yup';
import { LoginDto } from '@/types/models';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const LoginSchema = object().shape({
    phone_number: string().required('شماره تماس اجباری است'),
  });

  const methods = useForm<LoginDto>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginDto) => {
    try {
      await login(data.phone_number);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('root', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.root && <Alert severity="error">{errors.root.message}</Alert>}
        <RHFTextField name="phone_number" label="شماره تماس" />
      </Stack>

      <LoadingButton
        sx={{ marginTop: 5 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        ورود
      </LoadingButton>
    </FormProvider>
  );
}
