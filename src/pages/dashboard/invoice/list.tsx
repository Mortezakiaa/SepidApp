import sumBy from 'lodash/sumBy';
import { useState } from 'react';
// next

import { useRouter } from 'next/router';
// @mui
import Link from '@components/Link';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Backdrop,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@hooks/useSettings';
import useTable from '@hooks/useTable';
// layouts
import Layout from '@/layouts';
// components
import Page from '@components/Page';
import Label from '@components/Label';
import Iconify from '@components/Iconify';
import Scrollbar from '@components/Scrollbar';
import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs';
import { TableHeadCustom, TableNoData } from '@components/table';
// sections
import InvoiceAnalytic from '../../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../../sections/@dashboard/invoice/list';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import useFetchFactors from '@/react-query/factors/useFetchFactors.ts';
import { Icon } from '@iconify/react';
import useFactorPagination from '@/zustand/factors/useFactorPagination.ts';
import { useShallow } from 'zustand/react/shallow';
import useOrderStatistics from '@/react-query/factors/useFactorStatistics.ts';
import useFactorSetTab from '@/zustand/factors/useFactorSetTab.ts';
import InvoiceTableRowSkeleton from '@sections/@dashboard/invoice/list/InvoiceTableRowSkeleton.tsx';
import useFilterFactor from '@/zustand/factors/useFilterFactor.ts';
import useDeleteFactor from '@/react-query/factors/useDeleteFactor.ts';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = ['All', ...Object.values(FactorTypeEnum)];

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'مشتری', align: 'left' },
  { id: 'createDate', label: 'سازنده', align: 'left' },
  { id: 'dueDate', label: 'تاریخ ساخت', align: 'left' },
  { id: 'sent', label: 'مقدار تخفیف', align: 'center', width: 140 },
  { id: 'price', label: 'مبلغ کل', align: 'center', width: 140 },
  { id: 'status', label: 'تعداد ایتم', align: 'left' },
  { id: 'status', label: 'وضعیت', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

InvoiceList.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const { dense, page, order, orderBy, setPage, onSort, onChangeDense } = useTable({ defaultOrderBy: 'createDate' });

  const { rowPerPage, changeRowPerPage } = useFactorPagination(
    useShallow((state) => ({ rowPerPage: state.rowPerPage, changeRowPerPage: state.setRowPerPage }))
  );

  const { filterStatus, onFilterStatus } = useFactorSetTab(
    useShallow((state) => ({
      filterStatus: state.activeTab,
      onFilterStatus: state.setActiveTab,
    }))
  );
  const { mutate: deleteRow } = useDeleteFactor();
  const { data: tableData, error, isLoading } = useFetchFactors();

  const { name, setName, setService, service } = useFilterFactor(
    useShallow((state) => ({
      name: state.name,
      setName: state.setName,
      service: state.service,
      setService: state.setService,
    }))
  );

  const handleFilterService = (event) => {
    setService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    deleteRow(id);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.invoice.edit(id));
  };

  const isNotFound = !tableData?.result?.length || (!tableData?.result?.length && !!filterStatus);

  const { data: statistics } = useOrderStatistics();
  const TABS = [
    { value: 'All', label: 'همه', color: 'info', count: statistics?.total_orders },
    { value: FactorStatusEnum.PAID, label: 'پرداخت شده', color: 'success', count: statistics?.paid?.count },
    {
      value: FactorStatusEnum.PENDING,
      label: 'در انتظار پرداخت',
      color: 'warning',
      count: statistics?.pending?.count,
    },
    { value: FactorStatusEnum.UNPAID, label: 'پرداخت نشده', color: 'error', count: statistics?.unpaid?.count },
  ];

  return (
    <Page title="لیست فاکتور ها">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="لیست فاکتور ها"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'فاکتور', href: PATH_DASHBOARD.invoice.root },
            { name: 'لیست' },
          ]}
          action={
            <Link href={PATH_DASHBOARD.invoice.new}>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                فاکتور جدید
              </Button>
            </Link>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="همه"
                total={statistics?.total_orders}
                percent={100}
                price={statistics?.total_price}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="پرداخت شده"
                total={statistics?.paid?.count}
                percent={(statistics?.paid?.count / statistics?.total_orders) * 100}
                price={statistics?.paid?.price}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="در انتظار پرداحت"
                total={statistics?.pending?.count}
                percent={(statistics?.pending?.count / statistics?.total_orders) * 100}
                price={statistics?.pending?.price}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title="پرداخت نشده"
                total={statistics?.unpaid?.count}
                percent={(statistics?.unpaid?.count / statistics?.total_orders) * 100}
                price={statistics?.unpaid?.price}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.default' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div> <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            filterName={name}
            filterService={service}
            onFilterName={setName}
            onFilterService={handleFilterService}
            optionsService={SERVICE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.result?.length}
                  onSort={onSort}
                />

                {isLoading ? (
                  <TableBody>
                    {Array.from(Array(5)).map((_, index) => (
                      <InvoiceTableRowSkeleton key={index} />
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
                    {tableData?.result?.map((row) => (
                      <InvoiceTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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
              count={(tableData?.pagination?.lastPage || 0) * rowPerPage}
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
