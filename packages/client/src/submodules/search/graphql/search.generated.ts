// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  CreateMomokaPublicationResultFragment,
  RelayErrorFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
  RelayErrorFragmentDoc,
} from '../../../graphql/fragments.generated';
export type SearchPublicationsQueryVariables = Types.Exact<{
  request: Types.PublicationSearchRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type SearchPublicationsQuery = {
  result: {
    items: Array<CommentFragment | PostFragment | QuoteFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type SearchProfilesQueryVariables = Types.Exact<{
  request: Types.ProfileSearchRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type SearchProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const SearchPublicationsDocument = gql`
  query SearchPublications(
    $request: PublicationSearchRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
    result: searchPublications(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Comment {
          ...Comment
        }
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const SearchProfilesDocument = gql`
  query SearchProfiles(
    $request: ProfileSearchRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
    result: searchProfiles(request: $request) {
      items {
        ...Profile
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${ProfileFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
