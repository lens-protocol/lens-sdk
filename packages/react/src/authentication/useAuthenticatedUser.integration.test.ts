import type { AuthenticatedUser, SessionClient } from '@lens-protocol/client';
import {
  createPublicClient,
  TEST_ACCOUNT,
  TEST_APP,
  TEST_SIGNER,
  wallet,
} from '@lens-protocol/client/test-utils';
import { signMessageWith } from '@lens-protocol/client/viem';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { renderHookWithContext } from '../test-utils';
import { useAuthenticatedUser } from './useAuthenticatedUser';

const client = createPublicClient();

describe(`Given the '${useAuthenticatedUser.name}' hook`, () => {
  describe('And the user is not authenticated', () => {
    describe('When rendered in traditional non-suspense mode', () => {
      it('Then it should return `null`', async () => {
        const { result } = renderHookWithContext(() => useAuthenticatedUser(), {
          client,
        });

        await vi.waitUntil(() => result.current.loading === false);
        expect(result.current).toMatchObject({
          loading: false,
          data: null,
          error: undefined,
        });
      });
    });

    describe('When rendered in suspense mode', () => {
      it('Then it should suspend and render once the SessionClient is determined', async () => {
        const { result } = renderHookWithContext(
          () => useAuthenticatedUser({ suspense: true }),
          {
            client,
          },
        );

        await vi.waitUntil(() => result.current !== null);
        expect(result.current).toHaveProperty('data', null);
      });
    });
  });

  describe('And the user is authenticated', () => {
    let sessionClient: SessionClient;
    let user: AuthenticatedUser;

    beforeAll(async () => {
      const result = await client.login({
        accountOwner: {
          account: TEST_ACCOUNT,
          app: TEST_APP,
          owner: TEST_SIGNER,
        },
        signMessage: signMessageWith(wallet),
      });

      sessionClient = result._unsafeUnwrap();

      user = await sessionClient.getAuthenticatedUser().match(
        (v) => v,
        (e) => {
          throw e;
        },
      );
    });

    it('Then it should return the AuthenticatedUser if available', async () => {
      const { result } = renderHookWithContext(() => useAuthenticatedUser(), {
        client,
      });

      await vi.waitUntil(() => result.current.loading === false);
      expect(result.current.data).toEqual(user);
    });

    describe('When rendered in suspense mode', () => {
      it('Then it should suspend and render once the SessionClient is determined', async () => {
        expect.hasAssertions();

        const { result } = renderHookWithContext(
          () => useAuthenticatedUser({ suspense: true }),
          {
            client,
          },
        );

        await vi.waitUntil(() => result.current !== null);
        expect(result.current.data).toEqual(user);
      });
    });
  });
});
