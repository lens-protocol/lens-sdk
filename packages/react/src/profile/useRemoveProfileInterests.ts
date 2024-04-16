import { ProfileInterestTypes } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useProfileInterestsController } from './adapters/useProfileInterestsController';

export { ProfileInterestTypes };

export type RemoveProfileInterestsArgs = {
  interests: ProfileInterestTypes[];
};

/**
 * Remove profile interests.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * function ProfileInterests({ profile }: { profile: Profile }) {
 *   const { execute: addInterests } = useAddProfileInterests();
 *   const { execute: removeInterests } = useRemoveProfileInterests();
 *
 *   const handleClick = async (interest: ProfileInterestTypes) => {
 *     const request = {
 *       interests: [interest],
 *     };
 *
 *     if (profile.interests.includes(interest)) {
 *       await removeInterests(request);
 *     } else {
 *       await addInterests(request);
 *     }
 *   };
 *
 *   return <button onClick={() => handleClick(ProfileInterestTypes.Business)}>Business</button>;
 * }
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useRemoveProfileInterests(): UseDeferredTask<
  void,
  never,
  RemoveProfileInterestsArgs
> {
  const { data: session } = useSession();
  const { remove } = useProfileInterestsController();

  return useDeferredTask(async (request) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to use this hook. Use `useLogin` hook to authenticate.',
    );

    await remove({
      profileId: session.profile.id,
      interests: request.interests,
    });

    return success();
  });
}
