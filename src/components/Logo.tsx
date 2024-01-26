import { forwardRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
import Link from '@components/Link';
// ----------------------------------------------------------------------
import logoImg from 'public/logo/brand.svg';
import Image from '@components/Image.tsx';
const Logo = forwardRef(({ disabledLink = false, sx }: propTypes, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box ref={ref} sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}>
      <Image src={logoImg.src} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <Link href="/">{logo}</Link>;
});

type propTypes = {
  disabledLink?: boolean;
  sx?: SxProps;
};

export default Logo;
