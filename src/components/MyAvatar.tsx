// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.profile}
      alt={user?.full_name || user?.id.toString()}
      color={user?.profile ? 'default' : createAvatar(user?.full_name || user?.id.toString()).color}
      {...other}
    >
      {createAvatar(user?.full_name).name}
    </Avatar>
  );
}
