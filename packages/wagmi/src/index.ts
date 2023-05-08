import { IBindings, RequiredSigner } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { SwitchChainNotSupportedError } from 'wagmi';
import { fetchSigner, getNetwork, getProvider, switchNetwork } from 'wagmi/actions';

export function bindings(): IBindings {
  return {
    getProvider: async ({ chainId }) => getProvider<providers.JsonRpcProvider>({ chainId }),
    getSigner: async ({ chainId }) => {
      if (chainId) {
        const { chain } = getNetwork();

        if (chain?.id !== chainId) {
          try {
            await switchNetwork({ chainId });
          } catch (err) {
            // best effort to switch network, if it fails, we just ignore it
            if (!(err instanceof SwitchChainNotSupportedError)) {
              throw err;
            }
          }
        }
      }

      const signer = await fetchSigner<RequiredSigner>({ chainId });

      invariant(signer, 'Cannot get signer, is the wallet connected?');

      return signer;
    },
  };
}
