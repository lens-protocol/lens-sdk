/*
 * @jest-environment node
 */
import { SafeApolloClient, resolveFollowModuleInput } from '@lens-protocol/api-bindings';
import {
  mockCreateSetFollowModuleTypedDataData,
  mockCreateSetFollowModuleTypedDataResponse,
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockSetFollowModuleResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction, UnsignedTransaction } from '@lens-protocol/domain/entities';
import { mockUpdateFollowPolicyRequest, mockWallet } from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../../config';
import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIProviderFactory } from '../../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../../AbstractContractCallGateway';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory, mockJsonRpcProvider } from '../../__helpers__/mocks';
import { UpdateFollowPolicyGateway } from '../UpdateFollowPolicyGateway';

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

  const gateway = new UpdateFollowPolicyGateway(
    config,
    providerFactory,
    apolloClient,
    transactionFactory,
  );

  return { gateway };
}

describe(`Given an instance of ${UpdateFollowPolicyGateway.name}`, () => {
  const request = mockUpdateFollowPolicyRequest();

  describe(`when creating an ${UnsignedTransaction.name}<UpdateFollowPolicyRequest>`, () => {
    const wallet = mockWallet();
    const data = mockCreateSetFollowModuleTypedDataData();

    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const provider = await mockJsonRpcProvider();
      const apolloClient = mockLensApolloClient([
        mockCreateSetFollowModuleTypedDataResponse({
          variables: {
            request: {
              followModule: resolveFollowModuleInput(request.policy),
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

  describe(`when creating an IUnsignedProtocolCall<UpdateFollowPolicyRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const data = mockCreateSetFollowModuleTypedDataData();

      const apolloClient = mockLensApolloClient([
        mockCreateSetFollowModuleTypedDataResponse({
          variables: {
            request: {
              followModule: resolveFollowModuleInput(request.policy),
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
              followModule: resolveFollowModuleInput(request.policy),
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
