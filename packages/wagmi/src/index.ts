import { IBindings } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { PublicClient, SwitchChainNotSupportedError, WalletClient } from 'wagmi';
import { getNetwork, getPublicClient, getWalletClient, switchNetwork } from 'wagmi/actions';
import 'wagmi/window';

export function bindings(): IBindings {
  return {
    getProvider: async ({ chainId }) => {
      const publicClient = getPublicClient({ chainId });
      return providerFromPublicClient({ publicClient, chainId });
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

      const walletClient = await getWalletClient({ chainId });

      invariant(walletClient, 'Wallet client not found');

      return signerFromWalletClient({ walletClient, chainId });
    },
  };
}

export function providerFromPublicClient({
  publicClient,
  chainId,
}: {
  publicClient: PublicClient;
  chainId?: number;
}): providers.Web3Provider {
  return new providers.Web3Provider(publicClient.transport, chainId);
}

export async function signerFromWalletClient({
  walletClient,
  chainId,
}: {
  walletClient: WalletClient;
  chainId?: number;
}): Promise<providers.JsonRpcSigner> {
  return new providers.Web3Provider(walletClient.transport, chainId).getSigner();
}
