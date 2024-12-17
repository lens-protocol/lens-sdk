import { chains } from '@lens-network/sdk/viem';
import { evmAddress } from '@lens-protocol/types';
import { http, type Account, type Transport, type WalletClient, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { PublicClient, testnet } from './src';

const pk = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);
const app = evmAddress(import.meta.env.TEST_APP);

export const signer = evmAddress(pk.address);

export function loginAsAccountOwner() {
  const client = PublicClient.create({
    environment: testnet,
    origin: 'http://example.com',
  });

  return client.login({
    accountOwner: {
      account,
      owner: signer,
      app,
    },
    signMessage: (message) => pk.signMessage({ message }),
  });
}

export function loginAsOnboardingUser() {
  const client = PublicClient.create({
    environment: testnet,
    origin: 'http://example.com',
  });

  return client.login({
    onboardingUser: {
      wallet: signer,
      app,
    },
    signMessage: (message) => pk.signMessage({ message }),
  });
}

export function signerWallet(): WalletClient<Transport, chains.LensNetworkChain, Account> {
  return createWalletClient({
    account: privateKeyToAccount(import.meta.env.PRIVATE_KEY),
    chain: chains.testnet,
    transport: http(),
  });
}

// biome-ignore lint/complexity/noStaticOnlyClass: simplicity
export class TestLock {
  private static locks = new Map<string, boolean>();

  static async acquire(identifier: string) {
    while (TestLock.locks.get(identifier)) {
      // Wait if lock is already held
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    TestLock.locks.set(identifier, true); // Acquire lock
  }

  static release(identifier: string) {
    TestLock.locks.delete(identifier); // Release lock
  }
}
