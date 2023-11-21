import { recentTransactionsVar, TxStatus, TransactionState } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import {
  ITransactionQueuePresenter,
  AnyTransactionRequest,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

type PartialTransactionStateUpdate<T extends AnyTransactionRequest> = Partial<TransactionState<T>>;

export class TransactionQueuePresenter<T extends AnyTransactionRequest>
  implements ITransactionQueuePresenter<T>
{
  clearRecent(): void {
    const transactions = recentTransactionsVar();
    const filteredTransactions = transactions.filter(
      (tx) => tx.status !== TxStatus.FAILED && tx.status !== TxStatus.SETTLED,
    );

    recentTransactionsVar(filteredTransactions);
  }

  pending(data: TransactionData<T>): void {
    if (recentTransactionsVar().find(({ id }) => id === data.id)) {
      this.updateById(data.id, {
        ...data,
        status: TxStatus.PENDING,
      });
    } else {
      this.addTransaction({
        id: data.id,
        status: TxStatus.PENDING,
        request: data.request,
        txHash: data.txHash,
      });
    }
  }

  settled(data: TransactionData<T>): void {
    this.updateById(data.id, { status: TxStatus.SETTLED });
  }

  failed(error: TransactionError, data: TransactionData<T>): void {
    this.updateById(data.id, { status: TxStatus.FAILED, error });
  }

  private addTransaction(data: TransactionState<AnyTransactionRequest>) {
    const transactions = recentTransactionsVar();
    recentTransactionsVar([data, ...transactions]);
  }

  private updateById(id: string, update: PartialTransactionStateUpdate<AnyTransactionRequest>) {
    const transactions = recentTransactionsVar();

    recentTransactionsVar(
      transactions.map((data) => {
        if (id === data.id) {
          return {
            ...data,
            ...update,
          } as TransactionState<AnyTransactionRequest>;
        }
        return data;
      }),
    );
  }
}
