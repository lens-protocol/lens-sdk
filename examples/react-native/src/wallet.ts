import {assertRequiredSigner, IBindings} from '@lens-protocol/react';
import {providers, Wallet} from 'ethers';

const provider = new providers.InfuraProvider('maticmum');

export const wallet = new Wallet(
  '6c434da5e5c0e3a8e0db5cf835d23e04c7592037854f0700c26836be7581c68c',
  provider,
);

console.log(wallet.provider);

export function bindings(): IBindings {
  return {
    getProvider: async ({}) => {
      return provider;
    },
    getSigner: async ({}) => {
      assertRequiredSigner(wallet);

      return wallet;
    },
  };
}
