import { ProfileFieldsFragment, useActiveProfile } from '@lens-protocol/react';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

export function useIsLoggedIn() {
  const { address } = useAccount();
  const { data: profile } = useActiveProfile();

  return Boolean(address && profile);
}

type LoggedInConfig = {
  walletAddress: `0x${string}`;
  profile: ProfileFieldsFragment;
};

export type WhenLoggedInProps = {
  children: (config: LoggedInConfig) => ReactNode;
};

export function WhenLoggedIn({ children }: WhenLoggedInProps) {
  const { address: walletAddress } = useAccount();
  const { data: profile } = useActiveProfile();

  if (!walletAddress || !profile) {
    return null;
  }

  return <>{children({ walletAddress, profile })}</>;
}

export type WhenLoggedOutProps = {
  children: ReactNode;
};

export function WhenLoggedOut({ children }: WhenLoggedOutProps) {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
