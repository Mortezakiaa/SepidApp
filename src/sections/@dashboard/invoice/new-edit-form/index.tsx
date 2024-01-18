import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// components
import { FormProvider } from '@components/hook-form';
//
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';

// ----------------------------------------------------------------------

type InvoiceNewEditFormPropTypes = {
  isEdit?: boolean;
  currentFactor?: Factor;
};

export default function InvoiceNewEditForm({ isEdit, currentFactor }: InvoiceNewEditFormPropTypes) {
  const { push } = useRouter();
  const [loadingSend, setLoadingSend] = useState(false);
  const FactorSchema = Yup.object().shape({
    price: Yup.string().required('قیمت اجباری است'),
    type: Yup.string().required('نوع فاکتور اجباری است'),
    order_id: Yup.number().required('سفارش مربوطه اجباری است'),
  });

  const defaultValues = useMemo<Partial<Factor>>(
    () => ({
      price: currentFactor?.price || 0,
      type: currentFactor?.type || FactorTypeEnum.BUY,
      status: currentFactor?.status || FactorStatusEnum.UNPAID,
      offer_price: currentFactor?.offer_price || 0,
      final_price: currentFactor?.final_price || 0,
      order: currentFactor?.order || null,
    }),
    [currentFactor]
  );

  const methods = useForm({
    resolver: yupResolver(FactorSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentFactor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentFactor]);

  const onSubmit = (data) => {};

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton size="large" type={'submit'} variant="contained" loading={loadingSend && isSubmitting}>
          {isEdit ? 'آپدیت' : 'ساخت'} فاکتور
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
