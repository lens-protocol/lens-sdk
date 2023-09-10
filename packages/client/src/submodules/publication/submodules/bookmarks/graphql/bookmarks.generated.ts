// @ts-nocheck
import * as Types from '../../../../../graphql/types.generated';

import {
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
} from '../../../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
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
} from '../../../../../graphql/fragments.generated';
export type ProfileBookmarksQueryVariables = Types.Exact<{
  request: Types.ProfileBookmarksRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
}>;

export type ProfileBookmarksQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment | QuoteFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type AddPublicationBookmarkMutationVariables = Types.Exact<{
  request: Types.PublicationBookmarkRequest;
}>;

export type AddPublicationBookmarkMutation = { result: string };

export type RemovePublicationBookmarkMutationVariables = Types.Exact<{
  request: Types.PublicationBookmarkRequest;
}>;

export type RemovePublicationBookmarkMutation = { result: string };

export const ProfileBookmarksDocument = gql`
  query ProfileBookmarks(
    $request: ProfileBookmarksRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
  ) {
    result: profileBookmarks(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Comment {
          ...Comment
        }
        ... on Mirror {
          ...Mirror
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
  ${MirrorFragmentDoc}
  ${QuoteFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const AddPublicationBookmarkDocument = gql`
  mutation AddPublicationBookmark($request: PublicationBookmarkRequest!) {
    result: addPublicationBookmark(request: $request)
  }
`;
export const RemovePublicationBookmarkDocument = gql`
  mutation RemovePublicationBookmark($request: PublicationBookmarkRequest!) {
    result: removePublicationBookmark(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ProfileBookmarksDocumentString = print(ProfileBookmarksDocument);
const AddPublicationBookmarkDocumentString = print(AddPublicationBookmarkDocument);
const RemovePublicationBookmarkDocumentString = print(RemovePublicationBookmarkDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ProfileBookmarks(
      variables: ProfileBookmarksQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ProfileBookmarksQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileBookmarksQuery>(ProfileBookmarksDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProfileBookmarks',
        'query',
      );
    },
    AddPublicationBookmark(
      variables: AddPublicationBookmarkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AddPublicationBookmarkMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddPublicationBookmarkMutation>(
            AddPublicationBookmarkDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddPublicationBookmark',
        'mutation',
      );
    },
    RemovePublicationBookmark(
      variables: RemovePublicationBookmarkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RemovePublicationBookmarkMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RemovePublicationBookmarkMutation>(
            RemovePublicationBookmarkDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RemovePublicationBookmark',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
