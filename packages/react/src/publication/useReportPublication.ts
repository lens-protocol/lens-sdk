import { PublicationReportReason } from '@lens-protocol/domain/entities';
import { ReportPublicationRequest } from '@lens-protocol/domain/use-cases/publications';
import { invariant } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useReportPublicationController } from './adapters/useReportPublicationController';

export { PublicationReportReason };

export type ReportPublicationArgs = ReportPublicationRequest;

/**
 * Report a publication for a given reason.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: report, loading } = useReportPublication();
 *
 * const handleSubmit = async () => {
 *   const result = await report({
 *     publicationId: publicationId('0x014e-0x0a'),
 *     reason: PublicationReportReason.FAKE_ENGAGEMENT,
 *     additionalComments: 'Human readable comments, if any.',
 *   });
 *
 *   if (result.isSuccess()) {
 *     alert('Publication reported!');
 *   }
 * };
 *
 * <button onClick={handleSubmit} disabled={loading}>
 *   Report
 * </button>
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useReportPublication(): UseDeferredTask<void, never, ReportPublicationArgs> {
  const { data: session } = useSession();
  const reportPublication = useReportPublicationController();

  return useDeferredTask(async ({ publicationId, reason, additionalComments }) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );

    return reportPublication({ publicationId, reason, additionalComments });
  });
}
