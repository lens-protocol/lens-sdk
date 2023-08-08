import { IEquatableError, Result } from '@lens-protocol/shared-kernel';

import { AnyTransactionRequestModel, TransactionError } from '../../entities';
import { ITransactionCompletionPresenter, TransactionData } from './TransactionQueue';

export interface ITransactionResultPresenter<
  TRequest extends AnyTransactionRequestModel,
  TError extends IEquatableError,
> extends ITransactionCompletionPresenter<TRequest> {
  present(result: Result<TransactionData<TRequest>, TError | TransactionError>): void;
}
