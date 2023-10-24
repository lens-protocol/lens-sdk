import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockCreateLinkHandleToProfileTypedDataData,
  mockCreateLinkHandleToProfileTypedDataResponse,
  mockLinkHandleToProfileResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockLinkHandleRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { LinkHandleGateway } from '../LinkHandleGateway';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new LinkHandleGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${LinkHandleGateway.name}`, () => {
  const request = mockLinkHandleRequest();

  describe(`when creating an IUnsignedProtocolCall<LinkHandleRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const data = mockCreateLinkHandleToProfileTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockCreateLinkHandleToProfileTypedDataResponse({
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

  describe(`when creating a ${NativeTransaction.name}<LinkHandleRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockLinkHandleToProfileResponse({
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
