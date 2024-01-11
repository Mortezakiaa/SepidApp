import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { SxProps, useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar } from '@mui/material';
import { AvatarOwnProps } from '@mui/material/Avatar/Avatar';

// ----------------------------------------------------------------------

const Avatar = forwardRef(({ color = 'default', children, sx, ...other }: propsType, ref: ForwardedRef<null>) => {
  const theme = useTheme();

  if (color === 'default') {
    return (
      <MUIAvatar ref={ref} sx={sx} {...other}>
        {children}
      </MUIAvatar>
    );
  }

  return (
    <MUIAvatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
});

type propsType = {
  children: ReactNode;
  sx?: SxProps;
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
} & AvatarOwnProps;

export default Avatar;
