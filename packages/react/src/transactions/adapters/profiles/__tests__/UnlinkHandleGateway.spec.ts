import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockCreateUnlinkHandleFromProfileTypedDataData,
  mockCreateUnlinkHandleFromProfileTypedDataResponse,
  mockUnlinkHandleFromProfileResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockUnlinkHandleRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { UnlinkHandleGateway } from '../UnlinkHandleGateway';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new UnlinkHandleGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${UnlinkHandleGateway.name}`, () => {
  const request = mockUnlinkHandleRequest();

  describe(`when creating an IUnsignedProtocolCall<UnlinkHandleRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const data = mockCreateUnlinkHandleFromProfileTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockCreateUnlinkHandleFromProfileTypedDataResponse({
          variables: {
            request: {
              handle: request.handle,
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

  describe(`when creating a ${NativeTransaction.name}<UnlinkHandleRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockUnlinkHandleFromProfileResponse({
          variables: {
            request: {
              handle: request.handle,
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
