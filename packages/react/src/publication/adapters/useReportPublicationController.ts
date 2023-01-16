import {
  ReportPublication,
  ReportPublicationRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { ReportPublicationGateway } from './ReportPublicationGateway';
import { ReportPublicationPresenter } from './ReportPublicationPresenter';

export function useReportPublicationController() {
  const { apolloClient } = useSharedDependencies();

  const report = async (request: ReportPublicationRequest) => {
    const gateway = new ReportPublicationGateway(apolloClient);
    const presenter = new ReportPublicationPresenter();
    const reportPublication = new ReportPublication(gateway, presenter);

    await reportPublication.report(request);

    return presenter.asResult();
  };

  return {
    report,
  };
}
