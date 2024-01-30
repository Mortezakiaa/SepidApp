import { Box, Button, Link, Typography } from '@mui/material';
import { useCopyToClipboard } from 'usehooks-ts';
import toast from 'react-hot-toast';

type propsType = {
  currentFactor: Factor;
};
export const InvoiceLink = ({ currentFactor }) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  if (!currentFactor) {
    return null;
  }
  const link = `${process.env.NEXT_PUBLIC_URL}/factor/pay/${currentFactor.id}`;
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Typography>لینک پرداخت:</Typography>
      <Link target={'_blank'} href={link}>
        {link}
      </Link>
      <Button
        onClick={() => {
          copyToClipboard(link)
            .then(() => toast.success('کپی شد!'))
            .catch(() => toast.error('خطایی در کپی کردن به وجود آمد.'));
        }}
        variant={'outlined'}
      >
        کپی
      </Button>
    </Box>
  );
};
