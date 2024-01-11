import { m } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, IconButton } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';

// ----------------------------------------------------------------------

const IconButtonAnimate = forwardRef(({ children, size = 'medium', ...other }: propTypes, ref) => (
  <AnimateWrap size={size}>
    <IconButton size={size} ref={ref as any} {...other}>
      {children}
    </IconButton>
  </AnimateWrap>
));

type propTypes = {
  filled?: boolean;
  children?: ReactNode;
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
} & IconButtonProps;

export default IconButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

type AnimateWrapPropTypes = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
};

function AnimateWrap({ size, children }: AnimateWrapPropTypes) {
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
      }}
    >
      {children}
    </Box>
  );
}
