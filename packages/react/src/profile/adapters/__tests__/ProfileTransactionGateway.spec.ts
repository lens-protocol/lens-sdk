import { LensApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  mockRelayerResultFragment,
  mockRelayErrorFragment,
  createMockApolloClientWithMultipleResponses,
  createCreateProfileMutationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction, TransactionError } from '@lens-protocol/domain/entities';
import { mockCreateProfileRequest } from '@lens-protocol/domain/mocks';
import { DuplicatedHandleError } from '@lens-protocol/domain/use-cases/profile';
import { ChainType } from '@lens-protocol/shared-kernel';

import { mockITransactionFactory } from '../../../transactions/adapters/__helpers__/mocks';
import { ProfileTransactionGateway } from '../ProfileTransactionGateway';

function setupProfileTransactionGateway({ apollo }: { apollo: LensApolloClient }) {
  const factory = mockITransactionFactory();
  return new ProfileTransactionGateway(apollo, factory);
}

describe(`Given an instance of the ${ProfileTransactionGateway.name}`, () => {
  describe(`when calling the "${ProfileTransactionGateway.prototype.createProfileTransaction.name}" method`, () => {
    it(`should create the expected "${NativeTransaction.name}"`, async () => {
      const request = mockCreateProfileRequest();
      const relayerResult = mockRelayerResultFragment();

      const apollo = createMockApolloClientWithMultipleResponses([
        createCreateProfileMutationMockedResponse({
          request: {
            handle: request.handle,
          },
          result: relayerResult,
        }),
      ]);

      const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

      const result = await profileTransactionGateway.createProfileTransaction(request);
      const transaction = result.unwrap();
      await transaction.waitNextEvent();

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

    it(`should fail w/ a "${DuplicatedHandleError.name}" in case of duplicated handle response`, async () => {
      const request = mockCreateProfileRequest();
      const relayerResult = mockRelayErrorFragment(RelayErrorReasons.HandleTaken);

      const apollo = createMockApolloClientWithMultipleResponses([
        createCreateProfileMutationMockedResponse({
          request: {
            handle: request.handle,
          },
          result: relayerResult,
        }),
      ]);
      const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

      const result = await profileTransactionGateway.createProfileTransaction(request);

      expect(() => result.unwrap()).toThrow(DuplicatedHandleError);
    });

    it(`should propagate any other relay error as transaction event error scenario`, async () => {
      const request = mockCreateProfileRequest();
      const relayerResult = mockRelayErrorFragment(RelayErrorReasons.Rejected);

      const apollo = createMockApolloClientWithMultipleResponses([
        createCreateProfileMutationMockedResponse({
          request: {
            handle: request.handle,
          },
          result: relayerResult,
        }),
      ]);
      const profileTransactionGateway = setupProfileTransactionGateway({ apollo });

      const result = await profileTransactionGateway.createProfileTransaction(request);
      const transaction = result.unwrap();
      const eventResult = await transaction.waitNextEvent();

      expect(() => eventResult.unwrap()).toThrow(TransactionError);
    });
  });
});
