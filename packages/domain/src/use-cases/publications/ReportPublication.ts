import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ReportReason } from '../../entities';
import { NetworkError } from './NetworkError';

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
  report(data: ReportPublicationRequest): PromiseResult<void, NetworkError | AlreadyReportedError>;
}

export interface IReportPublicationPresenter {
  presentError(error: NetworkError | AlreadyReportedError): Promise<void>;
  presentSuccess(): Promise<void>;
}

export class ReportPublication {
  constructor(
    private readonly reportPublicationGateway: IReportPublicationGateway,
    private readonly reportPublicationPresenter: IReportPublicationPresenter,
  ) {}

  async report(request: ReportPublicationRequest) {
    const result = await this.reportPublicationGateway.report(request);

    if (result.isFailure()) {
      await this.reportPublicationPresenter.presentError(result.error);

      return;
    }

    await this.reportPublicationPresenter.presentSuccess();
  }
}
