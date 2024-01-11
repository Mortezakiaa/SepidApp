// @mui
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
import useLocales from '../hooks/useLocales';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type ThemeLocalizationPropTypes = {
  children: ReactNode;
};

export default function ThemeLocalization({ children }: ThemeLocalizationPropTypes) {
  const defaultTheme = useTheme();
  const { currentLang } = useLocales();
  const theme = createTheme(defaultTheme, currentLang.systemValue);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
