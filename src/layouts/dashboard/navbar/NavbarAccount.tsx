// next

// @mui
import { styled } from '@mui/material/styles';
import { Box, Skeleton, Typography } from '@mui/material';
import Link from '@components/Link';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { boolean } from '@/_mock/boolean.tsx';
import { translateRole } from '@utils/translateRole.ts';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type propTypes = {
  isCollapse: boolean;
};

export default function NavbarAccount({ isCollapse }: propTypes) {
  const { user } = useAuth();

  if (!user) return <Skeleton height={100} />;

  return (
    <Link href={PATH_DASHBOARD.user.account} underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {user?.full_name || user?.id}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {translateRole[user.role]}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
