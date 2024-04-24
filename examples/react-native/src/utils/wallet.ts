import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { IBindings } from '@lens-protocol/react-native';
import { WalletClient } from 'viem';

function clientToProvider(client: WalletClient): JsonRpcProvider {
  if (!client.chain) {
    throw new Error('Chain not defined');
  }

  const network = {
    chainId: client.chain.id,
    name: client.chain.name,
    ensAddress: client.chain.contracts?.ensRegistry?.address ?? '',
  };

  if (!client.chain) {
    return new JsonRpcProvider(client.transport.url as string);
  }

  return new JsonRpcProvider(client.transport.url as string, network);
}

function clientToSigner(client: WalletClient) {
  const provider = new Web3Provider(client.transport, 'any');

  return provider.getSigner(client.account?.address);
}

export function bindings(client: WalletClient): IBindings {
  return {
    getProvider: async () => clientToProvider(client),
    getSigner: async () => clientToSigner(client),
  };
}
