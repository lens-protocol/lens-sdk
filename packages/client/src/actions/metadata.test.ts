import { type PostId, assertOk, invariant } from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  createPublicClient,
  loginAsAccountOwner,
  postOnlyTextMetadata,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import { refreshMetadata, waitForMetadata } from './metadata';
import { post } from './post';
import { fetchPost } from './posts';

describe('Given user creates a post', () => {
  const client = createPublicClient();
  let postId: PostId;

  beforeAll(async () => {
    // Create a post with metadata
    const resources = await postOnlyTextMetadata();
    const result = await loginAsAccountOwner().andThen((sessionClient) =>
      post(sessionClient, {
        contentUri: resources.uri,
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction)
        .andThen((tx) => fetchPost(sessionClient, { txHash: tx })),
    );
    assertOk(result);
    invariant(result.value, 'Expected post to be defined and created');
    console.log(`Post created with id: ${result.value.id}`);
    postId = result.value.id;
  });

  describe('When user modifies metadata in the used URL and call refreshMetadata', () => {
    it('Then post metadata content should be updated', async () => {
      // TODO: add possibility to change metadata in the same URL and refresh later
      // That feature will be available soon in the storage nodes
      const newMetadata = await loginAsAccountOwner().andThen((sessionClient) =>
        refreshMetadata(sessionClient, { post: postId }),
      );

      assertOk(newMetadata);
      invariant(newMetadata.value, 'Expected to be defined');
      console.log(`Metadata refreshed with id: ${newMetadata.value.id}`);

      const result = await waitForMetadata(client, newMetadata.value.id);
      assertOk(result);
      expect(result.value).toEqual(newMetadata.value.id);
    });
  });
});
