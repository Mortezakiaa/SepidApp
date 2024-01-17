// next
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
import PharmacyNewEditForm from '@sections/@dashboard/pharmacy/PharmacyNewEditForm.tsx';
import useFetchSinglePharmacy from '@/react-query/pharmacy/useFetchSinglePharmacy.ts';

// ----------------------------------------------------------------------

PharmacyEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PharmacyEdit() {
  const { themeStretch } = useSettings();
  const { query } = useRouter();
  const { id } = query;
  const { data: pharmacy, isLoading } = useFetchSinglePharmacy(+id);

  return (
    <Page title="ویرایش داروخانه">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش داروخانه"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'داروخانه', href: PATH_DASHBOARD.pharmacy.list },
            { name: id.toString() },
          ]}
        />
        {isLoading ? (
          <Skeleton width={'100%'} height={'100%'} />
        ) : (
          <PharmacyNewEditForm isEdit currentPharmacy={pharmacy} />
        )}
      </Container>
    </Page>
  );
}
