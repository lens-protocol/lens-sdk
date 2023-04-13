import { MockedResponse } from '@apollo/client/testing';
import {
  CreateSetDispatcherTypedDataDocument,
  CreateSetDispatcherTypedDataData,
  CreateSetDispatcherTypedDataVariables,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetDispatcherTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import { mockNonce, mockUpdateDispatcherConfigRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { DispatcherConfigCallGateway } from '../DispatcherConfigCallGateway';
import { assertUnsignedProtocolCallCorrectness } from '../__helpers__/mocks';

function mockCreateSetDispatcherTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateSetDispatcherTypedDataVariables;
  data: CreateSetDispatcherTypedDataData;
}): MockedResponse<CreateSetDispatcherTypedDataData> {
  return {
    request: {
      query: CreateSetDispatcherTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

describe(`Given an instance of the ${DispatcherConfigCallGateway.name}`, () => {
  describe(`when calling the "${DispatcherConfigCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
      const request = mockUpdateDispatcherConfigRequest();

      const data = mockCreateSetDispatcherTypedDataData();

      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateSetDispatcherTypedDataMutationMockedResponse({
          variables: {
            request: {
              profileId: request.profileId,
              enable: request.enabled,
            },
          },
          data,
        }),
      ]);

      const dispatcherConfigCallGateway = new DispatcherConfigCallGateway(apollo);

      const unsignedCall = await dispatcherConfigCallGateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it('should be possible to override the signature nonce', async () => {
      const request = mockUpdateDispatcherConfigRequest();

      const nonce = mockNonce();

      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateSetDispatcherTypedDataMutationMockedResponse({
          variables: {
            request: {
              profileId: request.profileId,
              enable: request.enabled,
            },
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateSetDispatcherTypedDataData({ nonce }),
        }),
      ]);
      const dispatcherConfigCallGateway = new DispatcherConfigCallGateway(apollo);

      const unsignedCall = await dispatcherConfigCallGateway.createUnsignedProtocolCall(
        request,
        nonce,
      );

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });
});
