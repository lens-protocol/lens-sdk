import { AnyPublication, ProfileOwnedByMe, isMirrorPublication } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useNotInterestedController } from './adapters/useNotInterestedController';

export type UseNotInterestedArgs = {
  profile: ProfileOwnedByMe;
  publication: AnyPublication;
};

export type NotInterestedOperation = Operation<void>;

/**
 * `useNotInterested` hook let the user flag they are not interested in a publication.
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * You can use the {@link Post.notInterested} (or  {@link Comment.notInterested}) property to determine
 * the interest associated with the provided publication observer.
 *
 * The `profile` argument MUST be the {@link ProfileOwnedByMe} instance that was used as observer when the publication got fetched.
 * For the vast majority of the users this corresponds to the Profile returned by the {@link useActiveProfile} hook.
 *
 * In the rare occasions you provided an `observerId` to the hook used to fetch the publication, then you MUST provide
 * the corresponding profile here. The profile MUST be owned by the authenticated wallet (i.e. instance of {@link ProfileOwnedByMe}).
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseNotInterestedArgs}
 *
 * @example
 * ```tsx
 * import { AnyPublication, ProfileOwnedByMe, useNotInterested } from '@lens-protocol/react-web';
 *
 * function Publication({ profile, publication }: { profile: ProfileOwnedByMe, publication: AnyPublication }) {
 *   const { execute: toggle, isPending } = useNotInterested({ profile, publication });
 *
 *   return (
 *     <button onClick={toggle} disabled={isPending}>
 *       {publication.notInterested ? 'Not interested' : 'Interested'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useNotInterested({
  publication,
  profile,
}: UseNotInterestedArgs): NotInterestedOperation {
  const { add, remove } = useNotInterestedController();

  const target = isMirrorPublication(publication) ? publication.mirrorOf : publication;

  invariant(
    profile.ownedByMe,
    `The provided 'profile' is not owned by the authenticated wallet.\n` +
      `Use the 'useActiveProfile' or 'useProfilesOwnedByMe' hooks to get a 'ProfileOwnedByMe' instance.`,
  );

  invariant(
    profile.id === target.observedBy,
    `${publication.__typename}[ID:${publication.id}] was not fetched using Profile[ID:${profile.id}] as observer.\n` +
      `If you didn't provide an explicit 'observerId' when fetching the publication,\n` +
      `then you are likely just need to provide the current Active Profile returned by the 'useActiveProfile' hook.\n` +
      `Otherwise, you MUST provide the Profile that was used as observer when fetching the publication.`,
  );

  return useOperation(async () => {
    if (target.notInterested) {
      await remove({
        publicationId: target.id,
        profileId: profile.id,
      });
    } else {
      await add({
        publicationId: target.id,
        profileId: profile.id,
      });
    }

    return success();
  });
}
