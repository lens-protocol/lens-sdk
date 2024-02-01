import {
  LegacyAaveFeeCollectModuleSettingsFragment,
  LegacyErc4626FeeCollectModuleSettingsFragment,
  LegacyFeeCollectModuleSettingsFragment,
  LegacyFreeCollectModuleSettingsFragment,
  LegacyLimitedFeeCollectModuleSettingsFragment,
  LegacyLimitedTimedFeeCollectModuleSettingsFragment,
  LegacyMultirecipientFeeCollectModuleSettingsFragment,
  LegacyRevertCollectModuleSettingsFragment,
  LegacySimpleCollectModuleSettingsFragment,
  LegacyTimedFeeCollectModuleSettingsFragment,
  MultirecipientFeeCollectOpenActionSettingsFragment,
  SimpleCollectOpenActionSettingsFragment,
  UnknownOpenActionModuleSettingsFragment,
} from '../../../graphql/fragments.generated';

export type OpenActionModuleFragment =
  | LegacyAaveFeeCollectModuleSettingsFragment
  | LegacyErc4626FeeCollectModuleSettingsFragment
  | LegacyFeeCollectModuleSettingsFragment
  | LegacyFreeCollectModuleSettingsFragment
  | LegacyLimitedFeeCollectModuleSettingsFragment
  | LegacyLimitedTimedFeeCollectModuleSettingsFragment
  | LegacyMultirecipientFeeCollectModuleSettingsFragment
  | LegacyRevertCollectModuleSettingsFragment
  | LegacySimpleCollectModuleSettingsFragment
  | LegacyTimedFeeCollectModuleSettingsFragment
  | MultirecipientFeeCollectOpenActionSettingsFragment
  | SimpleCollectOpenActionSettingsFragment
  | UnknownOpenActionModuleSettingsFragment;

export type OpenActionModuleWithReferralFeeFragment =
  | LegacyAaveFeeCollectModuleSettingsFragment
  | LegacyErc4626FeeCollectModuleSettingsFragment
  | LegacyFeeCollectModuleSettingsFragment
  | LegacyLimitedFeeCollectModuleSettingsFragment
  | LegacyLimitedTimedFeeCollectModuleSettingsFragment
  | LegacyMultirecipientFeeCollectModuleSettingsFragment
  | LegacySimpleCollectModuleSettingsFragment
  | LegacyTimedFeeCollectModuleSettingsFragment
  | MultirecipientFeeCollectOpenActionSettingsFragment
  | SimpleCollectOpenActionSettingsFragment;

export function isOpenActionModuleWithReferralFee(
  module: OpenActionModuleFragment,
): module is OpenActionModuleWithReferralFeeFragment {
  return 'referralFee' in module;
}
