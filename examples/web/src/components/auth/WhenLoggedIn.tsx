import { ProfileSession, SessionType, useSession } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

type LoggedInConfig = {
  session: ProfileSession;
};

type RenderFunction = (config: LoggedInConfig) => ReactNode;

export type WhenLoggedInProps = {
  children: ReactNode | RenderFunction;
};

export function WhenLoggedIn({ children }: WhenLoggedInProps) {
  const { data, loading } = useSession();

  if (loading) return null;

  if (!data) return null;

  switch (data.type) {
    case SessionType.Anonymous:
      return null;

    case SessionType.WithProfile:
      if (typeof children === 'function') {
        return <>{children({ session: data })}</>;
      }
      return <>{children}</>;

    default:
      return <p>Something went wrong.</p>;
  }
}
