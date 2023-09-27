import { Comment, Mirror, Post } from '@lens-protocol/api-bindings';
import { ReportReason } from '@lens-protocol/domain/entities';
import { ReportPublicationRequest } from '@lens-protocol/domain/use-cases/publications';

import { Operation, useOperation } from '../helpers/operations';
import { useReportPublicationController } from './adapters/useReportPublicationController';

export { ReportReason };

export type UseReportPublicationArgs = {
  publication: Comment | Mirror | Post;
};

export type ReportPublicationArgs = Pick<ReportPublicationRequest, 'additionalComments' | 'reason'>;

export type ReportPublicationOperation = Operation<void, never, [ReportPublicationArgs]>;

/**
 * @category Publications
 * @group Hooks
 */
export function useReportPublication({
  publication,
}: UseReportPublicationArgs): ReportPublicationOperation {
  const reportPublication = useReportPublicationController();

  return useOperation(async ({ additionalComments, reason }: ReportPublicationArgs) =>
    reportPublication({
      additionalComments,
      reason,
      publicationId: publication.id,
    }),
  );
}
