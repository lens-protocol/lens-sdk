/*
 * @jest-environment node
 */
import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockCreateUnlinkHandleFromProfileTypedDataData,
  mockCreateUnlinkHandleFromProfileTypedDataResponse,
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockUnlinkHandleFromProfileResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction, UnsignedTransaction } from '@lens-protocol/domain/entities';
import { mockUnlinkHandleRequest, mockWallet } from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../../config';
import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIProviderFactory } from '../../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../../AbstractContractCallGateway';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory, mockJsonRpcProvider } from '../../__helpers__/mocks';
import { UnlinkHandleGateway } from '../UnlinkHandleGateway';

function setupTestScenario({
  apolloClient,
  provider = mock<providers.JsonRpcProvider>(),
}: {
  apolloClient: SafeApolloClient;
  provider?: providers.JsonRpcProvider;
}) {
  const config = mock<RequiredConfig>();
  const transactionFactory = mockITransactionFactory();
  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  const gateway = new UnlinkHandleGateway(
    config,
    providerFactory,
    apolloClient,
    transactionFactory,
  );

  return { gateway };
}

describe(`Given an instance of ${UnlinkHandleGateway.name}`, () => {
  const request = mockUnlinkHandleRequest();

  describe(`when creating an ${UnsignedTransaction.name}<UnlinkHandleRequest>`, () => {
    const wallet = mockWallet();
    const data = mockCreateUnlinkHandleFromProfileTypedDataData();

    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const provider = await mockJsonRpcProvider();
      const apolloClient = mockLensApolloClient([
        mockCreateUnlinkHandleFromProfileTypedDataResponse({
          variables: {
            request: {
              handle: request.fullHandle,
            },
          },
          data,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient, provider });

      const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
    });
  });

  describe(`when creating an IUnsignedProtocolCall<UnlinkHandleRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const data = mockCreateUnlinkHandleFromProfileTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockCreateUnlinkHandleFromProfileTypedDataResponse({
          variables: {
            request: {
              handle: request.fullHandle,
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
              handle: request.fullHandle,
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
