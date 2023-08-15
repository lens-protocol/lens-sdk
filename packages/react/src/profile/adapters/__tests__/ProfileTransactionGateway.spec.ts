import { SafeApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  mockRelayerResultFragment,
  mockRelayErrorFragment,
  mockLensApolloClient,
  mockCreateProfileResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  mockChargeFollowConfig,
  mockNoFeeFollowConfig,
  mockCreateProfileRequest,
} from '@lens-protocol/domain/mocks';
import {} from '@lens-protocol/domain/src/use-cases/profile/__helpers__/mocks';
import { DuplicatedHandleError, FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType } from '@lens-protocol/shared-kernel';

import { mockITransactionFactory } from '../../../transactions/adapters/__helpers__/mocks';
import { ProfileTransactionGateway } from '../ProfileTransactionGateway';

function setupProfileTransactionGateway({ apollo }: { apollo: SafeApolloClient }) {
  const factory = mockITransactionFactory();
  return new ProfileTransactionGateway(apollo, factory);
}

describe(`Given an instance of the ${ProfileTransactionGateway.name}`, () => {
  describe(`when calling the "${ProfileTransactionGateway.prototype.createProfileTransaction.name}" method`, () => {
    const request = mockCreateProfileRequest();

    it(`should create the expected "${NativeTransaction.name}"`, async () => {
      const relayerResult = mockRelayerResultFragment();

      const apollo = mockLensApolloClient([
        mockCreateProfileResponse({
          request: {
            handle: request.handle,
            followModule: null,
            profilePictureUri: null,
          },
          result: relayerResult,
        }),
      ]);

      const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

      const result = await profileTransactionGateway.createProfileTransaction(request);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          chainType: ChainType.POLYGON,
          hash: relayerResult.txHash,
          id: expect.any(String),
          request,
        }),
      );
    });

    const chargeFollowConfig = mockChargeFollowConfig();

    it.each([
      {
        followPolicy: chargeFollowConfig,
        expectedFollowModuleParams: {
          feeFollowModule: {
            amount: {
              currency: chargeFollowConfig.amount.asset.address,
              value: chargeFollowConfig.amount.toSignificantDigits(),
            },
            recipient: chargeFollowConfig.recipient,
          },
        },
      },
      {
        followPolicy: mockNoFeeFollowConfig({
          type: FollowPolicyType.ANYONE,
        }),
        expectedFollowModuleParams: {
          freeFollowModule: true,
        },
      },
      {
        followPolicy: mockNoFeeFollowConfig({
          type: FollowPolicyType.NO_ONE,
        }),
        expectedFollowModuleParams: {
          revertFollowModule: true,
        },
      },
      {
        followPolicy: mockNoFeeFollowConfig({
          type: FollowPolicyType.ONLY_PROFILE_OWNERS,
        }),
        expectedFollowModuleParams: {
          profileFollowModule: true,
        },
      },
    ])(
      `should allow to contextually setup the $followPolicy.type follow policy`,
      async ({ followPolicy, expectedFollowModuleParams }) => {
        const request = mockCreateProfileRequest({ followPolicy });
        const relayerResult = mockRelayerResultFragment();

        const apollo = mockLensApolloClient([
          mockCreateProfileResponse({
            request: {
              handle: request.handle,
              followModule: expectedFollowModuleParams,
              profilePictureUri: null,
            },
            result: relayerResult,
          }),
        ]);

        const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

        const result = await profileTransactionGateway.createProfileTransaction(request);

        expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      },
    );

    it(`should allow to contextually setup the profile image`, async () => {
      const url = 'https://example.com/image.png';
      const request = mockCreateProfileRequest({ profileImage: url });
      const relayerResult = mockRelayerResultFragment();

      const apollo = mockLensApolloClient([
        mockCreateProfileResponse({
          request: {
            handle: request.handle,
            followModule: null,
            profilePictureUri: url,
          },
          result: relayerResult,
        }),
      ]);

      const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

      const result = await profileTransactionGateway.createProfileTransaction(request);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
    });

    it.each([
      {
        expected: new DuplicatedHandleError(request.handle),
        relayError: mockRelayErrorFragment(RelayErrorReasons.HandleTaken),
      },
      {
        expected: new BroadcastingError(RelayErrorReasons.Rejected),
        relayError: mockRelayErrorFragment(RelayErrorReasons.Rejected),
      },
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of RelayError response with "$relayError.reason" reason`,
      async ({ relayError, expected }) => {
        const apollo = mockLensApolloClient([
          mockCreateProfileResponse({
            request: {
              handle: request.handle,
              followModule: null,
              profilePictureUri: null,
            },
            result: relayError,
          }),
        ]);
        const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

        const result = await profileTransactionGateway.createProfileTransaction(request);

        expect(() => result.unwrap()).toThrow(expected);
      },
    );
  });
});
