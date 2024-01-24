import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// components
import { FormProvider, RHFTextField } from '@/components/hook-form';
import toast from 'react-hot-toast';
import useEditProduct from '@/react-query/product/useEditProduct.ts';
import useCreateProduct from '@/react-query/product/useCreateProduct.ts';

// ----------------------------------------------------------------------

type PharmacyNewEditPropsType = {
  isEdit?: boolean;
  currentProduct?: Product;
};

export default function ProductNewEdit({ isEdit = false, currentProduct }: PharmacyNewEditPropsType) {
  const { push } = useRouter();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('نام محصول اجباری است'),
    info: Yup.string().required('توضیحات محصول اجباری است'),
    price: Yup.number().required('قیمت محصول اجباری است'),
    offer_price: Yup.number().optional(),
  });

  const defaultValues = useMemo<Partial<Product>>(
    () => ({
      title: currentProduct?.title || '',
      info: currentProduct?.info || '',
      price: currentProduct?.price || 0,
      offer_price: currentProduct?.offer_price || 0,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError, control } = methods;
  const { mutate: createProduct, isPending: isCreatePending, error: errorCreate } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdatePending, error: errorUpdate } = useEditProduct();

  useEffect(() => {
    const e = errorCreate || errorUpdate;
    if (e) {
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        for (let key in e.errorData) {
          console.log('KEY<<<<<<<<', key);
          if (Array.isArray(key)) {
            for (let i = 0; i < e.errorData[key].length; i++) {
              console.log(`${key}[${i}].${key[i]}`);
              setError(`${key}[${i}].${key[i]}` as keyof Product, { message: e.errorData[key][0] });
            }
            continue;
          }
          setError(key as keyof Product, { message: e.errorData[key] });
        }
      }
    }
  }, [errorCreate, errorUpdate]);
  const onSubmit = async (data: Partial<Product>) => {
    console.log('Data', data);
    if (data.offer_price > data.price) {
      setError('offer_price', { message: 'قیمت با تخفیف نمیتواند از قیمت اصلی بیشتر باشد' });
      return;
    }
    if (isEdit) {
      updateProduct({ id: currentProduct?.id, data });
    } else {
      createProduct(data);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="title" label="نام محصول" />
              <RHFTextField name="info" label="توضیحات محصول" />
              <RHFTextField name="price" label="قیمت محصول" />
              <RHFTextField name="offer_price" label="قیمت محصول با تخفیف" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isUpdatePending || isCreatePending}>
                {!isEdit ? 'ساخت محصول' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
