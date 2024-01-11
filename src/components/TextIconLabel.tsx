// @mui
import { BoxProps, Stack, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type TextIconLabelPropTypes = {
  endIcon?: boolean;
  icon?: any;
  sx?: SxProps;
  value?: any;
} & BoxProps;

export default function TextIconLabel({ icon, value, endIcon = false, sx, ...other }: TextIconLabelPropTypes) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: 'body2',
        ...sx,
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
}
