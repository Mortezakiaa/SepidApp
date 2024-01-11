import { Box, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type SvgIconStylePropTypes = {
  src: string;
  sx?: SxProps;
};

export default function SvgIconStyle({ src, sx }: SvgIconStylePropTypes) {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
