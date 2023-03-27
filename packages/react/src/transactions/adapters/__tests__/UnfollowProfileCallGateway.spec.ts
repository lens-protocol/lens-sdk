import { MockedResponse } from '@apollo/client/testing';
import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateUnfollowTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import { mockUnfollowRequest } from '@lens-protocol/domain/mocks';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { UnfollowProfileCallGateway } from '../UnfollowProfileCallGateway';

function mockCreateUnfollowTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateUnfollowTypedDataVariables;
  data: CreateUnfollowTypedDataData;
}): MockedResponse<CreateUnfollowTypedDataData> {
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
      const data = mockCreateUnfollowTypedDataData();
      const apollo = createMockApolloClientWithMultipleResponses([
        mockCreateUnfollowTypedDataMutationMockedResponse({
          variables: {
            request: {
              profile: request.profileId,
            },
          },
          data,
        }),
      ]);
      const gateway = new UnfollowProfileCallGateway(apollo);

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
      expect(unsignedCall.typedData).toEqual(omitTypename(data.result.typedData));
    });
  });
});
