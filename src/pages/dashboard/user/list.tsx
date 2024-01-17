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
import useTable, { getComparator, emptyRows } from '@/hooks/useTable';
// _mock_
import { _userList } from '@/_mock';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import Scrollbar from '@/components/Scrollbar';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '@/components/table';
// sections
import { UserTableToolbar, UserTableRow } from '@/sections/@dashboard/user/list';
import useFetchUsers from '@/react-query/user/useFetchUsers';
import { RoleEnum } from '@/enums/role.enum';
import useFilterUser from '@/zustand/users/useFilterUser';
import { useShallow } from 'zustand/react/shallow';
import useDeleteUser from '@/react-query/user/useDeleteUser';
import UserTableRowSkeleton from '@/sections/@dashboard/user/list/UserTableRowSkeleton';
import useUsersTabState from '@/zustand/users/useUserSetTab';
import { UserStatusEnum } from '@/types/enums/user-status.enum';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'همه' },
  { value: UserStatusEnum.ACTIVE, label: 'فعال' },
  { value: UserStatusEnum.INACTIVE, label: 'غیرفعال' },
];

const ROLE_OPTIONS = ['all', RoleEnum.ADMIN, RoleEnum.PHARMACY, RoleEnum.SUPPORT, RoleEnum.USER];

const TABLE_HEAD = [
  { id: 'full_name', label: 'نام و نام خانوادگی', align: 'left' },
  { id: 'role', label: 'نقش', align: 'left' },
  { id: 'status', label: 'وضعیت', align: 'left' },
  { id: 'pharmacy', label: 'داروخانه', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const { data: users, isLoading, error } = useFetchUsers();
  const tableData = users?.result || [];
  const { activeTab, setTab } = useUsersTabState(
    useShallow((state) => ({ activeTab: state.activeTab, setTab: state.setActiveTab }))
  );

  const { setFullName, setRole, fullName, role } = useFilterUser(
    useShallow((state) => ({
      setRole: state.setRole,
      setFullName: state.setFullName,
      role: state.role,
      fullName: state.fullName,
    }))
  );
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleFilterName = (filterName) => {
    setFullName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setRole(event.target.value);
  };

  const handleDeleteRow = (id: number) => {
    deleteUser(id);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.user.edit(+id));
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length;

  return (
    <Page title="کاربران">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="لیست کاربران"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'کاربر', href: PATH_DASHBOARD.user.root },
            { name: 'لیست' },
          ]}
          action={
            <Link href={PATH_DASHBOARD.user.new}>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                کاربر جدید
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
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={fullName}
            filterRole={role}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

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
                      <UserTableRowSkeleton key={index} />
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
                      <UserTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
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
