// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// fullcalendar
import '@fullcalendar/common/main.min.css';
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
import { NextPageContext, GetStaticPropsContext } from 'next/types';
import '../../public/fonts/peyda/peyda.css';
// ----------------------------------------------------------------------

type propsType = {
  Component: any;
  pageProps: object;
  settings: object;
};
const queryClient = new QueryClient();

export default function MyApp(props: propsType) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ClientProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
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
                              {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
                              <Settings />
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
          </QueryClientProvider>
        </AuthProvider>
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
