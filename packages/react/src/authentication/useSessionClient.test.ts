import {
  createPublicClient,
  loginAsAccountOwner,
} from '@lens-protocol/client/test-utils';
import { fail, passthrough } from '@lens-protocol/types';
import { describe, expect, it, vi } from 'vitest';

import { renderHookWithContext } from '../test-utils';
import { useSessionClient } from './useSessionClient';

describe(`Given the '${useSessionClient.name}' hook`, () => {
  describe('And the user is not authenticated', () => {
    const client = createPublicClient();

    describe('When rendered in traditional non-suspense mode', () => {
      it('Then it should return `null`', async () => {
        const { result } = renderHookWithContext(() => useSessionClient(), {
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
          () => useSessionClient({ suspense: true }),
          {
            client,
          },
        );

        await vi.waitUntil(() => result.current !== null);
        expect(result.current).toHaveProperty('data', null);
      });
    });
  });

  describe('And the user is authenticated', async () => {
    const client = createPublicClient();
    const sessionClient = await loginAsAccountOwner(client).match(
      passthrough,
      fail,
    );

    describe('When rendered in traditional non-suspense mode', () => {
      it('Then it should return the SessionClient instance if available', async () => {
        const credentials = await sessionClient.getCredentials();

        const { result } = renderHookWithContext(() => useSessionClient(), {
          client: sessionClient.parent,
        });

        await vi.waitUntil(() => result.current.loading === false);
        expect(result.current.data?.getCredentials()).toEqual(credentials);
      });
    });

    describe('When rendered in suspense mode', () => {
      it('Then it should suspend and render once the SessionClient is determined', async () => {
        expect.hasAssertions();

        const credentials = await sessionClient.getCredentials();

        const { result } = renderHookWithContext(
          () => useSessionClient({ suspense: true }),
          {
            client,
          },
        );

        await vi.waitUntil(() => result.current !== null);
        expect(result.current.data?.getCredentials()).toEqual(credentials);
      });
    });
  });
});
