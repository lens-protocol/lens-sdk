import { PromiseResult } from '@lens-protocol/shared-kernel';

import { PublicationType, ReactionType } from '../../entities';
import { NetworkError } from './NetworkError';

export type RemoveReactionRequest = {
  publicationId: string;
  reactionType: ReactionType;
  profileId: string;
  publicationType: PublicationType;
};

export interface IRemoveReactionGateway {
  remove(data: RemoveReactionRequest): PromiseResult<void, NetworkError>;
}

export interface IRemoveReactionPresenter {
  presentOptimisticRemove(request: RemoveReactionRequest): Promise<void>;
  revertOptimisticRemove(request: RemoveReactionRequest): Promise<void>;
}

export class RemoveReaction {
  constructor(
    private readonly gateway: IRemoveReactionGateway,
    private readonly presenter: IRemoveReactionPresenter,
  ) {}

  async remove(request: RemoveReactionRequest) {
    await this.presenter.presentOptimisticRemove(request);

    const result = await this.gateway.remove(request);

    if (result.isFailure()) {
      await this.presenter.revertOptimisticRemove(request);

      return;
    }
  }
}
