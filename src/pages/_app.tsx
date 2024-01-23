// // i18n
import '../locales/i18n';
//
// // highlight
// import '../utils/highlight';
//
import cookie from 'cookie';
// // next
import Head from 'next/head';
import App, { AppContext } from 'next/app';
// // @mui
// // utils
import { getSettings } from '../utils/settings';
// // contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// // theme
import ThemeProvider from '../theme';
// // components
import Settings from '../components/settings';
import { ChartStyle } from '../components/chart';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import NotistackProvider from '../components/NotistackProvider';
import ThemeLocalization from '../components/ThemeLocalization';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
//
// // Check our docs
// // https://docs-minimals.vercel.app/authentication/ts-version
//
import { AuthProvider } from '../contexts/JWTContext';
// import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ClientProvider from '@contexts/providers/ClientProvider.tsx';
import '@/theme/index.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import ToastProvider from '@contexts/providers/ToastProvider.tsx';
import ReactQueryProvider from '@contexts/providers/ReactQueryProvider.tsx';
// // ----------------------------------------------------------------------

type propsType = {
  Component: any;
  pageProps: object;
  settings: object;
};

export default function MyApp(props: propsType) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ClientProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
              <CollapseDrawerProvider>
                <SettingsProvider defaultSettings={settings}>
                  <ThemeProvider>
                    <NotistackProvider>
                      <MotionLazyContainer>
                        <ThemeColorPresets>
                          <ThemeLocalization>
                            <RtlLayout>
                              <ChartStyle />
                              <ToastProvider />
                              {process.env.NODE_ENV !== 'production' && <Settings />}
                              {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
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
        </ReactQueryProvider>
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
