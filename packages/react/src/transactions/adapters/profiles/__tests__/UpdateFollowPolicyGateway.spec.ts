import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockCreateSetFollowModuleTypedDataData,
  mockCreateSetFollowModuleTypedDataResponse,
  mockSetFollowModuleResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockUpdateFollowPolicyRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { UpdateFollowPolicyGateway, resolveFollowModuleParams } from '../UpdateFollowPolicyGateway';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new UpdateFollowPolicyGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${UpdateFollowPolicyGateway.name}`, () => {
  const request = mockUpdateFollowPolicyRequest();

  describe(`when creating an IUnsignedProtocolCall<UpdateFollowPolicyRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const data = mockCreateSetFollowModuleTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockCreateSetFollowModuleTypedDataResponse({
          variables: {
            request: {
              followModule: resolveFollowModuleParams(request.policy),
            },
          },
          data,
        }),
      ]);

      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<UpdateFollowPolicyRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockSetFollowModuleResponse({
          variables: {
            request: {
              followModule: resolveFollowModuleParams(request.policy),
            },
          },
          data: {
            result: mockRelaySuccessFragment(),
          },
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const result = await gateway.createDelegatedTransaction(request);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          request,
        }),
      );
    });
  });
});
