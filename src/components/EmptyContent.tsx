// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box, BoxProps } from '@mui/material';
//
import Image from './Image';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

type propTypes = {
  title: string;
  img?: string;
  description?: string;
} & BoxProps;

export default function EmptyContent({ title, description, img, ...other }: propTypes) {
  return (
    <RootStyle {...other}>
      <Icon width={50} icon="fa-solid:book-open" />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
