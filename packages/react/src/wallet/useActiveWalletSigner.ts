import { useCallback, useEffect, useState } from 'react';

import { ReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { RequiredSigner } from './adapters/ConcreteWallet';
import { useActiveWallet } from './useActiveWallet';

export function useActiveWalletSigner(): ReadResult<RequiredSigner | null, void> {
  const [{ signer, signerLoading }, setSigner] = useState<{
    signer: RequiredSigner | null;
    signerLoading: boolean;
  }>({
    signer: null,
    signerLoading: false,
  });
  const { bindings } = useSharedDependencies();
  const { data: wallet, loading: walletLoading } = useActiveWallet();

  const retrieveSigner = useCallback(async () => {
    setSigner({
      signer: null,
      signerLoading: true,
    });

    try {
      setSigner({
        signer: await bindings.getSigner({}),
        signerLoading: false,
      });
    } catch {
      setSigner({
        signer: null,
        signerLoading: true,
      });
    }
  }, [bindings]);

  useEffect(() => {
    if (wallet) {
      void retrieveSigner();
    }
  }, [wallet, retrieveSigner]);

  if (walletLoading || signerLoading) {
    return {
      data: undefined,
      loading: true,
    };
  }

  return {
    data: signer,
    loading: false,
  };
}
