import { LazyMotion } from 'framer-motion';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
const loadFeatures = () => import('./features.tsx').then((res) => res.default);

type MotionLazyContainerPropTypes = {
  children: ReactNode;
};

export default function MotionLazyContainer({ children }: MotionLazyContainerPropTypes) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
