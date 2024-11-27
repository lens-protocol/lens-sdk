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

export const Account = graphql(
  `fragment Account on Account {
    __typename
    address
    username{
      ...Username
    }
  }`,
  [Username],
);
export type Account = FragmentOf<typeof Account>;

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
