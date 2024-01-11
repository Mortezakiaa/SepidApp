// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Typography, Box, IconButton } from '@mui/material';
//
import Iconify from '../Iconify';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.48),
}));

const ArrowStyle = styled(IconButton)(({ theme }) => ({
  padding: 6,
  opacity: 0.48,
  color: theme.palette.common.white,
  '&:hover': { opacity: 1 },
}));

// ----------------------------------------------------------------------

type propTypes = {
  customIcon?: ReactNode | string;
  index?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  total?: number;
};

export default function CarouselArrowIndex({ index, total, onNext, onPrevious, customIcon, ...other }: propTypes) {
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        {leftIcon(customIcon, isRTL)}
      </ArrowStyle>

      <Typography variant="subtitle2">
        {index + 1}/{total}
      </Typography>

      <ArrowStyle size="small" onClick={onNext}>
        {rightIcon(customIcon, isRTL)}
      </ArrowStyle>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

const leftIcon = (customIcon: ReactNode | string, isRTL: boolean) => (
  <Iconify
    icon={customIcon ? customIcon : 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      transform: ' scaleX(-1)',
      ...(isRTL && { transform: ' scaleX(1)' }),
    }}
  />
);

const rightIcon = (customIcon: ReactNode | string, isRTL: boolean) => (
  <Iconify
    icon={customIcon ? customIcon : 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      ...(isRTL && { transform: ' scaleX(-1)' }),
    }}
  />
);
