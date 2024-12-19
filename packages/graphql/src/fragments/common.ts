import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const BooleanValueFragment = graphql(
  `fragment BooleanValue on BooleanValue {
    __typename
    optimistic
    onChain
  }`,
);
export type BooleanValue = FragmentOf<typeof BooleanValueFragment>;

export const NetworkAddressFragment = graphql(
  `fragment NetworkAddress on NetworkAddress {
    __typename
    address
    chainId
  }`,
);
export type NetworkAddress = FragmentOf<typeof NetworkAddressFragment>;

export const Erc20Fragment = graphql(
  `fragment Erc20 on Erc20 {
    __typename
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddressFragment],
);
export type Erc20 = FragmentOf<typeof Erc20Fragment>;

export const AssetFragment = graphql(
  `fragment Asset on Asset {
    ...on Erc20 {
      ...Erc20
    }
  }`,
  [Erc20Fragment],
);
export type Asset = FragmentOf<typeof AssetFragment>;

export const AmountFragment = graphql(
  `fragment Amount on Amount {
    __typename
    asset {
      ...Asset
    }
    value
  }`,
  [AssetFragment],
);
export type Amount = FragmentOf<typeof AmountFragment>;

export const ActionInputInfoFragment = graphql(
  `fragment ActionInputInfo on ActionInputInfo {
    __typename
    type
    name
  }`,
);
export type ActionInputInfo = FragmentOf<typeof ActionInputInfoFragment>;

const KeyValueFragment = graphql(
  `fragment KeyValue on KeyValue {
    __typename
    key
    value
  }`,
);
export type KeyValue = FragmentOf<typeof KeyValueFragment>;

const UnknownRuleFragment = graphql(
  `fragment UnknownRule on UnknownRule {
    __typename
    rule
    configParams {
      ...KeyValue
    }
  }`,
  [KeyValueFragment],
);
export type UnknownRule = FragmentOf<typeof UnknownRuleFragment>;

const UnsatisfiedRuleFragment = graphql(
  `fragment UnsatisfiedRule on UnsatisfiedRule {
    __typename
    name
    rule
    reason
  }`,
);
export type UnsatisfiedRule = FragmentOf<typeof UnsatisfiedRuleFragment>;

const OperationValidationFailedFragment = graphql(
  `fragment OperationValidationFailed on OperationValidationFailed {
    __typename
    reason
    unsatisfiedRules {
      ...UnsatisfiedRule
    }
  }`,
  [UnsatisfiedRuleFragment],
);
export type OperationValidationFailed = FragmentOf<typeof OperationValidationFailedFragment>;

const OperationValidationPassedFragment = graphql(
  `fragment OperationValidationPassed on OperationValidationPassed {
    __typename
    restrictedSignerRequired
    extraChecksRequired {
      ...UnknownRule
    }
  }`,
  [UnknownRuleFragment],
);
export type OperationValidationPassed = FragmentOf<typeof OperationValidationPassedFragment>;

export const OperationValidationOutcomeFragment = graphql(
  `fragment OperationValidationOutcome on OperationValidationOutcome {
    ...on OperationValidationPassed {
      ...OperationValidationPassed
    }
    ...on OperationValidationFailed {
      ...OperationValidationFailed
    }
  }`,
  [OperationValidationPassedFragment, OperationValidationFailedFragment],
);
export type OperationValidationOutcome = FragmentOf<typeof OperationValidationOutcomeFragment>;
