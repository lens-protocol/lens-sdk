import { ReportReason } from '@lens-protocol/domain/entities';
import {
  AlreadyReportedError,
  NetworkError,
  ReportPublication,
} from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { useSharedDependencies } from '../../shared';
import { ReportPublicationGateway } from './ReportPublicationGateway';

export enum ReportState {
  PREPARING,
  REPORTING,
  REPORTED,
  ALREADY_REPORTED,
  FAILED,
}

export function useReportPublicationController() {
  const [state, setState] = useState(ReportState.PREPARING);
  const { apolloClient } = useSharedDependencies();

  const reportPublicationGateway = new ReportPublicationGateway(apolloClient);

  const report = async (
    publicationId: string,
    reason: ReportReason,
    additionalComments: string | null,
  ) => {
    setState(ReportState.REPORTING);

    const reportPublicationUseCase = new ReportPublication(reportPublicationGateway, {
      async presentSuccess(): Promise<void> {
        setState(ReportState.REPORTED);
      },
      async presentError(error: NetworkError | AlreadyReportedError): Promise<void> {
        if (error instanceof AlreadyReportedError) {
          setState(ReportState.ALREADY_REPORTED);
          return;
        }

        setState(ReportState.FAILED);
      },
    });

    await reportPublicationUseCase.report({ publicationId, reason, additionalComments });
  };

  return {
    report,
    state,
  };
}
