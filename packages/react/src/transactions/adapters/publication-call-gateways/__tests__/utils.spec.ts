import { TransactionKind } from '@lens-protocol/domain/entities';
import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import {
  CollectPolicyType,
  ContentFocus,
  CreatePostRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { mockDaiAmount } from '@lens-protocol/shared-kernel/mocks';

import { resolveCollectModule } from '../utils';

describe(`Given ${resolveCollectModule.name} function`, () => {
  const requestBase = {
    contentFocus: ContentFocus.TEXT,
    reference: { type: ReferencePolicyType.FOLLOWERS_ONLY },
    profileId: mockProfileId(),
    publicationId: mockPublicationId(),
    kind: TransactionKind.CREATE_POST,
    locale: '',
    delegate: false,
  };

  describe(`when called with collect policy ${CollectPolicyType.NO_COLLECT}`, () => {
    it(`resolves to the revertCollectModule`, async () => {
      const request = {
        ...requestBase,
        collect: { type: CollectPolicyType.NO_COLLECT },
      } as CreatePostRequest;

      const collectModule = resolveCollectModule(request);

      expect(collectModule).toEqual({
        revertCollectModule: true,
      });
    });
  });

  describe(`when called with collect policy ${CollectPolicyType.FREE}`, () => {
    it(`resolves to the freeCollectModule`, async () => {
      const request = {
        ...requestBase,
        collect: {
          type: CollectPolicyType.FREE,
          metadata: {
            name: '',
            attributes: [],
          },
          followersOnly: true,
        },
      } as CreatePostRequest;

      const collectModule = resolveCollectModule(request);

      expect(collectModule).toEqual({
        freeCollectModule: {
          followerOnly: true,
        },
      });
    });
  });

  describe(`when called with collect policy ${CollectPolicyType.CHARGE}`, () => {
    const chargeCollectBase = {
      type: CollectPolicyType.CHARGE,
      fee: mockDaiAmount(5),
      followersOnly: true,
      metadata: {
        name: '',
        attributes: [],
      },
      mirrorReward: 0,
    };

    describe(`and defines only a fee`, () => {
      it(`resolves to the feeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
          feeCollectModule: {
            amount: {
              currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
              value: '5',
            },
            followerOnly: true,
            recipient: '0x',
            referralFee: 0,
          },
        });
      });
    });

    describe(`and is timeLimited`, () => {
      it(`resolves to the timedFeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            timeLimited: true,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
          timedFeeCollectModule: {
            amount: {
              currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
              value: '5',
            },
            followerOnly: true,
            recipient: '0x',
            referralFee: 0,
          },
        });
      });
    });

    describe(`and has collectLimit`, () => {
      it(`resolves to the limitedFeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            collectLimit: 10,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
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
        });
      });
    });

    describe(`and has both timeLimited and collectLimit defined`, () => {
      it(`resolves to the limitedTimedFeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            timeLimited: true,
            collectLimit: 10,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
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
        });
      });
    });

    describe(`and has depositToAave flag set without collectLimit or endTimestamp`, () => {
      it(`resolves to the aaveFeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            depositToAave: true,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
          aaveFeeCollectModule: {
            amount: {
              currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
              value: '5',
            },
            followerOnly: true,
            recipient: '0x',
            referralFee: 0,
          },
        });
      });
    });

    describe(`and has depositToAave flag set together with collectLimit and endTimestamp`, () => {
      it(`resolves to the aaveFeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            depositToAave: true,
            collectLimit: 10,
            endTimestamp: 1679501207007,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
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
        });
      });
    });

    describe(`and has vault set without collectLimit and endTimestamp`, () => {
      it(`resolves to the erc4626FeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            vault: '0x',
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
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
        });
      });
    });

    describe(`and has vault set together with collectLimit and endTimestamp`, () => {
      it(`resolves to the erc4626FeeCollectModule`, async () => {
        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipient: '0x',
            vault: '0x',
            collectLimit: 10,
            endTimestamp: 1679501207007,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
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
        });
      });
    });

    describe(`and has multiple recipients set without collectLimit and endTimestamp`, () => {
      it(`resolves to the multirecipientFeeCollectModule`, async () => {
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

        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipients,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
          multirecipientFeeCollectModule: {
            amount: {
              currency: '0x6b175474e89094c44da98b954eedeac495271d0f',
              value: '5',
            },
            followerOnly: true,
            referralFee: 0,
            recipients,
          },
        });
      });
    });

    describe(`and has multiple recipients set together with collectLimit and endTimestamp`, () => {
      it(`resolves to the multirecipientFeeCollectModule`, async () => {
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

        const request = {
          ...requestBase,
          collect: {
            ...chargeCollectBase,
            recipients,
            collectLimit: 10,
            endTimestamp: 1679501207007,
          },
        } as CreatePostRequest;

        const collectModule = resolveCollectModule(request);

        expect(collectModule).toEqual({
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
        });
      });
    });
  });
});
