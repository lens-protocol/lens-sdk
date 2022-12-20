import { TransactionError, TransactionErrorReason } from '@lens-protocol/domain/entities';
import {
  mockTransactionError,
  mockBroadcastedTransactionData,
  mockPendingTransactionData,
} from '@lens-protocol/domain/mocks';
import {
  BroadcastedTransactionData,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';

import {
  FailedTransactionError,
  recentTransactions,
  TransactionQueuePresenter,
  TxStatus,
} from '../TransactionQueuePresenter';

function setupTransactionQueuePresenter() {
  const errorHandler = jest.fn();

  const presenter = new TransactionQueuePresenter(errorHandler);

  return { presenter, errorHandler };
}

describe(`Given the ${TransactionQueuePresenter.name}`, () => {
  afterEach(() => {
    recentTransactions([]);
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.broadcasting.name}" method`, () => {
    it('should add it to the list of recent transactions', () => {
      const { presenter } = setupTransactionQueuePresenter();

      const transaction = mockPendingTransactionData();
      presenter.broadcasting(transaction);

      expect(recentTransactions()).toEqual([{ status: TxStatus.BROADCASTING, ...transaction }]);
    });
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.mining.name}" method`, () => {
    it('should add it to the list of recent transactions', () => {
      const { presenter } = setupTransactionQueuePresenter();

      const transaction = mockBroadcastedTransactionData();
      presenter.mining(transaction);

      expect(recentTransactions()).toEqual([{ status: TxStatus.MINING, ...transaction }]);
    });

    it('should update the status of an existing transaction', () => {
      const { presenter } = setupTransactionQueuePresenter();
      const transaction = mockBroadcastedTransactionData();
      presenter.broadcasting(transaction);

      presenter.mining(transaction);

      expect(recentTransactions()).toEqual([{ status: TxStatus.MINING, ...transaction }]);
    });
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.failed.name}" method`, () => {
    const transaction = mockBroadcastedTransactionData();

    it('should update the corresponding transaction', () => {
      const { presenter } = setupTransactionQueuePresenter();
      presenter.mining(transaction);

      presenter.failed(mockTransactionError(), transaction);

      expect(recentTransactions()).toEqual([{ status: TxStatus.FAILED, ...transaction }]);
    });

    it(`should use the provided errorHandler to propagate the error to the user`, () => {
      const { presenter, errorHandler } = setupTransactionQueuePresenter();
      presenter.mining(transaction);

      const error = new TransactionError(TransactionErrorReason.UNKNOWN);
      presenter.failed(error, transaction);

      const expectedError = new FailedTransactionError(error, transaction);
      expect(errorHandler).toHaveBeenCalledWith(expectedError);
    });
  });

  describe(`when invoking "${TransactionQueuePresenter.prototype.clearRecent.name}" method`, () => {
    it(`should remove ${TxStatus.SETTLED} and ${TxStatus.FAILED} tx`, () => {
      const { presenter } = setupTransactionQueuePresenter();
      const toKeep = [mockBroadcastedTransactionData(), mockBroadcastedTransactionData()];
      const toRemove = [mockBroadcastedTransactionData(), mockBroadcastedTransactionData()];

      toKeep.concat(toRemove).forEach((transaction) => presenter.mining(transaction));
      presenter.failed(
        mockTransactionError(),
        toRemove[0] as BroadcastedTransactionData<SupportedTransactionRequest>,
      );
      presenter.settled(toRemove[1] as BroadcastedTransactionData<SupportedTransactionRequest>);

      presenter.clearRecent();

      expect(recentTransactions()).toEqual(
        toKeep.reverse().map((data) => ({
          ...data,
          status: TxStatus.MINING,
        })),
      );
    });
  });
});
