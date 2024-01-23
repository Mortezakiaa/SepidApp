import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

type UserTableToolbarPropTypes = {
  filterName: string;
  onFilterName: (name: string) => void;
};

export default function SupportTableToolbar({ filterName, onFilterName }: UserTableToolbarPropTypes) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="جست و جوی محصول ..."
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
