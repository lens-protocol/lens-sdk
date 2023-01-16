import { MockedResponse } from '@apollo/client/testing';
import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataMutation,
  CreateUnfollowTypedDataMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateUnfollowTypedDataMutation,
} from '@lens-protocol/api-bindings/mocks';
import { mockUnfollowRequest } from '@lens-protocol/domain/mocks';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { UnfollowProfileCallGateway } from '../UnfollowProfileCallGateway';

function mockCreateUnfollowTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateUnfollowTypedDataMutationVariables;
  data: CreateUnfollowTypedDataMutation;
}): MockedResponse<CreateUnfollowTypedDataMutation> {
  return {
    request: {
      query: CreateUnfollowTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

describe(`Given an instance of the ${UnfollowProfileCallGateway.name}`, () => {
  const request = mockUnfollowRequest();

  describe(`when calling the "${UnfollowProfileCallGateway.prototype.createUnsignedProtocolCall.name}"`, () => {
    it(`should create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
      const createUnfollowTypedDataMutation = mockCreateUnfollowTypedDataMutation();
      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateUnfollowTypedDataMutationMockedResponse({
          variables: {
            request: {
              profile: request.profileId,
            },
          },
          data: createUnfollowTypedDataMutation,
        }),
      ]);
      const gateway = new UnfollowProfileCallGateway(apollo);

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
      expect(unsignedCall.typedData).toEqual(
        omitTypename(createUnfollowTypedDataMutation.result.typedData),
      );
    });
  });
});
