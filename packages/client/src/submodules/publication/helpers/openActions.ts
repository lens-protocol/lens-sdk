import { OpenActionModuleFragment } from '../../../graphql';

export type OpenActionModuleWithReferralFeeFragment = Extract<
  OpenActionModuleFragment,
  { referralFee: number }
>;

export function isOpenActionModuleWithReferralFee(
  module: OpenActionModuleFragment,
): module is OpenActionModuleWithReferralFeeFragment {
  return 'referralFee' in module;
}
