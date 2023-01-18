import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Overwrite } from '@lens-protocol/shared-kernel';

import {
  FeeFollowModuleSettingsFragment,
  ProfileFieldsFragment,
  ProfileFollowModuleSettingsFragment,
  RevertFollowModuleSettingsFragment,
} from '../generated';

export type SupportedFollowModuleSettingsFragment =
  | FeeFollowModuleSettingsFragment
  | ProfileFollowModuleSettingsFragment
  | RevertFollowModuleSettingsFragment
  | null;

export type ProfileFieldsFragmentWithSupportedFollowModule = Overwrite<
  ProfileFieldsFragment,
  { followModule: SupportedFollowModuleSettingsFragment }
>;

export type ProfileFieldsFragmentWithRevertFollowModule = Overwrite<
  ProfileFieldsFragment,
  { followModule: RevertFollowModuleSettingsFragment }
>;

export type ProfileFieldsFragmentWithFeeFollowModule = Overwrite<
  ProfileFieldsFragment,
  { followModule: FeeFollowModuleSettingsFragment }
>;

export function isProfileFieldsFragmentWithSupportedFollowModule(
  profile: ProfileFieldsFragment,
): profile is ProfileFieldsFragmentWithSupportedFollowModule {
  const followPolicyType = getFollowPolicyTypeFromProfileFieldsFragment(profile.followModule);
  return followPolicyType !== null;
}

export function isProfileFieldsFragmentWithRevertFollowModule(
  profile: ProfileFieldsFragment,
): profile is ProfileFieldsFragmentWithRevertFollowModule {
  return (
    getFollowPolicyTypeFromProfileFieldsFragment(profile.followModule) === FollowPolicyType.NO_ONE
  );
}

export function isProfileFieldsFragmentWithFeeFollowModule(
  profile: ProfileFieldsFragment,
): profile is ProfileFieldsFragmentWithFeeFollowModule {
  return (
    getFollowPolicyTypeFromProfileFieldsFragment(profile.followModule) === FollowPolicyType.CHARGE
  );
}

export function getFollowPolicyTypeFromProfileFieldsFragment(
  followModule: ProfileFieldsFragment['followModule'],
): FollowPolicyType | null {
  if (followModule === null) {
    return FollowPolicyType.ANYONE;
  }

  if (followModule.__typename === 'FeeFollowModuleSettings') {
    return FollowPolicyType.CHARGE;
  }

  if (followModule.__typename === 'ProfileFollowModuleSettings') {
    return FollowPolicyType.ONLY_PROFILE_OWNERS;
  }

  if (followModule.__typename === 'RevertFollowModuleSettings') {
    return FollowPolicyType.NO_ONE;
  }

  return null;
}
