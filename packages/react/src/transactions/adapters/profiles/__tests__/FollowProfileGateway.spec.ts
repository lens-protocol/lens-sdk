/*
 * @jest-environment node
 */
import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockRelaySuccessFragment,
  mockCreateFollowTypedDataResponse,
  mockFollowResponse,
  mockCreateFollowTypedDataData,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  mockPaidFollowRequest,
  mockFreeFollowRequest,
  mockWallet,
} from '@lens-protocol/domain/mocks';
import { ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIProviderFactory } from '../../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../../AbstractContractCallGateway';
import { assertUnsignedProtocolCallCorrectness } from '../../__helpers__/assertions';
import { mockITransactionFactory, mockJsonRpcProvider } from '../../__helpers__/mocks';
import { FollowProfileGateway } from '../FollowProfileGateway';

function setupTestScenario({
  apolloClient,
  provider = mock<providers.JsonRpcProvider>(),
}: {
  apolloClient: SafeApolloClient;
  provider?: providers.JsonRpcProvider;
}) {
  const logger = mock<ILogger>();
  const transactionFactory = mockITransactionFactory();
  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  const gateway = new FollowProfileGateway(
    logger,
    providerFactory,
    apolloClient,
    transactionFactory,
  );

  return { gateway };
}

const freeFollowRequest = mockFreeFollowRequest();
const paidFollowRequest = mockPaidFollowRequest();

describe(`Given an instance of ${FollowProfileGateway.name}`, () => {
  describe.each([
    {
      name: 'PaidFollowRequest',
      request: paidFollowRequest,
      variables: {
        request: {
          follow: [
            {
              profileId: paidFollowRequest.profileId,
              followModule: {
                feeFollowModule: {
                  amount: {
                    currency: paidFollowRequest.fee.amount.asset.address,
                    value: paidFollowRequest.fee.amount.toSignificantDigits(),
                  },
                },
              },
            },
          ],
        },
      },
    },
  ])('and a $name', ({ name, request, variables }) => {
    const data = mockCreateFollowTypedDataData();

    describe(`when creating an IUnsignedProtocolCall<FollowRequest>`, () => {
      it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
        const apolloClient = mockLensApolloClient([
          mockCreateFollowTypedDataResponse({
            variables,
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    describe(`when creating an ${UnsignedTransaction.name}<${name}>`, () => {
      const wallet = mockWallet();

      it(`should succeed with the expected ${UnsignedContractCallTransaction.name}`, async () => {
        const provider = await mockJsonRpcProvider();
        const apolloClient = mockLensApolloClient([
          mockCreateFollowTypedDataResponse({
            variables,
            data,
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient, provider });

        const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

        expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
      });
    });
  });

  describe(`when creating a ${NativeTransaction.name}<FreeFollowRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockFollowResponse({
          variables: {
            request: {
              follow: [{ profileId: freeFollowRequest.profileId }],
            },
          },
          data: {
            result: mockRelaySuccessFragment(),
          },
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const result = await gateway.createDelegatedTransaction(freeFollowRequest);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          request: freeFollowRequest,
        }),
      );
    });
  });
});
