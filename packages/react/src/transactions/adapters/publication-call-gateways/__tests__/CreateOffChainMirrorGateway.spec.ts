import { LensApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  createCreateDataAvailabilityMirrorTypedDataMockedResponse,
  createCreateDataAvailabilityMirrorViaDispatcherDataMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockCreateMirrorTypedDataData,
  mockDataAvailabilityPublicationResult,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { mockCreateMirrorRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  mockITransactionFactory,
  assertUnsignedProtocolCallCorrectness,
  assertBroadcastingErrorResultWithRequestFallback,
} from '../../__helpers__/mocks';
import { CreateOffChainMirrorGateway } from '../CreateOffChainMirrorGateway';

function setupTestScenario({ apolloClient }: { apolloClient: LensApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateOffChainMirrorGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateOffChainMirrorGateway.name}`, () => {
  const data = mockCreateMirrorTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateMirrorRequest>`, () => {
    const request = mockCreateMirrorRequest();

    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreateDataAvailabilityMirrorTypedDataMockedResponse({
          variables: {
            request: {
              from: request.profileId,
              mirror: request.publicationId,
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

  describe(`when creating a ${DataTransaction.name}<CreateMirrorRequest>`, () => {
    const request = mockCreateMirrorRequest();

    it(`should create an instance of the ${DataTransaction.name}`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreateDataAvailabilityMirrorViaDispatcherDataMockedResponse({
          variables: {
            request: {
              from: request.profileId,
              mirror: request.publicationId,
            },
          },
          data: {
            result: mockDataAvailabilityPublicationResult(),
          },
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const result = await gateway.createDelegatedTransaction(request);

      expect(result.unwrap()).toBeInstanceOf(DataTransaction);
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
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateDataAvailabilityMirrorViaDispatcherDataMockedResponse({
            variables: {
              request: {
                from: request.profileId,
                mirror: request.publicationId,
              },
            },
            data: {
              result: relayError,
            },
          }),
          createCreateDataAvailabilityMirrorTypedDataMockedResponse({
            variables: {
              request: {
                from: request.profileId,
                mirror: request.publicationId,
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
