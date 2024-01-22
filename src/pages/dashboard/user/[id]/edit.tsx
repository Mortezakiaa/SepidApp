import { useRouter } from 'next/router';
// @mui
import { Container, Skeleton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths';
// hooks
import useSettings from '@hooks/useSettings';
// layouts
import Layout from '@/layouts';
// components
import Page from '@components/Page';
import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '@sections/@dashboard/user/UserNewEditForm';
import useFetchSingleUser from '@/react-query/user/useFetchSingleUser';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();
  const { query } = useRouter();
  const { id } = query;
  const { data: user, isLoading } = useFetchSingleUser(+id);
  return (
    <Page title="ویرایش کاربر">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش کاربر"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'کاربر', href: PATH_DASHBOARD.user.list },
            { name: id.toString() },
          ]}
        />
        {isLoading ? <Skeleton width={'100%'} height={'100%'} /> : <UserNewEditForm isEdit currentUser={user} />}
      </Container>
    </Page>
  );
}
