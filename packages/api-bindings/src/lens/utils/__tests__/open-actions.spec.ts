import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { AllOpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { Data, InvariantError } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  mockAmountFragmentFrom,
  mockLegacyAaveFeeCollectModuleSettingsFragment,
  mockLegacyFreeCollectModuleSettingsFragment,
  mockLegacyRevertCollectModuleSettingsFragment,
  mockMirrorFragment,
  mockMultirecipientFeeCollectOpenActionSettingsFragment,
  mockNetworkAddressFragment,
  mockPostFragment,
  mockSimpleCollectOpenActionSettingsFragment,
  mockUnknownOpenActionModuleSettingsFragment,
} from '../../__helpers__';
import { OpenActionKind, resolveOpenActionRequestFor } from '../open-actions';

const fee = mockDaiAmount(42);
const contractAddress = mockEvmAddress();

describe(`Given the ${resolveOpenActionRequestFor.name} predicate`, () => {
  describe('when trying to act on a publication configured w/ LegacyRevertCollectModuleSettings', () => {
    const publication = mockPostFragment({
      openActionModules: [mockLegacyRevertCollectModuleSettingsFragment()],
    });

    it(`should throw an ${InvariantError.name}`, () => {
      expect(() =>
        resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT },
          public: false,
          signless: true,
          sponsored: true,
        }),
      ).toThrow(InvariantError);
    });
  });

  describe.each([
    {
      settings: mockLegacyAaveFeeCollectModuleSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: contractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.LEGACY_COLLECT,
        fee: {
          amount: fee,
          contractAddress,
        },
      },
    },
    {
      settings: mockLegacyFreeCollectModuleSettingsFragment(),
      expected: {
        type: AllOpenActionType.LEGACY_COLLECT,
      },
    },
  ])(`when performing a legacy collect`, ({ expected, settings }) => {
    const expectedRequest = 'LegacyCollectRequest';
    const publication = mockPostFragment({
      openActionModules: [settings],
    });

    describe(`on a PrimaryPublication`, () => {
      it(`should support signless ${expectedRequest}`, () => {
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT },
          public: false,
          signless: true,
          sponsored: true,
        });

        expect(result).toMatchObject({
          publicationId: publication.id,
          referrer: undefined,
          signless: true,
          sponsored: true,
        });
        expect(result).toMatchObject(expected);
      });

      it(`should support non-sponsored ${expectedRequest}`, () => {
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT },
          public: false,
          signless: true,
          sponsored: false,
        });

        expect(result).toMatchObject({
          publicationId: publication.id,
          sponsored: false,
        });
      });

      it(`should throw an ${InvariantError.name} if attempted to execute as public ${expectedRequest}`, () => {
        expect(() =>
          resolveOpenActionRequestFor(publication, {
            action: { kind: OpenActionKind.COLLECT },
            public: true,
            signless: true,
            sponsored: true,
          }),
        ).toThrow(InvariantError);
      });
    });

    describe(`on a Mirror`, () => {
      const mirror = mockMirrorFragment({
        mirrorOn: publication,
      });

      it(`should use the Mirror ID as the "referrer" for the ${expectedRequest}`, () => {
        const result = resolveOpenActionRequestFor(mirror, {
          action: { kind: OpenActionKind.COLLECT },
          public: false,
          signless: true,
          sponsored: true,
        });

        expect(result).toMatchObject({
          publicationId: mirror.mirrorOn.id,
          referrer: mirror.id,
        });
      });
    });
  });

  describe.each([
    {
      settings: mockSimpleCollectOpenActionSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: contractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.SIMPLE_COLLECT,
        fee: {
          amount: fee,
          contractAddress,
        },
      },
      expectedRequest: 'SimpleCollectRequest',
    },
    {
      settings: mockMultirecipientFeeCollectOpenActionSettingsFragment({
        amount: mockAmountFragmentFrom(fee),
        contract: mockNetworkAddressFragment({
          address: contractAddress,
        }),
      }),
      expected: {
        type: AllOpenActionType.MULTIRECIPIENT_COLLECT,
        fee: {
          amount: fee,
          contractAddress,
        },
      },
      expectedRequest: 'MultirecipientCollectRequest',
    },
  ])(`when performing a Collect Open Action`, ({ expected, expectedRequest, settings }) => {
    const publication = mockPostFragment({
      openActionModules: [settings],
    });

    describe(`on a PrimaryPublication`, () => {
      it(`should support signless ${expectedRequest}`, () => {
        const referrers = [mockPublicationId(), mockProfileId()];
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT, referrers },
          public: false,
          signless: true,
          sponsored: true,
        });

        expect(result).toMatchObject({
          publicationId: publication.id,
          referrers,
          signless: true,
          sponsored: true,
        });
        expect(result).toMatchObject(expected);
      });

      it(`should support non-sponsored ${expectedRequest}`, () => {
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT },
          public: false,
          signless: true,
          sponsored: false,
        });

        expect(result).toMatchObject({
          publicationId: publication.id,
          sponsored: false,
        });
      });

      it(`should support public ${expectedRequest}`, () => {
        const referrers = [mockPublicationId(), mockProfileId()];
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT, referrers },
          public: true,
          signless: true,
          sponsored: true,
        });

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

        const result = resolveOpenActionRequestFor(mirror, {
          action: { kind: OpenActionKind.COLLECT },
          signless: true,
          public: false,
          sponsored: true,
        });

        expect(result).toMatchObject({
          publicationId: mirror.mirrorOn.id,
          referrers: [mirror.id],
        });
      });
    });
  });

  describe(`when performing an Unknown Open Action`, () => {
    const settings = mockUnknownOpenActionModuleSettingsFragment({
      contract: mockNetworkAddressFragment({
        address: contractAddress,
      }),
    });
    const action = {
      kind: OpenActionKind.UNKNOWN,
      address: settings.contract.address,
      data: '0x' as Data,
    };
    const expectedRequest = 'UnknownOpenActionRequest';
    const publication = mockPostFragment({
      openActionModules: [settings],
    });

    it(`should support signless ${expectedRequest}`, () => {
      const result = resolveOpenActionRequestFor(publication, {
        action,
        public: false,
        signless: true,
        sponsored: true,
      });

      expect(result).toMatchObject({
        type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
        publicationId: publication.id,
        address: settings.contract.address,
        data: '0x',
        public: false,
        signless: true,
        sponsored: true,
      });
    });

    it(`should support non-sponsored ${expectedRequest}`, () => {
      const result = resolveOpenActionRequestFor(publication, {
        action,
        public: false,
        signless: false,
        sponsored: false,
      });

      expect(result).toMatchObject({
        publicationId: publication.id,
        sponsored: false,
      });
    });

    it(`should support public ${expectedRequest}`, () => {
      const result = resolveOpenActionRequestFor(publication, {
        action,
        public: true,
        sponsored: true,
        signless: true,
      });

      expect(result).toMatchObject({
        type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
        publicationId: publication.id,
        address: settings.contract.address,
        data: '0x',
        public: true,
      });
    });

    it(`should figure out the correct ${expectedRequest} among many Open Action modules`, () => {
      const publication = mockPostFragment({
        openActionModules: [
          mockSimpleCollectOpenActionSettingsFragment(),
          mockUnknownOpenActionModuleSettingsFragment(),
          mockUnknownOpenActionModuleSettingsFragment(),
          settings,
        ],
      });
      const result = resolveOpenActionRequestFor(publication, {
        action,
        public: false,
        signless: true,
        sponsored: true,
      });

      expect(result).toMatchObject({
        type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
        address: settings.contract.address,
      });
    });
  });
});
