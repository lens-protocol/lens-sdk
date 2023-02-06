import { MockedResponse } from '@apollo/client/testing';
import {
  CreateCollectTypedDataDocument,
  CreateCollectTypedDataMutation,
  CreateCollectTypedDataMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateCollectTypedDataMutation,
} from '@lens-protocol/api-bindings/mocks';
import { mockFreeCollectRequest, mockNonce } from '@lens-protocol/domain/mocks';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { CollectPublicationCallGateway } from '../CollectPublicationCallGateway';

function mockCreateCollectTypedDatMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCollectTypedDataMutationVariables;
  data: CreateCollectTypedDataMutation;
}): MockedResponse<CreateCollectTypedDataMutation> {
  return {
    request: {
      query: CreateCollectTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

describe(`Given an instance of the ${CollectPublicationCallGateway.name}`, () => {
  const request = mockFreeCollectRequest();

  describe(`when calling the "${CollectPublicationCallGateway.prototype.createUnsignedProtocolCall.name}"`, () => {
    it(`should create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
      const createCollectTypedDataMutation = mockCreateCollectTypedDataMutation();

      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateCollectTypedDatMutationMockedResponse({
          variables: {
            request: {
              publicationId: request.publicationId,
            },
          },
          data: createCollectTypedDataMutation,
        }),
      ]);
      const collectPublicationCallGateway = new CollectPublicationCallGateway(apollo);

      const unsignedCall = await collectPublicationCallGateway.createUnsignedProtocolCall(request);

      expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
      expect(unsignedCall.typedData).toEqual(
        omitTypename(createCollectTypedDataMutation.result.typedData),
      );
    });

    it(`should be possible to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateCollectTypedDatMutationMockedResponse({
          variables: {
            request: {
              publicationId: request.publicationId,
            },
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateCollectTypedDataMutation({ nonce }),
        }),
      ]);
      const collectPublicationCallGateway = new CollectPublicationCallGateway(apollo);

      const unsignedCall = await collectPublicationCallGateway.createUnsignedProtocolCall(
        request,
        nonce,
      );

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });
});
