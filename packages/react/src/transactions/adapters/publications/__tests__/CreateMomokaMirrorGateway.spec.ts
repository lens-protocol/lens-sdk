import {
  LensProfileManagerRelayErrorReasonType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockCreateMomokaMirrorTypedDataData,
  mockCreateMomokaMirrorTypedDataResponse,
  mockCreateMomokaPublicationResult,
  mockLensApolloClient,
  mockLensProfileManagerRelayError,
  mockMirrorOnMomokaResponse,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { mockCreateMirrorRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateMomokaMirrorGateway } from '../CreateMomokaMirrorGateway';
import { mockMomokaMirrorRequest } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateMomokaMirrorGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateMomokaMirrorGateway.name}`, () => {
  const request = mockCreateMirrorRequest();
  const momokaMirrorRequest = mockMomokaMirrorRequest(request);
  const data = mockCreateMomokaMirrorTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateMirrorRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateMomokaMirrorTypedDataResponse({
          variables: {
            request: momokaMirrorRequest,
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
    it(`should create an instance of the ${DataTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockMirrorOnMomokaResponse({
          variables: {
            request: momokaMirrorRequest,
          },
          data: {
            result: mockCreateMomokaPublicationResult(),
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
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.AppNotAllowed),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NotSponsored),
      mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.RateLimited),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of $__typename response with "$reason" reason`,
      async (relayError) => {
        const apolloClient = mockLensApolloClient([
          mockMirrorOnMomokaResponse({
            variables: {
              request: momokaMirrorRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateMomokaMirrorTypedDataResponse({
            variables: {
              request: momokaMirrorRequest,
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
