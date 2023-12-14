import { PickByTypename, Typename } from '../../../types';

/**
 * Check if module settings are {@link UnknownOpenActionModuleSettingsFragment}.
 *
 * @param moduleSettings - moduleSettings to check
 * @returns true if the result is {@link UnknownOpenActionModuleSettingsFragment}
 */
export function isUnknownOpenActionModuleSettings<T extends Typename<string>>(
  moduleSettings: T,
): moduleSettings is PickByTypename<T, 'UnknownOpenActionModuleSettings'> {
  return moduleSettings.__typename === 'UnknownOpenActionModuleSettings';
}

/**
 * Check if module settings are {@link UnknownFollowModuleSettingsFragment}.
 *
 * @param moduleSettings - moduleSettings to check
 * @returns true if the result is {@link UnknownFollowModuleSettingsFragment}
 */
export function isUnknownFollowModuleSettings<T extends Typename<string>>(
  moduleSettings: T,
): moduleSettings is PickByTypename<T, 'UnknownFollowModuleSettings'> {
  return moduleSettings.__typename === 'UnknownFollowModuleSettings';
}

/**
 * Check if module settings are {@link UnknownReferenceModuleSettingsFragment}.
 *
 * @param moduleSettings - moduleSettings to check
 * @returns true if the result is {@link UnknownReferenceModuleSettingsFragment}
 */
export function isUnknownReferenceModuleSettings<T extends Typename<string>>(
  moduleSettings: T,
): moduleSettings is PickByTypename<T, 'UnknownReferenceModuleSettings'> {
  return moduleSettings.__typename === 'UnknownReferenceModuleSettings';
}
