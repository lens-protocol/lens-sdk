import type { EvmAddress } from '@lens-chain/storage-client';
import { group } from '@lens-protocol/metadata';
import { assertOk, nonNullable, uri } from '@lens-protocol/types';
import { beforeAll, describe, it } from 'vitest';
import {
  loginAsAccountOwner,
  loginAsBuilder,
  TEST_ACCOUNT,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import { createGroup, fetchGroup, joinGroup } from './group';

const metadata = group({
  name: 'web3natives',
});

describe('Given a logged-in user', () => {
  describe('When joining a Group with SimplePaymentRule in native token denomination', () => {
    let groupAddress: EvmAddress = '0x9904A9E96dfB83409Cd0D89DF15588eDBb99B322';

    beforeAll(async () => {
      const result = await loginAsBuilder().andThen((sessionClient) =>
        createGroup(sessionClient, {
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

          .andThen((txHash) => fetchGroup(sessionClient, { txHash }))
          .map(nonNullable),
      );

      assertOk(result);
      groupAddress = result.value.address;
    }, 15_000);

    it('Then the user can join the Group by fulfilling the payment rule with native tokens from the Lens Account', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        joinGroup(sessionClient, {
          group: groupAddress,
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction),
      );
      assertOk(result);
    });
  });
});
