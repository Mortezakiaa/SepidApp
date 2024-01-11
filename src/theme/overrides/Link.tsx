// ----------------------------------------------------------------------

import { Theme } from '@fullcalendar/common';
import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';

export default function MuiLink(): {
  MuiLink: {
    defaultProps?: ComponentsProps['MuiLink'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLink'];
    variants?: ComponentsVariants<Theme>['MuiLink'];
  };
} {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: { underlineNone: true },
    },
  };
}
