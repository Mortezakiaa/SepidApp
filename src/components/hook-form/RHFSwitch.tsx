// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';

// ----------------------------------------------------------------------

type RHFSwitchPropTypes = {
  name?: string;
  label?: string;
} & Partial<FormControlLabelProps>;

export default function RHFSwitch({ name, label, ...other }: RHFSwitchPropTypes) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller name={name} control={control} render={({ field }) => <Switch {...field} checked={field.value} />} />
      }
      {...other}
    />
  );
}
