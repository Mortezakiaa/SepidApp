// @mui
import { TableRow, TableCell } from '@mui/material';

// ----------------------------------------------------------------------

type TableEmptyRowsPropTypes = {
  emptyRows: number;
  height: number;
};

export default function TableEmptyRows({ emptyRows, height }: TableEmptyRowsPropTypes) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
