import { local } from '@lens-social/env';
import { evmAddress } from '@lens-social/types';
import { privateKeyToAccount } from 'viem/accounts';

import { Client, type SessionClient } from '@lens-social/client';
import { describe, expect, it, vi } from 'vitest';
import { renderHookWithContext } from '../__helpers__/testing-utils';
import { useSessionClient } from './useSessionClient';

const signer = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
const account = evmAddress(signer.address);
const app = evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3');

describe(`Given the '${useSessionClient.name}' hook`, () => {
  const client = Client.create({
    environment: local,
    origin: 'http://example.com',
  });

  describe('when rendered in traditional non-suspense mode', () => {
    it('should return `null` if the session is not available', async () => {
      const { result } = renderHookWithContext(() => useSessionClient(), {
        mocks: { client },
      });

      await vi.waitUntil(() => result.current.loading === false);
      expect(result.current).toMatchObject({ loading: false, data: null, error: undefined });
    });

    it('should return the SessionClient instance if available', async () => {
      const sessionClient = await client.login({
        request: {
          account,
          signedBy: account,
          app,
        },
        signMessage: (message) => signer.signMessage({ message }),
      });
      const credentials = await sessionClient._unsafeUnwrap().getCredentials();

      const { result } = renderHookWithContext(() => useSessionClient(), {
        mocks: { client },
      });

      await vi.waitUntil(() => result.current.loading === false);
      expect(result.current).toMatchObject({
        data: expect.any(Object),
        loading: false,
        error: undefined,
      });
      expect(result.current.data?.getCredentials()).resolves.toEqual(credentials);
    });
  });

  describe('when rendered in suspense mode', () => {
    it.skip('should suspend and render once the session data is determined', async () => {});
  });
});
