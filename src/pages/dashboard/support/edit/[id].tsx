// next
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Skeleton, Tab, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@hooks/useSettings.tsx';
// layouts
import Layout from '@/layouts';
// components
import Page from '@components/Page.tsx';
import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs.tsx';
// sections
import ProductEditSkeleton from '@pages/dashboard/support/edit/support-edit-skeleton.tsx';
import useFetchSingleSupport from '@/react-query/support/useFetchSingleSupport.ts';
import SupportNewEdit from '@sections/@dashboard/support/SupportNewEdit.tsx';

// ----------------------------------------------------------------------

SupportEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SupportEdit() {
  const { themeStretch } = useSettings();
  const { query } = useRouter();
  const { id } = query;
  const { data: support, isLoading } = useFetchSingleSupport(+id);

  return (
    <Page title="ویرایش سرویس">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش سرویس"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'سرویس', href: PATH_DASHBOARD.support.list },
            { name: id.toString() },
          ]}
        />

        <Box sx={{ mb: 5 }} />

        {isLoading ? <ProductEditSkeleton /> : <SupportNewEdit isEdit currentSupport={support} />}
      </Container>
    </Page>
  );
}
