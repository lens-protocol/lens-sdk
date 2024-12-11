import { evmAddress } from '@lens-protocol/types';
import { privateKeyToAccount } from 'viem/accounts';
import { FullAccountFragment, PublicClient, testnet } from './src';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const owner = evmAddress(signer.address);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);
const app = evmAddress(import.meta.env.TEST_APP);

export function loginAsAccountOwner() {
  const client = PublicClient.create({
    environment: testnet,
    origin: 'http://example.com',
    accountFragment: FullAccountFragment,
  });

  return client.login({
    accountOwner: {
      account,
      owner,
      app,
    },
    signMessage: (message) => signer.signMessage({ message }),
  });
}
