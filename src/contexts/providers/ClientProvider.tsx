import { ReactNode, useEffect, useState } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isClient) {
    return <>{children}</>;
  } else {
    return null;
  }
}
