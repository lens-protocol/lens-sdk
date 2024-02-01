import { ReportProfile, ReportProfileRequest } from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ReportProfileGateway } from './ReportProfileGateway';

export function useReportProfileController() {
  const { apolloClient } = useSharedDependencies();

  return async (request: ReportProfileRequest) => {
    const gateway = new ReportProfileGateway(apolloClient);
    const presenter = new PromiseResultPresenter<void, never>();

    const reportProfile = new ReportProfile(gateway, presenter);

    await reportProfile.report(request);

    return presenter.asResult();
  };
}
