import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { IBindings } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { PublicClient, WalletClient } from 'wagmi';
import { getPublicClient, getWalletClient } from 'wagmi/actions';

function providerFromPublicClient({
  publicClient,
}: {
  publicClient: PublicClient;
}): JsonRpcProvider {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  return new Web3Provider(transport, network);
}

async function signerFromWalletClient(walletClient: WalletClient): Promise<JsonRpcSigner> {
  const { account, transport } = walletClient;
  const provider = new Web3Provider(transport, 'any');
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
      const walletClient = await getWalletClient({ chainId });

      invariant(walletClient, 'Wallet client not found');

      return signerFromWalletClient(walletClient);
    },
  };
}
