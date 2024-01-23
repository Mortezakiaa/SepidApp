// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fNumber } from '@utils/formatNumber.tsx';
// components
import Iconify from '@components/Iconify';
import { RHFSelect, RHFTextField } from '@components/hook-form';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import useFetchSupports from '@/react-query/support/useFetchSupports.ts';
import { useEffect } from 'react';
import useFetchProducts from '@/react-query/product/useFetchProducts.ts';

// ----------------------------------------------------------------------
const TYPE_OPTIONS = [
  { label: 'خرید', value: FactorTypeEnum.BUY },
  { label: 'تمدید', value: FactorTypeEnum.RENEW },
  { label: 'ارتقا', value: FactorTypeEnum.UPGRADE },
];

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();
  const { data: supportData, isLoading } = useFetchSupports();
  const { data: productData, isLoading: isProductsLoading } = useFetchProducts();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  useEffect(() => {
    if (!isLoading && fields.length === 0) append({});
    if (supportData?.result?.length) {
      setValue('support_id', supportData.result[0].id);
    }
  }, [supportData]);

  const values = watch();

  const handleAdd = () => {
    append({
      price: '',
      total: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        موردها:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFSelect
                fullWidth
                name={`items[${index}].support_id`}
                label="پشتیبانی"
                disabled={isLoading || !supportData?.result?.length}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {supportData.result.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option.title}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                fullWidth
                name={`items[${index}].product_id`}
                label="محصول"
                defaultValue={null}
                disabled={isProductsLoading || !productData?.result?.length}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {productData.result.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option.title}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect
                fullWidth
                name={`items[${index}].type`}
                label="نوع فاکتور"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {TYPE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].price`}
                label="قیمت"
                sx={{ height: '55px', maxHeight: '100%' }}
                onChange={(event) => setValue(`items[${index}].price`, Number(event.target.value))}
                InputProps={{
                  sx: (theme) => ({
                    '& input': {
                      height: '40px',
                      maxHeight: '100%',
                    },
                  }),

                  startAdornment: <InputAdornment position="start">تومان</InputAdornment>,
                }}
              />
              <RHFTextField
                size="small"
                name={`items[${index}].discount`}
                label="تخفیف"
                InputProps={{
                  sx: (theme) => ({
                    '& input': {
                      height: '40px',
                      maxHeight: '100%',
                    },
                  }),
                  startAdornment: <InputAdornment position="start">تومان</InputAdornment>,
                }}
              />
              <RHFTextField
                disabled
                size="small"
                name={`items[${index}].final_price`}
                label="قیمت نهایی"
                value={fNumber(values.items[index].price - values.items[index].discount)}
                InputProps={{
                  sx: (theme) => ({
                    '& input': {
                      height: '40px',
                      maxHeight: '100%',
                    },
                  }),
                  startAdornment: <InputAdornment position="start">تومان</InputAdornment>,
                }}
              />
            </Stack>
            {fields.length > 1 && (
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                onClick={() => handleRemove(index)}
              >
                حذف مورد
              </Button>
            )}
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          اضافه کردن مورد جدید
        </Button>

        <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
          <RHFTextField
            size="small"
            label="مبلغ کل"
            name="all_price"
            disabled
            value={fNumber(values?.items?.reduce((acc, item) => acc + item.price, 0))}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
