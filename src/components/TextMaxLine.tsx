import { ForwardedRef, forwardRef, ReactNode } from 'react';
// @mui
import { Typography, SxProps } from '@mui/material';
import Link from '@components/Link';
// utils
import GetFontValue from '../utils/getFontValue';
import { TypographyProps } from '@mui/material/Typography/Typography';

// ----------------------------------------------------------------------

const TextMaxLine = forwardRef(
  (
    { asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other }: propTypes,
    ref: ForwardedRef<null>
  ) => {
    const { lineHeight } = GetFontValue(variant);

    const style: SxProps = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    };

    if (asLink) {
      return (
        <Link color="inherit" ref={ref} variant={variant} sx={{ ...style }} {...other}>
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);

type propTypes = {
  asLink?: boolean;
  children: ReactNode;
  line?: number;
  persistent?: boolean;
  sx?: SxProps;
  variant?:
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
} & TypographyProps;

export default TextMaxLine;
