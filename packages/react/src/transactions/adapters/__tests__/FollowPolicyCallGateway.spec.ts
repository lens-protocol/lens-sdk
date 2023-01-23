import { MockedResponse } from '@apollo/client/testing';
import {
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataMutation,
  CreateSetFollowModuleTypedDataMutationVariables,
  FollowModuleParams,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetFollowModuleTypedDataMutation,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockChargeFollowPolicy,
  mockFreeFollowPolicy,
  mockNonce,
  mockUpdateFollowPolicyRequest,
} from '@lens-protocol/domain/mocks';
import {
  FollowPolicyType,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { never } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { FollowPolicyCallGateway } from '../FollowPolicyCallGateway';

function mockCreateSetFollowModuleTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateSetFollowModuleTypedDataMutationVariables;
  data: CreateSetFollowModuleTypedDataMutation;
}): MockedResponse<CreateSetFollowModuleTypedDataMutation> {
  return {
    request: {
      query: CreateSetFollowModuleTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

describe(`Given an instance of the ${FollowPolicyCallGateway.name}`, () => {
  describe.each<{
    description: string;
    policy: UpdateFollowPolicyRequest['policy'];
    expectedFollowModule: (policy: UpdateFollowPolicyRequest['policy']) => FollowModuleParams;
  }>([
    {
      description: 'to enable follow fees',
      policy: mockChargeFollowPolicy(),
      expectedFollowModule: (policy) => ({
        feeFollowModule:
          policy.type === FollowPolicyType.CHARGE
            ? {
                amount: {
                  currency: policy.amount.asset.address,
                  value: policy.amount.toSignificantDigits(),
                },
                recipient: policy.recipient,
              }
            : never(),
      }),
    },
    {
      description: 'to disable follow fees',
      policy: mockFreeFollowPolicy(),
      expectedFollowModule: () => ({
        freeFollowModule: true,
      }),
    },
  ])(
    `when calling the "${FollowPolicyCallGateway.prototype.createUnsignedProtocolCall.name}" method`,
    ({ policy, expectedFollowModule }) => {
      const request = mockUpdateFollowPolicyRequest({ policy });

      it(`should create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
        const createSetFollowModuleTypedDataMutation = mockCreateSetFollowModuleTypedDataMutation();

        const apollo = createMockApolloClientWithMultipleResponses([
          mockCreateSetFollowModuleTypedDataMutationMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                followModule: expectedFollowModule(request.policy),
              },
            },
            data: createSetFollowModuleTypedDataMutation,
          }),
        ]);
        const followFeeTransactionGateway = new FollowPolicyCallGateway(apollo);

        const unsignedCall = await followFeeTransactionGateway.createUnsignedProtocolCall(request);

        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(
          omitTypename(createSetFollowModuleTypedDataMutation.result.typedData),
        );
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apollo = createMockApolloClientWithMultipleResponses([
          mockCreateSetFollowModuleTypedDataMutationMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                followModule: expectedFollowModule(request.policy),
              },
              options: {
                overrideSigNonce: nonce,
              },
            },
            data: mockCreateSetFollowModuleTypedDataMutation({ nonce }),
          }),
        ]);
        const followFeeTransactionGateway = new FollowPolicyCallGateway(apollo);

        const unsignedCall = await followFeeTransactionGateway.createUnsignedProtocolCall(
          request,
          nonce,
        );

        expect(unsignedCall.nonce).toEqual(nonce);
      });
    },
  );
});
