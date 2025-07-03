import { justPost, type Post } from '@lens-protocol/graphql';
import { textOnly } from '@lens-protocol/metadata';
import { assertOk, nonNullable } from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  createPublicClient,
  loginAsAccountOwner,
  updateTextOnlyMetadata,
  uploadTextOnlyPostMetadata,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import { refreshMetadata, waitForMetadata } from './metadata';
import { post } from './post';
import { fetchPost } from './posts';

describe('Given a Lens Post', () => {
  let item: Post;

  beforeAll(async () => {
    const resources = await uploadTextOnlyPostMetadata();

    const result = await loginAsAccountOwner().andThen((sessionClient) =>
      post(sessionClient, {
        contentUri: resources.uri,
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction)
        .andThen((tx) => fetchPost(sessionClient, { txHash: tx }))
        .map(nonNullable)
        .map(justPost),
    );
    assertOk(result);
    item = result.value;

    // Make sure the metadata is on IPFS before being able to edit/delete it
    await resources.waitForPropagation();
  }, 20_000);

  describe(`When the metadata at 'contentUri' is updated`, () => {
    const client = createPublicClient();
    const updates = textOnly({ content: 'This is the new content' });

    beforeAll(async () => {
      const response = await updateTextOnlyMetadata(item.contentUri, updates);
      await response.waitForPropagation();
    }, 20_000);

    it('Then it should be possible to force a refresh of the metadata', async () => {
      const refreshed = await refreshMetadata(client, {
        entity: { post: item.id },
      }).andThen(({ id }) => waitForMetadata(client, id));

      assertOk(refreshed);

      const fetched = await fetchPost(client, { post: item.id })
        .map(nonNullable)
        .map(justPost);
      assertOk(fetched);
      expect(fetched.value.metadata).toHaveProperty(
        'content',
        updates.lens.content,
      );
    });
  });
});
