import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// components
import Iconify from '@components/Iconify';
import { FACTOR_TYPE_TRANSLATE } from '@locales/enumTranslate.ts';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

type InvoiceTableToolbarPropTypes = {
  filterName: string;
  filterService: string;
  onFilterName: (name: string) => void;
  onFilterService: (event: object) => void;
  optionsService: string[];
};

export default function InvoiceTableToolbar({
  optionsService,
  filterName,
  filterService,
  onFilterName,
  onFilterService,
}: InvoiceTableToolbarPropTypes) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="نوع سرویس"
        value={filterService}
        onChange={onFilterService}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: 'capitalize',
        }}
      >
        {optionsService.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {FACTOR_TYPE_TRANSLATE[option]}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="جست و جوی فاکتور بر اساس نام مشتری"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
