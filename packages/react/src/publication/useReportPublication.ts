import { ReportReason } from '@lens-protocol/domain/entities';

import {
  useReportPublicationController,
  ReportState,
} from './adapters/useReportPublicationController';

export { ReportReason, ReportState };

export function useReportPublication() {
  const { report, state } = useReportPublicationController();

  return {
    report,
    state,
  };
}
