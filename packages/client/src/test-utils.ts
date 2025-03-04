/// <reference path="../../../vite-env.d.ts" />

import { chains } from '@lens-chain/sdk/viem';
import { StorageClient, immutable } from '@lens-chain/storage-client';
import { evmAddress } from '@lens-protocol/types';
import type { Account, Transport, WalletClient } from 'viem';
import { http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { ContentWarning, type TextOnlyOptions, textOnly } from '@lens-protocol/metadata';
import { GraphQLErrorCode, PublicClient, testnet } from '.';

const pk = privateKeyToAccount(import.meta.env.PRIVATE_KEY);

export const chain = chains.testnet;
export const account = evmAddress(import.meta.env.TEST_ACCOUNT);
export const app = evmAddress(import.meta.env.TEST_APP);
export const wallet: WalletClient<Transport, chains.LensNetworkChain, Account> = createWalletClient(
  {
    account: pk,
    chain,
    transport: http(),
  },
);
export const signer = evmAddress(wallet.account.address);

export function createPublicClient() {
  return PublicClient.create({
    environment: testnet,
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

export function postOnlyTextMetadata(customMetadata?: TextOnlyOptions) {
  const metadata =
    customMetadata !== undefined
      ? customMetadata
      : {
          content: 'This is a post for testing purposes',
          tags: ['test', 'lens', 'sdk'],
          contentWarning: ContentWarning.SENSITIVE,
          locale: 'en-US',
        };

  return storageClient.uploadAsJson(textOnly(metadata), { acl: immutable(chain.id) });
}
export const storageClient = StorageClient.create();
