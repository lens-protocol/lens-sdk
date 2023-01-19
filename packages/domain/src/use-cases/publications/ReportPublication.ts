import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { ReportReason } from '../../entities';
import { IGenericResultPresenter } from '../transactions';

export type ReportPublicationRequest = {
  publicationId: string;
  reason: ReportReason;
  additionalComments: string | null;
};

export class AlreadyReportedError extends Error {
  name = 'AlreadyReportedError' as const;

  constructor() {
    super('Publication was already reported');
  }
}

export interface IReportPublicationGateway {
  report(data: ReportPublicationRequest): PromiseResult<void, AlreadyReportedError>;
}

export type IReportPublicationPresenter = IGenericResultPresenter<void, AlreadyReportedError>;

export class ReportPublication {
  constructor(
    private readonly gateway: IReportPublicationGateway,
    private readonly presenter: IReportPublicationPresenter,
  ) {}

  async report(request: ReportPublicationRequest) {
    const result = await this.gateway.report(request);

    if (result.isFailure()) {
      this.presenter.present(failure(result.error));
      return;
    }

    this.presenter.present(success());
  }
}
