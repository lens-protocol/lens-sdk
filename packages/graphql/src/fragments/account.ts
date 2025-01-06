import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { OperationValidationOutcomeFragment } from './common';
import { MetadataAttributeFragment } from './metadata';
import { UsernameFragment } from './username';

// TODO: add canFollow and canUnfollow after implementing OperationValidationOutcome
export const LoggedInAccountOperationsFragment = graphql(
  `fragment LoggedInAccountOperations on LoggedInAccountOperations {
    __typename
    id
    isFollowedByMe
    isFollowingMe
    canFollow {
      ...OperationValidationOutcome
    }
    canUnfollow {
      ...OperationValidationOutcome
    }
    isMutedByMe
    isBlockedByMe
    hasBlockedMe
    canBlock
    canUnblock
    hasReported
  }`,
  [OperationValidationOutcomeFragment],
);
export type LoggedInAccountOperations = FragmentOf<typeof LoggedInAccountOperationsFragment>;

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
export type AccountMetadata = FragmentOf<typeof AccountMetadataFragment>;

export const AccountFragment = graphql(
  `fragment Account on Account {
    __typename
    address
  }`,
  [],
);
export type Account = FragmentOf<typeof AccountFragment>;

export const FullAccountFragment = graphql(
  `fragment Account on Account {
    __typename
    address
    username{
      ...Username
    }
    metadata {
      ...AccountMetadata
    }
    operations {
      ...LoggedInAccountOperations
    }
  }`,
  [AccountMetadataFragment, LoggedInAccountOperationsFragment, UsernameFragment],
);
export type FullAccount = FragmentOf<typeof AccountFragment>;

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
