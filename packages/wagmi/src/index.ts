import { IBindings } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { type HttpTransport } from 'viem';
import { PublicClient, SwitchChainNotSupportedError, WalletClient } from 'wagmi';
import { getNetwork, getPublicClient, getWalletClient, switchNetwork } from 'wagmi/actions';

function providerFromPublicClient({
  publicClient,
}: {
  publicClient: PublicClient;
}): providers.JsonRpcProvider | providers.FallbackProvider {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback')
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network),
      ),
    );
  return new providers.Web3Provider(transport, network);
}

async function signerFromWalletClient({
  walletClient,
  chainId,
}: {
  walletClient: WalletClient;
  chainId: number;
}): Promise<providers.JsonRpcSigner> {
  const { account, chain, transport } = walletClient;
  const network = chain
    ? {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      }
    : chainId;
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function bindings(): IBindings {
  return {
    getProvider: async ({ chainId }) => {
      const publicClient = getPublicClient({ chainId });
      return providerFromPublicClient({ publicClient });
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
