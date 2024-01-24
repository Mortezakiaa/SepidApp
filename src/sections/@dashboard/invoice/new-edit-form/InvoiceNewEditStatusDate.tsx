// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import DatePicker from '@mui/lab/DatePicker';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect } from '@/components/hook-form';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';
import useFetchPharmacies, { useFetchAllPharmacies } from '@/react-query/pharmacy/useFetchPharmacies.ts';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { label: 'در انتظار پرداخت', value: FactorStatusEnum.PENDING },
  { label: 'پرداخت شده', value: FactorStatusEnum.PAID },
  { label: 'پرداخت نشده', value: FactorStatusEnum.UNPAID },
];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { data: pharmacies, isLoading } = useFetchAllPharmacies();

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.default' }}>
      <RHFSelect
        fullWidth
        name="status"
        label="وضعیت"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {STATUS_OPTIONS.map((option) => (
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
      <RHFSelect
        fullWidth
        name="pharmacy_id"
        label="داروخانه"
        disabled={isLoading}
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        <MenuItem
          value={' '}
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
        {pharmacies?.result?.map((option) => (
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
            {option.name}
          </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );
}
