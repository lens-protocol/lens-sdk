import { evmAddress } from '@lens-protocol/types';
import { privateKeyToAccount } from 'viem/accounts';

import type { SessionClient } from '@lens-protocol/client';
import { createPublicClient } from '@lens-protocol/client/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { renderHookWithContext } from '../test-utils';
import { useSessionClient } from './useSessionClient';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const owner = evmAddress(signer.address);
const app = evmAddress(import.meta.env.TEST_APP);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);
const client = createPublicClient();

describe(`Given the '${useSessionClient.name}' hook`, () => {
  describe('And the user is not authenticated', () => {
    describe('When rendered in traditional non-suspense mode', () => {
      it('Then it should return `null`', async () => {
        const { result } = renderHookWithContext(() => useSessionClient(), {
          client,
        });

        await vi.waitUntil(() => result.current.loading === false);
        expect(result.current).toMatchObject({ loading: false, data: null, error: undefined });
      });
    });

    describe('When rendered in suspense mode', () => {
      it('Then it should suspend and render once the SessionClient is determined', async () => {
        const { result } = renderHookWithContext(() => useSessionClient({ suspense: true }), {
          client,
        });

        await vi.waitUntil(() => result.current !== null);
        expect(result.current).toHaveProperty('data', null);
      });
    });
  });

  describe('And the user is authenticated', () => {
    let sessionClient: SessionClient;

    beforeAll(async () => {
      const result = await client.login({
        accountOwner: {
          account,
          app,
          owner,
        },
        signMessage: (message) => signer.signMessage({ message }),
      });

      sessionClient = result._unsafeUnwrap();
    });

    it('Then it should return the SessionClient instance if available', async () => {
      const credentials = await sessionClient.getCredentials();

      const { result } = renderHookWithContext(() => useSessionClient(), {
        client,
      });

      await vi.waitUntil(() => result.current.loading === false);
      await expect(result.current.data?.getCredentials()).resolves.toEqual(credentials);
    });

    describe('When rendered in suspense mode', () => {
      it('Then it should suspend and render once the SessionClient is determined', async () => {
        expect.hasAssertions();

        const credentials = await sessionClient.getCredentials();

        const { result } = renderHookWithContext(() => useSessionClient({ suspense: true }), {
          client,
        });

        await vi.waitUntil(() => result.current !== null);
        await expect(result.current.data?.getCredentials()).resolves.toEqual(credentials);
      });
    });
  });
});
