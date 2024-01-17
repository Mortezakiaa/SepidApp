import jwtDecode from 'jwt-decode';
import { axiosInstance } from '@utils/axios.ts';

// ----------------------------------------------------------------------

const handleTokenExpired = (exp: number) => {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  if (new Date(timeLeft) > new Date()) {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
    window.location.reload();
  }
};

const getToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const { exp } = jwtDecode<TokenInfoType>(accessToken);
    handleTokenExpired(exp);
    return accessToken;
  }
  return null;
};

const getTokenInfo = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('accessToken')) {
    const accessToken = localStorage.getItem('accessToken');
    const {
      exp,
      context: { id },
    } = jwtDecode<TokenInfoType>(accessToken);
    handleTokenExpired(exp);
    return { id };
  }
  return null;
};
const getUserInfo = (): User => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('userInfo')) {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  }
  return null;
};

const setSession = (accessToken?: string, user?: User) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    if (user) localStorage.setItem('userInfo', JSON.stringify(user));
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode<TokenInfoType>(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { setSession, getToken, getTokenInfo, getUserInfo };
