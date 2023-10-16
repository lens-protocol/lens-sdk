import { mock } from 'jest-mock-extended';

import * as gql from '../../graphql/generated';

export function mockSimpleCollectOpenActionSettings(
  overrides?: Partial<gql.SimpleCollectOpenActionSettings>,
) {
  return mock<gql.SimpleCollectOpenActionSettings>({
    ...overrides,
    __typename: 'SimpleCollectOpenActionSettings',
  });
}
// {
//   __typename: 'SimpleCollectOpenActionSettings';
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   collectLimit: string | null;
//   endsAt: string | null;
//   contract: NetworkAddress;
//   amount: Amount;
// };

export function mockMultirecipientFeeCollectOpenActionSettings(
  overrides?: Partial<gql.MultirecipientFeeCollectOpenActionSettings>,
) {
  return mock<gql.MultirecipientFeeCollectOpenActionSettings>({
    ...overrides,
    __typename: 'MultirecipientFeeCollectOpenActionSettings',
  });
}
// {
//   __typename: 'MultirecipientFeeCollectOpenActionSettings';
//   referralFee: number;
//   followerOnly: boolean;
//   collectLimit: string | null;
//   endsAt: string | null;
//   contract: NetworkAddress;
//   amount: Amount;
//   recipients: Array<Recipient>;
// };

export function mockUnknownOpenActionModuleSettings(
  overrides?: Partial<gql.UnknownOpenActionModuleSettings>,
) {
  return mock<gql.UnknownOpenActionModuleSettings>({
    ...overrides,
    __typename: 'UnknownOpenActionModuleSettings',
  });
}
// {
//   __typename: 'UnknownOpenActionModuleSettings';
//   openActionModuleReturnData: string | null;
//   contract: NetworkAddress;
// };

export function mockLegacyFreeCollectModuleSettings(
  overrides?: Partial<gql.LegacyFreeCollectModuleSettings>,
) {
  return mock<gql.LegacyFreeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyFreeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyFreeCollectModuleSettings';
//   followerOnly: boolean;
//   contract: NetworkAddress;
// };

export function mockLegacyFeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyFeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyFeeCollectModuleSettings';
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   contract: NetworkAddress;
//   amount: Amount;
// };

export function mockLegacyLimitedFeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyLimitedFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyLimitedFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyLimitedFeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyLimitedFeeCollectModuleSettings';
//   collectLimit: string | null;
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   contract: NetworkAddress;
//   amount: Amount;
// };

export function mockLegacyLimitedTimedFeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyLimitedTimedFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyLimitedTimedFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyLimitedTimedFeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
//   collectLimit: string | null;
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   endTimestamp: string;
//   contract: NetworkAddress;
//   amount: Amount;
// };

export function mockLegacyRevertCollectModuleSettings(
  overrides?: Partial<gql.LegacyRevertCollectModuleSettings>,
) {
  return mock<gql.LegacyRevertCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyRevertCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyRevertCollectModuleSettings';
//   contract: NetworkAddress;
// };

export function mockLegacyTimedFeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyTimedFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyTimedFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyTimedFeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyTimedFeeCollectModuleSettings';
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   endTimestamp: string;
//   contract: NetworkAddress;
//   amount: Amount;
// };

export function mockLegacyMultirecipientFeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyMultirecipientFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyMultirecipientFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyMultirecipientFeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
//   referralFee: number;
//   followerOnly: boolean;
//   collectLimit: string | null;
//   endsAt: string | null;
//   contract: NetworkAddress;
//   amount: Amount;
//   recipients: Array<Recipient>;
// };

export function mockLegacySimpleCollectModuleSettings(
  overrides?: Partial<gql.LegacySimpleCollectModuleSettings>,
) {
  return mock<gql.LegacySimpleCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacySimpleCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacySimpleCollectModuleSettings';
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   collectLimit: string | null;
//   endsAt: string | null;
//   contract: NetworkAddress;
//   amount: Amount;
// };

export function mockLegacyErc4626FeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyErc4626FeeCollectModuleSettings>,
) {
  return mock<gql.LegacyErc4626FeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyERC4626FeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyERC4626FeeCollectModuleSettings';
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   collectLimit: string | null;
//   endsAt: string | null;
//   contract: NetworkAddress;
//   vault: NetworkAddress;
//   amount: Amount;
// };

export function mockLegacyAaveFeeCollectModuleSettings(
  overrides?: Partial<gql.LegacyAaveFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyAaveFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyAaveFeeCollectModuleSettings',
  });
}
// {
//   __typename: 'LegacyAaveFeeCollectModuleSettings';
//   recipient: EvmAddress;
//   referralFee: number;
//   followerOnly: boolean;
//   collectLimit: string | null;
//   endsAt: string | null;
//   contract: NetworkAddress;
//   amount: Amount;
// };
