import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockCreateFollowTypedDataResponse,
  mockFollowResponse,
  mockCreateFollowTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockPaidFollowRequest, mockUnconstrainedFollowRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { FollowProfileGateway } from '../FollowProfileGateway';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new FollowProfileGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${FollowProfileGateway.name}`, () => {
  describe(`when creating an IUnsignedProtocolCall<FollowRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const request = mockPaidFollowRequest();
      const data = mockCreateFollowTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockCreateFollowTypedDataResponse({
          variables: {
            request: {
              follow: [
                {
                  profileId: request.profileId,
                  followModule: {
                    feeFollowModule: true,
                  },
                },
              ],
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

  describe(`when creating a ${NativeTransaction.name}<UnconstrainedFollowRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const request = mockUnconstrainedFollowRequest();

      const apolloClient = mockLensApolloClient([
        mockFollowResponse({
          variables: {
            request: {
              follow: [{ profileId: request.profileId }],
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
