import { useState } from 'react';
// @mui
import { TableRow, TableCell, Typography, MenuItem, Link } from '@mui/material';
// components
import Iconify from '@/components/Iconify';
import { TableMoreMenu } from '@/components/table';
import ConfirmModal from '@components/ConfirmModal.tsx';
import { format } from 'date-fns-jalali';
import useDeletePharmacy from '@/react-query/pharmacy/useDeletePharmacy.ts';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type UserTableRowPropTypes = {
  row: Pharmacy;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export default function PharmacyTableRow({ row, onEditRow, onDeleteRow }: UserTableRowPropTypes) {
  const { city, name, is_active, end_date, id } = row;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openMenu, setOpenMenuActions] = useState(null);
  const { isPending } = useDeletePharmacy();
  const { push } = useRouter();
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell
        onClick={() => push({ pathname: '[id]', query: { id } })}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>
      <TableCell align="left">{city?.name || '-'}</TableCell>
      <TableCell align="left">
        <Iconify
          icon={is_active ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!is_active && { color: 'warning.main' }),
          }}
        />
      </TableCell>
      <TableCell align="center">{format(new Date(end_date), 'd MMMM yyyy')}</TableCell>
      <TableCell align="right">
        <ConfirmModal
          onConfirm={onDeleteRow}
          open={openDeleteModal}
          isLoading={isPending}
          handleClose={() => setOpenDeleteModal(false)}
          text={'ایا مطمئن هستید میخواهید این داروخانه را پاک کنید؟'}
        />
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  setOpenDeleteModal(true);
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
