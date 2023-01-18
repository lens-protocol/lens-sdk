import { omitTypename } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetProfileImageUriTypedDataMutation,
  mockCreateSetProfileImageUriTypedDataMutationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockNonce,
  mockUpdateNftProfileImageRequest,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ProfileImageCallGateway } from '../ProfileImageCallGateway';

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
        const createSetProfileImageUriTypedDataMutation =
          mockCreateSetProfileImageUriTypedDataMutation();

        const apollo = createMockApolloClientWithMultipleResponses([
          mockCreateSetProfileImageUriTypedDataMutationMockedResponse({
            variables: {
              request: expectedRequestVars,
            },
            data: createSetProfileImageUriTypedDataMutation,
          }),
        ]);
        const gateway = new ProfileImageCallGateway(apollo);

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(
          omitTypename(createSetProfileImageUriTypedDataMutation.result.typedData),
        );
      });
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateSetProfileImageUriTypedDataMutationMockedResponse({
          variables: {
            request: expectedRequestVars,
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateSetProfileImageUriTypedDataMutation({ nonce }),
        }),
      ]);
      const gateway = new ProfileImageCallGateway(apollo);

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });
});
