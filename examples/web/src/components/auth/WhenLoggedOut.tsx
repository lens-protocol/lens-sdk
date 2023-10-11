import { useSession } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ErrorMessage } from '../error/ErrorMessage';

export type WhenLoggedOutProps = {
  children: ReactNode;
};

export function WhenLoggedOut({ children }: WhenLoggedOutProps) {
  const { data: session, error, loading } = useSession();

  if (loading) {
    return null;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (session.authenticated) {
    return null;
  }

  return <>{children}</>;
}
