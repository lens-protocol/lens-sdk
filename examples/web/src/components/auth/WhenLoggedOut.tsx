import { SessionType, useSession } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

export type WhenLoggedOutProps = {
  children: ReactNode;
};

export function WhenLoggedOut({ children }: WhenLoggedOutProps) {
  const { data } = useSession();

  if (!data) return <>{children}</>;

  switch (data.type) {
    case SessionType.Anonymous:
      return <>{children}</>;

    case SessionType.WithProfile:
      return null;

    default:
      return null;
  }
}
