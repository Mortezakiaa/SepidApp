'use client';
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
import useCreateFactor from '@/react-query/factors/useCreateFactor.ts';
import useUpdateFactor from '@/react-query/factors/useUpdateFactor.ts';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

type InvoiceNewEditFormPropTypes = {
  isEdit?: boolean;
  currentFactor?: Factor;
};

export default function InvoiceNewEditForm({ isEdit, currentFactor }: InvoiceNewEditFormPropTypes) {
  const [loadingSend, setLoadingSend] = useState(false);
  const FactorSchema = Yup.object().shape({});

  const { mutate: createFactor, isPending: isCreatePending, error: errorCreate } = useCreateFactor();
  const { mutate: updateFactor, isPending: isUpdatePending, error: errorUpdate } = useUpdateFactor();
  const defaultValues = useMemo<Partial<Factor>>(
    () => ({
      all_price: 0,
      pharmacy_id: currentFactor?.pharmacy_id || ' ',
      status: currentFactor?.status || FactorStatusEnum.UNPAID,
      factor_items: currentFactor?.factor_items || [
        {
          product_id: 'All',
          support_id: 'All',
          price: 0,
          type: FactorTypeEnum.BUY,
          final_price: 0,
          discount: 0,
        },
      ],
    }),
    [currentFactor]
  );

  const methods = useForm({
    resolver: yupResolver(FactorSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (isEdit && currentFactor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentFactor]);

  useEffect(() => {
    const e = errorCreate || errorUpdate;
    if (e) {
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        // Iterate over the keys in the errorData object
        for (let parentKey in e.errorData) {
          // If the value of the current key is an array
          if (Array.isArray(e.errorData[parentKey])) {
            // Iterate over the elements in the array
            for (let i = 0; i < e.errorData[parentKey].length; i++) {
              // Iterate over the values in the current array element
              for (const value of e.errorData[parentKey][i]) {
                // Iterate over the keys in the current value
                for (const key in value) {
                  // Set an error in the form with the key as the field name and the value as the error message
                  setError(`${parentKey}[${i}].${key}` as keyof Factor, { message: value[key] });
                }
              }
            }
            // Skip to the next iteration of the parent loop
            continue;
          }
          // If the value of the current key is not an array, set an error in the form with the key as the field name and the value as the error message
          setError(parentKey as keyof Factor, { message: e.errorData[parentKey] });
        }
      }
    }
  }, [errorCreate, errorUpdate]);

  const onSubmit = (data: Partial<Factor>) => {
    if (isEdit) {
      updateFactor({ id: currentFactor.id, body: data });
    } else createFactor(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
