import jwtDecode from 'jwt-decode';
import { axiosInstance } from '@utils/axios.ts';
import { TokenInfoType } from '@/types/models';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<any>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  if (new Date(timeLeft) > new Date()) {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
    window.location.reload();
  }
};

const setSession = (accessToken?: string) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode<TokenInfoType>(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
