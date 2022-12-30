import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { PublicationType, ReactionType } from '../../entities';
import { IGenericResultPresenter } from '../transactions';

export type ReactionRequest = {
  profileId: string;
  publicationId: string;
  publicationType: PublicationType;
  reactionType: ReactionType;
};

export interface IReactionGateway {
  add(data: ReactionRequest): PromiseResult<void, ReactionError>;
  remove(data: ReactionRequest): PromiseResult<void, ReactionError>;
}

export interface IReactionPresenter extends IGenericResultPresenter<void, ReactionError> {
  presentOptimisticAdd(request: ReactionRequest): Promise<void>;
  revertOptimisticAdd(request: ReactionRequest): Promise<void>;
  presentOptimisticRemove(request: ReactionRequest): Promise<void>;
  revertOptimisticRemove(request: ReactionRequest): Promise<void>;
}

export class ReactionError extends Error {
  name = 'ReactionError' as const;

  constructor(readonly reason: string) {
    super(reason);
  }
}

export class Reaction {
  constructor(
    private readonly gateway: IReactionGateway,
    private readonly presenter: IReactionPresenter,
  ) {}

  async add(request: ReactionRequest) {
    await this.presenter.presentOptimisticAdd(request);

    const result = await this.gateway.add(request);

    if (result.isFailure()) {
      await this.presenter.revertOptimisticAdd(request);
      this.presenter.present(failure(result.error));
      return;
    }

    this.presenter.present(success());
  }

  async remove(request: ReactionRequest) {
    await this.presenter.presentOptimisticRemove(request);

    const result = await this.gateway.remove(request);

    if (result.isFailure()) {
      await this.presenter.revertOptimisticRemove(request);
      this.presenter.present(failure(result.error));
      return;
    }

    this.presenter.present(success());
  }
}
