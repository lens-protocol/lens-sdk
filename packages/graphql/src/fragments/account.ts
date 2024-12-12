import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { Username } from './username';

export const LoggedInAccountOperations = graphql(
  `fragment LoggedInAccountOperations on LoggedInAccountOperations {
    __typename
    id
    isFollowedByMe
    isFollowingMe
    canFollow
    canUnfollow
    isMutedByMe
    isBlockedByMe
    hasBlockedMe
    canBlock
    canUnblock
    hasReported
  }`,
);
export type LoggedInAccountOperations = FragmentOf<typeof LoggedInAccountOperations>;

// TODO fix this
export const AccountMetadata = graphql(
  `fragment AccountMetadata on AccountMetadata {
    __typename
  }`,
);
export type AccountMetadata = FragmentOf<typeof AccountMetadata>;

export const AccountFragment = graphql(
  `fragment Account on Account {
    __typename
    address
    username{
      ...Username
    }
  }`,
  [Username],
);
export type Account = FragmentOf<typeof AccountFragment>;

export const FullAccount = graphql(
  `fragment Account on Account {
    __typename
    address
    score
    metadata {
      ...AccountMetadata
    }
    username{
      ...Username
    }
    operations {
      ...LoggedInAccountOperations
    }
  }`,
  [AccountMetadata, LoggedInAccountOperations, Username],
);
export type FullAccount = FragmentOf<typeof FullAccount>;

const AccountManagerPermissions = graphql(
  `fragment AccountManagerPermissions on AccountManagerPermissions {
    __typename
    canExecuteTransactions
    canSetMetadataUri
    canTransferNative
    canTransferTokens
  }`,
);
export type AccountManagerPermissions = FragmentOf<typeof AccountManagerPermissions>;

export const AccountManager = graphql(
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
export type AccountManager = FragmentOf<typeof AccountManager>;

const AccountManaged = graphql(
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
  [AccountManagerPermissions, AccountFragment],
);
export type AccountManaged = FragmentOf<typeof AccountManaged>;

export const AccountAvailable = graphql(
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
  [AccountFragment, AccountManaged],
);
export type AccountAvailable = FragmentOf<typeof AccountAvailable>;

export const AccountBlocked = graphql(
  `fragment AccountBlocked on AccountBlocked {
    __typename
    blockedAt
    account {
      ...Account
    }
  }`,
  [AccountFragment],
);
export type AccountBlocked = FragmentOf<typeof AccountBlocked>;
