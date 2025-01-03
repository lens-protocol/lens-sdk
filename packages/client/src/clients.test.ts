import { url, assertErr, assertOk, evmAddress, signatureFrom } from '@lens-protocol/types';
import { HttpResponse, graphql, passthrough } from 'msw';
import { setupServer } from 'msw/node';

import { privateKeyToAccount } from 'viem/accounts';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { CurrentSessionQuery, HealthQuery, RefreshMutation, Role } from '@lens-protocol/graphql';
import { createGraphQLErrorObject, createPublicClient } from '../testing-utils';
import { currentSession } from './actions';
import { PublicClient } from './clients';
import { GraphQLErrorCode, UnauthenticatedError, UnexpectedError } from './errors';
import { delay } from './utils';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const owner = evmAddress(signer.address);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);
const app = evmAddress(import.meta.env.TEST_APP);

describe(`Given an instance of the ${PublicClient.name}`, () => {
  const client = createPublicClient();

  describe('When authenticating via the low-level methods', () => {
    it('Then it should authenticate and stay authenticated', async () => {
      const challenge = await client.challenge({
        accountOwner: {
          account,
          owner,
          app,
        },
      });
      assertOk(challenge);

      const authenticated = await client.authenticate({
        id: challenge.value.id,
        signature: signatureFrom(await signer.signMessage({ message: challenge.value.text })),
      });

      assertOk(authenticated);

      const user = await authenticated.value.getAuthenticatedUser();
      assertOk(user);
      expect(user.value).toMatchObject({
        role: Role.AccountOwner,
        account: account.toLowerCase(),
        owner: owner.toLowerCase(),
      });
    });
  });

  describe('When authenticating via the `login` convenience method', () => {
    it('Then it should return an Err<never, SigningError> with any error thrown by the provided `SignMessage` function', async () => {
      const authenticated = await client.login({
        accountOwner: {
          account,
          owner,
          app,
        },
        signMessage: async (message: string) => {
          throw new Error('Test Error');
        },
      });

      assertErr(authenticated);
    });
  });

  describe('When resuming an authenticated session', () => {
    it('Then it should return a SessionClient instance associated with the credentials in the storage', async () => {
      await client.login({
        accountOwner: {
          account,
          owner,
          app,
        },
        signMessage: (message) => signer.signMessage({ message }),
      });

      const authenticated = await client.resumeSession();
      assertOk(authenticated);

      const authentication = await currentSession(authenticated.value);
      expect(authentication._unsafeUnwrap()).toMatchObject({
        signer: owner,
        app,
      });
    });
  });

  describe('When receiving a Network error', () => {
    const client = PublicClient.create({
      environment: {
        backend: url('http://127.0.0.1'),
        name: 'broken',
        indexingTimeout: 1000,
        pollingInterval: 1000,
      },
      origin: 'http://example.com',
    });

    it(`Then it should return an ${UnexpectedError.name}`, async () => {
      const result = await client.query(HealthQuery, {});
      assertErr(result);
      expect(result.error).toBeInstanceOf(UnexpectedError);
    });
  });

  describe('And a SessionClient created from it', () => {
    describe('When a request fails with UNAUTHENTICATED extension code', () => {
      const server = setupServer(
        graphql.query(
          CurrentSessionQuery,
          (_req: unknown) =>
            HttpResponse.json({
              errors: [createGraphQLErrorObject(GraphQLErrorCode.UNAUTHENTICATED)],
            }),
          {
            once: true,
          },
        ),
        // Pass through all other operations
        graphql.operation(() => passthrough()),
      );

      beforeAll(() => {
        server.listen();
      });

      afterAll(() => {
        server.close();
      });

      it(
        'Then it should silently refresh credentials and retry the request',
        { timeout: 5000 },
        async () => {
          const authenticated = await client.login({
            accountOwner: {
              account,
              owner,
              app,
            },
            signMessage: (message) => signer.signMessage({ message }),
          });
          assertOk(authenticated);

          // wait 1 second to make sure the new tokens have 'expiry at' different from the previous ones
          await delay(1000);

          const result = await currentSession(authenticated.value);

          assertOk(result);
        },
      );
    });

    describe('When a token refresh fails', () => {
      const server = setupServer(
        graphql.query(CurrentSessionQuery, (_req: unknown) =>
          HttpResponse.json({
            errors: [createGraphQLErrorObject(GraphQLErrorCode.UNAUTHENTICATED)],
          }),
        ),
        graphql.mutation(RefreshMutation, (_) =>
          HttpResponse.json({
            errors: [createGraphQLErrorObject(GraphQLErrorCode.BAD_USER_INPUT)],
          }),
        ),
        // Pass through all other operations
        graphql.operation(() => passthrough()),
      );

      beforeAll(() => {
        server.listen();
      });

      afterAll(() => {
        server.close();
      });
      it(
        `Then it should return a '${UnauthenticatedError.name}' to the original request caller`,
        { timeout: 5000 },
        async () => {
          const authenticated = await client.login({
            accountOwner: {
              account,
              owner,
              app,
            },
            signMessage: (message) => signer.signMessage({ message }),
          });
          assertOk(authenticated);

          const result = await currentSession(authenticated.value);
          assertErr(result);
          expect(result.error).toBeInstanceOf(UnauthenticatedError);
        },
      );
    });
  });
});
