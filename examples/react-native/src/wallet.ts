// This is NOT PRODUCTION READY implementation of the EOA.
// It's a developer responsibility to provide a secure wallet implementation.
// The purpose of the `react-native` example is to just showcase on the `@lens-protocol/react` integration.

import {IBindings} from '@lens-protocol/react';
import {providers, Wallet} from 'ethers';

const provider = new providers.InfuraProvider('maticmum');

// This is the private key of the `@jsisthebest.test` profile
// It's a public private key so anyone can modify the profile
// For your own convenience change to the private key of a new wallet
const testWalletPrivateKey = '6c434da5e5c0e3a8e0db5cf835d23e04c7592037854f0700c26836be7581c68c';

export const wallet = new Wallet(testWalletPrivateKey, provider);

export function bindings(): IBindings {
  return {
    getProvider: async () => provider,
    getSigner: async () => wallet,
  };
}
