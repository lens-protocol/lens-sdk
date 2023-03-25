import { omitTypename } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetProfileImageUriTypedDataData,
  createCreateSetProfileImageUriTypedDataMockedResponse,
  createSetProfileImageURIViaDispatcherMockedResponse,
  mockRelayerResultFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockUpdateNftProfileImageRequest,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ProfileImageCallGateway } from '../ProfileImageCallGateway';
import { mockITransactionFactory } from '../__helpers__/mocks';

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

    describe(`when calling the "${ProfileImageCallGateway.prototype.createUnsignedProtocolCall.name}"`, () => {
      it(`should create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
        const data = mockCreateSetProfileImageUriTypedDataData();

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

        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(omitTypename(data.result.typedData));
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

        const transaction = await gateway.createDelegatedTransaction(request);

        await transaction.waitNextEvent();
        expect(transaction).toBeInstanceOf(NativeTransaction);
        expect(transaction).toEqual(
          expect.objectContaining({
            chainType: ChainType.POLYGON,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            id: expect.any(String),
            request,
          }),
        );
      });
    });
  });
});
