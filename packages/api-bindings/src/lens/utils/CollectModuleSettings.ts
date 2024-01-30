import * as gql from '../graphql/generated';
import { OpenActionModuleSettings, PrimaryPublication } from '../publication';

export type CollectModuleSettings =
  | gql.LegacyAaveFeeCollectModuleSettings
  | gql.LegacyErc4626FeeCollectModuleSettings
  | gql.LegacyFeeCollectModuleSettings
  | gql.LegacyLimitedFeeCollectModuleSettings
  | gql.LegacyLimitedTimedFeeCollectModuleSettings
  | gql.LegacyMultirecipientFeeCollectModuleSettings
  | gql.LegacyTimedFeeCollectModuleSettings
  | gql.LegacySimpleCollectModuleSettings
  | gql.LegacyFreeCollectModuleSettings
  | gql.MultirecipientFeeCollectOpenActionSettings
  | gql.SimpleCollectOpenActionSettings;

const ModulesWithKnownCollectCapability: Record<OpenActionModuleSettings['__typename'], boolean> = {
  LegacyAaveFeeCollectModuleSettings: true,
  LegacyERC4626FeeCollectModuleSettings: true,
  LegacyFeeCollectModuleSettings: true,
  LegacyLimitedFeeCollectModuleSettings: true,
  LegacyLimitedTimedFeeCollectModuleSettings: true,
  LegacyMultirecipientFeeCollectModuleSettings: true,
  LegacyTimedFeeCollectModuleSettings: true,
  LegacySimpleCollectModuleSettings: true,
  LegacyFreeCollectModuleSettings: true,
  MultirecipientFeeCollectOpenActionSettings: true,
  SimpleCollectOpenActionSettings: true,

  LegacyRevertCollectModuleSettings: false,
  UnknownOpenActionModuleSettings: false,
};

/**
 * Given an open action module settings, determine if it is a collect module
 *
 * @experimental This function is not yet stable and may be removed in a future release
 */
export function isCollectModuleSettings(
  settings: OpenActionModuleSettings,
): settings is CollectModuleSettings {
  return ModulesWithKnownCollectCapability[settings.__typename] ?? false;
}

/**
 * Given a publication, find the collect module settings if any
 *
 * @experimental This function is not yet stable and may be removed in a future release
 */
export function findCollectModuleSettings(
  collectable: PrimaryPublication,
): CollectModuleSettings | null {
  return collectable.openActionModules?.find(isCollectModuleSettings) ?? null;
}
