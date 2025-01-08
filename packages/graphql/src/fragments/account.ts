import type { FragmentOf } from 'gql.tada';
import { type FragmentDocumentFor, type PartialFragmentOf, graphql, partial } from '../graphql';
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
);
export type Account = FragmentOf<typeof AccountFragment>;

/**
 * @deprecated Define your own AccountFragment instead using {@link graphql} and {@link FragmentOf}.
 *
 * @example
 * ```ts
 * const AccountFragment = graphql(
 *   `fragment Account on Account {
 *     __typename
 *     address
 *     owner
 *     username {
 *       ...Username
 *     }
 *   }`,
 *   [UsernameFragment],
 * );
 *
 * type Account = FragmentOf<typeof AccountFragment>;
 * ```
 */
export const FullAccountFragment = graphql(
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
  }`,
  [AccountMetadataFragment, LoggedInAccountOperationsFragment, UsernameFragment],
);
/**
 * @deprecated Define your own FullAccountFragment instead using {@link graphql} and {@link FragmentOf}.
 */
export type FullAccount = FragmentOf<typeof FullAccountFragment>;

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

const AccountManagedFragment = partial(
  `fragment AccountManaged on AccountManaged {
    __typename
    addedAt
    permissions {
      ...AccountManagerPermissions
    }
    account {
      ...Account
    }
  }`,
  [AccountManagerPermissionsFragment],
);
export type AccountManaged<TAccount extends Account> = PartialFragmentOf<
  typeof AccountManagedFragment,
  [FragmentDocumentFor<TAccount>]
>;

const AccountOwnedFragment = partial(
  `fragment AccountOwned on AccountOwned {
    __typename
    addedAt
    account {
      ...Account
    }
  }`,
);

export type AccountOwned<TAccount extends Account> = PartialFragmentOf<
  typeof AccountOwnedFragment,
  [FragmentDocumentFor<TAccount>]
>;

export const AccountAvailableFragment = partial(
  `fragment AccountAvailable on AccountAvailable {
    __typename
    ... on AccountManaged {
      ...AccountManaged
    }
    ... on AccountOwned {
      ...AccountOwned
    }
  }`,
  [AccountManagedFragment, AccountOwnedFragment],
);
export type AccountAvailable<TAccount extends Account> =
  | AccountManaged<TAccount>
  | AccountOwned<TAccount>;

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
