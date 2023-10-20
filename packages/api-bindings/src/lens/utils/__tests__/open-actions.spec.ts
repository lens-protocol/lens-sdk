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
  ])(`and the $settings.__typename`, ({ expected, settings }) => {
    describe(`when invoke for a PrimaryPublication configured with it`, () => {
      const publication = mockPostFragment({
        openActionModules: [settings],
      });

      it(`should return the expected LegacyCollectRequest`, () => {
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT },
          delegate: true,
        });

        expect(result).toMatchObject({
          publicationId: publication.id,
          referrer: undefined,
          delegate: true,
        });
        expect(result).toMatchObject(expected);
      });
    });

    describe(`when invoked for a Mirror of a publication configured with it`, () => {
      const mirror = mockMirrorFragment({
        mirrorOn: mockPostFragment({
          openActionModules: [settings],
        }),
      });

      it(`should collect the original Publication Id passing the Mirror Id as the 'referrer'`, () => {
        const result = resolveOpenActionRequestFor(mirror, {
          action: { kind: OpenActionKind.COLLECT },
          delegate: true,
        });

        expect(result).toMatchObject({
          publicationId: mirror.mirrorOn.id,
          referrer: mirror.id,
          delegate: true,
        });
      });
    });
  });

  describe('when called for a publication with LegacyRevertCollectModuleSettingsFragment', () => {
    const publication = mockPostFragment({
      openActionModules: [mockLegacyRevertCollectModuleSettingsFragment()],
    });

    it(`should throw an ${InvariantError.name}`, () => {
      expect(() =>
        resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT },
          delegate: false,
        }),
      ).toThrow(InvariantError);
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
        delegate: true,
      },
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
    },
  ])(`and the $settings.__typename`, ({ expected, settings }) => {
    describe(`when invoke for a PrimaryPublication configured with it`, () => {
      it(`should return the expected SimpleCollectRequest`, () => {
        const publication = mockPostFragment({
          openActionModules: [settings],
        });
        const referrers = [mockPublicationId(), mockProfileId()];
        const result = resolveOpenActionRequestFor(publication, {
          action: { kind: OpenActionKind.COLLECT, referrers },
          delegate: true,
        });

        expect(result).toMatchObject({
          publicationId: publication.id,
          referrers,
        });
        expect(result).toMatchObject(expected);
      });
    });

    describe(`when invoked for a Mirror of a publication configured with it`, () => {
      it('should default the `referrers` to the mirror ID', () => {
        const mirror = mockMirrorFragment({
          mirrorOn: mockPostFragment({
            openActionModules: [settings],
          }),
        });

        const result = resolveOpenActionRequestFor(mirror, {
          action: { kind: OpenActionKind.COLLECT },
          delegate: true,
        });

        expect(result).toMatchObject({
          publicationId: mirror.mirrorOn.id,
          referrers: [mirror.id],
        });
      });
    });
  });

  describe(`and the $settings.__typename`, () => {
    const settings = mockUnknownOpenActionModuleSettingsFragment({
      contract: mockNetworkAddressFragment({
        address: contractAddress,
      }),
    });

    describe(`when invoke for a PrimaryPublication configured with it`, () => {
      it(`should return the expected UnknownActionRequest`, () => {
        const publication = mockPostFragment({
          openActionModules: [settings],
        });
        const result = resolveOpenActionRequestFor(publication, {
          action: {
            kind: OpenActionKind.UNKNOWN,
            address: settings.contract.address,
            data: '0x' as Data,
          },
          delegate: true,
        });

        expect(result).toMatchObject({
          type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
          publicationId: publication.id,
          address: settings.contract.address,
          data: '0x',
          delegate: true,
        });
      });

      it('should work among many open action modules', () => {
        const publication = mockPostFragment({
          openActionModules: [
            mockSimpleCollectOpenActionSettingsFragment(),
            mockUnknownOpenActionModuleSettingsFragment(),
            mockUnknownOpenActionModuleSettingsFragment(),
            settings,
          ],
        });
        const result = resolveOpenActionRequestFor(publication, {
          action: {
            kind: OpenActionKind.UNKNOWN,
            address: settings.contract.address,
            data: '0x' as Data,
          },
          delegate: true,
        });

        expect(result).toMatchObject({
          type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
          address: settings.contract.address,
        });
      });
    });
  });
});
