// form
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

// ----------------------------------------------------------------------

type RHFTextFieldPropTypes = {
  name?: string;
  label?: string;
} & Partial<ControllerProps> &
  Partial<TextFieldProps>;

export default function RHFTextField({ name, ...other }: RHFTextFieldPropTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
