import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Typography,
  Backdrop,
} from '@mui/material';
import Link from '@components/Link';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@/hooks/useSettings';
import useTable, { emptyRows } from '@/hooks/useTable';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import Scrollbar from '@/components/Scrollbar';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '@/components/table';
// sections
import { useShallow } from 'zustand/react/shallow';
import { Icon } from '@iconify/react';
import SupportTableToolbar from '@sections/@dashboard/support/list/SupportTableToolbar.tsx';
import SupportTableRow from '@sections/@dashboard/support/list/SupportTableRow.tsx';
import SupportTableRowSkeleton from '@sections/@dashboard/support/list/SupportTableRowSkeleton.tsx';
import useDeleteSupport from '@/react-query/support/useDeleteSupport.ts';
import useFilterSupport from '@/zustand/support/useFilterSupport.ts';
import useSupportPagination from '@/zustand/support/useSupportPagination.ts';
import useFetchSupports from '@/react-query/support/useFetchSupports.ts';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'نام', align: 'left' },
  { id: 'duration', label: 'زمان سرویس', align: 'left' },
  { id: 'price', label: 'قیمت', align: 'left' },
  { id: 'offer_price', label: 'قیمت با تخفیف', align: 'left' },
  { id: 'final_price', label: 'مقدار تخفیف', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

SupportList.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function SupportList() {
  const {
    dense,
    order,
    orderBy,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const { data: supports, isLoading, error } = useFetchSupports();
  const tableData = supports?.result || [];
  const { rowPerPage, page, setPage, changeRowPerPage } = useSupportPagination(
    useShallow((state) => ({
      page: state.activePage,
      rowPerPage: state.rowPerPage,
      setPage: state.setPage,
      changeRowPerPage: state.setRowPerPage,
    }))
  );

  const { setName, name } = useFilterSupport(
    useShallow((state) => ({
      setName: state.setTitle,
      name: state.title,
    }))
  );
  const { mutate: deleteSupport } = useDeleteSupport();

  const handleFilterName = (filterName) => {
    setName(filterName);
    setPage(0);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.support.edit(+id));
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length;

  return (
    <Page title="سرویس ها ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="لیست سرویس ها"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'سرویس ها', href: PATH_DASHBOARD.support.root },
            { name: 'لیست' },
          ]}
          action={
            <Link href={PATH_DASHBOARD.support.new}>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                سرویس جدید
              </Button>
            </Link>
          }
        />

        <Card>
          <Divider />

          <SupportTableToolbar filterName={name} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  onSort={onSort}
                />

                {isLoading ? (
                  <TableBody>
                    {Array.from(Array(5)).map((_, index) => (
                      <SupportTableRowSkeleton key={index} />
                    ))}
                  </TableBody>
                ) : error ? (
                  <Backdrop open={true}>
                    <Box sx={{ border: '1px solid red', padding: 5, borderRadius: 5 }}>
                      <Icon color="red" width={100} icon={'material-symbols:error-outline'} />

                      <Typography>{error?.errorData || 'خطایی رخ داده است'}</Typography>
                    </Box>
                  </Backdrop>
                ) : (
                  <TableBody>
                    {tableData.map((row) => (
                      <SupportTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => deleteSupport(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                    {/*<TableEmptyRows height={denseHeight} emptyRows={rowPerPage} />*/}

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative', zIndex: -1 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              labelRowsPerPage={'تعداد ردیف در هر صفحه : '}
              count={(supports?.pagination?.lastPage || 0) * rowPerPage}
              rowsPerPage={rowPerPage}
              page={page}
              onPageChange={(_, thisPage) => setPage(thisPage)}
              onRowsPerPageChange={(event) => changeRowPerPage(+event.target.value)}
            />
            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="فشرده"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
