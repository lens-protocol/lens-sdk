import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { IBindings } from '@lens-protocol/react-native';
import { IProvider } from '@walletconnect/modal-react-native';

export function bindings(providerPromise: Promise<IProvider>): IBindings {
  return {
    getProvider: async (): Promise<JsonRpcProvider> => {
      const provider = await providerPromise;

      if (!provider) {
        throw new Error('Provider not defined');
      }

      return new Web3Provider(provider);
    },
    getSigner: async (): Promise<JsonRpcSigner> => {
      const provider = await providerPromise;

      if (!provider) {
        throw new Error('Provider not defined');
      }

      const ethersProvider = new Web3Provider(provider);

      return ethersProvider.getSigner();
    },
  };
}
