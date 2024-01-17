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
import useDeleteUser from '@/react-query/user/useDeleteUser';
import { Icon } from '@iconify/react';
import useFetchPharmacies from '@/react-query/pharmacy/useFetchPharmacies.ts';
import usePharmacySetTab from '@/zustand/pharmacies/usePharmacySetTab.ts';
import useFilterPharmacy from '@/zustand/pharmacies/useFilterPharmacy.ts';
import PharmacyTableToolbar from '@sections/@dashboard/pharmacy/list/PharmacyTableToolbar.tsx';
import PharmacyTableRow from '@sections/@dashboard/pharmacy/list/PharmacyTableRow.tsx';
import PharmacyTableRowSkeleton from '@sections/@dashboard/pharmacy/list/PharmacyTableRowSkeleton.tsx';
import useDeletePharmacy from '@/react-query/pharmacy/useDeletePharmacy.ts';
import usePharmacyPagination from '@/zustand/pharmacies/usePharmacyPagination.ts';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'همه' },
  { value: 'active', label: 'فعال' },
  { value: 'inactive', label: 'غیرفعال' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'نام', align: 'left' },
  { id: 'city', label: 'شهر', align: 'left' },
  { id: 'is_active', label: 'وضعیت', align: 'left' },
  { id: 'end_date', label: 'تاریخ پایان اعتبار', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

PharmacyList.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function PharmacyList() {
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

  const { data: pharmacies, isLoading, error } = useFetchPharmacies();
  const tableData = pharmacies?.result || [];
  const { rowPerPage, page, setPage, changeRowPerPage } = usePharmacyPagination(
    useShallow((state) => ({
      page: state.activePage,
      rowPerPage: state.rowPerPage,
      setPage: state.setPage,
      changeRowPerPage: state.setRowPerPage,
    }))
  );

  const { activeTab, setTab } = usePharmacySetTab(
    useShallow((state) => ({ activeTab: state.activeTab, setTab: state.setActiveTab }))
  );

  const { setName, name } = useFilterPharmacy(
    useShallow((state) => ({
      setName: state.setName,
      name: state.name,
    }))
  );
  const { mutate: deletePharmacy } = useDeletePharmacy();

  const handleFilterName = (filterName) => {
    setName(filterName);
    setPage(0);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.pharmacy.edit(+id));
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length;

  return (
    <Page title="داروخانه ها">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="لیست داروخانه ها"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'داروخانه', href: PATH_DASHBOARD.pharmacy.root },
            { name: 'لیست' },
          ]}
          action={
            <Link href={PATH_DASHBOARD.pharmacy.new}>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                داروخانه جدید
              </Button>
            </Link>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={setTab}
            sx={{ px: 2, bgcolor: 'background.default' }}
          >
            {STATUS_OPTIONS.map((tab, index) => (
              <Tab disableRipple key={index} label={tab.label} value={tab.value} />
            ))}
          </Tabs>

          <Divider />

          <PharmacyTableToolbar filterName={name} onFilterName={handleFilterName} />

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
                      <PharmacyTableRowSkeleton key={index} />
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
                      <PharmacyTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => deletePharmacy(row.id)}
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
              count={(pharmacies?.pagination?.lastPage || 0) * rowPerPage}
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
