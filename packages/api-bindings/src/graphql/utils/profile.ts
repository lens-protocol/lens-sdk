import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Overwrite } from '@lens-protocol/shared-kernel';

import {
  FeeFollowModuleSettingsFragment,
  ProfileFieldsFragment,
  ProfileFollowModuleSettingsFragment,
  RevertFollowModuleSettingsFragment,
  UnknownFollowModuleSettingsFragment,
} from '../generated';

export type SupportedFollowModuleSettingsFragment =
  | FeeFollowModuleSettingsFragment
  | ProfileFollowModuleSettingsFragment
  | RevertFollowModuleSettingsFragment
  | null;

export type ProfileFieldsFragmentWithSupportedFollowModule = Overwrite<
  ProfileFieldsFragment,
  { __followModule: SupportedFollowModuleSettingsFragment }
>;

export type ProfileFieldsFragmentWithRevertFollowModule = Overwrite<
  ProfileFieldsFragment,
  { __followModule: RevertFollowModuleSettingsFragment }
>;

export type ProfileFieldsFragmentWithFeeFollowModule = Overwrite<
  ProfileFieldsFragment,
  { __followModule: FeeFollowModuleSettingsFragment }
>;

export type ProfileFieldsFragmentWithUnknownFollowModule = Overwrite<
  ProfileFieldsFragment,
  { __followModule: UnknownFollowModuleSettingsFragment }
>;

export function isProfileFieldsFragmentWithSupportedFollowModule(
  profile: ProfileFieldsFragment,
): profile is ProfileFieldsFragmentWithSupportedFollowModule {
  const followPolicyType = getFollowPolicyTypeFromProfileFieldsFragment(profile.__followModule);
  return followPolicyType !== FollowPolicyType.UNKNOWN;
}

export function isProfileFieldsFragmentWithRevertFollowModule(
  profile: ProfileFieldsFragment,
): profile is ProfileFieldsFragmentWithRevertFollowModule {
  return (
    getFollowPolicyTypeFromProfileFieldsFragment(profile.__followModule) === FollowPolicyType.NO_ONE
  );
}

export function isProfileFieldsFragmentWithFeeFollowModule(
  profile: ProfileFieldsFragment,
): profile is ProfileFieldsFragmentWithFeeFollowModule {
  return (
    getFollowPolicyTypeFromProfileFieldsFragment(profile.__followModule) === FollowPolicyType.CHARGE
  );
}

export function isFeeFollowModule(
  followModule: ProfileFieldsFragment['__followModule'],
): followModule is FeeFollowModuleSettingsFragment {
  return getFollowPolicyTypeFromProfileFieldsFragment(followModule) === FollowPolicyType.CHARGE;
}

export function getFollowPolicyTypeFromProfileFieldsFragment(
  followModule: ProfileFieldsFragment['__followModule'],
): FollowPolicyType {
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

  return FollowPolicyType.UNKNOWN;
}
