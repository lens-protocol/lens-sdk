import { PromiseResult } from '@lens-protocol/shared-kernel';

export type HidePublicationRequest = {
  publicationId: string;
};

export interface IHidePublicationGateway {
  hide(request: HidePublicationRequest): PromiseResult<void, never>;
}

export interface IHidePublicationPresenter {
  present(publicationId: string): void;
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
