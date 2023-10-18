import * as gql from '../graphql/generated';
import { OpenActionModuleSettings, PrimaryPublication } from '../publication';

export type KnownCollectModuleSettings =
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

export function isKnownCollectModuleSettings(
  settings: OpenActionModuleSettings,
): settings is KnownCollectModuleSettings {
  return ModulesWithKnownCollectCapability[settings.__typename] ?? false;
}

export function findCollectActionModuleSettings(
  collectable: PrimaryPublication,
): KnownCollectModuleSettings | null {
  if (!collectable.openActionModules) return null;

  return collectable.openActionModules.find(isKnownCollectModuleSettings) ?? null;
}
