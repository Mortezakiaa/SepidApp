// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
}));

// ----------------------------------------------------------------------

type BookingWidgetSummaryPropTypes = {
  icon: any;
  title: string;
  total: number;
};

export default function BookingWidgetSummary({ title, total, icon }: BookingWidgetSummaryPropTypes) {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.default',
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  );
}
