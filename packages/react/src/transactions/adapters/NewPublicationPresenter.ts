import { AnyPublication } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import { CreateQuoteRequest } from '@lens-protocol/domain/src/use-cases/publications/CreateQuote';
import {
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionPresenter,
  ISubsidizeOffChainPresenter,
  ISubsidizeOnChainPresenter,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { Deferred, failure, Failure, Result, success } from '@lens-protocol/shared-kernel';

import { AsyncTransactionResult } from './AsyncTransactionResult';

type AnyCreatePublicationRequest =
  | CreateCommentRequest
  | CreateMirrorRequest
  | CreatePostRequest
  | CreateQuoteRequest;

export class NewPublicationPresenter<
  TRequest extends AnyCreatePublicationRequest,
  TPublication extends AnyPublication,
> implements
    IDelegatedTransactionPresenter<TRequest>,
    ISubsidizeOnChainPresenter<TRequest>,
    ISubsidizeOffChainPresenter<TRequest>
{
  private deferredResult = new Deferred<Result<TPublication, TransactionError>>();

  private earlyFailure: Failure<BroadcastingError> | null = null;

  constructor(
    private readonly fetchNewPublication: (tx: TransactionData<TRequest>) => Promise<TPublication>,
  ) {}

  async present(result: Result<TransactionData<TRequest>, BroadcastingError | TransactionError>) {
    if (result.isFailure()) {
      if (result.error instanceof BroadcastingError) {
        this.earlyFailure = failure(result.error);
        return;
      }

      this.deferredResult.resolve(failure(result.error));
      return;
    }
    const publication = await this.fetchNewPublication(result.value);

    this.deferredResult.resolve(success(publication));
  }

  asResult(): Result<AsyncTransactionResult<TPublication>, BroadcastingError> {
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
