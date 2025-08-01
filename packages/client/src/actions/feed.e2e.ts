import type { EvmAddress } from '@lens-chain/storage-client';
import { group, textOnly } from '@lens-protocol/metadata';
import { assertOk, nonNullable, uri } from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  loginAsAccountOwner,
  loginAsBuilder,
  TEST_ACCOUNT,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import { createFeed, fetchFeed } from './feed';
import { post } from './post';

const metadata = group({
  name: 'web3natives',
});
const content = `data:application/json,${JSON.stringify(textOnly({ content: 'Hello world!' }))}`;


describe('Given a logged-in user', () => {
  describe('When creating a Feed with SimplePaymentRule in native token denomination', () => {
    let feedAddress: EvmAddress;

    beforeAll(async () => {
      const result = await loginAsBuilder().andThen((sessionClient) =>
        createFeed(sessionClient, {
          metadataUri: uri(`data:application/json,${JSON.stringify(metadata)}`),
          rules: {
            required: [
              {
                simplePaymentRule: {
                  native: '0.01',
                  recipient: TEST_ACCOUNT,
                },
              },
            ],
          },
        })

          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)

          .andThen((txHash) => fetchFeed(sessionClient, { txHash }))
          .map(nonNullable),
      );

      assertOk(result);
      feedAddress = result.value.address;
    }, 15_000);

    it('Then the user can post to the feed by fulfilling the payment rule with native tokens from the Lens Account', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        post(sessionClient, {contentUri: content})
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction)
        .andThen(() =>
          fetchFeed(sessionClient, { feed: feedAddress }).map(nonNullable),
        ),
      );

      assertOk(result);
      expect(result.value.operations?.canPost).toEqual({
        __typename: "FeedOperationValidationPassed",
      });
    });
  });
});
