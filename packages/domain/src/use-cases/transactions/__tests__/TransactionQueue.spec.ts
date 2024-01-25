import { mock } from 'jest-mock-extended';
import waitFor from 'wait-for-expect';

import {
  AnyTransactionRequestModel,
  TransactionEvent,
  TransactionError,
  TransactionErrorReason,
  Transaction,
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
import { mockITransactionCompletionPresenter } from '../__helpers__/mocks';

function mockResponders<T extends AnyTransactionRequestModel>(
  mocks: Partial<TransactionResponders<T>>,
): TransactionResponders<T> {
  return mocks as TransactionResponders<T>;
}

function setupTestScenario({
  request = mockAnyTransactionRequestModel(),
}: {
  request?: AnyTransactionRequestModel;
} = {}) {
  const responder = mock<ITransactionResponder<typeof request>>();
  const responders = mockResponders({ [request.kind]: responder });

  const transactionGateway = mock<IPendingTransactionGateway<AnyTransactionRequestModel>>();
  const transactionQueuePresenter = mock<ITransactionQueuePresenter<AnyTransactionRequestModel>>();

  const transactionQueue = TransactionQueue.create(
    responders,
    transactionGateway,
    transactionQueuePresenter,
  );

  const waitForCommit = async () => {
    await waitFor(() => {
      expect(responder.commit).toHaveBeenCalled();
    });
  };

  return {
    responder,
    transactionGateway,
    transactionQueue,
    transactionQueuePresenter,
    waitForCommit,
  };
}
const request = mockCreatePostRequest();

describe(`Given an instance of the ${TransactionQueue.name} interactor`, () => {
  describe(`when pushing a new transaction`, () => {
    it(`should optimistically present the transaction data to the user`, async () => {
      const { responder, transactionQueue, transactionQueuePresenter } = setupTestScenario({
        request,
      });

      const transaction = MockedMetaTransaction.fromRawData({ request });
      await transactionQueue.push(transaction);

      const expectedTxData = {
        id: transaction.id,
        request,
        txHash: transaction.hash,
      };
      expect(responder.prepare).toHaveBeenCalledWith(expectedTxData);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledWith(expectedTxData);
    });

    it(`should asynchronously:
        - persist the transaction via the transactions gateway
        - wait for any transaction event
        - store and present the updated transaction data`, async () => {
      const { transactionGateway, transactionQueue, transactionQueuePresenter } = setupTestScenario(
        {
          request,
        },
      );

      const transaction = MockedMetaTransaction.fromRawData(
        { request, hash: mockTransactionHash() },
        {
          withUpdatesSequence: [
            { event: TransactionEvent.UPGRADED, txHash: mockTransactionHash() },
            { event: TransactionEvent.UPGRADED, txHash: mockTransactionHash() },
            { event: TransactionEvent.SETTLED, txHash: mockTransactionHash() },
          ],
        },
      );

      const completion = mockITransactionCompletionPresenter();
      await transactionQueue.push(transaction, completion);
      await completion.waitForSuccess();

      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
        txHash: expect.any(String),
      };
      expect(transactionGateway.save).toHaveBeenCalledWith(transaction);
      expect(transactionGateway.save).toHaveBeenCalledTimes(1 + 2); // initial save + 2 updates
      expect(transactionQueuePresenter.pending).toHaveBeenCalledTimes(1 + 2); // initial presentation + 2 updates
      expect(transactionQueuePresenter.pending).toHaveBeenLastCalledWith(expectedTxData);
      expect(transactionQueuePresenter.settled).toHaveBeenCalledTimes(1);
    });

    describe('that eventually settles', () => {
      it(`should:
          - delete the transaction from underlying storage via the transactions gateway
          - invoke the corresponding responder "commit"
          - present the settled transaction data`, async () => {
        const { responder, transactionGateway, transactionQueue, transactionQueuePresenter } =
          setupTestScenario({
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
        const completion = mockITransactionCompletionPresenter();
        await transactionQueue.push(transaction, completion);
        await completion.waitForSuccess();

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
        const { responder, transactionGateway, transactionQueue, transactionQueuePresenter } =
          setupTestScenario({
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
        const completion = mockITransactionCompletionPresenter();
        await transactionQueue.push(transaction, completion);
        await completion.waitForFailure();

        const expectedTxData = {
          id: transaction.id,
          request: transaction.request,
          txHash: transaction.hash,
        };
        expect(responder.rollback).toHaveBeenCalledWith(expectedTxData);
        expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
        expect(transactionQueuePresenter.failed).toHaveBeenCalledWith(error, expectedTxData);
      });
    });
  });

  describe(`when invoking "${TransactionQueue.prototype.resume.name}" method`, () => {
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
      transactionGateway.getAll.mockResolvedValue([
        transaction as Transaction<AnyTransactionRequestModel>,
      ]);

      await transactionQueue.resume();

      await waitForCommit();
      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
        txHash: expect.any(String),
      };
      expect(responder.prepare).toHaveBeenCalledWith(expectedTxData);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledWith(expectedTxData);
      expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
      expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
      expect(transactionQueuePresenter.settled).toHaveBeenCalledWith(expectedTxData);
    });
  });

  describe('when new transactions are emitted from the transactions gateway', () => {
    const transaction = MockedMetaTransaction.fromRawData({ request });

    it(`should handle the transactions as they were to be generated in the current thread`, async () => {
      const { responder, transactionGateway, transactionQueuePresenter, waitForCommit } =
        setupTestScenario({
          request,
        });
      transactionGateway.getAll.mockResolvedValue([]);

      transactionGateway.subscribe.mock.calls.forEach(([cb]) => {
        cb([transaction as Transaction<AnyTransactionRequestModel>]);
      });

      await waitForCommit();

      const expectedTxData = {
        id: transaction.id,
        request: transaction.request,
        txHash: transaction.hash,
      };
      expect(responder.prepare).toHaveBeenCalledWith(expectedTxData);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledTimes(1);
      expect(transactionQueuePresenter.pending).toHaveBeenCalledWith(expectedTxData);
      expect(responder.commit).toHaveBeenCalledWith(expectedTxData);
      expect(transactionGateway.remove).toHaveBeenCalledWith(transaction.id);
      expect(transactionQueuePresenter.settled).toHaveBeenCalledWith(expectedTxData);
    });

    it('should avoid update loops with other threads by not re-saving straight away the transaction back into the storage', async () => {
      const { transactionGateway } = setupTestScenario({
        request,
      });
      transactionGateway.getAll.mockResolvedValue([]);

      transactionGateway.subscribe.mock.calls.forEach(([cb]) => {
        cb([transaction as Transaction<AnyTransactionRequestModel>]);
      });

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
