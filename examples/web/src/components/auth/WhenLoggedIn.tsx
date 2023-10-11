import { ProfileSession, SessionType, useSession } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ErrorMessage } from '../error/ErrorMessage';

type RenderFunction = (session: ProfileSession) => ReactNode;

export type WhenLoggedInProps = {
  children: ReactNode | RenderFunction;
};

export function WhenLoggedIn({ children }: WhenLoggedInProps) {
  const { data: session, loading, error } = useSession();

  if (loading) {
    return null;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (session.type !== SessionType.WithProfile) {
    return null;
  }

  if (typeof children === 'function') {
    return <>{children(session)}</>;
  }
  return <>{children}</>;
}
