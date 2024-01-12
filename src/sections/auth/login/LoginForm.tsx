// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '@/hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '@components/hook-form';
import { useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';

export default function LoginForm() {
  const { user, login, loginStepTwo } = useAuth();
  const methods = useForm<LoginDto>();

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = async (data: LoginDto) => {
    try {
      if (login.data) {
        await loginStepTwo.mutateAsync({ phone_number: data.phone_number, code: data.code });
      } else {
        await login.mutateAsync({ phone_number: data.phone_number });
      }
    } catch (error) {
      console.error(error);
      reset();
      // toast.error(error.errorData);
      for (let key in error.errorData) {
        setError(key as 'phone_number' | 'code', { message: error.errorData[key] });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField disabled={!!login.data || login.isPending} name="phone_number" label="شماره تماس" />
      </Stack>
      <AnimatePresence>
        {login.data && (
          <m.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>
            <Stack sx={{ marginTop: 3 }} spacing={3}>
              <RHFTextField name="code" label="کد یکبار مصرف" />
            </Stack>
          </m.div>
        )}
      </AnimatePresence>

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
