import { Suspense } from 'react';

import type { Metadata } from 'next';

import ErrorPage from './ErrorPage';

export const metadata: Metadata = {
  title: 'Error - Modsen Twitter',
  description:
    'An unexpected error occurred on Modsen Twitter. Please try again.',
  robots: 'noindex, nofollow',
  openGraph: {
    siteName: 'Modsen Twitter',
    type: 'website',
  },
};

const ErrorPageWrapper = () => {
  return (
    <Suspense>
      <ErrorPage />
    </Suspense>
  );
};
export default ErrorPageWrapper;
