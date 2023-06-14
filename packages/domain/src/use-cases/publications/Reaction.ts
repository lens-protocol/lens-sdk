import { ProfileId, PublicationId, ReactionType } from '../../entities';

export type ReactionRequest = {
  profileId: ProfileId;
  publicationId: PublicationId;
  reactionType: ReactionType;
};

export interface IReactionGateway {
  add(data: ReactionRequest): Promise<void>;
  remove(data: ReactionRequest): Promise<void>;
}

export interface IReactionPresenter {
  add(request: ReactionRequest): Promise<void>;
  remove(request: ReactionRequest): Promise<void>;
}

export class Reaction {
  constructor(
    private readonly gateway: IReactionGateway,
    private readonly presenter: IReactionPresenter,
  ) {}

  async add(request: ReactionRequest) {
    await this.gateway.add(request);
    await this.presenter.add(request);
  }

  async remove(request: ReactionRequest) {
    await this.gateway.remove(request);
    await this.presenter.remove(request);
  }
}
