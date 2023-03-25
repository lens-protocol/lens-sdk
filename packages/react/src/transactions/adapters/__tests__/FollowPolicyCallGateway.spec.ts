import { MockedResponse } from '@apollo/client/testing';
import {
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables,
  FollowModuleParams,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreateSetFollowModuleTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockChargeFollowConfig,
  mockNoFeeFollowConfig,
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

function createCreateSetFollowModuleTypedDataMockedResponse({
  variables,
  data,
}: {
  variables: CreateSetFollowModuleTypedDataVariables;
  data: CreateSetFollowModuleTypedDataData;
}): MockedResponse<CreateSetFollowModuleTypedDataData> {
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
      policy: mockChargeFollowConfig(),
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
      policy: mockNoFeeFollowConfig(),
      expectedFollowModule: () => ({
        freeFollowModule: true,
      }),
    },
  ])(
    `when calling the "${FollowPolicyCallGateway.prototype.createUnsignedProtocolCall.name}" method`,
    ({ policy, expectedFollowModule }) => {
      const request = mockUpdateFollowPolicyRequest({ policy });

      it(`should create an "${UnsignedLensProtocolCall.name}" w/ the expected typed data`, async () => {
        const data = mockCreateSetFollowModuleTypedDataData();

        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateSetFollowModuleTypedDataMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                followModule: expectedFollowModule(request.policy),
              },
            },
            data,
          }),
        ]);
        const followFeeTransactionGateway = new FollowPolicyCallGateway(apollo);

        const unsignedCall = await followFeeTransactionGateway.createUnsignedProtocolCall(request);

        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(omitTypename(data.result.typedData));
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateSetFollowModuleTypedDataMockedResponse({
            variables: {
              request: {
                profileId: request.profileId,
                followModule: expectedFollowModule(request.policy),
              },
              options: {
                overrideSigNonce: nonce,
              },
            },
            data: mockCreateSetFollowModuleTypedDataData({ nonce }),
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
