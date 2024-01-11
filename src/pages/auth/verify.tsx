// next
import Link from '@components/Link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

VerifyCode.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function VerifyCode() {
  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Link href={PATH_AUTH.login}>
              <Button
                size="small"
                startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                sx={{ mb: 3 }}
              >
                Back
              </Button>
            </Link>

            <Typography variant="h3" paragraph>
              Please check your email!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify
              your email.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" underline="none" onClick={() => {}}>
                Resend code
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
