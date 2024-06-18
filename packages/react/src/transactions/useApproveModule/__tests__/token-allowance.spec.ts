import { AnyPublication, CollectModuleSettings } from '@lens-protocol/api-bindings';
import {
  mockAmountFragmentFrom,
  mockCommentFragment,
  mockFeeFollowModuleSettingsFragment,
  mockLegacyAaveFeeCollectModuleSettingsFragment,
  mockLegacyErc4626FeeCollectModuleSettingsFragment,
  mockLegacyFeeCollectModuleSettingsFragment,
  mockLegacyLimitedFeeCollectModuleSettingsFragment,
  mockLegacyLimitedTimedFeeCollectModuleSettingsFragment,
  mockLegacyMultirecipientFeeCollectModuleSettingsFragment,
  mockLegacySimpleCollectModuleSettingsFragment,
  mockLegacyTimedFeeCollectModuleSettingsFragment,
  mockMirrorFragment,
  mockMultirecipientFeeCollectOpenActionSettingsFragment,
  mockNetworkAddressFragment,
  mockPostFragment,
  mockProfileFragment,
  mockProtocolSharedRevenueCollectOpenActionSettingsFragment,
  mockQuoteFragment,
  mockSimpleCollectOpenActionSettingsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { TransactionKind } from '@lens-protocol/domain/entities';
import { SessionType } from '@lens-protocol/domain/use-cases/authentication';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  resolveTokenAllowanceRequestForCollect,
  resolveTokenAllowanceRequestForFollow,
} from '../token-allowance';

const amount = mockDaiAmount(42);
const spender = mockEvmAddress();

function assertExpectedTokenAllowanceRequest(request: TokenAllowanceRequest) {
  expect(request).toEqual({
    kind: TransactionKind.APPROVE_MODULE,
    amount,
    limit: TokenAllowanceLimit.EXACT,
    spender,
  });
}

describe(`Given the TokenAllowanceRequest helpers`, () => {
  describe(`when invoking the ${resolveTokenAllowanceRequestForFollow.name} function`, () => {
    const profile = mockProfileFragment({
      followModule: mockFeeFollowModuleSettingsFragment({
        amount: mockAmountFragmentFrom(amount),
        contract: mockNetworkAddressFragment({ address: spender }),
      }),
    });

    describe('configured with FeeFollowModuleSettings', () => {
      it('should return the expected TokenAllowanceRequest', () => {
        const request = resolveTokenAllowanceRequestForFollow(profile, TokenAllowanceLimit.EXACT);

        assertExpectedTokenAllowanceRequest(request);
      });
    });
  });

  describe.each<{
    name: string;
    mockPublicationWith: (settings: CollectModuleSettings) => AnyPublication;
  }>([
    {
      name: 'Post',
      mockPublicationWith: (settings) =>
        mockPostFragment({
          openActionModules: [settings],
        }),
    },
    {
      name: 'Comment',
      mockPublicationWith: (settings) =>
        mockCommentFragment({
          openActionModules: [settings],
        }),
    },
    {
      name: 'Quote',
      mockPublicationWith: (settings) =>
        mockQuoteFragment({
          openActionModules: [settings],
        }),
    },
    {
      name: 'Mirror for a Post',
      mockPublicationWith: (settings) =>
        mockMirrorFragment({
          mirrorOn: mockPostFragment({
            openActionModules: [settings],
          }),
        }),
    },
  ])(
    `when invoking the ${resolveTokenAllowanceRequestForCollect.name} function on a $name`,
    ({ mockPublicationWith }) => {
      describe.each([
        mockSimpleCollectOpenActionSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockMultirecipientFeeCollectOpenActionSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyFeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyLimitedFeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyLimitedTimedFeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyTimedFeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyMultirecipientFeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacySimpleCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyErc4626FeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockLegacyAaveFeeCollectModuleSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),

        mockProtocolSharedRevenueCollectOpenActionSettingsFragment({
          amount: mockAmountFragmentFrom(amount),
          contract: mockNetworkAddressFragment({ address: spender }),
        }),
      ])('configured with $__typename', (settings) => {
        it('should return the expected TokenAllowanceRequest', () => {
          const publication = mockPublicationWith(settings);
          const request = resolveTokenAllowanceRequestForCollect({
            publication,
            limit: TokenAllowanceLimit.EXACT,
            sessionType: SessionType.WithProfile,
            publicActProxy: mockEvmAddress(),
          });

          assertExpectedTokenAllowanceRequest(request);
        });
      });
    },
  );
});
