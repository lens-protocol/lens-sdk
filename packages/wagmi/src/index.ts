import { assertRequiredSigner, IBindings } from '@lens-protocol/react';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { fetchSigner, getProvider } from 'wagmi/actions';

export function bindings(): IBindings {
  return {
    getProvider: async ({ chainId }) => getProvider<providers.JsonRpcProvider>({ chainId }),
    getSigner: async ({ chainId }) => {
      const signer = await fetchSigner({ chainId });

      invariant(signer, 'Cannot get signer, is the wallet connected?');

      assertRequiredSigner(signer);

      return signer;
    },
  };
}
