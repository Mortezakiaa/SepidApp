// next
import { useRouter } from 'next/router';
// @mui
import { CircularProgress, Container } from '@mui/material';
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
import useFetchSingleFactor from '@/react-query/factors/useFetchSingleFactor.ts';

// ----------------------------------------------------------------------

InvoiceEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const { data: factor, isLoading } = useFetchSingleFactor(+id);

  return (
    <Page title="ویرایش فاکتورها">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش فاکتور"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'فاکتورها', href: PATH_DASHBOARD.invoice.list },
            { name: factor?.id?.toString() || '' },
          ]}
        />
        {isLoading ? <CircularProgress /> : <InvoiceNewEditForm isEdit currentFactor={factor} />}
      </Container>
    </Page>
  );
}
