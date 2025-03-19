import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { ActionMetadataFragment, AnyKeyValueFragment } from './common';
import { MetadataAttributeFragment } from './metadata';
import { type GraphRule, GraphRuleFragment } from './primitives';
import { UsernameFragment } from './username';

export const AccountFollowOperationValidationPassedFragment = graphql(
  `fragment AccountFollowOperationValidationPassed on AccountFollowOperationValidationPassed {
    __typename
  }`,
);
export type AccountFollowOperationValidationPassed = FragmentOf<
  typeof AccountFollowOperationValidationPassedFragment
>;

export const AccountFollowRuleFragment = graphql(
  `fragment AccountFollowRule on AccountFollowRule {
    __typename
    id
    type
    address
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type AccountFollowRule = FragmentOf<typeof AccountFollowRuleFragment>;

export const AccountFollowOperationValidationRuleFragment = graphql(
  `fragment AccountFollowOperationValidationRule on AccountFollowOperationValidationRule {
    __typename
    ... on AccountFollowRule {
      ...AccountFollowRule
    }
    ... on GraphRule {
      ...GraphRule
    }
  }`,
  [AccountFollowRuleFragment, GraphRuleFragment],
);
export type AccountFollowOperationValidationRule = AccountFollowRule | GraphRule;

export const AccountFollowOperationValidationUnknownFragment = graphql(
  `fragment AccountFollowOperationValidationUnknown on AccountFollowOperationValidationUnknown {
    __typename
    extraChecksRequired {
      ...AccountFollowOperationValidationRule
    }
  }`,
  [AccountFollowOperationValidationRuleFragment],
);
export type AccountFollowOperationValidationUnknown = FragmentOf<
  typeof AccountFollowOperationValidationUnknownFragment
>;

export const AccountFollowUnsatisfiedRuleFragment = graphql(
  `fragment AccountFollowUnsatisfiedRule on AccountFollowUnsatisfiedRule {
    __typename
    rule
    reason
    message
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type AccountFollowUnsatisfiedRule = FragmentOf<typeof AccountFollowUnsatisfiedRuleFragment>;

export const AccountFollowUnsatisfiedRulesFragment = graphql(
  `fragment AccountFollowUnsatisfiedRules on AccountFollowUnsatisfiedRules {
    __typename
    required {
      ...AccountFollowUnsatisfiedRule
    }
    anyOf {
      ...AccountFollowUnsatisfiedRule
    }
  }`,
  [AccountFollowUnsatisfiedRuleFragment],
);
export type AccountFollowUnsatisfiedRules = FragmentOf<
  typeof AccountFollowUnsatisfiedRulesFragment
>;

export const AccountFollowOperationValidationFailedFragment = graphql(
  `fragment AccountFollowOperationValidationFailed on AccountFollowOperationValidationFailed {
    __typename
    unsatisfiedRules {
      ...AccountFollowUnsatisfiedRules
    }
    reason
  }`,
  [AccountFollowUnsatisfiedRulesFragment],
);
export type AccountFollowOperationValidationFailed = FragmentOf<
  typeof AccountFollowOperationValidationFailedFragment
>;

export const AccountFollowOperationValidationOutcomeFragment = graphql(
  `fragment AccountFollowOperationValidationOutcome on AccountFollowOperationValidationOutcome {
    __typename
    ... on AccountFollowOperationValidationPassed {
      ...AccountFollowOperationValidationPassed
    }
    ... on AccountFollowOperationValidationUnknown {
      ...AccountFollowOperationValidationUnknown
    }
    ... on AccountFollowOperationValidationFailed {
      ...AccountFollowOperationValidationFailed
    }
  }`,
  [
    AccountFollowOperationValidationPassedFragment,
    AccountFollowOperationValidationUnknownFragment,
    AccountFollowOperationValidationFailedFragment,
  ],
);
export type AccountFollowOperationValidationOutcome =
  | AccountFollowOperationValidationPassed
  | AccountFollowOperationValidationUnknown
  | AccountFollowOperationValidationFailed;

export const LoggedInAccountOperationsFragment = graphql(
  `fragment LoggedInAccountOperations on LoggedInAccountOperations {
    __typename
    id
    isFollowedByMe
    isFollowingMe
    canFollow {
      ...AccountFollowOperationValidationOutcome
    }
    canUnfollow {
      ...AccountFollowOperationValidationOutcome
    }
    isMutedByMe
    isBlockedByMe
    hasBlockedMe
    canBlock
    canUnblock
    hasReported
  }`,
  [AccountFollowOperationValidationOutcomeFragment],
);
export interface LoggedInAccountOperations
  extends FragmentOf<typeof LoggedInAccountOperationsFragment> {}

export const AccountMetadataFragment = graphql(
  `fragment AccountMetadata on AccountMetadata {
    __typename
    attributes {
      ...MetadataAttribute
    }
    bio
    coverPicture
    id
    name
    picture
  }`,
  [MetadataAttributeFragment],
);
export interface AccountMetadata extends FragmentOf<typeof AccountMetadataFragment> {}

export const AccountFollowRulesFragment = graphql(
  `fragment AccountFollowRules on AccountFollowRules {
    __typename
    required {
      ...AccountFollowRule
    }
    anyOf {
      ...AccountFollowRule
    }
  }`,
  [AccountFollowRuleFragment],
);
export type AccountFollowRules = FragmentOf<typeof AccountFollowRulesFragment>;

export const TippingAccountActionFragment = graphql(
  `fragment TippingAccountAction on TippingAccountAction {
    __typename
    address
  }`,
);
export type TippingAccountAction = FragmentOf<typeof TippingAccountActionFragment>;

export const UnknownAccountActionFragment = graphql(
  `fragment UnknownAccountAction on UnknownAccountAction {
    __typename
    address
    config {
      ...AnyKeyValue
    }
    metadata {
      ...ActionMetadata
    }
  }`,
  [AnyKeyValueFragment, ActionMetadataFragment],
);
export type UnknownAccountAction = FragmentOf<typeof UnknownAccountActionFragment>;

export const AccountActionFragment = graphql(
  `fragment AccountAction on AccountAction {
    __typename
    ... on TippingAccountAction {
      ...TippingAccountAction
    }
    ... on UnknownAccountAction {
      ...UnknownAccountAction
    }
  }`,
  [TippingAccountActionFragment, UnknownAccountActionFragment],
);
export type AccountAction = TippingAccountAction | UnknownAccountAction;

export const AccountFragment = graphql(
  `fragment Account on Account {
    __typename
    address
    owner
    score
    createdAt
    username{
      ...Username
    }
    metadata {
      ...AccountMetadata
    }
    operations {
      ...LoggedInAccountOperations
    }
    rules {
      ...AccountFollowRules
    }
    actions {
      ...AccountAction
    }
  }`,
  [
    AccountMetadataFragment,
    LoggedInAccountOperationsFragment,
    UsernameFragment,
    AccountFollowRulesFragment,
    AccountActionFragment,
  ],
);
export interface Account extends FragmentOf<typeof AccountFragment> {}

const AccountManagerPermissionsFragment = graphql(
  `fragment AccountManagerPermissions on AccountManagerPermissions {
    __typename
    canExecuteTransactions
    canSetMetadataUri
    canTransferNative
    canTransferTokens
  }`,
);
export type AccountManagerPermissions = FragmentOf<typeof AccountManagerPermissionsFragment>;

export const AccountManagerFragment = graphql(
  `fragment AccountManager on AccountManager {
    __typename
    addedAt
    manager
    isLensManager
    permissions {
      ...AccountManagerPermissions
    }
  }`,
  [AccountManagerPermissionsFragment],
);
export type AccountManager = FragmentOf<typeof AccountManagerFragment>;

const AccountManagedFragment = graphql(
  `fragment AccountManaged on AccountManaged {
    __typename
    addedAt
    account {
      ...Account
    }
    permissions {
      ...AccountManagerPermissions
    }
  }`,
  [AccountManagerPermissionsFragment, AccountFragment],
);
export type AccountManaged = FragmentOf<typeof AccountManagedFragment>;

export const AccountAvailableFragment = graphql(
  `fragment AccountAvailable on AccountAvailable {
    __typename
    ... on AccountManaged {
      ...AccountManaged
    }
    ... on AccountOwned {
      __typename
      addedAt
      account {
        ...Account
      }
    }
  }`,
  [AccountFragment, AccountManagedFragment],
);
export type AccountAvailable = FragmentOf<typeof AccountAvailableFragment>;

export const AccountBlockedFragment = graphql(
  `fragment AccountBlocked on AccountBlocked {
    __typename
    blockedAt
    account {
      ...Account
    }
  }`,
  [AccountFragment],
);
export type AccountBlocked = FragmentOf<typeof AccountBlockedFragment>;
