import React, { useEffect } from 'react';

// utils
import { setSession } from '@utils/jwt.ts';
import useAuth from '@hooks/useAuth.tsx';

// ----------------------------------------------------------------------

type propsType = {
  children: React.ReactNode;
};

function AuthProvider({ children }: propsType) {
  const {
    user,
    loginStepTwo: { data },
  } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
          setSession(accessToken);
        }
      } catch (err) {
        console.error(err);
      }
    };
    initialize();
  }, [data]);

  return <>{children}</>;
}

export { AuthProvider };
