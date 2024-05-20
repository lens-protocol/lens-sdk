import {
  mockAmountFragmentFrom,
  mockLegacyAaveFeeCollectModuleSettingsFragment,
  mockLegacyFreeCollectModuleSettingsFragment,
  mockLegacyRevertCollectModuleSettingsFragment,
  mockMirrorFragment,
  mockMultirecipientFeeCollectOpenActionSettingsFragment,
  mockNetworkAddressFragment,
  mockPostFragment,
  mockProfileFragment,
  mockProtocolSharedRevenueCollectOpenActionSettingsFragment,
  mockSimpleCollectOpenActionSettingsFragment,
  mockUnknownOpenActionModuleSettingsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { SessionType } from '@lens-protocol/domain/use-cases/authentication';
import { AllOpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { Data, InvariantError } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  mockProfileSession,
  mockWalletOnlySession,
} from '../../../authentication/__helpers__/mocks';
import { staging } from '../../../environments';
import { createOpenActionRequest } from '../createOpenActionRequest';
import { OpenActionKind } from '../types';

const fee = mockDaiAmount(42);
const aContractAddress = mockEvmAddress();

describe(`Given the ${createOpenActionRequest.name} predicate`, () => {
  describe('when trying to act on a publication configured w/ LegacyRevertCollectModuleSettings', () => {
    const publication = mockPostFragment({
      openActionModules: [mockLegacyRevertCollectModuleSettingsFragment()],
    });

    it(`should throw an ${InvariantError.name}`, () => {
      expect(() =>
        createOpenActionRequest(
          { publication, sponsored: true },
          { kind: OpenActionKind.COLLECT },
          mockProfileSession(),
          staging,
        ),
      ).toThrow(InvariantError);
    });
  });

  describe.each([
    {
      settings: mockLegacyAaveFeeCollectModuleSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: aContractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.LEGACY_COLLECT,
        fee: {
          amount: fee,
          spender: aContractAddress,
        },
      },
      expectedRequest: 'LegacyCollectRequest',
    },
    {
      settings: mockLegacyFreeCollectModuleSettingsFragment(),
      expected: {
        type: AllOpenActionType.LEGACY_COLLECT,
      },
      expectedRequest: 'LegacyCollectRequest',
    },
  ])(
    `and a PrimaryPublication configured with the $settings.__typename`,
    ({ expected, expectedRequest, settings }) => {
      const publication = mockPostFragment({
        openActionModules: [settings],
      });
      const profile = mockProfileFragment({
        sponsor: true,
        signless: true,
      });

      describe(`when executing the Collect Action`, () => {
        it(`should support signless & sponsored ${expectedRequest} in a ${SessionType.WithProfile} session`, () => {
          const result = createOpenActionRequest(
            { publication, sponsored: true },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            referrer: undefined,
            signless: true,
            sponsored: true,
          });
          expect(result).toMatchObject(expected);
        });

        it(`should support voluntary self-funded executions of ${expectedRequest} in a ${SessionType.WithProfile} session`, () => {
          const result = createOpenActionRequest(
            {
              publication,
              sponsored: false,
            },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            sponsored: false,
          });
        });

        it(`should throw an ${InvariantError.name} if attempted in a ${SessionType.JustWallet} session`, () => {
          expect(() =>
            createOpenActionRequest(
              { publication, sponsored: true },
              { kind: OpenActionKind.COLLECT },
              mockWalletOnlySession(),
              staging,
            ),
          ).toThrow(InvariantError);
        });
      });

      describe(`when executing the Collect Action on a Mirror for it`, () => {
        const mirror = mockMirrorFragment({
          mirrorOn: publication,
        });

        it(`should use the Mirror ID as the "referrer" for the ${expectedRequest}`, () => {
          const result = createOpenActionRequest(
            { publication: mirror, sponsored: true },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: mirror.mirrorOn.id,
            referrer: mirror.id,
          });
        });
      });
    },
  );

  describe.each([
    {
      settings: mockSimpleCollectOpenActionSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: aContractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.SIMPLE_COLLECT,
        fee: {
          amount: fee,
          spender: aContractAddress,
        },
      },
      expectedRequest: 'SimpleCollectRequest',
    },
    {
      settings: mockProtocolSharedRevenueCollectOpenActionSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: aContractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.SHARED_REVENUE_COLLECT,
        fee: {
          amount: fee,
          spender: aContractAddress,
        },
      },
      expectedRequest: 'SharedRevenueCollectRequest',
    },
    {
      settings: mockMultirecipientFeeCollectOpenActionSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: aContractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.MULTIRECIPIENT_COLLECT,
        fee: {
          amount: fee,
          spender: aContractAddress,
        },
      },
      expectedRequest: 'MultirecipientCollectRequest',
    },
  ])(
    `and a PrimaryPublication configured with the $settings.__typename`,
    ({ expected, expectedRequest, settings }) => {
      const publication = mockPostFragment({
        openActionModules: [settings],
      });
      const profile = mockProfileFragment({
        sponsor: true,
        signless: true,
      });

      describe(`when executing the Collect Action`, () => {
        it(`should support signless & sponsored ${expectedRequest} in a ${SessionType.WithProfile} session`, () => {
          const referrers = [mockPublicationId(), mockProfileId()];
          const result = createOpenActionRequest(
            { publication, sponsored: true },
            { kind: OpenActionKind.COLLECT, referrers },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            referrers,
            signless: true,
            sponsored: true,
          });
          expect(result).toMatchObject(expected);
        });

        it(`should forward the referrers list`, () => {
          const referrers = [mockPublicationId(), mockProfileId()];
          const result = createOpenActionRequest(
            { publication, sponsored: true },
            { kind: OpenActionKind.COLLECT, referrers },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            referrers,
          });
        });

        it(`should support voluntary self-funded executions of ${expectedRequest} in a ${SessionType.WithProfile} session`, () => {
          const result = createOpenActionRequest(
            { publication, sponsored: false },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            sponsored: false,
          });
        });

        it(`should support public ${expectedRequest} in a ${SessionType.JustWallet} session`, () => {
          const referrers = [mockPublicationId(), mockProfileId()];
          const result = createOpenActionRequest(
            { publication, sponsored: true },
            { kind: OpenActionKind.COLLECT, referrers },
            mockWalletOnlySession(),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            referrers,
          });
          expect(result).toMatchObject({
            ...expected,
            public: true,
          });
        });
      });

      describe(`when executing the Collect Action on a Mirror`, () => {
        it(`should use the Mirror ID as default "referrers" for the ${expectedRequest}`, () => {
          const mirror = mockMirrorFragment({
            mirrorOn: publication,
          });

          const result = createOpenActionRequest(
            { publication: mirror, sponsored: true },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            publicationId: mirror.mirrorOn.id,
            referrers: [mirror.id],
          });
        });
      });

      describe(`when executing the specific Open Action in a ${SessionType.JustWallet} session`, () => {
        it.only(`should specify the PublicActProxy as the fee spender`, () => {
          const result = createOpenActionRequest(
            { publication, sponsored: true },
            { kind: OpenActionKind.COLLECT },
            mockWalletOnlySession(),
            staging,
          );

          expect(result).toMatchObject({
            fee: {
              spender: staging.contracts.publicActProxy,
            },
          });
        });
      });
    },
  );

  describe('and a publication configured w/ an UnknownOpenActionModuleSettings', () => {
    const expectedRequest = 'UnknownOpenActionRequest';
    const data = '0x' as Data;

    const signlessSettings = mockUnknownOpenActionModuleSettingsFragment({
      signlessApproved: true,
      sponsoredApproved: true,
    });
    const sponsoredOnlySettings = mockUnknownOpenActionModuleSettingsFragment({
      signlessApproved: false,
      sponsoredApproved: true,
    });
    const notSponsoredSettings = mockUnknownOpenActionModuleSettingsFragment({
      signlessApproved: false,
      sponsoredApproved: false,
    });
    const publication = mockPostFragment({
      openActionModules: [signlessSettings, sponsoredOnlySettings, notSponsoredSettings],
    });

    describe(`when executing the specific Open Action`, () => {
      it(`should forward the referrers list`, () => {
        const referrers = [mockPublicationId(), mockProfileId()];
        const result = createOpenActionRequest(
          { publication, sponsored: true },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
            referrers,
          },
          mockProfileSession(),
          staging,
        );

        expect(result).toMatchObject({
          referrers,
        });
      });
    });

    describe(`when executing the specific Open Action in a ${SessionType.WithProfile} session`, () => {
      const profile = mockProfileFragment({
        sponsor: true,
        signless: true,
      });

      it(`should support signless & sponsored ${expectedRequest}`, () => {
        const result = createOpenActionRequest(
          { publication, sponsored: true },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
          },
          mockProfileSession({ profile }),
          staging,
        );

        expect(result).toMatchObject({
          type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
          publicationId: publication.id,
          address: signlessSettings.contract.address,
          data,
          public: false,
          signless: true,
          sponsored: true,
        });
      });

      it.each([sponsoredOnlySettings, notSponsoredSettings])(
        `should take into account signlessApproved=$signlessApproved and sponsoredApproved=$sponsoredApproved`,
        ({ contract, signlessApproved, sponsoredApproved }) => {
          const result = createOpenActionRequest(
            {
              publication,
              sponsored: true,
            },
            {
              kind: OpenActionKind.UNKNOWN,
              address: contract.address,
              data,
            },
            mockProfileSession({ profile }),
            staging,
          );

          expect(result).toMatchObject({
            type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
            publicationId: publication.id,
            address: contract.address,
            data,
            public: false,
            signless: signlessApproved,
            sponsored: sponsoredApproved,
          });
        },
      );

      it(`should support voluntary self-funded execution of ${expectedRequest}`, () => {
        const result = createOpenActionRequest(
          { publication, sponsored: false },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
          },
          mockProfileSession({ profile }),
          staging,
        );

        expect(result).toMatchObject({
          publicationId: publication.id,
          sponsored: false,
        });
      });
    });

    describe(`when executing the specific Open Action in a ${SessionType.JustWallet} session`, () => {
      it(`should support public ${expectedRequest}`, () => {
        const result = createOpenActionRequest(
          { publication, sponsored: true },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
          },
          mockWalletOnlySession(),
          staging,
        );

        expect(result).toMatchObject({
          type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
          publicationId: publication.id,
          address: signlessSettings.contract.address,
          data,
          public: true,
          sponsored: false,
          signless: false,
        });
      });
    });
  });
});
