// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, SxProps } from '@mui/material';
import React from 'react';
import { BoxProps } from '@mui/material/Box/Box';

// ----------------------------------------------------------------------

type propsTypes = {
  icon?: React.ReactNode;
  sx?: SxProps;
} & BoxProps;
export default function Iconify({ icon, sx, ...other }: propsTypes) {
  return <Box component={Icon} icon={icon as any} sx={{ ...sx }} {...other} />;
}
