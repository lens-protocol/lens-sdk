import { MockedResponse } from '@apollo/client/testing';
import {
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataData,
  CreateFollowTypedDataVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockCreateFollowTypedDataData,
  mockLensApolloClient,
  mockBroadcastProxyActionCallResponse,
  createBroadcastProxyActionCallMockedError,
} from '@lens-protocol/api-bindings/mocks';
import { ProxyActionStatus, ProxyTransaction } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockPaidFollowRequest,
  mockProfileOwnerFollowRequest,
  mockUnconstrainedFollowRequest,
} from '@lens-protocol/domain/mocks';
import { UnconstrainedFollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionObserver } from '../../infrastructure/TransactionFactory';
import { FollowProfilesGateway } from '../FollowProfilesGateway';
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

function mockCreateFollowTypedDataMutationResponse({
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

function mockFollowProfilesGateway({
  apollo,
  factory,
}: {
  apollo: SafeApolloClient;
  factory: ITransactionFactory<UnconstrainedFollowRequest>;
}) {
  return new FollowProfilesGateway(apollo, factory, mock<ILogger>());
}

describe(`Given an instance of the ${FollowProfilesGateway.name}`, () => {
  describe(`when calling the "${FollowProfilesGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    describe('with an UnconstrainedFollowRequest', () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const request = mockUnconstrainedFollowRequest();
        const data = mockCreateFollowTypedDataData();

        const apollo = mockLensApolloClient([
          mockCreateFollowTypedDataMutationResponse({
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
        const followProfilesGateway = mockFollowProfilesGateway({ apollo, factory });

        const unsignedCall = await followProfilesGateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    describe('with a ProfileOwnerFollowRequest', () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const request = mockProfileOwnerFollowRequest();
        const data = mockCreateFollowTypedDataData();

        const apollo = mockLensApolloClient([
          mockCreateFollowTypedDataMutationResponse({
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
        const followProfilesGateway = mockFollowProfilesGateway({ apollo, factory });

        const unsignedCall = await followProfilesGateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    describe(`with a PaidFollowRequest`, () => {
      it(`should create an "${UnsignedProtocolCall.name}" w/ the expected typed data`, async () => {
        const request = mockPaidFollowRequest();
        const data = mockCreateFollowTypedDataData();

        const apollo = mockLensApolloClient([
          mockCreateFollowTypedDataMutationResponse({
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
        const followProfilesGateway = mockFollowProfilesGateway({ apollo, factory });

        const unsignedCall = await followProfilesGateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });
    });

    it(`should be possible to override the signature nonce`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const nonce = mockNonce();
      const apollo = mockLensApolloClient([
        mockCreateFollowTypedDataMutationResponse({
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
      const followProfilesGateway = mockFollowProfilesGateway({ apollo, factory });

      const unsignedCall = await followProfilesGateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when relaying an UnconstrainedFollowRequest via the "${FollowProfilesGateway.prototype.createProxyTransaction.name}" method`, () => {
    const request = mockUnconstrainedFollowRequest();
    it(`should succeed with ${ProxyTransaction.name} on Polygon`, async () => {
      const indexingId = 'indexing-id';
      const apollo = mockLensApolloClient([
        mockBroadcastProxyActionCallResponse({
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
      const followProfilesGateway = mockFollowProfilesGateway({
        apollo,
        factory,
      });

      const transactionResult = await followProfilesGateway.createProxyTransaction(request);

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

    it(`should fail with ${BroadcastingError.name} in the case of a broadcast failure`, async () => {
      const apollo = mockLensApolloClient([
        createBroadcastProxyActionCallMockedError({
          errorMessage: 'Failed to broadcast proxy action call',
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
        mockCreateFollowTypedDataMutationResponse({
          variables: {
            request: {
              follow: [
                {
                  profile: request.profileId,
                },
              ],
            },
          },
          data: mockCreateFollowTypedDataData(),
        }),
      ]);
      const mockTransactionObserver = mockITransactionObserver();
      const factory = mockITransactionFactory(mockTransactionObserver);
      const followProfilesGateway = mockFollowProfilesGateway({ apollo, factory });

      const transactionResult = await followProfilesGateway.createProxyTransaction(request);

      if (transactionResult.isSuccess()) throw new Error('Expected transaction to fail');

      expect(transactionResult.error).toEqual(
        new BroadcastingError('Failed to broadcast proxy action call'),
      );
      expect(transactionResult.error.fallback).toEqual(
        expect.objectContaining({
          ...request,
        }),
      );
    });
  });
});
