// @mui
import { Box, Paper, FormControlLabel, Switch, IconButton } from '@mui/material';
// components
import Iconify from '@components/Iconify';
import { ChangeEvent } from 'react';

// ----------------------------------------------------------------------

type propTypes = {
  isText: boolean;
  isMulti: boolean;
  onChangeText: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onChangeMulti: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onRefresh: () => void;
};

export default function Toolbar({ isText, isMulti, onChangeText, onChangeMulti, onRefresh, ...other }: propTypes) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      {...other}
    >
      <FormControlLabel control={<Switch checked={isText} onChange={onChangeText} />} label="Text Object" />

      <Box sx={{ flexGrow: 1 }} />

      {!isText && (
        <FormControlLabel control={<Switch checked={isMulti} onChange={onChangeMulti} />} label="Multi Item" />
      )}

      <IconButton onClick={onRefresh}>
        <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
      </IconButton>
    </Paper>
  );
}
