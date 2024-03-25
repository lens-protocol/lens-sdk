import { Profile } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useRecommendProfileController } from './adapters/useRecommendProfileController';

export type UseRecommendProfileToggleArgs = {
  profile: Profile;
};

/**
 * This hook enables you to either recommend a peer profile or withdraw a previous recommendation.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * import { Profile, useRecommendProfileToggle } from '@lens-protocol/react-web';
 *
 * function ProfileRecommendation({ profile }: { profile: Profile }) {
 *   const { execute: toggle, loading } = useRecommendProfileToggle();
 *
 *   return (
 *     <button onClick={() => toggle({ profile })} disabled={loading}>
 *       {profile.peerToPeerRecommendedByMe ? `Remove recommendation` : `Recommend`}
 *     </button>
 *   );
 * }
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useRecommendProfileToggle(): UseDeferredTask<
  void,
  never,
  UseRecommendProfileToggleArgs
> {
  const { data: session } = useSession();
  const { recommend, unrecommend } = useRecommendProfileController();

  return useDeferredTask(async ({ profile }) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must be authenticated with a profile to use this query. Use `useLogin` hook to authenticate.',
    );

    if (profile.peerToPeerRecommendedByMe) {
      await unrecommend({
        id: profile.id,
      });
    } else {
      await recommend({
        id: profile.id,
      });
    }

    return success();
  });
}
