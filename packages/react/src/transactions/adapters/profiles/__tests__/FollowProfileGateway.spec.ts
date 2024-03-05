/*
 * @jest-environment node
 */
import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockCreateFollowTypedDataData,
  mockCreateFollowTypedDataResponse,
  mockFollowResponse,
  mockLensApolloClient,
  mockRelaySuccessFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  mockFreeFollowRequest,
  mockPaidFollowRequest,
  mockUnknownFollowRequest,
  mockWallet,
} from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../../config';
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
  const config = mock<RequiredConfig>();
  const transactionFactory = mockITransactionFactory();
  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  const gateway = new FollowProfileGateway(
    config,
    providerFactory,
    apolloClient,
    transactionFactory,
  );

  return { gateway };
}

const freeFollowRequest = mockFreeFollowRequest();
const paidFollowRequest = mockPaidFollowRequest();
const baseUnknownFollowRequest = mockUnknownFollowRequest();

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
    {
      name: 'FreeFollowRequest',
      request: freeFollowRequest,
      variables: {
        request: {
          follow: [{ profileId: freeFollowRequest.profileId }],
        },
      },
    },
    {
      name: 'UnknownFollowRequest',
      request: baseUnknownFollowRequest,
      variables: {
        request: {
          follow: [
            {
              profileId: baseUnknownFollowRequest.profileId,
              followModule: {
                unknownFollowModule: {
                  address: baseUnknownFollowRequest.address,
                  data: baseUnknownFollowRequest.data,
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

      it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
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

  describe.each([
    {
      name: 'FreeFollowRequest',
      request: freeFollowRequest,
      variables: {
        request: {
          follow: [{ profileId: freeFollowRequest.profileId }],
        },
      },
    },
    {
      name: 'UnknownFollowRequest',
      request: baseUnknownFollowRequest,
      variables: {
        request: {
          follow: [
            {
              profileId: baseUnknownFollowRequest.profileId,
              followModule: {
                unknownFollowModule: {
                  address: baseUnknownFollowRequest.address,
                  data: baseUnknownFollowRequest.data,
                },
              },
            },
          ],
        },
      },
    },
  ])('and a $name', ({ name, request, variables }) => {
    describe(`when creating a ${NativeTransaction.name}<${name}>`, () => {
      it(`should create an instance of the ${NativeTransaction.name}`, async () => {
        const apolloClient = mockLensApolloClient([
          mockFollowResponse({
            variables,
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
            request: request,
          }),
        );
      });
    });
  });
});
