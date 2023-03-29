import { Overwrite } from '@lens-protocol/shared-kernel';

import { Profile } from '../operations';

export type ProfileOwnedByMe = Overwrite<Profile, { ownedByMe: true }>;

/**
 * @group Helpers
 */
export function isProfileOwnedByMe(profile: Profile): profile is ProfileOwnedByMe {
  return profile.ownedByMe;
}

export type FollowModule = NonNullable<Profile['followModule']>;

export type ProfileMedia = NonNullable<Profile['picture'] | Profile['coverPicture']>;
