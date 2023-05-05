import {
  mockChargeCollectPolicyConfig,
  mockCreateCommentRequest,
  mockCreatePostRequest,
} from '@lens-protocol/domain/mocks';
import { CollectPolicyType } from '@lens-protocol/domain/use-cases/publications';
import { mockDaiAmount } from '@lens-protocol/shared-kernel/mocks';

import { resolveCollectModule } from '../utils';

describe(`Given ${resolveCollectModule.name} function`, () => {
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

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
          revertCollectModule: true,
        });
      });
    });

    describe(`that has ${CollectPolicyType.FREE} collect policy`, () => {
      it(`should resolve with the "freeCollectModule" with the expected parameters`, async () => {
        const request = mockRequest({
          collect: {
            type: CollectPolicyType.FREE,
            metadata: {
              name: '',
              attributes: [],
            },
            followersOnly: true,
          },
        });

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
          freeCollectModule: {
            followerOnly: true,
          },
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
          description: 'with just a "fee"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
            }),
          }),
          expected: {
            feeCollectModule: {
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
          description: 'with "fee" and "timeLimited"',
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
            timedFeeCollectModule: {
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
          description: 'with "fee" and "collectLimit"',
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
            limitedFeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              recipient: '0x',
              referralFee: 0,
              collectLimit: '10',
            },
          },
        },

        {
          description: 'with "fee", "timeLimited" and "collectLimit"',
          request: mockRequest({
            collect: mockChargeCollectPolicyConfig({
              recipient: '0x',
              followersOnly: true,
              mirrorReward: 0,
              fee,
              timeLimited: true,
              collectLimit: 10,
            }),
          }),
          expected: {
            limitedTimedFeeCollectModule: {
              amount: {
                currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
                value: '5',
              },
              followerOnly: true,
              recipient: '0x',
              referralFee: 0,
              collectLimit: '10',
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
        it(`should resolve with the "feeCollectModule" with the expected parameters`, async () => {
          const collectModule = resolveCollectModule(request);

          expect(collectModule).toEqual(expected);
        });
      });
    });
  });
});
