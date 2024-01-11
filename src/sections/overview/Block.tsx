// @mui
import { SxProps, alpha } from '@mui/material/styles';
import { Paper, CardHeader, Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type propTypes = {
  children: ReactNode;
  sx?: SxProps;
  title: string;
};

export function Block({ title, sx, children }: propTypes) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}
      <Box
        sx={{
          p: 5,
          minHeight: 180,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

// ----------------------------------------------------------------------

type LabelPropTypes = {
  title: string;
};

export function Label({ title }: LabelPropTypes) {
  return (
    <Typography variant="overline" component="p" gutterBottom sx={{ color: 'text.secondary' }}>
      {title}
    </Typography>
  );
}
