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
import { fCurrency } from '@utils/formatNumber.tsx';

// ----------------------------------------------------------------------

type UserTableRowPropTypes = {
  row: Product;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export default function ProductTableRow({ row, onEditRow, onDeleteRow }: UserTableRowPropTypes) {
  const { title, price, offer_price, id } = row;
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
        onClick={() => push({ pathname: 'edit/[id]', query: { id } })}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>
      <TableCell align="left">{fCurrency(price) || '-'} تومان </TableCell>
      <TableCell align="left">{fCurrency(offer_price) || '-'} تومان </TableCell>
      <TableCell align="left">{fCurrency(price - offer_price) || '-'} تومان </TableCell>

      <TableCell align="right">
        <ConfirmModal
          onConfirm={onDeleteRow}
          open={openDeleteModal}
          isLoading={isPending}
          handleClose={() => setOpenDeleteModal(false)}
          text={'ایا مطمئن هستید میخواهید این محصول را پاک کنید؟'}
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
