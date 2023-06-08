import { IBindings } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { PublicClient, SwitchChainNotSupportedError } from 'wagmi';
import { getNetwork, getPublicClient, switchNetwork } from 'wagmi/actions';
import 'wagmi/window';

export function bindings(): IBindings {
  return {
    getProvider: async ({ chainId }) => {
      const publicClient = getPublicClient<PublicClient>({ chainId });

      return ethersProviderFromPublicClient(publicClient);
    },
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

      const publicClient = getPublicClient<PublicClient>({ chainId });

      invariant(window.ethereum, 'window.ethereum is not defined');

      return ethersProviderFromPublicClient(publicClient).getSigner();
    },
  };
}

export function ethersProviderFromPublicClient(publicClient: PublicClient): providers.Web3Provider {
  invariant(window.ethereum, 'window.ethereum is not defined');

  return new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider,
    publicClient.chain.id,
  );
}
