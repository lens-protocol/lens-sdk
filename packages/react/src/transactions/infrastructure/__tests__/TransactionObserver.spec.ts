/**
 * @jest-environment node
 */

import { faker } from '@faker-js/faker';
import {
  SafeApolloClient,
  ProxyActionStatusTypes,
  TransactionErrorReasons,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockHasTxHashBeenIndexedData,
  createHasTxHashBeenIndexedMockedResponse,
  createProxyActionStatusMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import {
  ProxyActionStatus,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
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
            blockTime: 60, // seconds
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

  describe(`when invoking ${TransactionObserver.prototype.waitForNextIndexingEvent.name} with a tx hash"`, () => {
    const txHash = mockTransactionHash();

    it('should succeed with indexed=true if the tx has been indexed by the BE', async () => {
      const responses = [
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txHash },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: true,
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
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txHash },
          },
          data: mockHasTxHashBeenIndexedData({
            reason: TransactionErrorReasons.Reverted,
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
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txHash },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: false,
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
      const result = await transaction.waitForNextIndexingEvent({ txHash });

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(
        TransactionErrorReason.INDEXING_TIMEOUT,
      );
    });
  });

  describe(`when invoking ${TransactionObserver.prototype.waitForNextIndexingEvent.name} with an indexing ID`, () => {
    const indexingId = faker.datatype.uuid();

    it('should succeed with indexed=true if the tx has been indexed by the BE', async () => {
      const txHash = mockTransactionHash();
      const responses = [
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: true,
            txHash,
          }),
        }),
      ];
      const apolloClient = mockLensApolloClient(responses);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const event = await transaction.waitForNextIndexingEvent({ indexingId });
      expect(event.unwrap()).toEqual({
        indexed: true,
        txHash,
      });
    });

    it('should succeed with any new txHash if the it changes before being indexed', async () => {
      const upgradedTxHash = mockTransactionHash();
      const responses = [
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: false,
            txHash: mockTransactionHash(),
          }),
        }),
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: false,
            txHash: upgradedTxHash,
          }),
        }),
      ];
      const apolloClient = mockLensApolloClient(responses);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const event = await transaction.waitForNextIndexingEvent({ indexingId });
      expect(event.unwrap()).toEqual({
        indexed: false,
        txHash: upgradedTxHash,
      });
    });

    it('should succeed return any new txHash also as the tx is flagged as indexed by the BE', async () => {
      const initialTxHash = mockTransactionHash();
      const upgradedTxHash = mockTransactionHash();
      const responses = [
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: false,
            txHash: initialTxHash,
          }),
        }),
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: true,
            txHash: upgradedTxHash,
          }),
        }),
      ];
      const apolloClient = mockLensApolloClient(responses);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const event = await transaction.waitForNextIndexingEvent({ indexingId });
      expect(event.unwrap()).toEqual({
        indexed: true,
        txHash: upgradedTxHash,
      });
    });

    it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.REVERTED}] if the tx gets reverted`, async () => {
      const apolloClient = mockLensApolloClient([
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            reason: TransactionErrorReasons.Reverted,
          }),
        }),
      ]);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const result = await transaction.waitForNextIndexingEvent({ indexingId });

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(TransactionErrorReason.REVERTED);
    });

    it(`should fail with ${TransactionError.name}[reason: ${TransactionErrorReason.INDEXING_TIMEOUT}] if the tx is not indexed within a reasonable time`, async () => {
      const txHash = mockTransactionHash();
      const apolloClient = mockLensApolloClient([
        createHasTxHashBeenIndexedMockedResponse({
          variables: {
            request: { txId: indexingId },
          },
          data: mockHasTxHashBeenIndexedData({
            indexed: false,
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
      const result = await transaction.waitForNextIndexingEvent({ indexingId });

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(
        TransactionErrorReason.INDEXING_TIMEOUT,
      );
    });
  });

  describe(`when invoking ${TransactionObserver.prototype.waitForProxyTransactionStatus.name} with a proxy ID`, () => {
    const proxyId = 'proxyId';

    it(`should succeed with the expected ProxyActionStatusEvent if the action has ${ProxyActionStatusTypes.Complete} status`, async () => {
      const txHash = mockTransactionHash();
      const txId = faker.datatype.uuid();
      const responses = [
        createProxyActionStatusMockedResponse({
          variables: { proxyActionId: proxyId },
          result: { status: ProxyActionStatusTypes.Complete, txHash, txId },
        }),
      ];
      const apolloClient = mockLensApolloClient(responses);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const event = await transaction.waitForProxyTransactionStatus(proxyId);
      expect(event.unwrap()).toEqual({
        status: ProxyActionStatus.COMPLETE,
        txHash,
      });
    });

    it(`should succeed with the expected ProxyActionStatusEvent if the txHash changes before the action reaches ${ProxyActionStatusTypes.Complete} status`, async () => {
      const txId = faker.datatype.uuid();
      const initialTxHash = mockTransactionHash();
      const upgradedTxHash = mockTransactionHash();
      const lastTxHash = mockTransactionHash();
      const responses = [
        createProxyActionStatusMockedResponse({
          variables: { proxyActionId: proxyId },
          result: {
            status: ProxyActionStatusTypes.Minting,
            txHash: initialTxHash,
            txId,
          },
        }),
        createProxyActionStatusMockedResponse({
          variables: { proxyActionId: proxyId },
          result: {
            status: ProxyActionStatusTypes.Minting,
            txHash: upgradedTxHash,
            txId,
          },
        }),
        createProxyActionStatusMockedResponse({
          variables: { proxyActionId: proxyId },
          result: {
            status: ProxyActionStatusTypes.Complete,
            txHash: lastTxHash,
            txId,
          },
        }),
      ];
      const apolloClient = mockLensApolloClient(responses);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const event = await transaction.waitForProxyTransactionStatus(proxyId);

      expect(event.unwrap()).toEqual({
        status: ProxyActionStatus.COMPLETE,
        txHash: upgradedTxHash,
      });
    });

    it(`should fail with ${TransactionError.name} for ${TransactionErrorReason.UNKNOWN} reason if the proxy action returns an error`, async () => {
      const apolloClient = mockLensApolloClient([
        createProxyActionStatusMockedResponse({
          variables: { proxyActionId: proxyId },
          result: {
            reason: 'UNKNOWN_ERROR',
            lastKnownTxId: faker.datatype.uuid(),
          },
        }),
      ]);
      const transaction = setupTransactionObserver({
        apolloClient,
      });

      const result = await transaction.waitForProxyTransactionStatus(proxyId);

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(TransactionErrorReason.UNKNOWN);
    });

    it(`should fail with ${TransactionError.name} for ${TransactionErrorReason.INDEXING_TIMEOUT} reason if the action is not completed within a reasonable time frame`, async () => {
      const txHash = mockTransactionHash();
      const apolloClient = mockLensApolloClient([
        createProxyActionStatusMockedResponse({
          variables: { proxyActionId: proxyId },
          result: {
            status: ProxyActionStatusTypes.Minting,
            txHash: txHash,
            txId: faker.datatype.uuid(),
          },
        }),
      ]);

      const transaction = setupTransactionObserver({
        apolloClient,
        timings: {
          pollingInterval: 1,
          maxMiningWaitTime: 1000, // ms
          maxIndexingWaitTime: 0.5, // ms
        },
      });
      const result = await transaction.waitForProxyTransactionStatus(proxyId);

      expect(() => result.unwrap()).toThrow(TransactionError);
      expect(result.isFailure() && result.error.reason).toBe(
        TransactionErrorReason.INDEXING_TIMEOUT,
      );
    });
  });
});
