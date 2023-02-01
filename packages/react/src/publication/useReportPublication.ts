import { ReportReason } from '@lens-protocol/domain/entities';
import { ReportPublicationRequest } from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { useReportPublicationController } from './adapters/useReportPublicationController';

export { ReportReason };

export function useReportPublication() {
  const [isPending, setIsPending] = useState(false);

  const reportPublication = useReportPublicationController();

  const report = async (request: ReportPublicationRequest) => {
    setIsPending(true);

    try {
      await reportPublication(request);
    } finally {
      setIsPending(false);
    }
  };

  return {
    report,
    isPending,
  };
}
