/**
 * @jest-environment node
 */

import { faker } from '@faker-js/faker';
import {
  LensTransactionFailureType,
  LensTransactionStatusType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockLensTransactionStatusDataResponse,
  mockLensTransactionResult,
} from '@lens-protocol/api-bindings/mocks';
import { TransactionError, TransactionErrorReason } from '@lens-protocol/domain/entities';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { ChainType, InvariantError } from '@lens-protocol/shared-kernel';
import { MockProvider } from 'ethereum-waffle';
import { providers, utils, Wallet } from 'ethers';
import { mock } from 'jest-mock-extended';

import { mockIProviderFactory } from '../../../wallet/adapters/__helpers__/mocks';
import { TransactionObserver, TransactionObserverTimings } from '../TransactionObserver';

const chainType = ChainType.POLYGON;

function setupTransactionObserver({
  apolloClient = mock<SafeApolloClient>(),
  timings = {
    pollingInterval: 1,
    maxIndexingWaitTime: 1000,
    maxMiningWaitTime: 1000,
  },
  provider = mock<providers.JsonRpcProvider>(),
}: {
  apolloClient?: SafeApolloClient;
  timings?: TransactionObserverTimings;
  provider?: providers.JsonRpcProvider;
}) {
  const providerFactory = mockIProviderFactory({
    chainType,
    provider,
  });
  return new TransactionObserver(providerFactory, apolloClient, timings);
}

async function createBlockchainTransaction(provider: MockProvider) {
  const [walletFrom, walletTo] = provider.getWallets() as [Wallet, Wallet];
  const txResponse = await walletFrom.sendTransaction({
    to: walletTo.address,
    from: walletFrom.address,
    value: utils.parseEther('1'),
  });
  return txResponse.hash;
}

describe(`Given an instance of the ${TransactionObserver.name}`, () => {
  describe(`when invoking ${TransactionObserver.prototype.waitForConfirmation.name} with a tx hash`, () => {
    it('should succeed if the tx is mined within a reasonable time', async () => {
      const provider = new MockProvider();
      const transaction = setupTransactionObserver({
        provider,
      });

      const txHash = await createBlockchainTransaction(provider);
      const result = await transaction.waitForConfirmation({ txHash, chainType });

      expect(result.isSuccess()).toBe(true);
    }, 15_000);

    it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.MINING_TIMEOUT}] if the tx is not found within a reasonable time`, async () => {
      const provider = new MockProvider();

      const transaction = setupTransactionObserver({
        provider,
      });
      const txHash = mockTransactionHash();
      const result = await transaction.waitForConfirmation({ txHash, chainType });

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(TransactionErrorReason.MINING_TIMEOUT);
    }, 15_000);

    // This test is temporarily skipped because the previous strategy to test stale tx does not work with the new version of Ganache
    it.skip(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.MINING_TIMEOUT}] if the tx is found but not mined within a reasonable time`, async () => {
      const provider = new MockProvider({
        ganacheOptions: {
          miner: {
            blockTime: 60, // seconds // this used to be enough to simulate a stale tx
          },
        },
      });
      const transaction = setupTransactionObserver({
        timings: {
          pollingInterval: 1,
          maxMiningWaitTime: 1000, // ms
          maxIndexingWaitTime: 120_000, // ms
        },
        provider,
      });

      const txHash = await createBlockchainTransaction(provider);
      const result = await transaction.waitForConfirmation({ txHash, chainType });

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(TransactionErrorReason.MINING_TIMEOUT);
    }, 15_000);
  });

  describe(`when invoking ${TransactionObserver.prototype.waitForNextIndexingEvent.name}`, () => {
    describe(`with a tx hash`, () => {
      const txHash = mockTransactionHash();

      it('should succeed with indexed=true if the tx has been indexed by the BE', async () => {
        const responses = [
          mockLensTransactionStatusDataResponse({
            request: { forTxHash: txHash },
            result: null, // simulates a tx not reached the nodes used by the indexer to monitor on-chain events
          }),
          mockLensTransactionStatusDataResponse({
            request: { forTxHash: txHash },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Complete,
              txHash,
            }),
          }),
        ];
        const apolloClient = mockLensApolloClient(responses);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        const event = await transaction.waitForNextIndexingEvent({ txHash });
        expect(event.unwrap()).toEqual({
          indexed: true,
          txHash,
        });
      });

      it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.REVERTED}] if the tx gets reverted`, async () => {
        const apolloClient = mockLensApolloClient([
          mockLensTransactionStatusDataResponse({
            request: { forTxHash: txHash },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Failed,
              reason: LensTransactionFailureType.Reverted,
            }),
          }),
        ]);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        const result = await transaction.waitForNextIndexingEvent({ txHash });

        expect(() => result.unwrap()).toThrow(TransactionError);
        expect(result.isFailure() && result.error.reason).toBe(TransactionErrorReason.REVERTED);
      });

      it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.INDEXING_TIMEOUT}] if the tx is not indexed within a reasonable time`, async () => {
        const txHash = mockTransactionHash();
        const apolloClient = mockLensApolloClient([
          mockLensTransactionStatusDataResponse({
            request: { forTxHash: txHash },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Processing,
            }),
          }),
        ]);

        const transaction = setupTransactionObserver({
          apolloClient,
          timings: {
            pollingInterval: 1,
            maxMiningWaitTime: 1000, // ms
            maxIndexingWaitTime: 1, // ms
          },
        });
        const result = await transaction.waitForNextIndexingEvent({ txHash });

        expect(() => result.unwrap()).toThrow(TransactionError);
        expect(result.isFailure() && result.error.reason).toBe(
          TransactionErrorReason.INDEXING_TIMEOUT,
        );
      });
    });

    describe(`with an tx ID`, () => {
      const txId = faker.datatype.uuid();

      it('should succeed with indexed=true if the tx has been indexed by the BE', async () => {
        const txHash = mockTransactionHash();
        const responses = [
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Complete,
              txHash,
            }),
          }),
        ];
        const apolloClient = mockLensApolloClient(responses);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        const event = await transaction.waitForNextIndexingEvent({ relayerTxId: txId });
        expect(event.unwrap()).toEqual({
          indexed: true,
          txHash,
        });
      });

      it('should succeed with any new txHash if the it changes before being indexed', async () => {
        const upgradedTxHash = mockTransactionHash();
        const responses = [
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Processing,
              txHash: mockTransactionHash(),
            }),
          }),
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Processing,
              txHash: upgradedTxHash,
            }),
          }),
        ];
        const apolloClient = mockLensApolloClient(responses);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        const event = await transaction.waitForNextIndexingEvent({ relayerTxId: txId });
        expect(event.unwrap()).toEqual({
          indexed: false,
          txHash: upgradedTxHash,
        });
      });

      it('should succeed return any new txHash also as the tx is flagged as indexed by the BE', async () => {
        const initialTxHash = mockTransactionHash();
        const upgradedTxHash = mockTransactionHash();
        const responses = [
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Processing,
              txHash: initialTxHash,
            }),
          }),
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Complete,
              txHash: upgradedTxHash,
            }),
          }),
        ];
        const apolloClient = mockLensApolloClient(responses);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        const event = await transaction.waitForNextIndexingEvent({ relayerTxId: txId });
        expect(event.unwrap()).toEqual({
          indexed: true,
          txHash: upgradedTxHash,
        });
      });

      // skipped until api race condition is solved
      it.skip(`should fail with an ${InvariantError.name} if the tx is not found`, async () => {
        const responses = [
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: null,
          }),
        ];
        const apolloClient = mockLensApolloClient(responses);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        await expect(() =>
          transaction.waitForNextIndexingEvent({ relayerTxId: txId }),
        ).rejects.toThrow(InvariantError);
      });

      it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.REVERTED}] if the tx gets reverted`, async () => {
        const apolloClient = mockLensApolloClient([
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Failed,
              reason: LensTransactionFailureType.Reverted,
            }),
          }),
        ]);
        const transaction = setupTransactionObserver({
          apolloClient,
        });

        const result = await transaction.waitForNextIndexingEvent({ relayerTxId: txId });

        expect(() => result.unwrap());
        expect(result.isFailure() && result.error.reason).toBe(TransactionErrorReason.REVERTED);
      });

      it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.INDEXING_TIMEOUT}] if the tx is not indexed within a reasonable time`, async () => {
        const txHash = mockTransactionHash();
        const apolloClient = mockLensApolloClient([
          mockLensTransactionStatusDataResponse({
            request: { forTxId: txId },
            result: mockLensTransactionResult({
              status: LensTransactionStatusType.Processing,
              txHash,
            }),
          }),
        ]);

        const transaction = setupTransactionObserver({
          apolloClient,
          timings: {
            pollingInterval: 1,
            maxMiningWaitTime: 1000, // ms
            maxIndexingWaitTime: 1, // ms
          },
        });
        const result = await transaction.waitForNextIndexingEvent({ relayerTxId: txId });

        expect(() => result.unwrap()).toThrow(TransactionError);
        expect(result.isFailure() && result.error.reason).toBe(
          TransactionErrorReason.INDEXING_TIMEOUT,
        );
      });
    });
  });
});
