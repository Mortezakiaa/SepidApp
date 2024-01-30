// @mui
import { IconButton } from '@mui/material';
//
import Iconify from '../Iconify';
import MenuPopover from '../MenuPopover';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type TableMoreMenuPropTypes = {
  actions: ReactNode;
  open: any;
  onClose: (e: any) => void;
  onOpen: (value: any) => void;
};

export default function TableMoreMenu({ actions, open, onClose, onOpen }: TableMoreMenuPropTypes) {
  return (
    <div>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onOpen(e);
        }}
      >
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </div>
  );
}
