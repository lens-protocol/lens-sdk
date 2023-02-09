// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
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
} from '../../graphql/fragments.generated';
export type ExplorePublicationsQueryVariables = Types.Exact<{
  request: Types.ExplorePublicationRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type ExplorePublicationsQuery = {
  result: {
    items: Array<PostFragment | CommentFragment | MirrorFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type ExploreProfilesQueryVariables = Types.Exact<{
  request: Types.ExploreProfilesRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type ExploreProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export const ExplorePublicationsDocument = gql`
  query ExplorePublications($request: ExplorePublicationRequest!, $observerId: ProfileId) {
    result: explorePublications(request: $request) {
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
export const ExploreProfilesDocument = gql`
  query ExploreProfiles($request: ExploreProfilesRequest!, $observerId: ProfileId) {
    result: exploreProfiles(request: $request) {
      items {
        ...Profile
      }
      pageInfo {
        ...CommonPaginatedResultInfo
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
const ExplorePublicationsDocumentString = print(ExplorePublicationsDocument);
const ExploreProfilesDocumentString = print(ExploreProfilesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ExplorePublications(
      variables: ExplorePublicationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
