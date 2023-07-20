import { SafeApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  mockRelayerResultFragment,
  mockRelayErrorFragment,
  mockLensApolloClient,
  mockCreateProfileResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockCreateProfileRequest } from '@lens-protocol/domain/mocks';
import { DuplicatedHandleError } from '@lens-protocol/domain/use-cases/profile';
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(String),
          request,
        }),
      );
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
