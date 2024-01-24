import { Button, InputAdornment, MenuItem, Stack } from '@mui/material';
import { RHFSelect, RHFTextField } from '@components/hook-form';
import { fNumber } from '@utils/formatNumber.tsx';
import Iconify from '@components/Iconify.tsx';
import { useFormContext } from 'react-hook-form';
import useFetchSupports from '@/react-query/support/useFetchSupports.ts';
import useFetchProducts from '@/react-query/product/useFetchProducts.ts';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import { useEffect } from 'react';

type propsType = {
  item: Record<'id', string>;
  index: number;
  fields: Record<'id', string>[];
  handleRemove: (index: number) => void;
};
const TYPE_OPTIONS = [
  { label: 'خرید', value: FactorTypeEnum.BUY },
  { label: 'تمدید', value: FactorTypeEnum.RENEW },
  { label: 'ارتقا', value: FactorTypeEnum.UPGRADE },
];

export default function InvoiceField({ item, index, fields, handleRemove }: propsType) {
  const { setValue, watch } = useFormContext();
  const values = watch();

  const { data: supportData, isLoading } = useFetchSupports();

  const { data: productData, isLoading: isProductsLoading } = useFetchProducts();
  useEffect(() => {
    setValue(
      `factors[${index}].price`,
      values?.factors?.[index]?.product_id !== 'All'
        ? productData?.result?.find((s) => s.id === values.factors[index].product_id)?.offer_price
        : values?.factors[index]?.support_id !== 'All'
        ? supportData?.result?.find((s) => s.id === values.factors[index].support_id)?.offer_price
        : 0
    );
  }, [values.factors[index].support_id, values.factors[index].product_id]);

  return (
    <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
        <RHFSelect
          fullWidth
          name={`factors[${index}].support_id`}
          label="پشتیبانی"
          disabled={isLoading || !supportData?.result?.length || values.factors[index].product_id !== 'All'}
          InputLabelProps={{ shrink: true }}
          defaultValue={'All'}
          SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        >
          <MenuItem
            value={'All'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {'انتخاب کنید'}
          </MenuItem>
          {supportData?.result.map((option) => (
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
          name={`factors[${index}].product_id`}
          label="محصول"
          defaultValue={'All'}
          disabled={isProductsLoading || !productData?.result?.length || values.factors[index].support_id !== 'All'}
          InputLabelProps={{ shrink: true }}
          SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        >
          <MenuItem
            value={'All'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {'انتخاب کنید'}
          </MenuItem>
          {productData?.result.map((option) => (
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
          name={`factors[${index}].type`}
          label="نوع فاکتور"
          InputLabelProps={{ shrink: true }}
          defaultValue={TYPE_OPTIONS[0].value}
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
          name={`factors[${index}].price`}
          label="قیمت"
          disabled={true}
          sx={{ height: '55px', maxHeight: '100%' }}
          onChange={(event) => setValue(`factors[${index}].price`, Number(event.target.value))}
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
          type="number"
          name={`factors[${index}].discount`}
          label="تخفیف"
          sx={{ height: '55px', maxHeight: '100%' }}
          onChange={(event) => setValue(`factors[${index}].discount`, Number(event.target.value))}
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
          name={`factors[${index}].final_price`}
          label="قیمت نهایی"
          disabled
          value={fNumber(
            values.factors[index].discount
              ? values.factors[index].price - values.factors[index].discount
              : values.factors[index].price
          )}
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
  );
}
