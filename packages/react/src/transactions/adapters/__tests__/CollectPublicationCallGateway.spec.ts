import { MockedResponse } from '@apollo/client/testing';
import {
  CreateCollectTypedDataDocument,
  CreateCollectTypedDataData,
  CreateCollectTypedDataVariables,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateCollectTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import { mockFreeCollectRequest, mockNonce } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { CollectPublicationCallGateway } from '../CollectPublicationCallGateway';
import { assertUnsignedProtocolCallCorrectness } from '../__helpers__/mocks';

function mockCreateCollectTypedDatMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCollectTypedDataVariables;
  data: CreateCollectTypedDataData;
}): MockedResponse<CreateCollectTypedDataData> {
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
    it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
      const data = mockCreateCollectTypedDataData();

      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateCollectTypedDatMutationMockedResponse({
          variables: {
            request: {
              publicationId: request.publicationId,
            },
          },
          data,
        }),
      ]);

      const collectPublicationCallGateway = new CollectPublicationCallGateway(apollo);
      const unsignedCall = await collectPublicationCallGateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
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
          data: mockCreateCollectTypedDataData({ nonce }),
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
