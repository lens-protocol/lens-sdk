/** Code generated. DO NOT EDIT. */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable import/no-default-export */
/* eslint-disable no-restricted-imports */
/* eslint-disable tsdoc/syntax */
import * as Apollo from '@apollo/client';
import { DocumentNode } from 'graphql';
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
  address?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  flagged?: InputMaybe<Scalars['Boolean']>;
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
  updated?: InputMaybe<Scalars['Int']>;
  updated_gt?: InputMaybe<Scalars['Int']>;
  updated_gte?: InputMaybe<Scalars['Int']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  updated_lt?: InputMaybe<Scalars['Int']>;
  updated_lte?: InputMaybe<Scalars['Int']>;
  validation?: InputMaybe<Scalars['String']>;
};

export type RankingWhere = {
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  network?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type RolesWhere = {
  address?: InputMaybe<Scalars['String']>;
};

export type SpaceWhere = {
  created?: InputMaybe<Scalars['Int']>;
  created_gt?: InputMaybe<Scalars['Int']>;
  created_gte?: InputMaybe<Scalars['Int']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  created_lt?: InputMaybe<Scalars['Int']>;
  created_lte?: InputMaybe<Scalars['Int']>;
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
  flagged: boolean | null;
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

export const FragmentSnapshotProposal = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SnapshotProposal' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Proposal' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'author' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'choices' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scores' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scores_total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'snapshot' } },
          { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
          { kind: 'Field', name: { kind: 'Name', value: 'network' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privacy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quorum' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'space' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'strategies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'params' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'flagged' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const FragmentSnapshotVote = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SnapshotVote' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vote' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'choice' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const FragmentSnapshotVotePower = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SnapshotVotePower' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vp' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'value' },
            name: { kind: 'Name', value: 'vp' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const GetSnapshotProposalDocument = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSnapshotProposal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'spaceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'proposalId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'voterAddress' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeVotes' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'proposalId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SnapshotProposal' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'votes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'proposal' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'proposalId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'voter' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'voterAddress' } },
                    },
                  ],
                },
              },
            ],
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'include' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'if' },
                    value: { kind: 'Variable', name: { kind: 'Name', value: 'includeVotes' } },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SnapshotVote' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'voter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'voterAddress' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'space' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'spaceId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proposal' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'proposalId' } },
              },
            ],
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'include' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'if' },
                    value: { kind: 'Variable', name: { kind: 'Name', value: 'includeVotes' } },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SnapshotVotePower' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SnapshotProposal' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Proposal' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'author' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'choices' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scores' } },
          { kind: 'Field', name: { kind: 'Name', value: 'scores_total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'snapshot' } },
          { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
          { kind: 'Field', name: { kind: 'Name', value: 'network' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privacy' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quorum' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'space' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'strategies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'params' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'flagged' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SnapshotVote' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vote' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'choice' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SnapshotVotePower' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vp' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'value' },
            name: { kind: 'Name', value: 'vp' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

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
