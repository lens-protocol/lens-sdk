// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  WalletFragment,
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
