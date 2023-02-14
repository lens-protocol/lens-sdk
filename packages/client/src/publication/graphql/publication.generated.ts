// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  WalletFragment,
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
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  Erc20AmountFragmentDoc,
} from '../../graphql/fragments.generated';
export type PublicationQueryVariables = Types.Exact<{
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
  request: Types.PublicationQueryRequest;
}>;

export type PublicationQuery = {
  result: Types.Maybe<PostFragment | CommentFragment | MirrorFragment>;
};

export type PublicationsQueryVariables = Types.Exact<{
  request: Types.PublicationsQueryRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type PublicationsQuery = {
  result: {
    items: Array<PostFragment | CommentFragment | MirrorFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type ValidatePublicationMetadataQueryVariables = Types.Exact<{
  metadata: Types.PublicationMetadataV2Input;
}>;

export type ValidatePublicationMetadataQuery = {
  validatePublicationMetadata: { __typename: 'PublicationValidateMetadataResult' } & Pick<
    Types.PublicationValidateMetadataResult,
    'valid' | 'reason'
  >;
};

export type WhoCollectedPublicationQueryVariables = Types.Exact<{
  request: Types.WhoCollectedPublicationRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type WhoCollectedPublicationQuery = {
  result: { items: Array<WalletFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type ProfilePublicationsForSaleQueryVariables = Types.Exact<{
  request: Types.ProfilePublicationsForSaleRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type ProfilePublicationsForSaleQuery = {
  result: {
    items: Array<PostFragment | CommentFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type PublicationMetadataStatusQueryVariables = Types.Exact<{
  request: Types.GetPublicationMetadataStatusRequest;
}>;

export type PublicationMetadataStatusQuery = {
  result: { __typename: 'PublicationMetadataStatus' } & Pick<
    Types.PublicationMetadataStatus,
    'reason' | 'status'
  >;
};

export const PublicationDocument = gql`
  query Publication($observerId: ProfileId, $request: PublicationQueryRequest!) {
    result: publication(request: $request) {
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
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
`;
export const PublicationsDocument = gql`
  query Publications($request: PublicationsQueryRequest!, $observerId: ProfileId) {
    result: publications(request: $request) {
      items {
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
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const ValidatePublicationMetadataDocument = gql`
  query ValidatePublicationMetadata($metadata: PublicationMetadataV2Input!) {
    validatePublicationMetadata(request: { metadatav2: $metadata }) {
      __typename
      valid
      reason
    }
  }
`;
export const WhoCollectedPublicationDocument = gql`
  query WhoCollectedPublication($request: WhoCollectedPublicationRequest!, $observerId: ProfileId) {
    result: whoCollectedPublication(request: $request) {
      items {
        ...Wallet
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${WalletFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const ProfilePublicationsForSaleDocument = gql`
  query ProfilePublicationsForSale(
    $request: ProfilePublicationsForSaleRequest!
    $observerId: ProfileId
  ) {
    result: profilePublicationsForSale(request: $request) {
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
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const PublicationMetadataStatusDocument = gql`
  query PublicationMetadataStatus($request: GetPublicationMetadataStatusRequest!) {
    result: publicationMetadataStatus(request: $request) {
      __typename
      reason
      status
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PublicationDocumentString = print(PublicationDocument);
const PublicationsDocumentString = print(PublicationsDocument);
const ValidatePublicationMetadataDocumentString = print(ValidatePublicationMetadataDocument);
const WhoCollectedPublicationDocumentString = print(WhoCollectedPublicationDocument);
const ProfilePublicationsForSaleDocumentString = print(ProfilePublicationsForSaleDocument);
const PublicationMetadataStatusDocumentString = print(PublicationMetadataStatusDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Publication(
      variables: PublicationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: PublicationQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationQuery>(PublicationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Publication',
        'query',
      );
    },
    Publications(
      variables: PublicationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationsQuery>(PublicationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Publications',
        'query',
      );
    },
    ValidatePublicationMetadata(
      variables: ValidatePublicationMetadataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ValidatePublicationMetadataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ValidatePublicationMetadataQuery>(
            ValidatePublicationMetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ValidatePublicationMetadata',
        'query',
      );
    },
    WhoCollectedPublication(
      variables: WhoCollectedPublicationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: WhoCollectedPublicationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<WhoCollectedPublicationQuery>(
            WhoCollectedPublicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'WhoCollectedPublication',
        'query',
      );
    },
    ProfilePublicationsForSale(
      variables: ProfilePublicationsForSaleQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProfilePublicationsForSaleQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfilePublicationsForSaleQuery>(
            ProfilePublicationsForSaleDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ProfilePublicationsForSale',
        'query',
      );
    },
    PublicationMetadataStatus(
      variables: PublicationMetadataStatusQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PublicationMetadataStatusQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationMetadataStatusQuery>(
            PublicationMetadataStatusDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'PublicationMetadataStatus',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
