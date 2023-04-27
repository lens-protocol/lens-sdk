import { mock } from 'jest-mock-extended';
import waitFor from 'wait-for-expect';

import {
  AnyTransactionRequestModel,
  TransactionEvent,
  TransactionError,
  TransactionErrorReason,
} from '../../../entities';
import {
  MockedMetaTransaction,
  mockTransactionHash,
  mockAnyTransactionRequestModel,
} from '../../../entities/__helpers__/mocks';
import { mockCreatePostRequest } from '../../publications/__helpers__/mocks';
import {
  IPendingTransactionGateway,
  ITransactionQueuePresenter,
  ITransactionResponder,
  TransactionQueue,
  TransactionResponders,
} from '../TransactionQueue';

function mockResponders<T extends AnyTransactionRequestModel>(
  mocks: Partial<TransactionResponders<T>>,
): TransactionResponders<T> {
  return mocks as TransactionResponders<T>;
}

function setupTestScenario<T extends AnyTransactionRequestModel>({
  request = mockAnyTransactionRequestModel() as T,
}: {
  request?: T;
} = {}) {
  const responder = mock<ITransactionResponder<typeof request>>();
  const responders = mockResponders({ [request.kind]: responder });

  const transactionGateway = mock<IPendingTransactionGateway<T>>();
  const transactionQueuePresenter = mock<ITransactionQueuePresenter<T>>();

  const transactionQueue = new TransactionQueue(
    responders,
    transactionGateway,
    transactionQueuePresenter,
  );

  const waitForPrepare = async () => {
    await waitFor(() => {
      expect(responder.prepare).toHaveBeenCalled();
    });
  };
  const waitForCommit = async () => {
    await waitFor(() => {
      expect(responder.commit).toHaveBeenCalled();
    });
  };
  const waitForRollback = async () => {
    await waitFor(() => {
      expect(responder.rollback).toHaveBeenCalled();
    });
  };

  return {
    responder,
    transactionGateway,
    transactionQueue,
    transactionQueuePresenter,
    waitForCommit,
    waitForPrepare,
    waitForRollback,
  };
}
const request = mockCreatePostRequest();

describe(`Given an instance of the ${TransactionQueue.name} interactor`, () => {
  describe(`when pushing a new transaction`, () => {
    it(`should optimistically present the transaction data to the user`, async () => {
      const { responder, transactionQueue, transactionQueuePresenter } = setupTestScenario({
        request,
      });

      const transaction = MockedMetaTransaction.fromRawData(
        { request },
        {
          withUpdatesSequence: [
            {
              event: TransactionEvent.BROADCASTED,
            },
            { event: TransactionEvent.SETTLED, txHash: mockTransactionHash() },
          ],
        },
      );
      await transactionQueue.push(transaction);

      const expectedTxData = {
        id: transaction.id,
        request,
      };
      expect(responder.prepare).toHaveBeenCalledWith(expectedTxData);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledWith(expectedTxData);
    });

    it(`should asynchronously:
        - persist the transaction via the transactions gateway
        - wait for the transaction to be broadcasted
        - present the updated transaction data`, async () => {
      const {
        responder,
        transactionGateway,
        transactionQueue,
        transactionQueuePresenter,
        waitForCommit,
      } = setupTestScenario({
        request,
      });

      const transaction = MockedMetaTransaction.fromRawData(
        { request, hash: mockTransactionHash() },
        {
          withUpdatesSequence: [{ event: TransactionEvent.SETTLED }],
        },
      );
      await transactionQueue.push(transaction);

      await waitForCommit();
      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
        txHash: transaction.hash,
      };
      expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
      expect(transactionGateway.save).toHaveBeenCalledWith(transaction);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledTimes(1);
      expect(transactionQueuePresenter.pending).toHaveBeenLastCalledWith(expectedTxData);
    });

    it('should store and present any tx hash updates to the transaction data', async () => {
      const { transactionGateway, transactionQueue, transactionQueuePresenter, waitForCommit } =
        setupTestScenario({
          request,
        });

      const transaction = MockedMetaTransaction.fromRawData(
        { request },
        {
          withUpdatesSequence: [
            { event: TransactionEvent.UPGRADED, txHash: mockTransactionHash() },
            { event: TransactionEvent.UPGRADED, txHash: mockTransactionHash() },
            { event: TransactionEvent.SETTLED, txHash: mockTransactionHash() },
          ],
        },
      );
      await transactionQueue.push(transaction);

      await waitForCommit();
      expect(transactionGateway.save).toHaveBeenCalledTimes(1 + 2); // initial save + 2 updates
      expect(transactionQueuePresenter.pending).toHaveBeenCalledTimes(1 + 2); // initial presentation + 2 updates
      expect(transactionQueuePresenter.settled).toHaveBeenCalledTimes(1);
    });

    describe('that eventually settles', () => {
      it(`should:
          - delete the transaction from underlying storage via the transactions gateway
          - invoke the corresponding responder "commit"
          - present the settled transaction data`, async () => {
        const {
          responder,
          transactionGateway,
          transactionQueue,
          transactionQueuePresenter,
          waitForCommit,
        } = setupTestScenario({
          request,
        });

        const transaction = MockedMetaTransaction.fromRawData(
          { request },
          {
            withUpdatesSequence: [
              { event: TransactionEvent.BROADCASTED },
              { event: TransactionEvent.SETTLED, txHash: mockTransactionHash() },
            ],
          },
        );
        await transactionQueue.push(transaction);

        await waitForCommit();
        const expectedTxData = {
          id: transaction.id,
          request: transaction.request,
          txHash: transaction.hash,
        };
        expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
        expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
        expect(transactionQueuePresenter.settled).toHaveBeenCalledWith(expectedTxData);
      });
    });

    describe('that eventually fails', () => {
      it(`should:
          - delete the transaction from underlying storage via the transactions gateway
          - invoke the corresponding responder "rollback"
          - present the error with the failed transaction data`, async () => {
        const error = new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
        const {
          responder,
          transactionGateway,
          transactionQueue,
          transactionQueuePresenter,
          waitForRollback,
        } = setupTestScenario({
          request,
        });

        const transaction = MockedMetaTransaction.fromRawData(
          { request },
          {
            withUpdatesSequence: [
              {
                event: TransactionEvent.BROADCASTED,
              },
              { error },
            ],
          },
        );
        await transactionQueue.push(transaction);

        const expectedTxData = {
          id: transaction.id,
          request: transaction.request,
        };
        await waitForRollback();
        expect(responder.rollback).toHaveBeenCalledWith(expectedTxData);
        expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
        expect(transactionQueuePresenter.failed).toHaveBeenCalledWith(error, expectedTxData);
      });
    });
  });

  describe(`when resuming the queue from long term storage`, () => {
    const txHash = mockTransactionHash();
    const transaction = MockedMetaTransaction.fromRawData(
      { request },
      {
        withUpdatesSequence: [{ event: TransactionEvent.SETTLED, txHash }],
      },
    );

    it(`should:
        - load any transactions from transactions gateway
        - present the transactions data to the user
        - wait for the transactions to complete and execute the expected success or failure logic as normal`, async () => {
      const {
        responder,
        transactionGateway,
        transactionQueue,
        transactionQueuePresenter,
        waitForCommit,
      } = setupTestScenario({
        request,
      });
      transactionGateway.getAll.mockResolvedValue([transaction]);

      await transactionQueue.init();

      const expectedBroadcastedTxData = {
        id: transaction.id,
        request,
      };
      expect(responder.prepare).toHaveBeenCalledWith(expectedBroadcastedTxData);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledWith(expectedBroadcastedTxData);

      await waitForCommit();

      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
        txHash: transaction.hash,
      };
      expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
      expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
      expect(transactionQueuePresenter.settled).toHaveBeenCalledWith(expectedTxData);
    });
  });

  describe('when new transactions are emitted from the transactions gateway', () => {
    const transaction = MockedMetaTransaction.fromRawData({ request });

    it(`should:
        - subscribe to new transactions emitted by the transactions gateway
        - present the transaction data to the user
        - wait for the transaction to complete and execute the expected logic a normal`, async () => {
      const {
        responder,
        transactionGateway,
        transactionQueue,
        transactionQueuePresenter,
        waitForCommit,
        waitForPrepare,
      } = setupTestScenario({
        request,
      });
      transactionGateway.getAll.mockResolvedValue([]);
      await transactionQueue.init();

      transactionGateway.subscribe.mock.calls.forEach(([cb]) => {
        cb([transaction]);
      });

      await waitForPrepare();
      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
        txHash: transaction.hash,
      };
      expect(responder.prepare).toHaveBeenCalledWith(expectedTxData);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledTimes(1);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledWith(expectedTxData);

      await waitForCommit();
      expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
      expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
      expect(transactionQueuePresenter.settled).toHaveBeenCalledWith(expectedTxData);
    });

    it('should avoid update loops with other threads by not re-saving straightaway the transaction back into the storage', async () => {
      const { transactionGateway, transactionQueue, waitForCommit } = setupTestScenario({
        request,
      });
      transactionGateway.getAll.mockResolvedValue([transaction]);

      await transactionQueue.init();

      await waitForCommit();

      expect(transactionGateway.save).not.toHaveBeenCalled();
    });
  });

  describe(`when clearing recent transactions`, () => {
    it('should present the result', async () => {
      const { transactionQueuePresenter, transactionQueue } = setupTestScenario();

      transactionQueue.clearRecent();

      expect(transactionQueuePresenter.clearRecent).toHaveBeenCalled();
    });
  });
});
//
