import { PromiseResult, Result, success, failure } from '@lens-protocol/shared-kernel';

import { NetworkError } from './NetworkError';

export type HidePublicationRequest = {
  publicationId: string;
};

export interface IHidePublicationGateway {
  hide(request: HidePublicationRequest): PromiseResult<void, NetworkError>;
}

export interface IHidePublicationPresenter {
  present(result: Result<string, NetworkError>): void;
}

export class HidePublication {
  constructor(
    private readonly hidePublicationGateway: IHidePublicationGateway,
    private readonly hidePublicationPresenter: IHidePublicationPresenter,
  ) {}

  async hide(request: HidePublicationRequest) {
    const result = await this.hidePublicationGateway.hide(request);

    this.hidePublicationPresenter.present(success(request.publicationId));

    if (result.isFailure()) {
      this.hidePublicationPresenter.present(failure(result.error));
    }
  }
}
