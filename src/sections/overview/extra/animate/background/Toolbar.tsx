// @mui
import { Paper, IconButton } from '@mui/material';
// components
import Iconify from '@components/Iconify';

// ----------------------------------------------------------------------

type propTypes = {
  onRefresh: () => void;
};

export default function Toolbar({ onRefresh, ...other }: propTypes) {
  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} {...other}>
      <IconButton onClick={onRefresh}>
        <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
      </IconButton>
    </Paper>
  );
}
