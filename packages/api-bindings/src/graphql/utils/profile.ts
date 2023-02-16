import { Overwrite } from '@lens-protocol/shared-kernel';

import { ProfileFragment } from '../generated';

export type ProfileOwnedByMeFragment = Overwrite<ProfileFragment, { ownedByMe: true }>;

export function isProfileOwnedByMe(profile: ProfileFragment): profile is ProfileOwnedByMeFragment {
  return profile.ownedByMe;
}
