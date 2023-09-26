// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PostFragment,
  ProfileFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  Eip712TypedDataFieldFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  CreateActOnOpenActionEip712TypedDataFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  ProfileFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  Eip712TypedDataFieldFragmentDoc,
  OpenActionResultFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  CreateActOnOpenActionEip712TypedDataFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type SearchPublicationsQueryVariables = Types.Exact<{
  request: Types.PublicationSearchRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
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
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type SearchProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const SearchPublicationsDocument = gql`
  query SearchPublications(
    $request: PublicationSearchRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
