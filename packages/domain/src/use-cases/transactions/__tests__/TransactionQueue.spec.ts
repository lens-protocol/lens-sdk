import { mock } from 'jest-mock-extended';
import waitFor from 'wait-for-expect';

import {
  TransactionRequestModel,
  TransactionEvent,
  TransactionError,
  TransactionErrorReason,
} from '../../../entities';
import {
  MockedMetaTransaction,
  mockTransactionHash,
  mockTransactionRequestModel,
} from '../../../entities/__helpers__/mocks';
import { mockCreatePostRequest } from '../../publications/__helpers__/mocks';
import {
  IPendingTransactionGateway,
  ITransactionQueuePresenter,
  ITransactionResponder,
  TransactionQueue,
  TransactionResponders,
} from '../TransactionQueue';

function mockResponders<T extends TransactionRequestModel>(
  mocks: Partial<TransactionResponders<T>>,
): TransactionResponders<T> {
  return mocks as TransactionResponders<T>;
}

function setupTestScenario<T extends TransactionRequestModel>({
  request = mockTransactionRequestModel() as T,
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

describe(`Given an instance of the ${TransactionQueue.name} interactor`, () => {
  describe(`when pushing a new Transaction`, () => {
    const request = mockCreatePostRequest();

    it(`should optimistically present the Transaction data to the user`, async () => {
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
      expect(transactionQueuePresenter.broadcasting).toHaveBeenCalledWith(expectedTxData);
    });

    it(`should asynchronously:
        - wait for the Transaction to be broadcasted
        - persist the Transaction into a storage
        - present the updated Transaction data`, async () => {
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
      expect(transactionQueuePresenter.mining).toHaveBeenCalledWith(expectedTxData);
    });

    it('should handle early broadcasting error scenarios', async () => {
      const { transactionQueue, transactionQueuePresenter, waitForRollback } = setupTestScenario({
        request,
      });

      const transaction = MockedMetaTransaction.fromRawData(
        { request },
        {
          withUpdatesSequence: [
            { error: new TransactionError(TransactionErrorReason.CANNOT_EXECUTE) },
          ],
        },
      );
      await transactionQueue.push(transaction);

      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
      };
      await waitForRollback();
      expect(transactionQueuePresenter.broadcasting).toHaveBeenCalledWith(expectedTxData);
    });

    it('should store and present any update to the Transaction data', async () => {
      const { transactionGateway, transactionQueue, transactionQueuePresenter, waitForCommit } =
        setupTestScenario({
          request,
        });

      const transaction = MockedMetaTransaction.fromRawData(
        { request },
        {
          withUpdatesSequence: [
            { event: TransactionEvent.BROADCASTED, txHash: mockTransactionHash() },
            { event: TransactionEvent.UPGRADED, txHash: mockTransactionHash() },
            { event: TransactionEvent.UPGRADED, txHash: mockTransactionHash() },
            { event: TransactionEvent.SETTLED, txHash: mockTransactionHash() },
          ],
        },
      );
      await transactionQueue.push(transaction);

      await waitForCommit();
      expect(transactionGateway.save).toHaveBeenCalledTimes(4); // initial save + 3 updates
      expect(transactionQueuePresenter.broadcasting).toHaveBeenCalledTimes(1);
      expect(transactionQueuePresenter.mining).toHaveBeenCalledTimes(3); // first TransactionEvent.BROADCASTED + 2 TransactionEvent.UPGRADED
      expect(transactionQueuePresenter.settled).toHaveBeenCalledTimes(1);
    });

    describe('that eventually settles', () => {
      it(`should:
          - delete the Transaction from storage
          - invoke the corresponding responder "commit"
          - present the settled Transaction data`, async () => {
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
          - delete the Transaction
          - invoke the corresponding responder "rollback"
          - present the error with the failed Transaction data`, async () => {
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
    const request = mockCreatePostRequest();
    const txHash = mockTransactionHash();
    const transaction = MockedMetaTransaction.fromRawData(
      { request },
      {
        withUpdatesSequence: [{ event: TransactionEvent.SETTLED, txHash }],
      },
    );

    it(`should:
        - load the Transaction from storage
        - present the Transaction data to the user
        - wait for the Transaction to complete and execute the expected logic a normal`, async () => {
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
      expect(transactionQueuePresenter.broadcasting).toHaveBeenCalledWith(
        expectedBroadcastedTxData,
      );

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

    it('should not save unnecessarily the Transaction to storage', async () => {
      const { transactionGateway, transactionQueue, waitForCommit } = setupTestScenario({
        request,
      });
      transactionGateway.getAll.mockResolvedValue([transaction]);

      await transactionQueue.init();

      await waitForCommit();

      expect(transactionGateway.save).not.toHaveBeenCalled();
    });

    it(`should:
        - subscribe to new transactions emitted by the transactions gateway
        - present the Transaction data to the user
        - wait for the Transaction to complete and execute the expected logic a normal`, async () => {
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
      expect(transactionQueuePresenter.broadcasting).toHaveBeenCalledWith(expectedTxData);
      expect(transactionQueuePresenter.mining).toHaveBeenCalledWith(expectedTxData);

      await waitForCommit();
      expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
      expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
      expect(transactionQueuePresenter.settled).toHaveBeenCalledWith(expectedTxData);
    });
  });

  describe(`when clearing recent transactions`, () => {
    it('should present the result', async () => {
      const { transactionQueuePresenter, transactionQueue } = setupTestScenario();

      await transactionQueue.clearRecent();

      expect(transactionQueuePresenter.clearRecent).toHaveBeenCalled();
    });
  });
});
//
