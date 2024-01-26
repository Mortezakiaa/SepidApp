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
import ProductTableToolbar from '@sections/@dashboard/product/list/ProductTableToolbar.tsx';
import ProductTableRow from '@sections/@dashboard/product/list/ProductTableRow.tsx';
import ProductTableRowSkeleton from '@sections/@dashboard/product/list/ProductTableRowSkeleton.tsx';
import useDeleteProduct from '@/react-query/product/useDeleteProduct.ts';
import useFilterProduct from '@/zustand/products/useFilterProduct.ts';
import useProductPagination from '@/zustand/products/useProductPagination.ts';
import useFetchProducts from '@/react-query/product/useFetchProducts.ts';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'نام', align: 'left' },
  { id: 'price', label: 'قیمت', align: 'left' },
  { id: 'offer_price', label: 'قیمت با تخفیف', align: 'left' },
  { id: 'final_price', label: 'مقدار تخفیف', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

ProductList.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function ProductList() {
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

  const { data: products, isLoading, error } = useFetchProducts();
  const tableData = products?.result || [];
  const { rowPerPage, page, setPage, changeRowPerPage } = useProductPagination(
    useShallow((state) => ({
      page: state.activePage,
      rowPerPage: state.rowPerPage,
      setPage: state.setPage,
      changeRowPerPage: state.setRowPerPage,
    }))
  );

  const { setName, name } = useFilterProduct(
    useShallow((state) => ({
      setName: state.setTitle,
      name: state.title,
    }))
  );
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleFilterName = (filterName) => {
    setName(filterName);
    setPage(0);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.product.edit(+id));
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length;

  return (
    <Page title="محصولات ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="لیست محصولات"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'محصولات', href: PATH_DASHBOARD.product.root },
            { name: 'لیست' },
          ]}
          action={
            <Link href={PATH_DASHBOARD.product.new}>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                محصول جدید
              </Button>
            </Link>
          }
        />

        <Card>
          <Divider />

          <ProductTableToolbar filterName={name} onFilterName={handleFilterName} />

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
                      <ProductTableRowSkeleton key={index} />
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
                      <ProductTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => deleteProduct(row.id)}
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
              count={(products?.pagination?.lastPage || 0) * rowPerPage}
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
