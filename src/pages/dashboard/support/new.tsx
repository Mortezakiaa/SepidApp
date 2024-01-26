// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@/hooks/useSettings';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import ProductNewEdit from '@sections/@dashboard/product/ProductNewEdit.tsx';
import SupportNewEdit from '@sections/@dashboard/support/SupportNewEdit.tsx';
// sections

// ----------------------------------------------------------------------

Support.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Support() {
  const { themeStretch } = useSettings();

  return (
    <Page title="سرویس پشتیبانی نرم افزار : ساخت سرویس جدید">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ساخت سرویس جدید"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'سرویس پشتیبانی نرم افزار', href: PATH_DASHBOARD.product.list },
            { name: 'ساخت سرویس جدید' },
          ]}
        />
        <SupportNewEdit />
      </Container>
    </Page>
  );
}
