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
          { publication },
          { kind: OpenActionKind.COLLECT },
          mockProfileSession(),
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
          contractAddress: aContractAddress,
        },
      },
    },
    {
      settings: mockLegacyFreeCollectModuleSettingsFragment(),
      expected: {
        type: AllOpenActionType.LEGACY_COLLECT,
      },
    },
  ])(
    `when acting on a publication configured w/ $settings.__typename collect`,
    ({ expected, settings }) => {
      const expectedRequest = 'LegacyCollectRequest';
      const publication = mockPostFragment({
        openActionModules: [settings],
      });
      const profile = mockProfileFragment({
        sponsor: true,
        signless: true,
      });

      describe(`on a PrimaryPublication`, () => {
        it(`should support signless & sponsored ${expectedRequest} in a ${SessionType.WithProfile} session`, () => {
          const result = createOpenActionRequest(
            { publication },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
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
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            sponsored: false,
          });
        });

        it(`should throw an ${InvariantError.name} if attempted in a ${SessionType.JustWallet} session`, () => {
          expect(() =>
            createOpenActionRequest(
              { publication },
              { kind: OpenActionKind.COLLECT },
              mockWalletOnlySession(),
            ),
          ).toThrow(InvariantError);
        });
      });

      describe(`on a Mirror`, () => {
        const mirror = mockMirrorFragment({
          mirrorOn: publication,
        });

        it(`should use the Mirror ID as the "referrer" for the ${expectedRequest}`, () => {
          const result = createOpenActionRequest(
            { publication: mirror },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
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
          contractAddress: aContractAddress,
        },
      },
      expectedRequest: 'SimpleCollectRequest',
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
          contractAddress: aContractAddress,
        },
      },
      expectedRequest: 'MultirecipientCollectRequest',
    },
  ])(
    `when acting on a publication configured w/ $settings.__typename`,
    ({ expected, expectedRequest, settings }) => {
      const publication = mockPostFragment({
        openActionModules: [settings],
      });
      const profile = mockProfileFragment({
        sponsor: true,
        signless: true,
      });

      describe(`on a PrimaryPublication`, () => {
        it(`should support signless & sponsored ${expectedRequest} in a ${SessionType.WithProfile} session`, () => {
          const referrers = [mockPublicationId(), mockProfileId()];
          const result = createOpenActionRequest(
            { publication },
            { kind: OpenActionKind.COLLECT, referrers },
            mockProfileSession({ profile }),
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
            { publication },
            { kind: OpenActionKind.COLLECT, referrers },
            mockProfileSession({ profile }),
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
          );

          expect(result).toMatchObject({
            publicationId: publication.id,
            sponsored: false,
          });
        });

        it(`should support public ${expectedRequest} in a ${SessionType.JustWallet} session`, () => {
          const referrers = [mockPublicationId(), mockProfileId()];
          const result = createOpenActionRequest(
            { publication },
            { kind: OpenActionKind.COLLECT, referrers },
            mockWalletOnlySession(),
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

      describe(`on a Mirror`, () => {
        it(`should use the Mirror ID as default "referrers" for the ${expectedRequest}`, () => {
          const mirror = mockMirrorFragment({
            mirrorOn: publication,
          });

          const result = createOpenActionRequest(
            { publication: mirror },
            { kind: OpenActionKind.COLLECT },
            mockProfileSession({ profile }),
          );

          expect(result).toMatchObject({
            publicationId: mirror.mirrorOn.id,
            referrers: [mirror.id],
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
          { publication },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
            referrers,
          },
          mockProfileSession(),
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
          { publication },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
          },
          mockProfileSession({ profile }),
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
            },
            {
              kind: OpenActionKind.UNKNOWN,
              address: contract.address,
              data,
            },
            mockProfileSession({ profile }),
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
          { publication },
          {
            kind: OpenActionKind.UNKNOWN,
            address: signlessSettings.contract.address,
            data,
          },
          mockWalletOnlySession(),
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
