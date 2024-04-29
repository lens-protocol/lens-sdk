import { ProfileInterestTypes } from '@lens-protocol/api-bindings';
import { success } from '@lens-protocol/shared-kernel';

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
  const { remove } = useProfileInterestsController();

  return useDeferredTask(async (request) => {
    await remove({
      interests: request.interests,
    });

    return success();
  });
}
