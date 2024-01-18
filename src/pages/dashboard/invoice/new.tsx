// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@hooks/useSettings';
// layouts
import Layout from '@/layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '@sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="فاکتور ها : ساخت فاکتور">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ساخت فاکتور جدید"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'فاکتور ها', href: PATH_DASHBOARD.invoice.list },
            { name: 'فاکتور جدید' },
          ]}
        />
        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}
