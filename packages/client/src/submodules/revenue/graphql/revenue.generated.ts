// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  AmountFragment,
  PostFragment,
  QuoteFragment,
  ProfileFragment,
  PaginatedResultInfoFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  Eip712TypedDataFieldFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  AmountFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  ProfileFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  Eip712TypedDataFieldFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type RevenueAggregateFragment = { total: AmountFragment };

export type PublicationRevenueFragment = {
  publication: CommentFragment | MirrorFragment | PostFragment | QuoteFragment;
  revenue: Array<RevenueAggregateFragment>;
};

export type RevenueFromPublicationsQueryVariables = Types.Exact<{
  request: Types.RevenueFromPublicationsRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type RevenueFromPublicationsQuery = {
  result: { items: Array<PublicationRevenueFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type RevenueFromPublicationQueryVariables = Types.Exact<{
  request: Types.PublicationRevenueRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type RevenueFromPublicationQuery = { result: PublicationRevenueFragment };

export type FollowRevenuesQueryVariables = Types.Exact<{
  request: Types.FollowRevenueRequest;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FollowRevenuesQuery = { result: { revenues: Array<RevenueAggregateFragment> } };

export const RevenueAggregateFragmentDoc = gql`
  fragment RevenueAggregate on RevenueAggregate {
    total {
      ...Amount
    }
  }
  ${AmountFragmentDoc}
`;
export const PublicationRevenueFragmentDoc = gql`
  fragment PublicationRevenue on PublicationRevenue {
    publication {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
    revenue {
      ...RevenueAggregate
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
  ${RevenueAggregateFragmentDoc}
`;
export const RevenueFromPublicationsDocument = gql`
  query RevenueFromPublications(
    $request: RevenueFromPublicationsRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: revenueFromPublications(request: $request) {
      items {
        ...PublicationRevenue
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PublicationRevenueFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const RevenueFromPublicationDocument = gql`
  query RevenueFromPublication(
    $request: PublicationRevenueRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: revenueFromPublication(request: $request) {
      ...PublicationRevenue
    }
  }
  ${PublicationRevenueFragmentDoc}
`;
export const FollowRevenuesDocument = gql`
  query FollowRevenues($request: FollowRevenueRequest!, $rateRequest: RateRequest = { for: USD }) {
    result: followRevenues(request: $request) {
      revenues {
        ...RevenueAggregate
      }
    }
  }
  ${RevenueAggregateFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const RevenueFromPublicationsDocumentString = print(RevenueFromPublicationsDocument);
const RevenueFromPublicationDocumentString = print(RevenueFromPublicationDocument);
const FollowRevenuesDocumentString = print(FollowRevenuesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    RevenueFromPublications(
      variables: RevenueFromPublicationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RevenueFromPublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RevenueFromPublicationsQuery>(
            RevenueFromPublicationsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RevenueFromPublications',
        'query',
      );
    },
    RevenueFromPublication(
      variables: RevenueFromPublicationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RevenueFromPublicationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RevenueFromPublicationQuery>(
            RevenueFromPublicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RevenueFromPublication',
        'query',
      );
    },
    FollowRevenues(
      variables: FollowRevenuesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: FollowRevenuesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FollowRevenuesQuery>(FollowRevenuesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FollowRevenues',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
