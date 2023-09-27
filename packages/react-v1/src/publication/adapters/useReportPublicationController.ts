import {
  ReportPublication,
  ReportPublicationRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ReportPublicationGateway } from './ReportPublicationGateway';

export function useReportPublicationController() {
  const { apolloClient } = useSharedDependencies();

  return async (request: ReportPublicationRequest) => {
    const gateway = new ReportPublicationGateway(apolloClient);
    const presenter = new PromiseResultPresenter<void, never>();

    const reportPublication = new ReportPublication(gateway, presenter);

    await reportPublication.report(request);

    return presenter.asResult();
  };
}
