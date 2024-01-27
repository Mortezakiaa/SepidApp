import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container, Link } from '@mui/material';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import { MotionContainer, varBounce } from '@/components/animate';
// assets
import { PageNotFoundIllustration } from '@/assets';
import React from 'react';
import Iconify from '@components/Iconify.tsx';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

Page404.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="پرداخت ناموفق" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                پرداخت ناموفق
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}> پرداخت ناموفق بود</Typography>
            <m.div variants={varBounce().in}>
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  border: '4px solid red',
                  borderRadius: '100%',
                  my: { xs: 5, sm: 10 },
                  mx: 'auto',
                }}
              >
                <Iconify icon="ant-design:close-outlined" sx={{ fontSize: 64, color: 'red', pt: 3 }} />
              </Box>
            </m.div>
            <Link href="/">
              <Button size="large" variant="contained">
                برگشت به داشبورد
              </Button>
            </Link>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
