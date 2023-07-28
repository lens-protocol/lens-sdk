// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  PostFragment,
  CommentFragment,
  MirrorFragment,
  CommonPaginatedResultInfoFragment,
  ProfileFragment,
  FollowingFragment,
  FollowerFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  Eip712TypedDataDomainFragment,
  Erc20AmountFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  Erc20AmountFragmentDoc,
} from '../../graphql/fragments.generated';
export type PublicationsProfileBookmarksQueryVariables = Types.Exact<{
  request: Types.PublicationsProfileBookmarkedQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type PublicationsProfileBookmarksQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type AddPublicationProfileBookmarkMutationVariables = Types.Exact<{
  request: Types.PublicationProfileBookmarkRequest;
}>;

export type AddPublicationProfileBookmarkMutation = { result: void | null };

export type RemovePublicationProfileBookmarkMutationVariables = Types.Exact<{
  request: Types.PublicationProfileBookmarkRequest;
}>;

export type RemovePublicationProfileBookmarkMutation = { result: void | null };

export const PublicationsProfileBookmarksDocument = gql`
  query PublicationsProfileBookmarks(
    $request: PublicationsProfileBookmarkedQueryRequest!
    $observerId: ProfileId
  ) {
    result: publicationsProfileBookmarks(request: $request) {
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
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const AddPublicationProfileBookmarkDocument = gql`
  mutation AddPublicationProfileBookmark($request: PublicationProfileBookmarkRequest!) {
    result: addPublicationProfileBookmark(request: $request)
  }
`;
export const RemovePublicationProfileBookmarkDocument = gql`
  mutation RemovePublicationProfileBookmark($request: PublicationProfileBookmarkRequest!) {
    result: removePublicationProfileBookmark(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PublicationsProfileBookmarksDocumentString = print(PublicationsProfileBookmarksDocument);
const AddPublicationProfileBookmarkDocumentString = print(AddPublicationProfileBookmarkDocument);
const RemovePublicationProfileBookmarkDocumentString = print(
  RemovePublicationProfileBookmarkDocument,
);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    PublicationsProfileBookmarks(
      variables: PublicationsProfileBookmarksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PublicationsProfileBookmarksQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationsProfileBookmarksQuery>(
            PublicationsProfileBookmarksDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'PublicationsProfileBookmarks',
        'query',
      );
    },
    AddPublicationProfileBookmark(
      variables: AddPublicationProfileBookmarkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AddPublicationProfileBookmarkMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddPublicationProfileBookmarkMutation>(
            AddPublicationProfileBookmarkDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddPublicationProfileBookmark',
        'mutation',
      );
    },
    RemovePublicationProfileBookmark(
      variables: RemovePublicationProfileBookmarkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: RemovePublicationProfileBookmarkMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RemovePublicationProfileBookmarkMutation>(
            RemovePublicationProfileBookmarkDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RemovePublicationProfileBookmark',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
