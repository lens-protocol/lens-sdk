import {
  LensProfileManagerRelayErrorReasonType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockCreateMomokaPostTypedDataData,
  mockCreateMomokaPostTypedDataResponse,
  mockCreateMomokaPublicationResult,
  mockLensApolloClient,
  mockLensProfileManagerRelayError,
  mockPostOnMomokaResponse,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertBroadcastingErrorWithReason,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateMomokaPostGateway } from '../CreateMomokaPostGateway';
import { mockMomokaPostRequest } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new CreateMomokaPostGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${CreateMomokaPostGateway.name}`, () => {
  const request = mockCreatePostRequest();
  const momokaPostRequest = mockMomokaPostRequest(request);
  const data = mockCreateMomokaPostTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreatePostRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateMomokaPostTypedDataResponse({
          variables: {
            request: momokaPostRequest,
          },
          data,
        }),
      ]);

      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });
  });

  describe(`when creating a ${DataTransaction.name}<CreatePostRequest>`, () => {
    it(`should create an instance of the ${DataTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockPostOnMomokaResponse({
          variables: {
            request: momokaPostRequest,
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
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.AppNotAllowed,
        ),
        reason: BroadcastingErrorReason.APP_NOT_ALLOWED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled,
        ),
        reason: BroadcastingErrorReason.NO_LENS_MANAGER_ENABLED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NotSponsored,
        ),
        reason: BroadcastingErrorReason.NOT_SPONSORED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.RateLimited,
        ),
        reason: BroadcastingErrorReason.RATE_LIMITED,
      },
      {
        relayError: mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.Failed),
        reason: BroadcastingErrorReason.UNKNOWN,
      },
    ])(
      `should fail w/ a ${BroadcastingError.name} with $reason in case of $relayError.__typename response with "$relayError.reason" reason`,
      async ({ relayError, reason }) => {
        const apolloClient = mockLensApolloClient([
          mockPostOnMomokaResponse({
            variables: {
              request: momokaPostRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateMomokaPostTypedDataResponse({
            variables: {
              request: momokaPostRequest,
            },
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient });
        const result = await gateway.createDelegatedTransaction(request);

        assertBroadcastingErrorWithReason(result, reason);
      },
    );
  });
});
