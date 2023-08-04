// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  CommonPaginatedResultInfoFragment,
  Erc20AmountFragment,
  PostFragment,
  CommentFragment,
  MirrorFragment,
  ProfileFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  CommonPaginatedResultInfoFragmentDoc,
  Erc20AmountFragmentDoc,
  PostFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  ProfileFragmentDoc,
} from '../../graphql/fragments.generated';
export type ProfilePublicationRevenueQueryVariables = Types.Exact<{
  request: Types.ProfilePublicationRevenueQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
  mediaTransformPublication?: Types.InputMaybe<Types.MediaTransformParams>;
  mediaTransformProfilePicture?: Types.InputMaybe<Types.MediaTransformParams>;
  mediaTransformProfileCover?: Types.InputMaybe<Types.MediaTransformParams>;
}>;

export type ProfilePublicationRevenueQuery = {
  result: { items: Array<PublicationRevenueFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type PublicationRevenueQueryVariables = Types.Exact<{
  request: Types.PublicationRevenueQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
  mediaTransformPublication?: Types.InputMaybe<Types.MediaTransformParams>;
  mediaTransformProfilePicture?: Types.InputMaybe<Types.MediaTransformParams>;
  mediaTransformProfileCover?: Types.InputMaybe<Types.MediaTransformParams>;
}>;

export type PublicationRevenueQuery = { result: PublicationRevenueFragment | null };

export type ProfileFollowRevenueQueryVariables = Types.Exact<{
  request: Types.ProfileFollowRevenueQueryRequest;
}>;

export type ProfileFollowRevenueQuery = { result: { revenues: Array<RevenueAggregateFragment> } };

export type RevenueAggregateFragment = {
  __typename: 'RevenueAggregate';
  total: Erc20AmountFragment;
};

export type PublicationRevenueFragment = {
  __typename: 'PublicationRevenue';
  publication: CommentFragment | MirrorFragment | PostFragment;
  revenue: RevenueAggregateFragment;
};

export const RevenueAggregateFragmentDoc = gql`
  fragment RevenueAggregate on RevenueAggregate {
    __typename
    total {
      ...Erc20Amount
    }
  }
  ${Erc20AmountFragmentDoc}
`;
export const PublicationRevenueFragmentDoc = gql`
  fragment PublicationRevenue on PublicationRevenue {
    __typename
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
    }
    revenue {
      ...RevenueAggregate
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${RevenueAggregateFragmentDoc}
`;
export const ProfilePublicationRevenueDocument = gql`
  query ProfilePublicationRevenue(
    $request: ProfilePublicationRevenueQueryRequest!
    $observerId: ProfileId
    $mediaTransformPublication: MediaTransformParams = {}
    $mediaTransformProfilePicture: MediaTransformParams = {}
    $mediaTransformProfileCover: MediaTransformParams = {}
  ) {
    result: profilePublicationRevenue(request: $request) {
      items {
        ...PublicationRevenue
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PublicationRevenueFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const PublicationRevenueDocument = gql`
  query PublicationRevenue(
    $request: PublicationRevenueQueryRequest!
    $observerId: ProfileId
    $mediaTransformPublication: MediaTransformParams = {}
    $mediaTransformProfilePicture: MediaTransformParams = {}
    $mediaTransformProfileCover: MediaTransformParams = {}
  ) {
    result: publicationRevenue(request: $request) {
      ...PublicationRevenue
    }
  }
  ${PublicationRevenueFragmentDoc}
`;
export const ProfileFollowRevenueDocument = gql`
  query ProfileFollowRevenue($request: ProfileFollowRevenueQueryRequest!) {
    result: profileFollowRevenue(request: $request) {
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
const ProfilePublicationRevenueDocumentString = print(ProfilePublicationRevenueDocument);
const PublicationRevenueDocumentString = print(PublicationRevenueDocument);
const ProfileFollowRevenueDocumentString = print(ProfileFollowRevenueDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ProfilePublicationRevenue(
      variables: ProfilePublicationRevenueQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProfilePublicationRevenueQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfilePublicationRevenueQuery>(
            ProfilePublicationRevenueDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ProfilePublicationRevenue',
        'query',
      );
    },
    PublicationRevenue(
      variables: PublicationRevenueQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PublicationRevenueQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationRevenueQuery>(PublicationRevenueDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PublicationRevenue',
        'query',
      );
    },
    ProfileFollowRevenue(
      variables: ProfileFollowRevenueQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProfileFollowRevenueQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileFollowRevenueQuery>(
            ProfileFollowRevenueDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ProfileFollowRevenue',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
