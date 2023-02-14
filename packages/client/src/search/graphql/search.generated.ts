// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
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
  Erc20AmountFragmentDoc,
} from '../../graphql/fragments.generated';
export type SearchPublicationsQueryVariables = Types.Exact<{
  limit?: Types.Maybe<Types.Scalars['LimitScalar']>;
  cursor?: Types.Maybe<Types.Scalars['Cursor']>;
  query: Types.Scalars['Search'];
  sources?: Types.Maybe<Array<Types.Scalars['Sources']> | Types.Scalars['Sources']>;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type SearchPublicationsQuery = {
  result: { __typename: 'PublicationSearchResult' } & {
    items: Array<PostFragment | CommentFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type SearchProfilesQueryVariables = Types.Exact<{
  limit: Types.Scalars['LimitScalar'];
  cursor?: Types.Maybe<Types.Scalars['Cursor']>;
  query: Types.Scalars['Search'];
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type SearchProfilesQuery = {
  result: { __typename: 'ProfileSearchResult' } & {
    items: Array<ProfileFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
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
