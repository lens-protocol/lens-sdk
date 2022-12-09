import { PromiseResult } from '@lens-protocol/shared-kernel';

import { PublicationType, ReactionType } from '../../entities';
import { NetworkError } from './NetworkError';

export type AddReactionRequest = {
  publicationId: string;
  reactionType: ReactionType;
  profileId: string;
  publicationType: PublicationType;
};

export interface IAddReactionGateway {
  add(data: AddReactionRequest): PromiseResult<void, NetworkError>;
}

export interface IAddReactionPresenter {
  presentOptimisticAdd(request: AddReactionRequest): Promise<void>;
  revertOptimisticAdd(request: AddReactionRequest): Promise<void>;
}

export class AddReaction {
  constructor(
    private readonly gateway: IAddReactionGateway,
    private readonly presenter: IAddReactionPresenter,
  ) {}

  async add(request: AddReactionRequest) {
    await this.presenter.presentOptimisticAdd(request);

    const result = await this.gateway.add(request);

    if (result.isFailure()) {
      await this.presenter.revertOptimisticAdd(request);

      return;
    }
  }
}
