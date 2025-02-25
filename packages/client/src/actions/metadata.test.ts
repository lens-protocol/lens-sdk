import { assertOk, uuid } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';

import { createPublicClient } from '../test-utils';
import { refreshMetadataStatus } from './metadata';

describe('Given the metadata refresh status', () => {
  const client = createPublicClient();

  describe('When trying to get status from a valid id', () => {
    it('Then it returns finished status', async () => {
      const result = await refreshMetadataStatus(
        client,
        uuid('2afbbab3-cef7-477c-8d70-b238fe9b5643'),
      );
      assertOk(result);
      expect(result.value.status).toEqual('FINISHED');
    });
  });
});
