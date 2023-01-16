import { MockedResponse } from '@apollo/client/testing';
import {
  CreateSetDispatcherTypedDataDocument,
  CreateSetDispatcherTypedDataMutation,
  CreateSetDispatcherTypedDataMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetDispatcherTypedDataMutation,
} from '@lens-protocol/api-bindings/mocks';
import { mockNonce, mockUpdateDispatcherConfigRequest } from '@lens-protocol/domain/mocks';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { DispatcherConfigCallGateway } from '../DispatcherConfigCallGateway';

function mockCreateSetDispatcherTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateSetDispatcherTypedDataMutationVariables;
  data: CreateSetDispatcherTypedDataMutation;
}): MockedResponse<CreateSetDispatcherTypedDataMutation> {
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
    it(`should create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
      const request = mockUpdateDispatcherConfigRequest();

      const setDispatcherTypedDataMutation = mockCreateSetDispatcherTypedDataMutation();

      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateSetDispatcherTypedDataMutationMockedResponse({
          variables: {
            request: {
              profileId: request.profileId,
              enable: request.enabled,
            },
          },
          data: setDispatcherTypedDataMutation,
        }),
      ]);

      const dispatcherConfigCallGateway = new DispatcherConfigCallGateway(apollo);

      const unsignedCall = await dispatcherConfigCallGateway.createUnsignedProtocolCall(request);

      expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
      expect(unsignedCall.typedData).toEqual(
        omitTypename(setDispatcherTypedDataMutation.result.typedData),
      );
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
          data: mockCreateSetDispatcherTypedDataMutation({ nonce }),
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
