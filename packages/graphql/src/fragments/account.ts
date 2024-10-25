import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

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

export const Account = graphql(
  `fragment Account on Account {
    __typename
    address
    score
    metadata {
      ...AccountMetadata
    }
    username
    operations {
      ...LoggedInAccountOperations
    }
  }`,
  [AccountMetadata, LoggedInAccountOperations],
);
export type Account = FragmentOf<typeof Account>;
