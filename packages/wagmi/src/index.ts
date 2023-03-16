import { IBindings, RequiredSigner } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { fetchSigner, getProvider } from 'wagmi/actions';

export function bindings(): IBindings {
  return {
    getProvider: async ({ chainId }) => getProvider<providers.JsonRpcProvider>({ chainId }),
    getSigner: async ({ chainId }) => {
      const signer = await fetchSigner<RequiredSigner>({ chainId });

      invariant(signer, 'Cannot get signer, is the wallet connected?');

      return signer;
    },
  };
}
