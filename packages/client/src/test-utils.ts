/// <reference path="../../../vite-env.d.ts" />

import { chains } from '@lens-chain/sdk/viem';
import {
  immutable,
  StorageClient,
  walletOnly,
} from '@lens-chain/storage-client';
import { Role } from '@lens-protocol/graphql';
import { schema } from '@lens-protocol/graphql/test-utils';
import { type TextOnlyMetadata, textOnly } from '@lens-protocol/metadata';
import {
  type AccessToken,
  evmAddress,
  hexString,
  ResultAsync,
  type TxHash,
  type URI,
  uuid,
} from '@lens-protocol/types';
import type { TypedDocumentNode } from '@urql/core';
import { validate } from 'graphql';
import type { ValidationRule } from 'graphql/validation/ValidationContext';
import {
  createPublicClient as createViemPublicClient,
  createWalletClient,
  http,
  type WalletClient,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { expect } from 'vitest';

import {
  type AnyVariables,
  type ClientConfig,
  GraphQLErrorCode,
  local,
  PublicClient,
  staging,
  testnet,
  UnexpectedError,
} from '.';
import { type AccessTokenClaims, ROLE_CLAIM, SPONSORED_CLAIM } from './tokens';

export const CHAIN = chains.testnet;
export const TEST_ACCOUNT = evmAddress(import.meta.env.TEST_ACCOUNT);
export const TEST_APP = evmAddress(import.meta.env.TEST_APP);
export const TEST_ERC20 = evmAddress(import.meta.env.TEST_ERC20);
export const PRIVATE_KEY = hexString(import.meta.env.PRIVATE_KEY);
export const GLOBAL_SPONSORSHIP = evmAddress(
  import.meta.env.GLOBAL_SPONSORSHIP,
);
export const SPONSORSHIP_APPROVER_PRIVATE_KEY = hexString(
  import.meta.env.SPONSORSHIP_APPROVER_PRIVATE_KEY,
);

export const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);

export const environment =
  import.meta.env.ENVIRONMENT === 'local'
    ? local
    : import.meta.env.ENVIRONMENT === 'staging'
      ? staging
      : testnet;

export const wallet: WalletClient = createWalletClient({
  account: signer,
  chain: CHAIN,
  transport: http(),
});
export const TEST_SIGNER = evmAddress(signer.address);

export function createPublicClient(config: Partial<ClientConfig> = {}) {
  return PublicClient.create({
    environment,
    origin: 'http://example.com',
    ...config,
  });
}

export function loginAsAccountOwner(client = createPublicClient()) {
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
  [GraphQLErrorCode.FORBIDDEN]:
    "Forbidden - You are not authorized to access '<operation>'",
  [GraphQLErrorCode.INTERNAL_SERVER_ERROR]:
    'Internal server error - Please try again later',
  [GraphQLErrorCode.BAD_USER_INPUT]:
    'Bad user input - Please check the input and try again',
  [GraphQLErrorCode.BAD_REQUEST]:
    'Bad request - Please check the request and try again',
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

function createFakeJwt(payload: object): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.dummy_signature`;
}

export function mockAccessToken(
  claims: Partial<AccessTokenClaims>,
): AccessToken {
  const defaultClaims: AccessTokenClaims = {
    sub: evmAddress('0x391de77dB4c78a6f9358cf502A846357E0211942'),
    iss: 'https://api.lens.dev',
    aud: 'https://api.lens.dev',
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
    iat: Math.floor(Date.now() / 1000),
    sid: uuid('00000000-0000-0000-0000-000000000000'),
    client_id: evmAddress('0xe163eEd7dBcDd3266677E7A8c53dCC05712253aA'),
    [SPONSORED_CLAIM]: false,
    [ROLE_CLAIM]: Role.Builder,
    ...claims,
  };

  return createFakeJwt(defaultClaims) as AccessToken;
}

export function waitForTransactionReceipt(
  hash: TxHash,
): ResultAsync<void, UnexpectedError> {
  const publicClient = createViemPublicClient({
    chain: CHAIN,
    transport: http(),
  });

  return ResultAsync.fromPromise(
    publicClient.waitForTransactionReceipt({ hash }),
    (err) => UnexpectedError.from(err),
  ).map(() => undefined);
}

export function assertTypedDocumentSatisfies<
  TResult,
  TVariables extends AnyVariables,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  rules: ReadonlyArray<ValidationRule>,
) {
  expect(validate(schema, document, rules)).toEqual([]);
}
