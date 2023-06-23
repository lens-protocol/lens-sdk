import { ProfileId, PublicationId, ReactionType } from '../../entities';

export type ReactionRequest = {
  profileId: ProfileId;
  publicationId: PublicationId;
  reactionType: ReactionType;
};

export interface IReactionGateway<T extends ReactionRequest> {
  add(data: T): Promise<void>;
  remove(data: T): Promise<void>;
}

export interface IReactionPresenter<T extends ReactionRequest> {
  add(request: T): Promise<void>;
  remove(request: T): Promise<void>;
}

export class Reaction<T extends ReactionRequest> {
  constructor(
    private readonly gateway: IReactionGateway<T>,
    private readonly presenter: IReactionPresenter<T>,
  ) {}

  async add(request: T) {
    await this.presenter.add(request);

    try {
      await this.gateway.add(request);
    } catch (e) {
      await this.presenter.remove(request);
      throw e;
    }
  }

  async remove(request: T) {
    await this.presenter.remove(request);

    try {
      await this.gateway.remove(request);
    } catch (e) {
      await this.presenter.add(request);
      throw e;
    }
  }
}
