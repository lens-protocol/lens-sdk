// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  WalletFragment,
  Eip712TypedDataDomainFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  FollowingFragment,
  FollowerFragment,
  Erc20AmountFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  WalletFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  Erc20AmountFragmentDoc,
} from '../../graphql/fragments.generated';
export type SearchPublicationsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['LimitScalar']>;
  cursor?: Types.InputMaybe<Types.Scalars['Cursor']>;
  query: Types.Scalars['Search'];
  sources?: Types.InputMaybe<Array<Types.Scalars['Sources']> | Types.Scalars['Sources']>;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type SearchPublicationsQuery = {
  result:
    | { __typename: 'ProfileSearchResult' }
    | {
        __typename: 'PublicationSearchResult';
        items: Array<CommentFragment | PostFragment>;
        pageInfo: CommonPaginatedResultInfoFragment;
      };
};

export type SearchProfilesQueryVariables = Types.Exact<{
  limit: Types.Scalars['LimitScalar'];
  cursor?: Types.InputMaybe<Types.Scalars['Cursor']>;
  query: Types.Scalars['Search'];
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type SearchProfilesQuery = {
  result:
    | {
        __typename: 'ProfileSearchResult';
        items: Array<ProfileFragment>;
        pageInfo: CommonPaginatedResultInfoFragment;
      }
    | { __typename: 'PublicationSearchResult' };
};

export const SearchPublicationsDocument = gql`
  query SearchPublications(
    $limit: LimitScalar
    $cursor: Cursor
    $query: Search!
    $sources: [Sources!]
    $observerId: ProfileId
  ) {
    result: search(
      request: {
        query: $query
        type: PUBLICATION
        limit: $limit
        cursor: $cursor
        sources: $sources
      }
    ) {
      ... on PublicationSearchResult {
        __typename
        items {
          ... on Post {
            ...Post
          }
          ... on Comment {
            ...Comment
          }
        }
        pageInfo {
          ...CommonPaginatedResultInfo
        }
      }
      ... on ProfileSearchResult {
        __typename
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const SearchProfilesDocument = gql`
  query SearchProfiles(
    $limit: LimitScalar!
    $cursor: Cursor
    $query: Search!
    $observerId: ProfileId
  ) {
    result: search(request: { query: $query, type: PROFILE, limit: $limit, cursor: $cursor }) {
      ... on ProfileSearchResult {
        __typename
        items {
          ...Profile
        }
        pageInfo {
          ...CommonPaginatedResultInfo
        }
      }
      ... on PublicationSearchResult {
        __typename
      }
    }
  }
  ${ProfileFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const SearchPublicationsDocumentString = print(SearchPublicationsDocument);
const SearchProfilesDocumentString = print(SearchProfilesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    SearchPublications(
      variables: SearchPublicationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: SearchPublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SearchPublicationsQuery>(SearchPublicationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SearchPublications',
        'query',
      );
    },
    SearchProfiles(
      variables: SearchProfilesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: SearchProfilesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SearchProfilesQuery>(SearchProfilesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SearchProfiles',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
