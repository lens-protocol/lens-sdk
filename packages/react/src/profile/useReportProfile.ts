import { ProfileReportReason } from '@lens-protocol/domain/entities';
import { ReportProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useReportProfileController } from './adapters/useReportProfileController';

export { ProfileReportReason };

export type ReportProfileArgs = ReportProfileRequest;

/**
 * Report a profile for a given reason.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: report, loading } = useReportProfile();
 *
 * const handleSubmit = async () => {
 *   const result = await report({
 *     profileId: profileId('0x01'),
 *     reason: ProfileReportReason.IMPERSONATION,
 *     additionalComments: 'Human readable comments, if any.',
 *   });
 *
 *   if (result.isSuccess()) {
 *     alert('Profile reported!');
 *   }
 * };
 *
 * <button onClick={handleSubmit} disabled={loading}>
 *   Report
 * </button>
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useReportProfile(): UseDeferredTask<void, never, ReportProfileArgs> {
  const { data: session } = useSession();
  const reportProfile = useReportProfileController();

  return useDeferredTask(async ({ profileId, reason, additionalComments }) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );

    return reportProfile({ profileId, reason, additionalComments });
  });
}
