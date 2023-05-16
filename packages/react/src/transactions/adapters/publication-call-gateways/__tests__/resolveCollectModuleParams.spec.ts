import {
  mockChargeCollectPolicyConfig,
  mockCreateCommentRequest,
  mockCreatePostRequest,
  mockFreeCollectPolicyConfig,
} from '@lens-protocol/domain/mocks';
import { CollectPolicyType } from '@lens-protocol/domain/use-cases/publications';
import { never } from '@lens-protocol/shared-kernel';
import { mockDaiAmount } from '@lens-protocol/shared-kernel/mocks';

import { resolveCollectModuleParams } from '../resolveCollectModuleParams';

jest.useFakeTimers();

const KNOWN_END_TIMESTAMP = new Date(1991, 6, 3).getTime();
const TIMESTAMP_24_HOURS = 1000 * 60 * 60 * 24;

describe(`Given the ${resolveCollectModuleParams.name} function`, () => {
  describe.each([
    {
      type: 'CreatePostRequest',
      mockRequest: mockCreatePostRequest,
    },
    {
      type: 'CreateCommentRequest',
      mockRequest: mockCreateCommentRequest,
    },
  ])('when called with a "$type"', ({ mockRequest }) => {
    describe(`that has ${CollectPolicyType.NO_COLLECT} collect policy`, () => {
      it(`should resolve with the "revertCollectModule" with the expected parameters`, async () => {
        const request = mockRequest({
          collect: { type: CollectPolicyType.NO_COLLECT },
        });

        const collectModule = resolveCollectModuleParams(request);

        expect(collectModule).toEqual({
          revertCollectModule: true,
        });
      });
    });

    describe(`that has ${CollectPolicyType.FREE} collect policy`, () => {
      describe.each([
        {
          description: 'with just "followersOnly" specified',
          request: mockRequest({
            collect: mockFreeCollectPolicyConfig({
              followersOnly: true,
            }),
          }),
          expected: {
            simpleCollectModule: {
              followerOnly: true,
            },
          },
        },

        {
          description: 'with a "collectLimit" specified',
          request: mockRequest({
            collect: mockFreeCollectPolicyConfig({
              followersOnly: true,
              collectLimit: 10,
            }),
          }),
          expected: {
            simpleCollectModule: {
              followerOnly: true,
              collectLimit: '10',
            },
          },
        },

        {
          description: 'with an "endTimestamp" specified',
          request: mockRequest({
            collect: mockFreeCollectPolicyConfig({
              followersOnly: true,
              endTimestamp: KNOWN_END_TIMESTAMP,
            }),
          }),
          expected: {
            simpleCollectModule: {
              followerOnly: true,
              endTimestamp: KNOWN_END_TIMESTAMP.toString(),
            },
          },
        },
      ])(`$description`, ({ request, expected }) => {
        const collectModuleParamsKey = Object.keys(expected)[0] ?? never();

        it(`should resolve with the "${collectModuleParamsKey}" with the expected parameters`, async () => {
          const collectModule = resolveCollectModuleParams(request);

          expect(collectModule).toEqual(expected);
        });
      });
    });

    describe(`that has ${CollectPolicyType.CHARGE} collect policy`, () => {
      const fee = mockDaiAmount(5);
      const recipients = [
        {
          recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
          split: 50,
        },
        {
          recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaB',
          split: 50,
        },
      ];

      describe.each([
        {
          description: 'with just a "fee" and "followersOnly" specified',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
            }),
          }),
          expected: {
            simpleCollectModule: {
              fee: {
                amount: {
                  currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                  value: '5',
                },
                recipient: '0x',
                referralFee: 0,
              },
              followerOnly: true,
            },
          },
        },

        {
          description: 'with also a "collectLimit" specified',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              collectLimit: 10,
            }),
          }),
          expected: {
            simpleCollectModule: {
              fee: {
                amount: {
                  currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                  value: '5',
                },
                recipient: '0x',
                referralFee: 0,
              },
              followerOnly: true,
              collectLimit: '10',
            },
          },
        },

        {
          description: 'with also "endTimestamp" specified',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              endTimestamp: KNOWN_END_TIMESTAMP,
            }),
          }),
          expected: {
            simpleCollectModule: {
              fee: {
                amount: {
                  currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                  value: '5',
                },
                recipient: '0x',
                referralFee: 0,
              },
              followerOnly: true,
              endTimestamp: KNOWN_END_TIMESTAMP.toString(),
            },
          },
        },

        {
          description: 'with also a deprecated "timeLimited" specified',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              timeLimited: true,
            }),
          }),
          expected: {
            simpleCollectModule: {
              fee: {
                amount: {
                  currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                  value: '5',
                },
                recipient: '0x',
                referralFee: 0,
              },
              endTimestamp: (Date.now() + TIMESTAMP_24_HOURS).toString(),
              followerOnly: true,
            },
          },
        },

        {
          description:
            'with "fee" and "depositToAave" but without "collectLimit" or "endTimestamp"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              depositToAave: true,
            }),
          }),
          expected: {
            aaveFeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              recipient: '0x',
              referralFee: 0,
            },
          },
        },

        {
          description: 'with "fee", "depositToAave", "collectLimit" and "endTimestamp"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              depositToAave: true,
              collectLimit: 10,
              endTimestamp: 1679501207007,
            }),
          }),
          expected: {
            aaveFeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              recipient: '0x',
              referralFee: 0,
              collectLimit: '10',
              endTimestamp: '1679501207007',
            },
          },
        },

        {
          description: 'with "fee" and "vault" but without "collectLimit" and "endTimestamp"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              vault: '0x',
            }),
          }),
          expected: {
            erc4626FeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              recipient: '0x',
              referralFee: 0,
              vault: '0x',
            },
          },
        },

        {
          description: 'with "fee", "vault", "collectLimit" and "endTimestamp"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              vault: '0x',
              collectLimit: 10,
              endTimestamp: 1679501207007,
            }),
          }),
          expected: {
            erc4626FeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              recipient: '0x',
              referralFee: 0,
              vault: '0x',
              collectLimit: '10',
              endTimestamp: '1679501207007',
            },
          },
        },

        {
          description:
            'with "fee", multiple "recipients" but without "collectLimit" and "endTimestamp"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              followersOnly: true,
              mirrorReward: 0,
              fee,
              recipients: [
                {
                  recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
                  split: 50,
                },
                {
                  recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaB',
                  split: 50,
                },
              ],
            }),
          }),
          expected: {
            multirecipientFeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              referralFee: 0,
              recipients: [
                {
                  recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
                  split: 50,
                },
                {
                  recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaB',
                  split: 50,
                },
              ],
            },
          },
        },

        {
          description: 'with "fee", multiple "recipients", "collectLimit" and "endTimestamp"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              followersOnly: true,
              mirrorReward: 0,
              fee,
              recipients,
              collectLimit: 10,
              endTimestamp: 1679501207007,
            }),
          }),
          expected: {
            multirecipientFeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              referralFee: 0,
              recipients,
              collectLimit: '10',
              endTimestamp: '1679501207007',
            },
          },
        },
      ])(`$description`, ({ request, expected }) => {
        const collectModuleParamsKey = Object.keys(expected)[0] ?? never();

        it(`should resolve with the "${collectModuleParamsKey}" with the expected parameters`, async () => {
          const collectModule = resolveCollectModuleParams(request);

          expect(collectModule).toEqual(expected);
        });
      });
    });
  });
});
