import { Overwrite } from '@lens-protocol/shared-kernel';

import { Profile } from '../operations';

export type ProfileOwnedByMe = Overwrite<Profile, { ownedByMe: true }>;

export function isProfileOwnedByMe(profile: Profile): profile is ProfileOwnedByMe {
  return profile.ownedByMe;
}
