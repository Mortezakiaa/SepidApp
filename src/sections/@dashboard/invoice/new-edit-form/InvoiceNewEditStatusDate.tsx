// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import DatePicker from '@mui/lab/DatePicker';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect } from '@/components/hook-form';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { label: 'در انتظار پرداخت', value: FactorStatusEnum.PENDING },
  { label: 'پرداخت شده', value: FactorStatusEnum.PAID },
  { label: 'پرداخت نشده', value: FactorStatusEnum.UNPAID },
];
const TYPE_OPTIONS = [
  { label: 'خرید', value: FactorTypeEnum.BUY },
  { label: 'تمدید', value: FactorTypeEnum.RENEW },
  { label: 'ارتقا', value: FactorTypeEnum.UPGRADE },
];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
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
        name="type"
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
    </Stack>
  );
}
