/// <reference path="../../../vite-env.d.ts" />

import { chains } from '@lens-chain/sdk/viem';
import { StorageClient, immutable, walletOnly } from '@lens-chain/storage-client';
import { type TextOnlyMetadata, textOnly } from '@lens-protocol/metadata';
import { type URI, evmAddress } from '@lens-protocol/types';
import type { Account, Transport, WalletClient } from 'viem';
import { http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { GraphQLErrorCode, PublicClient, local, staging, testnet } from '.';

export const CHAIN = chains.testnet;
export const TEST_ACCOUNT = evmAddress(import.meta.env.TEST_ACCOUNT);
export const TEST_APP = evmAddress(import.meta.env.TEST_APP);
export const TEST_ERC20 = evmAddress(import.meta.env.TEST_ERC20);

export const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);

export const environment =
  import.meta.env.ENVIRONMENT === 'local'
    ? local
    : import.meta.env.ENVIRONMENT === 'staging'
      ? staging
      : testnet;

export const wallet: WalletClient<Transport, chains.LensChain, Account> = createWalletClient({
  account: signer,
  chain: CHAIN,
  transport: http(),
});
export const TEST_SIGNER = evmAddress(wallet.account.address);

export function createPublicClient() {
  return PublicClient.create({
    environment,
    origin: 'http://example.com',
  });
}

export function loginAsAccountOwner() {
  const client = createPublicClient();
  return client.login({
    accountOwner: {
      account: TEST_ACCOUNT,
      owner: TEST_SIGNER,
      app: TEST_APP,
    },
    signMessage: (message) => signer.signMessage({ message }),
  });
}

export function loginAsOnboardingUser() {
  const client = createPublicClient();

  return client.login({
    onboardingUser: {
      wallet: TEST_SIGNER,
      app: TEST_APP,
    },
    signMessage: (message) => signer.signMessage({ message }),
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

function dummyTextOnlyMetadata(): TextOnlyMetadata {
  return textOnly({
    content: 'This is a post for testing purposes',
    locale: 'en-US',
  });
}

export function uploadImmutableTextOnlyPostMetadata() {
  const metadata = dummyTextOnlyMetadata();
  const acl = immutable(CHAIN.id);
  return storageClient.uploadAsJson(metadata, { acl });
}

const acl = walletOnly(TEST_SIGNER, CHAIN.id);

export function uploadTextOnlyPostMetadata() {
  const metadata = dummyTextOnlyMetadata();
  return storageClient.uploadAsJson(metadata, { acl });
}

export function updateTextOnlyMetadata(uri: URI, metadata: TextOnlyMetadata) {
  return storageClient.updateJson(uri, metadata, signer, { acl });
}
