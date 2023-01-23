import {
  ProfileFragment,
  useActiveProfile,
  useActiveWallet,
  WalletData,
} from '@lens-protocol/react';
import { ReactNode } from 'react';

type LoggedInConfig = {
  wallet: WalletData;
  profile: ProfileFragment;
};

export type WhenLoggedInWithProfileProps = {
  children: (config: LoggedInConfig) => ReactNode;
};

export function WhenLoggedInWithProfile({ children }: WhenLoggedInWithProfileProps) {
  const { data: wallet, loading: walletLoading } = useActiveWallet();
  const { data: profile, loading: profileLoading } = useActiveProfile();

  if (walletLoading || profileLoading) {
    return null;
  }

  if (wallet === null) {
    return null;
  }

  if (profile === null) {
    // TODO guide user to create profile
    return null;
  }

  return <>{children({ wallet, profile })}</>;
}

export type WhenLoggedOutProps = {
  children: ReactNode;
};

export function WhenLoggedOut({ children }: WhenLoggedOutProps) {
  const { data: wallet, loading } = useActiveWallet();

  if (loading || wallet !== null) {
    return null;
  }

  return <>{children}</>;
}
