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
    await this.presenter.add(request);

    try {
      await this.gateway.add(request);
    } catch (e) {
      await this.presenter.remove(request);
      throw e;
    }
  }

  async remove(request: ReactionRequest) {
    await this.presenter.remove(request);

    try {
      await this.gateway.remove(request);
    } catch (e) {
      await this.presenter.add(request);
      throw e;
    }
  }
}
