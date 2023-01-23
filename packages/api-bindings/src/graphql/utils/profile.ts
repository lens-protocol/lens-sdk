import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Overwrite } from '@lens-protocol/shared-kernel';

import {
  FeeFollowModuleSettingsFragment,
  ProfileFragment,
  ProfileFollowModuleSettingsFragment,
  RevertFollowModuleSettingsFragment,
} from '../generated';

export type SupportedFollowModuleSettingsFragment =
  | FeeFollowModuleSettingsFragment
  | ProfileFollowModuleSettingsFragment
  | RevertFollowModuleSettingsFragment
  | null;

export type ProfileFragmentWithSupportedFollowModule = Overwrite<
  ProfileFragment,
  { followModule: SupportedFollowModuleSettingsFragment }
>;

export type ProfileFragmentWithRevertFollowModule = Overwrite<
  ProfileFragment,
  { followModule: RevertFollowModuleSettingsFragment }
>;

export type ProfileFragmentWithFeeFollowModule = Overwrite<
  ProfileFragment,
  { followModule: FeeFollowModuleSettingsFragment }
>;

export function isProfileFragmentWithSupportedFollowModule(
  profile: ProfileFragment,
): profile is ProfileFragmentWithSupportedFollowModule {
  const followPolicyType = getFollowPolicyTypeFromProfileFragment(profile);
  return followPolicyType !== null;
}

export function isProfileFragmentWithRevertFollowModule(
  profile: ProfileFragment,
): profile is ProfileFragmentWithRevertFollowModule {
  return getFollowPolicyTypeFromProfileFragment(profile) === FollowPolicyType.NO_ONE;
}

export function isProfileFragmentWithFeeFollowModule(
  profile: ProfileFragment,
): profile is ProfileFragmentWithFeeFollowModule {
  return getFollowPolicyTypeFromProfileFragment(profile) === FollowPolicyType.CHARGE;
}

export function getFollowPolicyTypeFromProfileFragment(
  profile: ProfileFragment,
): FollowPolicyType | null {
  if (profile.followModule === null) {
    return FollowPolicyType.ANYONE;
  }

  if (profile.followModule.__typename === 'FeeFollowModuleSettings') {
    return FollowPolicyType.CHARGE;
  }

  if (profile.followModule.__typename === 'ProfileFollowModuleSettings') {
    return FollowPolicyType.ONLY_PROFILE_OWNERS;
  }

  if (profile.followModule.__typename === 'RevertFollowModuleSettings') {
    return FollowPolicyType.NO_ONE;
  }

  return null;
}
