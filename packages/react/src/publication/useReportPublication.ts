import { ReportReason } from '@lens-protocol/domain/entities';
import {
  AlreadyReportedError,
  ReportPublicationRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { useState } from 'react';

import { useReportPublicationController } from './adapters/useReportPublicationController';

export { ReportReason };

export function useReportPublication() {
  const [error, setError] = useState<AlreadyReportedError | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { report: reportPublication } = useReportPublicationController();

  const report = async (request: ReportPublicationRequest) => {
    setIsPending(true);
    setError(null);

    try {
      const result = await reportPublication(request);

      if (result.isFailure()) {
        setError(result.error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    report,
    isPending,
    error,
  };
}
