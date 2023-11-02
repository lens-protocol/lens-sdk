import { IBindings } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { polygon, polygonMumbai } from 'viem/chains';
import { PublicClient, SwitchChainNotSupportedError, WalletClient } from 'wagmi';
import { getNetwork, getPublicClient, getWalletClient, switchNetwork } from 'wagmi/actions';

function providerFromPublicClient({
  publicClient,
}: {
  publicClient: PublicClient;
}): providers.JsonRpcProvider {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  return new providers.Web3Provider(transport, network);
}

async function addChainAndSwitch({
  walletClient,
  chainId,
}: {
  walletClient: WalletClient;
  chainId: number;
}) {
  try {
    switch (chainId) {
      case polygonMumbai.id:
        await walletClient.addChain({ chain: polygonMumbai });
        break;
      case polygon.id:
        await walletClient.addChain({ chain: polygon });
        break;
      default:
        // other chains are not supported
        break;
    }
  } catch (err) {
    // cannot add chain
  }
}

async function switchChain({
  walletClient,
  chainId,
}: {
  walletClient: WalletClient;
  chainId: number;
}) {
  try {
    await switchNetwork({ chainId });
  } catch (err) {
    await addChainAndSwitch({ walletClient, chainId });
    // best effort to switch network, if it fails, we just ignore it
    if (!(err instanceof SwitchChainNotSupportedError)) {
      throw err;
    }
  }
}

async function signerFromWalletClient({
  walletClient,
  chainId,
}: {
  walletClient: WalletClient;
  chainId?: number;
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
          const walletClient = await getWalletClient();
          invariant(walletClient, 'Wallet client not found');
          await switchChain({ walletClient, chainId });
          return signerFromWalletClient({ walletClient, chainId });
        }
      }

      const walletClient = await getWalletClient({ chainId });

      invariant(walletClient, 'Wallet client not found');

      return signerFromWalletClient({ walletClient, chainId });
    },
  };
}
