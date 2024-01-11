// @mui
import { Box, Card, CardHeader, Typography, Stack } from '@mui/material';
import Link from '@components/Link';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// _mock_
import { _ecommerceLatestProducts } from '../../../../_mock';
//
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

export default function EcommerceLatestProducts() {
  return (
    <Card>
      <CardHeader title="Latest Products" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_ecommerceLatestProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProductItemPropTypes = {
  product: {
    colors: string[];
    image: string;
    name: string;
    price: number;
    priceSale: number;
  };
};

function ProductItem({ product }: ProductItemPropTypes) {
  const { name, image, price, priceSale } = product;
  const hasSale = priceSale > 0;

  return (
    <Stack direction="row" spacing={2}>
      <Image alt={name} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>

        <Stack direction="row">
          {hasSale && (
            <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Typography>
          )}
          &nbsp;
          <Typography variant="body2" sx={{ color: priceSale ? 'error.main' : 'text.secondary' }}>
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Box>

      <ColorPreview limit={3} colors={product.colors} sx={{ minWidth: 72, pr: 3 }} />
    </Stack>
  );
}
