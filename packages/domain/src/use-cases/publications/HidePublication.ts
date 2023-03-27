import { PublicationId } from '../../entities';

export type HidePublicationRequest = {
  publicationId: PublicationId;
};

export interface IHidePublicationGateway {
  hide(request: HidePublicationRequest): Promise<void>;
}

export interface IHidePublicationPresenter {
  present(publicationId: PublicationId): void;
}

export class HidePublication {
  constructor(
    private readonly hidePublicationGateway: IHidePublicationGateway,
    private readonly hidePublicationPresenter: IHidePublicationPresenter,
  ) {}

  async hide(request: HidePublicationRequest) {
    await this.hidePublicationGateway.hide(request);

    this.hidePublicationPresenter.present(request.publicationId);
  }
}
