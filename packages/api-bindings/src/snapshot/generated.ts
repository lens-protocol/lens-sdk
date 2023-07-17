/** Code generated. DO NOT EDIT. */
/* eslint-disable import/no-default-export */
/* eslint-disable no-restricted-imports */
import * as Apollo from '@apollo/client';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: unknown;
};

export type AliasWhere = {
  address?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  alias?: InputMaybe<Scalars['String']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FollowWhere = {
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  follower?: InputMaybe<Scalars['String']>;
  follower_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  space?: InputMaybe<Scalars['String']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MessageWhere = {
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  mci?: InputMaybe<Scalars['Int']>;
  mci_gt?: InputMaybe<Scalars['Int']>;
  mci_gte?: InputMaybe<Scalars['Int']>;
  mci_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  mci_lt?: InputMaybe<Scalars['Int']>;
  mci_lte?: InputMaybe<Scalars['Int']>;
  space?: InputMaybe<Scalars['String']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type ProposalWhere = {
  app?: InputMaybe<Scalars['String']>;
  app_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  app_not?: InputMaybe<Scalars['String']>;
  app_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  author?: InputMaybe<Scalars['String']>;
  author_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  end?: InputMaybe<Scalars['Int']>;
  end_gt?: InputMaybe<Scalars['Int']>;
  end_gte?: InputMaybe<Scalars['Int']>;
  end_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  end_lt?: InputMaybe<Scalars['Int']>;
  end_lte?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  network?: InputMaybe<Scalars['String']>;
  network_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  plugins_contains?: InputMaybe<Scalars['String']>;
  scores_state?: InputMaybe<Scalars['String']>;
  scores_state_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  space?: InputMaybe<Scalars['String']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  space_verified?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['Int']>;
  start_gt?: InputMaybe<Scalars['Int']>;
  start_gte?: InputMaybe<Scalars['Int']>;
  start_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  start_lt?: InputMaybe<Scalars['Int']>;
  start_lte?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['String']>;
  strategies_contains?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  validation?: InputMaybe<Scalars['String']>;
};

export type RankingWhere = {
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  network?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type SpaceWhere = {
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StatementsWhere = {
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  space?: InputMaybe<Scalars['String']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SubscriptionWhere = {
  address?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  space?: InputMaybe<Scalars['String']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersWhere = {
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VoteWhere = {
  app?: InputMaybe<Scalars['String']>;
  app_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  app_not?: InputMaybe<Scalars['String']>;
  app_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  reason?: InputMaybe<Scalars['String']>;
  reason_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  reason_not?: InputMaybe<Scalars['String']>;
  reason_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  space?: InputMaybe<Scalars['String']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  voter?: InputMaybe<Scalars['String']>;
  voter_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  vp?: InputMaybe<Scalars['Float']>;
  vp_gt?: InputMaybe<Scalars['Float']>;
  vp_gte?: InputMaybe<Scalars['Float']>;
  vp_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  vp_lt?: InputMaybe<Scalars['Float']>;
  vp_lte?: InputMaybe<Scalars['Float']>;
  vp_state?: InputMaybe<Scalars['String']>;
  vp_state_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SnapshotProposal = {
  __typename: 'Proposal';
  id: string;
  author: string;
  state: string | null;
  title: string;
  choices: Array<string | null>;
  scores: Array<number | null> | null;
  scores_total: number | null;
  snapshot: string | null;
  symbol: string;
  network: string;
  type: string | null;
  privacy: string | null;
  start: number;
  end: number;
  quorum: number;
  space: { id: string; name: string | null } | null;
  strategies: Array<{ network: string | null; name: string; params: unknown | null } | null>;
};

export type SnapshotVote = { __typename: 'Vote'; choice: unknown };

export type SnapshotVotePower = { __typename: 'Vp'; value: number | null };

export type GetSnapshotProposalVariables = Exact<{
  spaceId: Scalars['String'];
  proposalId: Scalars['String'];
  voterAddress: Scalars['String'];
  includeVotes: Scalars['Boolean'];
}>;

export type GetSnapshotProposalData = {
  proposal: SnapshotProposal | null;
  votes?: Array<SnapshotVote | null> | null;
  vp?: SnapshotVotePower | null;
};

export const FragmentSnapshotProposal = /*#__PURE__*/ gql`
  fragment SnapshotProposal on Proposal {
    __typename
    id
    author
    state
    title
    choices
    scores
    scores_total
    snapshot
    symbol
    network
    type
    privacy
    start
    end
    quorum
    space {
      id
      name
    }
    strategies {
      network
      name
      params
    }
  }
`;
export const FragmentSnapshotVote = /*#__PURE__*/ gql`
  fragment SnapshotVote on Vote {
    __typename
    choice
  }
`;
export const FragmentSnapshotVotePower = /*#__PURE__*/ gql`
  fragment SnapshotVotePower on Vp {
    __typename
    value: vp
  }
`;
export const GetSnapshotProposalDocument = /*#__PURE__*/ gql`
  query GetSnapshotProposal(
    $spaceId: String!
    $proposalId: String!
    $voterAddress: String!
    $includeVotes: Boolean!
  ) {
    proposal(id: $proposalId) {
      ...SnapshotProposal
    }
    votes(where: { proposal: $proposalId, voter: $voterAddress }) @include(if: $includeVotes) {
      ...SnapshotVote
    }
    vp(voter: $voterAddress, space: $spaceId, proposal: $proposalId) @include(if: $includeVotes) {
      ...SnapshotVotePower
    }
  }
  ${FragmentSnapshotProposal}
  ${FragmentSnapshotVote}
  ${FragmentSnapshotVotePower}
`;

/**
 * __useGetSnapshotProposal__
 *
 * To run a query within a React component, call `useGetSnapshotProposal` and pass it any options that fit your needs.
 * When your component renders, `useGetSnapshotProposal` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSnapshotProposal({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      proposalId: // value for 'proposalId'
 *      voterAddress: // value for 'voterAddress'
 *      includeVotes: // value for 'includeVotes'
 *   },
 * });
 */
export function useGetSnapshotProposal(
  baseOptions: Apollo.QueryHookOptions<GetSnapshotProposalData, GetSnapshotProposalVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSnapshotProposalData, GetSnapshotProposalVariables>(
    GetSnapshotProposalDocument,
    options,
  );
}
export function useGetSnapshotProposalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSnapshotProposalData, GetSnapshotProposalVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSnapshotProposalData, GetSnapshotProposalVariables>(
    GetSnapshotProposalDocument,
    options,
  );
}
export type GetSnapshotProposalHookResult = ReturnType<typeof useGetSnapshotProposal>;
export type GetSnapshotProposalLazyQueryHookResult = ReturnType<
  typeof useGetSnapshotProposalLazyQuery
>;
export type GetSnapshotProposalQueryResult = Apollo.QueryResult<
  GetSnapshotProposalData,
  GetSnapshotProposalVariables
>;
