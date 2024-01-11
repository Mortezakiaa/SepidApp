import React, { forwardRef } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
import { BoxProps } from '@mui/material/Box/Box';

// ----------------------------------------------------------------------

type propTypes = {
  children: React.ReactNode;
  title: string;
  meta?: React.ReactNode;
} & BoxProps;

const Page = forwardRef(({ children, title = '', meta, ...other }: propTypes, ref) => (
  <>
    <Head>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
