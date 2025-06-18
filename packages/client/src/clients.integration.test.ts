import type { Account } from '@lens-protocol/graphql';
import {
  AuthenticateMutation,
  CurrentSessionQuery,
  graphql,
  HealthQuery,
  RefreshMutation,
  Role,
  UsernameFragment,
} from '@lens-protocol/graphql';
import {
  assertErr,
  assertOk,
  expectTypename,
  nonNullable,
  url,
} from '@lens-protocol/types';
import * as msw from 'msw';
import { setupServer } from 'msw/node';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';

import { currentSession, fetchAccount, fetchPost } from './actions';
import { PublicClient } from './clients';
import {
  GraphQLErrorCode,
  UnauthenticatedError,
  UnexpectedError,
} from './errors';
import {
  createGraphQLErrorObject,
  createPublicClient,
  mockAccessToken,
  signer,
  TEST_ACCOUNT,
  TEST_APP,
  TEST_SIGNER,
  wallet,
} from './test-utils';
import { delay } from './utils';
import { signMessageWith } from './viem';

describe(`Given an instance of the '${PublicClient.name}'`, () => {
  const client = createPublicClient();

  describe('When authenticating via the low-level methods', () => {
    it('Then it should authenticate and stay authenticated', async () => {
      const challenge = await client.challenge({
        accountOwner: {
          account: TEST_ACCOUNT,
          owner: TEST_SIGNER,
          app: TEST_APP,
        },
      });
      assertOk(challenge);

      const authenticated = await client.authenticate({
        id: challenge.value.id,
        signature: await signer.signMessage({
          message: challenge.value.text,
        }),
      });

      assertOk(authenticated);

      const user = authenticated.value.getAuthenticatedUser();
      assertOk(user);
      expect(user.value).toMatchObject({
        role: Role.AccountOwner,
        address: TEST_ACCOUNT.toLowerCase(),
        signer: TEST_SIGNER.toLowerCase(),
      });
    });
  });

  describe(`When authenticating via the '${PublicClient.prototype.login.name}' convenience method`, () => {
    it('Then it should return an Err<never, SigningError> with any error thrown by the provided `SignMessage` function', async () => {
      const authenticated = await client.login({
        accountOwner: {
          account: TEST_ACCOUNT,
          owner: TEST_SIGNER,
          app: TEST_APP,
        },
        signMessage: async () => {
          throw new Error('Test Error');
        },
      });

      assertErr(authenticated);
    });
  });

  describe(`When invoking the internal '${PublicClient.prototype.impersonate.name}' method`, () => {
    it('Then it should return a SessionClient instance associated with the provided identity', async () => {
      const result = await client.impersonate({
        signer: TEST_SIGNER,
      });

      assertOk(result);

      const user = result.value.getAuthenticatedUser();
      assertOk(user);
      expect(user.value).toMatchObject({
        role: Role.UnverifiedEOA,
        address: TEST_SIGNER.toLowerCase(),
        signer: TEST_SIGNER.toLowerCase(),
      });
    });
  });

  describe('When resuming an authenticated session', () => {
    it('Then it should return a SessionClient instance associated with the credentials in the storage', async () => {
      const client = createPublicClient();

      await client.login({
        accountOwner: {
          account: TEST_ACCOUNT,
          owner: TEST_SIGNER,
          app: TEST_APP,
        },
        signMessage: signMessageWith(wallet),
      });

      const authenticated = await client.resumeSession();
      assertOk(authenticated);

      const authentication = await currentSession(authenticated.value);
      expect(authentication._unsafeUnwrap()).toMatchObject({
        signer: TEST_SIGNER,
        app: TEST_APP,
      });
    });

    it(`Then it should return an 'Err<never, ${UnauthenticatedError.name}>' if the session is not found in the storage`, async () => {
      const client = createPublicClient();

      const result = await client.resumeSession();

      assertErr(result);
      expect(result.error).toBeInstanceOf(UnauthenticatedError);
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
    describe(`When invoking the 'logout' method`, () => {
      it('Then it should revoke the current authenticated session and clear the credentials from the storage', async () => {
        const authenticated = await client.login({
          accountOwner: {
            account: TEST_ACCOUNT,
            owner: TEST_SIGNER,
            app: TEST_APP,
          },
          signMessage: signMessageWith(wallet),
        });
        assertOk(authenticated);

        const result = await authenticated.value.logout();
        assertOk(result);
        assertErr(await currentSession(authenticated.value));
        assertErr(authenticated.value.getAuthenticatedUser());
      });
    });

    describe('When the Access Token is about to expire (within 30 seconds)', () => {
      const accessToken = mockAccessToken({
        exp: Date.now() / 1000 + 10,
      });
      const server = setupServer(
        msw.graphql.mutation(
          AuthenticateMutation,
          async ({ request }) => {
            const response = await fetch(request);
            // biome-ignore lint/suspicious/noExplicitAny: keep it simple
            const result = (await response.json()) as any;
            result.data.value.accessToken = accessToken;
            return msw.HttpResponse.json(result);
          },
          {
            once: true,
          },
        ),
        // Pass through all other operations
        msw.graphql.operation(() => msw.passthrough()),
      );

      beforeAll(() => {
        server.listen();
      });

      afterAll(() => {
        server.close();
      });

      it('Then it should preemptively refresh the token', async () => {
        const authenticated = await client.login({
          accountOwner: {
            account: TEST_ACCOUNT,
            owner: TEST_SIGNER,
            app: TEST_APP,
          },
          signMessage: signMessageWith(wallet),
        });
        assertOk(authenticated);

        const result = await fetchAccount(authenticated.value, {
          address: TEST_ACCOUNT,
        });
        assertOk(result);
        expect(result.value?.operations).not.toBe(null);
      });
    });

    describe('When a request fails with UNAUTHENTICATED extension code', () => {
      const server = setupServer(
        msw.graphql.query(
          CurrentSessionQuery,
          (_) =>
            msw.HttpResponse.json({
              errors: [
                createGraphQLErrorObject(GraphQLErrorCode.UNAUTHENTICATED),
              ],
            }),
          {
            once: true,
          },
        ),
        // Pass through all other operations
        msw.graphql.operation(() => msw.passthrough()),
      );

      beforeAll(() => {
        server.listen();
      });

      afterAll(() => {
        server.close();
      });

      it('Then it should silently refresh credentials and retry the request', async () => {
        const authenticated = await client.login({
          accountOwner: {
            account: TEST_ACCOUNT,
            owner: TEST_SIGNER,
            app: TEST_APP,
          },
          signMessage: signMessageWith(wallet),
        });
        assertOk(authenticated);

        // wait 1 second to make sure the new tokens have 'expiry at' different from the previous ones
        await delay(1000);

        const result = await currentSession(authenticated.value);

        assertOk(result);
      });
    });

    describe('When a token refresh fails', () => {
      const server = setupServer(
        msw.graphql.query(CurrentSessionQuery, (_) =>
          msw.HttpResponse.json({
            errors: [
              createGraphQLErrorObject(GraphQLErrorCode.UNAUTHENTICATED),
            ],
          }),
        ),
        msw.graphql.mutation(RefreshMutation, (_) =>
          msw.HttpResponse.json({
            errors: [createGraphQLErrorObject(GraphQLErrorCode.BAD_USER_INPUT)],
          }),
        ),
        // Pass through all other operations
        msw.graphql.operation(() => msw.passthrough()),
      );

      beforeAll(() => {
        server.listen();
      });

      afterAll(() => {
        server.close();
      });

      it(`Then it should return a '${UnauthenticatedError.name}' to the original request caller`, async () => {
        const authenticated = await client.login({
          accountOwner: {
            account: TEST_ACCOUNT,
            owner: TEST_SIGNER,
            app: TEST_APP,
          },
          signMessage: signMessageWith(wallet),
        });
        assertOk(authenticated);

        const result = await currentSession(authenticated.value);
        assertErr(result);
        expect(result.error).toBeInstanceOf(UnauthenticatedError);
      });
    });
  });

  describe('When some fragments are provided', () => {
    it('Then it should replace them in any relevant query', async () => {
      const BaseAccountFragment = graphql(
        `fragment BaseAccount on Account {
          test: address
        }`,
      );
      const AccountFragment = graphql(
        `fragment Account on Account {
          ...BaseAccount 
          username {
            ...Username
          }
        }`,
        [BaseAccountFragment, UsernameFragment],
      );

      const client = createPublicClient({
        fragments: [AccountFragment],
      });

      const result = await fetchAccount(client, { address: TEST_ACCOUNT });

      assertOk(result);

      expect(result.value).toMatchObject({
        test: TEST_ACCOUNT,
        username: {
          value: expect.any(String),
        },
      });
    });
  });

  describe('When batching multiple queries', () => {
    it('Then it should return the results of all queries in the same order', async () => {
      const client = createPublicClient();

      const result = await client.batch((c) => [
        fetchAccount(c, { address: TEST_ACCOUNT }).map(nonNullable),
        fetchPost(c, { post: '4evp0jgqap2awsxpvt' })
          .map(nonNullable)
          .map(expectTypename('Post')),
      ]);

      assertOk(result);

      expect(result.value[0]).toMatchObject({
        __typename: 'Account',
        address: TEST_ACCOUNT,
      });
      expect(result.value[1]).toMatchObject({
        __typename: 'Post',
        slug: '4evp0jgqap2awsxpvt',
      });
    });

    it('Then it should be possible to batch dynamic queries up to the 10 maximum', async () => {
      const client = createPublicClient();

      const result = await client.batch((c) =>
        [TEST_ACCOUNT, TEST_ACCOUNT].map((address) =>
          fetchAccount(c, { address }).map(nonNullable),
        ),
      );

      assertOk(result);
      expectTypeOf(result.value).toEqualTypeOf<Account[]>();
    });

    it('Then it should warn if the batch size exceeds the maximum', () => {
      const client = createPublicClient();

      expect(() =>
        client.batch((c) =>
          Array.from({ length: 11 }, () =>
            fetchAccount(c, { address: TEST_ACCOUNT }).map(nonNullable),
          ),
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        '[InvariantError: Batch queries supports a maximum of 10 queries]',
      );
    });
  });
});
