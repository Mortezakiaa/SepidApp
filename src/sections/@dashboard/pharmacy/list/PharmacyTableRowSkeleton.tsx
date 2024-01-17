import { Skeleton, TableCell, TableRow } from '@mui/material';

export default function PharmacyTableRowSkeleton() {
  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton width={'50%'} height={40} />
      </TableCell>
      <TableCell align="left">
        <Skeleton width={'50%'} height={40} />
      </TableCell>
      <TableCell align="left">
        <Skeleton width={'50%'} height={40} />
      </TableCell>
      <TableCell align="right">
        <Skeleton width={'100%'} height={40} />
      </TableCell>
      <TableCell align="right">
        <Skeleton width={'50%'} height={40} />
      </TableCell>
    </TableRow>
  );
}
