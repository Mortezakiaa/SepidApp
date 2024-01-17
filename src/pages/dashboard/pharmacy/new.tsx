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
// sections
import PharmacyEdit from '@/sections/@dashboard/pharmacy/PharmacyNewEditForm.tsx';

// ----------------------------------------------------------------------

CreatePharmacy.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CreatePharmacy() {
  const { themeStretch } = useSettings();

  return (
    <Page title="داروخانه : ساخت داروخانه جدید">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ساخت داروخانه جدید"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'داروخانه', href: PATH_DASHBOARD.pharmacy.list },
            { name: 'ساخت داروخانه جدید' },
          ]}
        />
        <PharmacyEdit />
      </Container>
    </Page>
  );
}
