import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { CssBaseline, Link } from '@mui/material';
// @mui
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//next
import NextLink from 'next/link';
import { LinkProps } from 'next/link';
//
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import { Direction } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteColor } from '@mui/material/styles/createPalette';

// ----------------------------------------------------------------------

type propTypes = {
  children: React.ReactNode;
};

declare module '@mui/material/styles' {
  interface Palette extends PaletteColor {
    gradients?: { primary?: string; info?: string; success?: string; warning?: string; error?: string };
  }
  interface PaletteOptions {
    gradients?: { primary?: string; info?: string; success?: string; warning?: string; error?: string };
  }
  interface Theme {
    customShadows: {
      z1: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      card: string;
      dialog: string;
      dropdown: string;
    };
  }
}

export default function ThemeProvider({ children }: propTypes) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography: typography as TypographyOptions,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection as Direction,
      shadows: (isLight ? shadows.light : shadows.dark) as any,
      customShadows: isLight ? customShadows.light : customShadows.dark,
      transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          // most basic recommended timing
          standard: 300,
          // this is to be used in complex animations
          complex: 375,
          // recommended when something is entering screen
          enteringScreen: 225,
          // recommended when something is leaving screen
          leavingScreen: 195,
        },
      },
    }),
    [isLight, themeDirection]
  );
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
