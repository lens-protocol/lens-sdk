import { AnyPublication } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
  CreateQuoteRequest,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionPresenter,
  ISignedMomokaPresenter,
  ISignedOnChainPresenter,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { Deferred, failure, Failure, Result, success } from '@lens-protocol/shared-kernel';

import { AsyncTransactionResult } from './AsyncTransactionResult';

type AnyCreatePublicationRequest =
  | CreateCommentRequest
  | CreateMirrorRequest
  | CreatePostRequest
  | CreateQuoteRequest;

type EarlyFailureError =
  | BroadcastingError
  | PendingSigningRequestError
  | InsufficientGasError
  | UserRejectedError
  | WalletConnectionError;

export class NewPublicationPresenter<
  TRequest extends AnyCreatePublicationRequest,
  TPublication extends AnyPublication,
> implements
    IDelegatedTransactionPresenter<TRequest>,
    ISignedOnChainPresenter<TRequest>,
    ISignedMomokaPresenter<TRequest>
{
  private deferredResult = new Deferred<Result<TPublication, TransactionError>>();

  private earlyFailure: Failure<EarlyFailureError> | null = null;

  constructor(
    private readonly fetchNewPublication: (tx: TransactionData<TRequest>) => Promise<TPublication>,
  ) {}

  async present(result: Result<TransactionData<TRequest>, EarlyFailureError | TransactionError>) {
    if (result.isFailure()) {
      if (!(result.error instanceof TransactionError)) {
        this.earlyFailure = failure(result.error);
        return;
      }

      this.deferredResult.resolve(failure(result.error));
      return;
    }
    const publication = await this.fetchNewPublication(result.value);

    this.deferredResult.resolve(success(publication));
  }

  asResult(): Result<AsyncTransactionResult<TPublication>, EarlyFailureError> {
    if (this.earlyFailure) {
      return this.earlyFailure;
    }

    return success({
      waitForCompletion: async () => {
        return this.deferredResult.promise;
      },
    });
  }
}
