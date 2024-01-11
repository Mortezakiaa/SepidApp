// next

// @mui
import { Typography, Box } from '@mui/material';
import Link from '@components/Link';

// ----------------------------------------------------------------------

type MenuHotProductsPropTypes = {
  tags: any[];
};

export default function MenuHotProducts({ tags, ...other }: MenuHotProductsPropTypes) {
  return (
    <Box {...other}>
      <Typography variant="caption" fontWeight="fontWeightBold">
        Hot Products:
      </Typography>
      &nbsp;
      {tags.map((tag, index) => (
        <Link
          key={tag.name}
          href={tag.path}
          underline="none"
          variant="caption"
          sx={{
            color: 'text.secondary',
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': { color: 'primary.main' },
          }}
        >
          {index === 0 ? tag.name : `, ${tag.name} `}
        </Link>
      ))}
    </Box>
  );
}
