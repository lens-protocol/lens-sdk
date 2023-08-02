import { SafeApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  mockCreateMirrorTypedDataResponse,
  mockCreateMirrorViaDispatcherResponse,
  mockLensApolloClient,
  mockCreateMirrorTypedDataData,
  mockRelayerResultFragment,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockCreateMirrorRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  mockITransactionFactory,
  assertUnsignedProtocolCallCorrectness,
  assertBroadcastingErrorResultWithRequestFallback,
} from '../../__helpers__/mocks';
import { CreateOnChainMirrorGateway } from '../CreateOnChainMirrorGateway';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateOnChainMirrorGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateOnChainMirrorGateway.name}`, () => {
  const data = mockCreateMirrorTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateMirrorRequest>`, () => {
    const request = mockCreateMirrorRequest();

    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateMirrorTypedDataResponse({
          variables: {
            request: {
              profileId: request.profileId,
              publicationId: request.publicationId,
            },
          },
          data,
        }),
      ]);

      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreateMirrorRequest>`, () => {
    const request = mockCreateMirrorRequest();

    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateMirrorViaDispatcherResponse({
          variables: {
            request: {
              profileId: request.profileId,
              publicationId: request.publicationId,
            },
          },
          data: {
            result: mockRelayerResultFragment(),
          },
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const result = await gateway.createDelegatedTransaction(request);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          request,
        }),
      );
    });

    it.each([
      mockRelayErrorFragment(RelayErrorReasons.Rejected),
      mockRelayErrorFragment(RelayErrorReasons.NotAllowed),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of RelayError response with "$reason" reason`,
      async (relayError) => {
        const apolloClient = mockLensApolloClient([
          mockCreateMirrorViaDispatcherResponse({
            variables: {
              request: {
                profileId: request.profileId,
                publicationId: request.publicationId,
              },
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateMirrorTypedDataResponse({
            variables: {
              request: {
                profileId: request.profileId,
                publicationId: request.publicationId,
              },
            },
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient });
        const result = await gateway.createDelegatedTransaction(request);

        assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
      },
    );
  });
});
