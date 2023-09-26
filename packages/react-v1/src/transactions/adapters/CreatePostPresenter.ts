import { Post } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionPresenter,
  ISubsidizeOffChainPresenter,
  ISubsidizeOnChainPresenter,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { Deferred, failure, Failure, Result, success } from '@lens-protocol/shared-kernel';

import { AsyncTransactionResult } from './AsyncTransactionResult';

export interface INewPostCacheManager {
  fetchNewPost({ id, txHash }: TransactionData<CreatePostRequest>): Promise<Post>;
}

export type CreatePostAsyncResult = AsyncTransactionResult<Post>;

export class CreatePostPresenter
  implements
    IDelegatedTransactionPresenter<CreatePostRequest>,
    ISubsidizeOnChainPresenter<CreatePostRequest>,
    ISubsidizeOffChainPresenter<CreatePostRequest>
{
  private deferredResult = new Deferred<Result<Post, TransactionError>>();

  private earlyFailure: Failure<never, BroadcastingError> | null = null;

  constructor(private readonly cacheManager: INewPostCacheManager) {}

  async present(
    result: Result<TransactionData<CreatePostRequest>, BroadcastingError | TransactionError>,
  ) {
    if (result.isFailure()) {
      if (result.error instanceof BroadcastingError) {
        this.earlyFailure = failure(result.error);
        return;
      }

      this.deferredResult.resolve(failure(result.error));
      return;
    }
    const post = await this.cacheManager.fetchNewPost(result.value);

    this.deferredResult.resolve(success(post));
  }

  asResult(): Result<CreatePostAsyncResult, BroadcastingError> {
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
