import { OpenActionModuleInput } from '@lens-protocol/api-bindings';
import { OpenActionConfig, OpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { Data } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { resolveOpenActionModuleInput } from '../resolveOpenActionModuleInput';

const address1 = mockEvmAddress();
const address2 = mockEvmAddress();
const endsAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
const amount = mockDaiAmount(1);

describe(`Given the ${resolveOpenActionModuleInput.name} function`, () => {
  describe.each<{
    config: OpenActionConfig;
    expected: OpenActionModuleInput;
  }>([
    {
      config: {
        type: OpenActionType.SIMPLE_COLLECT,
        amount: amount,
        referralFee: 10,
        recipient: address1,
        collectLimit: 10,
        followerOnly: true,
        endsAt,
      },
      expected: {
        collectOpenAction: {
          simpleCollectOpenAction: {
            amount: {
              currency: amount.asset.address,
              value: amount.toSignificantDigits(),
            },
            referralFee: 10,
            recipient: address1,
            collectLimit: '10',
            endsAt: endsAt.toISOString(),
            followerOnly: true,
          },
        },
      },
    },
    {
      config: {
        type: OpenActionType.MULTIRECIPIENT_COLLECT,
        amount: amount,
        referralFee: 10,
        recipients: [
          {
            recipient: address1,
            split: 0.3,
          },
          {
            recipient: address2,
            split: 0.7,
          },
        ],
        collectLimit: 10,
        followerOnly: true,
        endsAt,
      },
      expected: {
        collectOpenAction: {
          multirecipientCollectOpenAction: {
            amount: {
              currency: amount.asset.address,
              value: amount.toSignificantDigits(),
            },
            referralFee: 10,
            recipients: [
              {
                recipient: address1,
                split: 0.3,
              },
              {
                recipient: address2,
                split: 0.7,
              },
            ],
            collectLimit: '10',
            endsAt: endsAt.toISOString(),
            followerOnly: true,
          },
        },
      },
    },
    {
      config: {
        type: OpenActionType.UNKNOWN_OPEN_ACTION,
        address: address1,
        data: '0x' as Data,
      },
      expected: {
        unknownOpenAction: {
          address: address1,
          data: '0x',
        },
      },
    },
  ])(`when called with "$config.type" open action config`, ({ config, expected }) => {
    it(`should resolve the expected OpenActionModuleInput`, async () => {
      const input = resolveOpenActionModuleInput(config);

      expect(input).toEqual(expected);
    });
  });
});
