import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ReactionType } from '../../entities';
import { NetworkError } from './NetworkError';

export type ReactionRequest = {
  publicationId: string;
  reactionType: ReactionType;
  profileId: string;
};

export interface IReactionGateway {
  add(data: ReactionRequest): PromiseResult<void, NetworkError>;
  remove(data: ReactionRequest): PromiseResult<void, NetworkError>;
}

export interface IReactionPresenter {
  presentOptimisticAdd(request: ReactionRequest): Promise<void>;
  revertOptimisticAdd(request: ReactionRequest): Promise<void>;
  presentOptimisticRemove(request: ReactionRequest): Promise<void>;
  revertOptimisticRemove(request: ReactionRequest): Promise<void>;
}

export class Reaction {
  constructor(
    private readonly gateway: IReactionGateway,
    private readonly presenter: IReactionPresenter,
  ) {}

  async add(request: ReactionRequest): PromiseResult<void, NetworkError> {
    await this.presenter.presentOptimisticAdd(request);

    const result = await this.gateway.add(request);

    if (result.isFailure()) {
      await this.presenter.revertOptimisticAdd(request);
    }
    return result;
  }

  async remove(request: ReactionRequest): PromiseResult<void, NetworkError> {
    await this.presenter.presentOptimisticRemove(request);

    const result = await this.gateway.remove(request);

    if (result.isFailure()) {
      await this.presenter.revertOptimisticRemove(request);
    }
    return result;
  }
}
