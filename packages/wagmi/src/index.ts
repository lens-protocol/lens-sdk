import { FallbackProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { IBindings } from '@lens-protocol/react-web';
import { invariant } from '@lens-protocol/shared-kernel';
import { Account, Chain, Client, Transport } from 'viem';
import { Config as WagmiConfig } from 'wagmi';
import { getPublicClient, getWalletClient, switchChain } from 'wagmi/actions';

function clientToProvider({ chain, transport }: Client<Transport, Chain>): JsonRpcProvider {
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === 'fallback') {
    return new FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new JsonRpcProvider(value?.url as string, network),
      ),
    ) as unknown as JsonRpcProvider;
  }

  return new JsonRpcProvider(transport.url as string, network);
}

function clientToSigner({ account, transport }: Client<Transport, Chain, Account>) {
  const provider = new Web3Provider(transport, 'any');

  return provider.getSigner(account.address);
}

export function bindings(config: WagmiConfig): IBindings {
  return {
    getProvider: async ({ chainId }) => {
      const publicClient = getPublicClient(config);

      invariant(publicClient, 'Public client is not available');

      if (chainId !== (await publicClient.getChainId())) {
        await switchChain(config, { chainId });
      }

      return clientToProvider(publicClient);
    },
    getSigner: async (_) => {
      const walletClient = await getWalletClient(config);

      return clientToSigner(walletClient);
    },
  };
}
