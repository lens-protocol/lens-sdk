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
export type ExplorePublicationsQueryVariables = Types.Exact<{
  request: Types.ExplorePublicationRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ExplorePublicationsQuery = {
  result: {
    items: Array<PostFragment | QuoteFragment>;
    pageInfo: { prev: string | null; next: string | null };
  };
};

export type ExploreProfilesQueryVariables = Types.Exact<{
  request: Types.ExploreProfilesRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ExploreProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const ExplorePublicationsDocument = gql`
  query ExplorePublications(
    $request: ExplorePublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: explorePublications(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        prev
        next
      }
    }
  }
  ${PostFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const ExploreProfilesDocument = gql`
  query ExploreProfiles(
    $request: ExploreProfilesRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: exploreProfiles(request: $request) {
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
const ExplorePublicationsDocumentString = print(ExplorePublicationsDocument);
const ExploreProfilesDocumentString = print(ExploreProfilesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ExplorePublications(
      variables: ExplorePublicationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ExplorePublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ExplorePublicationsQuery>(
            ExplorePublicationsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ExplorePublications',
        'query',
      );
    },
    ExploreProfiles(
      variables: ExploreProfilesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ExploreProfilesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ExploreProfilesQuery>(ExploreProfilesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ExploreProfiles',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
