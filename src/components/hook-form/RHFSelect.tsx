// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type RHFSelectPropTypes = {
  children: ReactNode;
  name: string;
};

export default function RHFSelect({ name, children, ...other }: RHFSelectPropTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
