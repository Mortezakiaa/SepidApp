import { m } from 'framer-motion';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
// @mui
import { SxProps, useTheme } from '@mui/material/styles';
import { Box, Fab } from '@mui/material';

// ----------------------------------------------------------------------

const FabButtonAnimate = forwardRef(
  (
    { color = 'primary', size = 'large', children, sx, sxWrap, ...other }: FabButtonAnimatePropTypes,
    ref: ForwardedRef<null>
  ) => {
    const theme = useTheme();

    if (color === 'default' || color === 'inherit' || color === 'primary' || color === 'secondary') {
      return (
        <AnimateWrap size={size} sxWrap={sxWrap}>
          <Fab ref={ref} size={size} color={color} sx={sx} {...other}>
            {children}
          </Fab>
        </AnimateWrap>
      );
    }

    return (
      <AnimateWrap size={size} sxWrap={sxWrap}>
        <Fab
          ref={ref}
          size={size}
          sx={{
            boxShadow: theme.customShadows[color],
            color: theme.palette[color].contrastText,
            bgcolor: theme.palette[color].main,
            '&:hover': {
              bgcolor: theme.palette[color].dark,
            },
            ...sx,
          }}
          {...other}
        >
          {children}
        </Fab>
      </AnimateWrap>
    );
  }
);

type FabButtonAnimatePropTypes = {
  children: ReactNode;
  color: 'inherit' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  size: 'small' | 'medium' | 'large';
  sx?: SxProps;
  sxWrap: any;
};

export default FabButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.07 },
  tap: { scale: 0.97 },
};

const varMedium = {
  hover: { scale: 1.06 },
  tap: { scale: 0.98 },
};

const varLarge = {
  hover: { scale: 1.05 },
  tap: { scale: 0.99 },
};

type AnimateWrapPropTypes = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
  sxWrap: any;
};

function AnimateWrap({ size, children, sxWrap }: AnimateWrapPropTypes) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
        ...sxWrap,
      }}
    >
      {children}
    </Box>
  );
}
