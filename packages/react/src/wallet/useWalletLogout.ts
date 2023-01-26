import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { useWalletLogoutController } from './adapters/useWalletLogoutController';

export function useWalletLogout() {
  const [isPending, setIsPending] = useState(false);
  const logoutWallet = useWalletLogoutController();

  return {
    logout: async () => {
      setIsPending(true);

      try {
        const result = await logoutWallet(LogoutReason.USER_INITIATED);

        invariant(
          result.isSuccess(),
          'Unknown error received while logging out. This is likely a `@lens-protocol/react` bug.',
        );
      } finally {
        setIsPending(false);
      }
    },
    isPending,
  };
}
