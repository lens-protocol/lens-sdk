import { AnyTransactionRequestModel, Wallet } from '../../entities';
import { UnsignedTransaction } from '../../entities/Transactions';

export interface IPaidTransactionGateway<T extends AnyTransactionRequestModel> {
  createUnsignedTransaction(request: T, wallet: Wallet): Promise<UnsignedTransaction<T>>;
}
