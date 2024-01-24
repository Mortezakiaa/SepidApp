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
import InvoiceField from '@sections/@dashboard/invoice/new-edit-form/InvoiceField.tsx';

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();
  const { data: supportData, isLoading } = useFetchSupports();
  const { data: productData, isLoading: isProductsLoading } = useFetchProducts();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'factors',
  });

  useEffect(() => {
    if (!isLoading && fields.length === 0)
      append({
        product_id: 'All',
        support_id: 'All',
        price: 0,
        type: FactorTypeEnum.BUY,
        final_price: 0,
        discount: 0,
      });
    if (supportData?.result?.length) {
      setValue('support_id', supportData.result[0].id);
    }
  }, [supportData]);

  const values = watch();

  const handleAdd = () => {
    append({
      product_id: 'All',
      support_id: 'All',
      price: 0,
      type: FactorTypeEnum.BUY,
      final_price: 0,
      discount: 0,
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
          <InvoiceField item={item} index={index} key={index} fields={fields} handleRemove={handleRemove} />
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
            value={fNumber(values?.factors?.reduce((acc, item) => acc + (item.price - item.discount), 0))}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
