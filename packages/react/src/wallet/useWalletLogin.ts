import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { Signer } from 'ethers';
import { useState } from 'react';

import { useWalletLoginController } from './adapters/useWalletLoginController';

export function useWalletLogin() {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const loginWallet = useWalletLoginController();

  return {
    login: async (signer: Signer) => {
      setError(null);
      setIsPending(true);

      try {
        const address = await signer.getAddress();

        const result = await loginWallet({
          address,
        });

        if (result.isFailure()) {
          setError(result.error);
        }
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
