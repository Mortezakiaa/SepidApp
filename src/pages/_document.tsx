import * as React from 'react';
// next
import { Html, Head, Main, NextScript } from 'next/document';

import palette from '../theme/palette';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/brand.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/brand.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/brand.svg" />

        <meta name="theme-color" content={palette.light.primary.main} />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
        <meta name="author" content="Minimal UI Kit" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
