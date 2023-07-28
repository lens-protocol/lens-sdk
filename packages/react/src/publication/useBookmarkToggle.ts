import { AnyPublication, ProfileOwnedByMe, isMirrorPublication } from '@lens-protocol/api-bindings';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useBookmarkToggleController } from './adapters/useBookmarkToggleController';

export type UseBookmarkToggleArgs = {
  profile: ProfileOwnedByMe;
  publication: AnyPublication;
};

export type BookmarkOperation = Operation<void>;

/**
 * `useBookmarkToggle` hook lets the user save or remove a publication from their bookmarks.
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * You can use the `Post.bookmarked` (or  `Comment.bookmarked`) property to determine
 * if the publication is bookmarked by the current observer.
 *
 * The `profile` argument MUST be the {@link ProfileOwnedByMe} instance that was used as observer when the publication got fetched.
 * For the vast majority of the users this corresponds to the Profile returned by the {@link useActiveProfile} hook.
 *
 * In the rare occasions you provided an `observerId` to the hook used to fetch the publication, then you MUST provide
 * the corresponding profile here. The profile MUST be owned by the authenticated wallet (i.e. instance of {@link ProfileOwnedByMe}).
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseBookmarkToggleArgs}
 *
 * @example
 * ```tsx
 * import { AnyPublication, ProfileOwnedByMe, useBookmarkToggle } from '@lens-protocol/react-web';
 *
 * function Publication({ profile, publication }: { profile: ProfileOwnedByMe, publication: AnyPublication }) {
 *   const { execute: toggle, isPending } = useBookmarkToggle({ profile, publication });
 *
 *   return (
 *     <button onClick={toggle} disabled={isPending}>
 *       {publication.bookmarked ? 'Bookmarked' : 'Not bookmarked'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useBookmarkToggle({
  publication,
  profile,
}: UseBookmarkToggleArgs): BookmarkOperation {
  const { add, remove } = useBookmarkToggleController();

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
    if (target.bookmarked) {
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
