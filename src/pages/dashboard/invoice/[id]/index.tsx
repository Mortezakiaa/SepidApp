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
import Invoice from '@sections/@dashboard/invoice/details';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  return (
    <Page title="فاکتور ها">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="جزییات فاکتور"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            {
              name: 'فاکتور ها',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: 'Factor_ID' || '' },
          ]}
        />

        <Invoice invoice={{}} />
      </Container>
    </Page>
  );
}
