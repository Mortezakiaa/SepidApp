// next
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
import Link from '@components/Link';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type propTypes = {
  children: ReactNode;
};

export default function MainLayout({ children }: propTypes) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://minimals.cc/">minimals.cc</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
