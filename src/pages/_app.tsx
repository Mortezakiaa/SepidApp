// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

import cookie from 'cookie';
// next
import Head from 'next/head';
import App, { AppContext } from 'next/app';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
// utils
import { getSettings } from '../utils/settings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import Settings from '../components/settings';
import { ChartStyle } from '../components/chart';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import NotistackProvider from '../components/NotistackProvider';
import ThemeLocalization from '../components/ThemeLocalization';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

import { AuthProvider } from '../contexts/JWTContext';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ClientProvider from '@contexts/ClientProvider.tsx';
import '@/theme/index.css';
import { Toaster } from 'react-hot-toast';
// ----------------------------------------------------------------------

type propsType = {
  Component: any;
  pageProps: object;
  settings: object;
};
const queryClient = new QueryClient();
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ResponseModel<any>;
  }
}

export default function MyApp(props: propsType) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ClientProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CollapseDrawerProvider>
                <SettingsProvider defaultSettings={settings}>
                  <ThemeProvider>
                    <NotistackProvider>
                      <MotionLazyContainer>
                        <ThemeColorPresets>
                          <ThemeLocalization>
                            <RtlLayout>
                              <ChartStyle />
                              <Toaster
                                position={'bottom-right'}
                                toastOptions={{ duration: 3000, style: { background: '#090909', color: '#dcdcdc' } }}
                              />
                              {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
                              {/*<Settings />*/}
                              <ProgressBar />
                              {getLayout(<Component {...pageProps} />)}
                            </RtlLayout>
                          </ThemeLocalization>
                        </ThemeColorPresets>
                      </MotionLazyContainer>
                    </NotistackProvider>
                  </ThemeProvider>
                </SettingsProvider>
              </CollapseDrawerProvider>
            </LocalizationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ClientProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);
  const settings = getSettings(cookies);
  return {
    ...appProps,
    settings,
  };
};
