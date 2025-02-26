/// <reference path="../../../vite-env.d.ts" />

import { StorageClient } from '@lens-chain/storage-client';
import { chains } from '@lens-network/sdk/viem';
import { evmAddress } from '@lens-protocol/types';
import { http, type Account, type Transport, type WalletClient, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { GraphQLErrorCode, PublicClient, staging } from '.';

const pk = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
export const account = evmAddress(import.meta.env.TEST_ACCOUNT);
export const app = evmAddress(import.meta.env.TEST_APP);
export const wallet: WalletClient<Transport, chains.LensNetworkChain, Account> = createWalletClient(
  {
    account: pk,
    chain: chains.testnet,
    transport: http(),
  },
);
export const signer = evmAddress(wallet.account.address);

export function createPublicClient() {
  return PublicClient.create({
    environment: staging,
    origin: 'http://example.com',
  });
}

export function loginAsAccountOwner() {
  const client = createPublicClient();

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
  const client = createPublicClient();

  return client.login({
    onboardingUser: {
      wallet: signer,
      app,
    },
    signMessage: (message) => pk.signMessage({ message }),
  });
}

const messages: Record<GraphQLErrorCode, string> = {
  [GraphQLErrorCode.UNAUTHENTICATED]:
    "Unauthenticated - Authentication is required to access '<operation>'",
  [GraphQLErrorCode.FORBIDDEN]: "Forbidden - You are not authorized to access '<operation>'",
  [GraphQLErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error - Please try again later',
  [GraphQLErrorCode.BAD_USER_INPUT]: 'Bad user input - Please check the input and try again',
  [GraphQLErrorCode.BAD_REQUEST]: 'Bad request - Please check the request and try again',
};

export function createGraphQLErrorObject(code: GraphQLErrorCode) {
  return {
    message: messages[code],
    locations: [],
    path: [],
    extensions: {
      code: code,
    },
  };
}

export const storageClient = StorageClient.create();
