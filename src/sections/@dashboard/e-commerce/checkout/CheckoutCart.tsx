import sum from 'lodash/sum';
// next

// @mui
import { Grid, Card, Button, CardHeader, Typography, Link } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  // const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    // dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    // dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    // dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    // dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    // dispatch(applyDiscount(value));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Card
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={[]}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <Link href={PATH_DASHBOARD.eCommerce.root}>
          <Button color="inherit" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
            Continue Shopping
          </Button>
        </Link>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary enableDiscount total={0} discount={0} subtotal={0} onApplyDiscount={handleApplyDiscount} />
        <Button fullWidth size="large" type="submit" variant="contained" disabled={true} onClick={handleNextStep}>
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
