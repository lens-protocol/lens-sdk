import { assertOk, nonNullable, uri } from '@lens-protocol/types';

import { justPost } from '@lens-protocol/graphql';
import { textOnly } from '@lens-protocol/metadata';
import { describe, expect, it } from 'vitest';
import { loginAsAccountOwner, wallet } from '../test-utils';
import { handleOperationWith } from '../viem';
import { post } from './post';
import { fetchPost } from './posts';

const content = `data:application/json,${JSON.stringify(textOnly({ content: 'Hello world!' }))}`;

describe(`Given the '${post.name}' action`, () => {
  describe('When posting on Lens', { timeout: 20000 }, () => {
    it('Then it should should be possible to create a Post', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        post(sessionClient, {
          contentUri: content,
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)
          .andThen((txHash) => fetchPost(sessionClient, { txHash }))
          .map(nonNullable)
          .map(justPost),
      );

      assertOk(result);
      expect(result.value).toMatchObject({
        __typename: 'Post',
      });
    });

    it('Then it should be possible to create a Comment', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        post(sessionClient, {
          contentUri: content,
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)
          .andThen((txHash) => fetchPost(sessionClient, { txHash }))
          .map(nonNullable)
          .map(justPost)

          .andThen((parent) =>
            post(sessionClient, {
              contentUri: content,
              commentOn: {
                post: parent.id,
              },
            })
              .andThen(handleOperationWith(wallet))
              .andThen(sessionClient.waitForTransaction)
              .andThen((txHash) => fetchPost(sessionClient, { txHash }))
              .map(nonNullable),
          ),
      );

      assertOk(result);
      expect(result.value).toMatchObject({
        __typename: 'Post',
        commentOn: {
          __typename: 'Post',
        },
      });
    });
  });
});
