import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useDismissRecommendedProfilesController } from './adapters/useDismissRecommendedProfilesController';

export type UseDismissRecommendedProfilesArgs = {
  profileIds: ProfileId[];
};

/**
 * Dismiss profiles from the recommended list.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: dismiss, loading } = useDismissRecommendedProfiles();
 *
 * // ...
 *
 * <button onClick={() => dismiss({ profileIds: [profile.id] })} disabled={loading}>
 *   Dismiss recommendation
 * </button>
 * ```
 *
 * @category Discovery
 * @group Hooks
 */
export function useDismissRecommendedProfiles(): UseDeferredTask<
  void,
  never,
  UseDismissRecommendedProfilesArgs
> {
  const { data: session } = useSession();

  const dismiss = useDismissRecommendedProfilesController();

  return useDeferredTask(async ({ profileIds }) => {
    invariant(session?.authenticated, 'You must be authenticated to dismiss recommended profiles.');

    await dismiss({
      profileIds,
    });

    return success();
  });
}
