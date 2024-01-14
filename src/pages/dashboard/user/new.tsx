// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="کاربر : ساخت کاربر جدید">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ساخت کاربر جدید"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'کاربر', href: PATH_DASHBOARD.user.list },
            { name: 'ساخت کاربر جدید' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </Page>
  );
}
