import { m } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
//
import { varFade } from './variants';
import { BoxProps } from '@mui/material/Box/Box';

// ----------------------------------------------------------------------

type propsType = {
  text?: string;
  variants?: any;
  sx?: any;
} & BoxProps;

export default function TextAnimate({ text, variants, sx, ...other }: propsType) {
  return (
    <Box
      component={m.h1}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
