import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockBlockProfilesResponse,
  mockBlockProfilesTypedDataData,
  mockBlockProfilesTypedDataResponse,
  mockLensApolloClient,
  mockRelaySuccessFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockBlockProfilesRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { BlockProfilesGateway } from '../BlockProfilesGateway';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new BlockProfilesGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${BlockProfilesGateway.name}`, () => {
  describe(`when creating an IUnsignedProtocolCall<FollowRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const request = mockBlockProfilesRequest();
      const data = mockBlockProfilesTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockBlockProfilesTypedDataResponse({
          variables: {
            request: {
              profiles: request.profileIds,
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

  describe(`when creating a ${NativeTransaction.name}<FreeFollowRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const request = mockBlockProfilesRequest();

      const apolloClient = mockLensApolloClient([
        mockBlockProfilesResponse({
          variables: {
            request: {
              profiles: request.profileIds,
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
