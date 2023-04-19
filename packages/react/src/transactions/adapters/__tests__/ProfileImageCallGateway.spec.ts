import { RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetProfileImageUriTypedDataData,
  createCreateSetProfileImageUriTypedDataMockedResponse,
  createSetProfileImageURIViaDispatcherMockedResponse,
  mockRelayerResultFragment,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockUpdateNftProfileImageRequest,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ProfileImageCallGateway } from '../ProfileImageCallGateway';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
  mockITransactionFactory,
} from '../__helpers__/mocks';

describe(`Given an instance of the ${ProfileImageCallGateway.name}`, () => {
  describe.each([
    {
      requestName: 'UpdateNftProfileImageRequest',
      createExerciseData: () => {
        const request = mockUpdateNftProfileImageRequest();
        return {
          request,
          expectedRequestVars: {
            profileId: request.profileId,
            nftData: {
              id: request.signature.id,
              signature: request.signature.signature,
            },
          },
        };
      },
    },
    {
      requestName: 'UpdateOffChainProfileImageRequest',
      createExerciseData: () => {
        const request = mockUpdateOffChainProfileImageRequest();

        return {
          request,
          expectedRequestVars: {
            profileId: request.profileId,
            url: request.url,
          },
        };
      },
    },
  ])('with $requestName', ({ createExerciseData }) => {
    const { request, expectedRequestVars } = createExerciseData();
    const data = mockCreateSetProfileImageUriTypedDataData();

    describe(`when calling the "${ProfileImageCallGateway.prototype.createUnsignedProtocolCall.name}"`, () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateSetProfileImageUriTypedDataMockedResponse({
            variables: {
              request: expectedRequestVars,
            },
            data,
          }),
        ]);
        const transactionFactory = mockITransactionFactory();

        const gateway = new ProfileImageCallGateway(apollo, transactionFactory);

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateSetProfileImageUriTypedDataMockedResponse({
            variables: {
              request: expectedRequestVars,
              options: {
                overrideSigNonce: nonce,
              },
            },
            data: mockCreateSetProfileImageUriTypedDataData({ nonce }),
          }),
        ]);

        const transactionFactory = mockITransactionFactory();

        const gateway = new ProfileImageCallGateway(apollo, transactionFactory);
        const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

        expect(unsignedCall.nonce).toEqual(nonce);
      });
    });

    describe(`when calling the "${ProfileImageCallGateway.prototype.createDelegatedTransaction.name}"`, () => {
      it(`should create an instance of the ${NativeTransaction.name}`, async () => {
        const apollo = createMockApolloClientWithMultipleResponses([
          createSetProfileImageURIViaDispatcherMockedResponse({
            variables: {
              request: expectedRequestVars,
            },
            data: {
              result: mockRelayerResultFragment(),
            },
          }),
        ]);
        const transactionFactory = mockITransactionFactory();

        const gateway = new ProfileImageCallGateway(apollo, transactionFactory);
        const result = await gateway.createDelegatedTransaction(request);

        expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
        expect(result.unwrap()).toEqual(
          expect.objectContaining({
            chainType: ChainType.POLYGON,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          const apollo = createMockApolloClientWithMultipleResponses([
            createSetProfileImageURIViaDispatcherMockedResponse({
              variables: {
                request: expectedRequestVars,
              },
              data: {
                result: relayError,
              },
            }),
            createCreateSetProfileImageUriTypedDataMockedResponse({
              variables: {
                request: expectedRequestVars,
              },
              data,
            }),
          ]);
          const transactionFactory = mockITransactionFactory();

          const gateway = new ProfileImageCallGateway(apollo, transactionFactory);
          const result = await gateway.createDelegatedTransaction(request);

          assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
        },
      );
    });
  });
});
