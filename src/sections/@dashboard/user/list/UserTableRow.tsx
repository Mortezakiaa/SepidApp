import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '@/components/Iconify';
import { TableMoreMenu } from '@/components/table';

// ----------------------------------------------------------------------

type UserTableRowPropTypes = {
  row: User;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export default function UserTableRow({ row, onEditRow, onDeleteRow }: UserTableRowPropTypes) {
  const { phone_number, role, status, full_name, pharmacy } = row;
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {full_name || phone_number}
        </Typography>
      </TableCell>

      <TableCell align="left">{role}</TableCell>

      <TableCell align="left">
        <Iconify
          icon={status === 'ACTIVE' ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(status === 'INACTIVE' && { color: 'warning.main' }),
          }}
        />
      </TableCell>
      <TableCell align="left">{pharmacy?.name}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                حذف
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                ویرایش
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
