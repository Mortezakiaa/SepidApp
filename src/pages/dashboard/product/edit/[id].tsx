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
import ProductEditSkeleton from '@pages/dashboard/product/edit/product-edit-skeleton.tsx';
import useFetchSingleProduct from '@/react-query/product/useFetchSingleProduct.ts';
import ProductNewEdit from '@sections/@dashboard/product/ProductNewEdit.tsx';

// ----------------------------------------------------------------------

ProductEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductEdit() {
  const { themeStretch } = useSettings();
  const { query } = useRouter();
  const { id } = query;
  const { data: product, isLoading } = useFetchSingleProduct(+id);

  return (
    <Page title="ویرایش محصول">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش محصول"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'محصولات', href: PATH_DASHBOARD.product.list },
            { name: id.toString() },
          ]}
        />

        <Box sx={{ mb: 5 }} />

        {isLoading ? <ProductEditSkeleton /> : <ProductNewEdit isEdit currentProduct={product} />}
      </Container>
    </Page>
  );
}
