import { Toaster } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

export default function ToastProvider() {
  const theme = useTheme();
  return (
    <Toaster
      position={'bottom-right'}
      toastOptions={{
        duration: 5000,
        style: { background: theme.palette.background.paper, color: theme.palette.text.primary },
      }}
    />
  );
}
