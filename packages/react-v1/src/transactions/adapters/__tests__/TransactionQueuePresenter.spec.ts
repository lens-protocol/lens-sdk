import { recentTransactionsVar, TxStatus } from '@lens-protocol/api-bindings';
import { TransactionError, TransactionErrorReason } from '@lens-protocol/domain/entities';
import { mockTransactionError, mockTransactionData } from '@lens-protocol/domain/mocks';
import {
  AnyTransactionRequest,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { FailedTransactionError, TransactionQueuePresenter } from '../TransactionQueuePresenter';

function setupTransactionQueuePresenter() {
  const errorHandler = jest.fn();

  const presenter = new TransactionQueuePresenter(errorHandler);

  return { presenter, errorHandler };
}

describe(`Given the ${TransactionQueuePresenter.name}`, () => {
  afterEach(() => {
    recentTransactionsVar([]);
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.pending.name}" method`, () => {
    it('should add it to the list of recent transactions', () => {
      const { presenter } = setupTransactionQueuePresenter();

      const transaction = mockTransactionData();
      presenter.pending(transaction);

      expect(recentTransactionsVar()).toEqual([{ status: TxStatus.PENDING, ...transaction }]);
    });

    it('should update the status of an existing transaction', () => {
      const { presenter } = setupTransactionQueuePresenter();
      const transaction = mockTransactionData();
      presenter.pending(transaction);

      const updated = mockTransactionData({ id: transaction.id, request: transaction.request });
      presenter.pending(updated);

      expect(recentTransactionsVar()).toEqual([{ status: TxStatus.PENDING, ...updated }]);
    });
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.settled.name}" method`, () => {
    const transaction = mockTransactionData();

    it('should update the corresponding transaction', () => {
      const { presenter } = setupTransactionQueuePresenter();
      presenter.pending(transaction);

      presenter.settled(transaction);

      expect(recentTransactionsVar()).toEqual([{ status: TxStatus.SETTLED, ...transaction }]);
    });
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.failed.name}" method`, () => {
    const transaction = mockTransactionData();

    it('should update the corresponding transaction', () => {
      const { presenter } = setupTransactionQueuePresenter();
      presenter.pending(transaction);

      presenter.failed(mockTransactionError(), transaction);

      expect(recentTransactionsVar()).toEqual([{ status: TxStatus.FAILED, ...transaction }]);
    });

    it(`should use the provided errorHandler to propagate the error to the user`, () => {
      const { presenter, errorHandler } = setupTransactionQueuePresenter();
      presenter.pending(transaction);

      const error = new TransactionError(TransactionErrorReason.UNKNOWN);
      presenter.failed(error, transaction);

      const expectedError = new FailedTransactionError(error, transaction);
      expect(errorHandler).toHaveBeenCalledWith(expectedError);
    });
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.clearRecent.name}" method`, () => {
    it(`should remove ${TxStatus.SETTLED} and ${TxStatus.FAILED} tx`, () => {
      const { presenter } = setupTransactionQueuePresenter();
      const toKeep = [mockTransactionData(), mockTransactionData()];
      const toRemove = [mockTransactionData(), mockTransactionData()];

      toKeep.concat(toRemove).forEach((transaction) => presenter.pending(transaction));
      presenter.failed(
        mockTransactionError(),
        toRemove[0] as TransactionData<AnyTransactionRequest>,
      );
      presenter.settled(toRemove[1] as TransactionData<AnyTransactionRequest>);

      presenter.clearRecent();

      expect(recentTransactionsVar()).toEqual(
        toKeep.reverse().map((data) => ({
          ...data,
          status: TxStatus.PENDING,
        })),
      );
    });
  });
});
