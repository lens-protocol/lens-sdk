import {
  LensProfileManagerRelayErrorReasonType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockCommentOnMomokaResponse,
  mockCreateMomokaCommentTypedDataData,
  mockCreateMomokaCommentTypedDataResponse,
  mockCreateMomokaPublicationResult,
  mockLensApolloClient,
  mockLensProfileManagerRelayError,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateMomokaCommentGateway } from '../CreateMomokaCommentGateway';
import { mockMomokaCommentRequest } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateMomokaCommentGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateMomokaCommentGateway.name}`, () => {
  const request = mockCreateCommentRequest();
  const momokaCommentRequest = mockMomokaCommentRequest(request);
  const data = mockCreateMomokaCommentTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreateCommentRequest>`, () => {
    it(`should:
        - use the IMetadataUploader<CreateCommentRequest'> to upload the publication metadata
        - create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateMomokaCommentTypedDataResponse({
          variables: {
            request: momokaCommentRequest,
          },
          data,
        }),
      ]);

      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });
  });

  describe(`when creating a ${DataTransaction.name}<CreateCommentRequest>`, () => {
    it(`should create an instance of the ${DataTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCommentOnMomokaResponse({
          variables: {
            request: momokaCommentRequest,
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
          mockCommentOnMomokaResponse({
            variables: {
              request: momokaCommentRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateMomokaCommentTypedDataResponse({
            variables: {
              request: momokaCommentRequest,
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
