import { success } from '@lens-protocol/shared-kernel';

import { ProfileId, ProfileReportReason } from '../../entities';
import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';

export type ReportProfileRequest = {
  profileId: ProfileId;
  reason: ProfileReportReason;
  additionalComments?: string;
};

export interface IReportProfileGateway {
  report(data: ReportProfileRequest): Promise<void>;
}

export type IReportProfilePresenter = IGenericResultPresenter<void, never>;

export class ReportProfile {
  constructor(
    private readonly gateway: IReportProfileGateway,
    private readonly presenter: IReportProfilePresenter,
  ) {}

  async report(request: ReportProfileRequest) {
    await this.gateway.report(request);

    this.presenter.present(success());
  }
}
