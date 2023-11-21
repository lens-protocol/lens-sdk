import { Overwrite } from '@lens-protocol/shared-kernel';

import { Profile, ProfileFields } from '../generated';

export type ProfileOwnedByMe<T extends ProfileFields = Profile> = Overwrite<T, { ownedByMe: true }>;

/**
 * @group Helpers
 */
export function isProfileOwnedByMe<T extends ProfileFields>(
  profile: ProfileFields,
): profile is ProfileOwnedByMe<T> {
  return profile.ownedByMe;
}

export type FollowModule = NonNullable<Profile['followModule']>;

export type ProfilePictureMedia = NonNullable<Profile['picture']>;
export type ProfileCoverMedia = NonNullable<Profile['coverPicture']>;
