import { m } from 'framer-motion';

// @mui
import { Paper, Typography, CardActionArea } from '@mui/material';
import Link from '@components/Link';
// components
import Image from '@components/Image';
import { varHover, varTranHover } from '@components/animate';

// ----------------------------------------------------------------------

type propTypes = {
  item: {
    href: string;
    icon: string;
    name: string;
  };
};

export default function ComponentCard({ item }: propTypes) {
  const { name, icon, href } = item;

  return (
    <Link href={href} underline="none">
      <Paper variant="outlined" sx={{ p: 1 }}>
        <CardActionArea
          component={m.div}
          whileHover="hover"
          sx={{
            p: 3,
            borderRadius: 1,
            color: 'primary.main',
            bgcolor: 'background.default',
          }}
        >
          <m.div variants={varHover(1.2)} transition={varTranHover()}>
            <Image src={icon} alt={name} effect="black-and-white" />
          </m.div>
        </CardActionArea>

        <Typography variant="subtitle2" sx={{ mt: 1, p: 1 }}>
          {name}
        </Typography>
      </Paper>
    </Link>
  );
}
