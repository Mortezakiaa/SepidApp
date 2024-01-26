import { ReactElement, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, MenuItem } from '@mui/material';
import Link from '@components/Link';
// utils
import { fDate } from '@utils/formatTime.tsx';
import createAvatar from '@utils/createAvatar';
import { fCurrency } from '@utils/formatNumber.tsx';
// components
import Label from '@components/Label';
import Avatar from '@components/Avatar';
import Iconify from '@components/Iconify';
import { TableMoreMenu } from '@components/table';

// ----------------------------------------------------------------------

type InvoiceTableRowPropTypes = {
  row: Order;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export default function InvoiceTableRow({ row, onEditRow, onDeleteRow }: InvoiceTableRowPropTypes): ReactElement {
  // Use the theme from Material UI
  const theme = useTheme();

  // Destructure the row data
  const { status, pharmacy, factors, id, createdAt, creator } = row;

  // State for the open menu
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  // Handle closing the menu
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  // Render the row
  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {pharmacy?.name}
          </Typography>

          <Link
            href={'/dashboard/invoice/' + id}
            noWrap
            variant="body2"
            sx={{ color: 'text.disabled', cursor: 'pointer' }}
          >
            {id}
          </Link>
        </Stack>
      </TableCell>
      <TableCell align="left">{creator?.full_name || creator?.phone_number}</TableCell>

      <TableCell align="left">{fDate(createdAt)}</TableCell>

      <TableCell align="center">{fCurrency(factors.reduce((acc, factor) => acc + factor.final_price, 0))}</TableCell>
      <TableCell align="center">{fCurrency(factors.reduce((acc, factor) => acc + factor.price, 0))}</TableCell>
      <TableCell align="center">{factors.length}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'PAID' && 'success') ||
            (status === 'PENDING' && 'warning') ||
            (status === 'UNPAID' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

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

              {/*<MenuItem*/}
              {/*  onClick={() => {*/}
              {/*    onViewRow();*/}
              {/*    handleCloseMenu();*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Iconify icon={'eva:eye-fill'} />*/}
              {/*  نمایش*/}
              {/*</MenuItem>*/}

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
