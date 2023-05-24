import { MockedResponse } from '@apollo/client/testing';
import {
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataData,
  CreateFollowTypedDataVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockCreateFollowTypedDataData,
  createMockApolloClientWithMultipleResponses,
  createBroadcastProxyActionCallMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ProxyActionStatus } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockPaidFollowRequest,
  mockProfileOwnerFollowRequest,
  mockUnconstrainedFollowRequest,
} from '@lens-protocol/domain/mocks';
import { UnconstrainedFollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { ChainType, ILogger, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionObserver } from '../../infrastructure/TransactionFactory';
import { FollowProfilesCallGateway } from '../FollowProfilesCallGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  assertUnsignedProtocolCallCorrectness,
  mockITransactionFactory,
} from '../__helpers__/mocks';

jest.mock('@lens-protocol/shared-kernel', () => {
  // eslint-disable-next-line
  const actual = jest.requireActual('@lens-protocol/shared-kernel');

  // eslint-disable-next-line
  return {
    ...actual,
    getID: jest.fn(() => 'id'),
  };
});

function createCreateFollowTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateFollowTypedDataVariables;
  data: CreateFollowTypedDataData;
}): MockedResponse<CreateFollowTypedDataData> {
  return {
    request: {
      query: CreateFollowTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

function mockITransactionObserver() {
  const observer = mock<ITransactionObserver>();
  observer.waitForProxyTransactionStatus.mockResolvedValue(
    success({ txHash: 'tx-hash', status: ProxyActionStatus.MINTING, txId: 'tx-id' }),
  );
  return observer;
}

function mockFollowProfilesCallGateway({
  apollo,
  factory,
}: {
  apollo: LensApolloClient;
  factory: ITransactionFactory<UnconstrainedFollowRequest>;
}) {
  return new FollowProfilesCallGateway(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${FollowProfilesCallGateway.name}`, () => {
  describe(`when calling the "${FollowProfilesCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    describe('with an UnconstrainedFollowRequest', () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const request = mockUnconstrainedFollowRequest();
        const data = mockCreateFollowTypedDataData();

        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateFollowTypedDataMutationMockedResponse({
            variables: {
              request: {
                follow: [
                  {
                    profile: request.profileId,
                  },
                ],
              },
            },
            data,
          }),
        ]);
        const mockTransactionObserver = mockITransactionObserver();
        const factory = mockITransactionFactory(mockTransactionObserver);
        const followProfilesCallGateway = mockFollowProfilesCallGateway({ apollo, factory });

        const unsignedCall = await followProfilesCallGateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    describe('with a ProfileOwnerFollowRequest', () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const request = mockProfileOwnerFollowRequest();
        const data = mockCreateFollowTypedDataData();

        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateFollowTypedDataMutationMockedResponse({
            variables: {
              request: {
                follow: [
                  {
                    profile: request.profileId,
                    followModule: {
                      profileFollowModule: {
                        profileId: request.followerProfileId,
                      },
                    },
                  },
                ],
              },
            },
            data,
          }),
        ]);
        const mockTransactionObserver = mockITransactionObserver();
        const factory = mockITransactionFactory(mockTransactionObserver);
        const followProfilesCallGateway = mockFollowProfilesCallGateway({ apollo, factory });

        const unsignedCall = await followProfilesCallGateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    describe(`with a PaidFollowRequest`, () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const request = mockPaidFollowRequest();
        const data = mockCreateFollowTypedDataData();

        const apollo = createMockApolloClientWithMultipleResponses([
          createCreateFollowTypedDataMutationMockedResponse({
            variables: {
              request: {
                follow: [
                  {
                    profile: request.profileId,
                    followModule: {
                      feeFollowModule: {
                        amount: {
                          currency: request.fee.amount.asset.address,
                          value: request.fee.amount.toFixed(),
                        },
                      },
                    },
                  },
                ],
              },
            },
            data,
          }),
        ]);
        const mockTransactionObserver = mockITransactionObserver();
        const factory = mockITransactionFactory(mockTransactionObserver);
        const followProfilesCallGateway = mockFollowProfilesCallGateway({ apollo, factory });

        const unsignedCall = await followProfilesCallGateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    it(`should be possible to override the signature nonce`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const nonce = mockNonce();
      const apollo = createMockApolloClientWithMultipleResponses([
        createCreateFollowTypedDataMutationMockedResponse({
          variables: {
            request: {
              follow: [
                {
                  profile: request.profileId,
                },
              ],
            },
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateFollowTypedDataData({ nonce }),
        }),
      ]);
      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const followProfilesCallGateway = mockFollowProfilesCallGateway({ apollo, factory });

      const unsignedCall = await followProfilesCallGateway.createUnsignedProtocolCall(
        request,
        nonce,
      );

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when calling the "${FollowProfilesCallGateway.prototype.createProxyTransaction.name}" method`, () => {
    describe('with an UnconstrainedFollowRequest', () => {
      const request = mockUnconstrainedFollowRequest();
      it(`should resolve with  on Polygon`, async () => {
        const indexingId = 'indexing-id';
        const apollo = createMockApolloClientWithMultipleResponses([
          createBroadcastProxyActionCallMockedResponse({
            result: indexingId,
            variables: {
              request: {
                follow: {
                  freeFollow: {
                    profileId: request.profileId,
                  },
                },
              },
            },
          }),
        ]);
        const mockTransactionObserver = mockITransactionObserver();
        const factory = mockITransactionFactory(mockTransactionObserver);
        const followProfilesCallGateway = mockFollowProfilesCallGateway({ apollo, factory });

        const transactionResult = await followProfilesCallGateway.createProxyTransaction(request);

        if (transactionResult.isFailure()) throw transactionResult.error;

        const transaction = transactionResult.value;

        await transaction.waitNextEvent();

        expect(transaction).toEqual(
          expect.objectContaining({
            chainType: ChainType.POLYGON,
            id: 'id',
            request,
            status: ProxyActionStatus.MINTING,
          }),
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        expect((transaction as any).state.proxyId).toEqual(indexingId);
      });
    });
  });
});
