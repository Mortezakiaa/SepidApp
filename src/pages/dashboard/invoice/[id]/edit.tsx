// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
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
import InvoiceNewEditForm from '@sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  // const factor = useFetchSingleFactor(id);

  return (
    <Page title="ویرایش فاکتورها">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش فاکتور"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'فاکتورها', href: PATH_DASHBOARD.invoice.list },
            { name: 'Factor_id' || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit />
      </Container>
    </Page>
  );
}
