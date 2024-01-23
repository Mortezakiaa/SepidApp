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
// sections

// ----------------------------------------------------------------------

CreateProduct.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CreateProduct() {
  const { themeStretch } = useSettings();

  return (
    <Page title="محصول : ساخت محصول جدید">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ساخت محصول جدید"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'محصولات', href: PATH_DASHBOARD.product.list },
            { name: 'ساخت محصول جدید' },
          ]}
        />
        <ProductNewEdit />
      </Container>
    </Page>
  );
}
