import { m } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
//
import { varContainer } from '.';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type MotionViewportPropTypes = {
  children: ReactNode;
  disableAnimatedMobile: boolean;
};

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }: MotionViewportPropTypes) {
  const isDesktop = useResponsive('up', 'sm');

  if (!isDesktop && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
