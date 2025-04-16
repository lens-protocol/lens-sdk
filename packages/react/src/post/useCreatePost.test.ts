import { createPublicClient, loginAsAccountOwner, wallet } from '@lens-protocol/client/test-utils';
import { handleOperationWith } from '@lens-protocol/client/viem';
import { textOnly } from '@lens-protocol/metadata';
import { assertOk } from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';

import { renderHookWithContext } from '../test-utils';
import { useCreatePost } from './useCreatePost';

describe(`Given the ${useCreatePost.name} hook`, () => {
  const client = createPublicClient();

  describe('When creating a Post', () => {
    beforeAll(async () => {
      const result = await loginAsAccountOwner(client);
      assertOk(result);
    });

    it('Then it should return the newly created Post', { timeout: 10000 }, async () => {
      const { result } = renderHookWithContext(() => useCreatePost(handleOperationWith(wallet)), {
        client,
      });

      const record = await result.current.execute({
        contentUri: `data:application/json,${JSON.stringify(textOnly({ content: 'Hello world!' }))}`,
      });

      assertOk(record);
      expect(record.value.metadata).toMatchObject({
        content: 'Hello world!',
      });
    });
  });
});
