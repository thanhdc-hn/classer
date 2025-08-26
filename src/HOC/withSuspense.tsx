import { ReactElement, Suspense } from 'react';

const withSuspense = (Component: ReactElement, fallback = null) => (
  <Suspense fallback={fallback}>{Component}</Suspense>
);

export { withSuspense };
