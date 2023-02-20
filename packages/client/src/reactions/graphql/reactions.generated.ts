// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  ProfileFragment,
  CommonPaginatedResultInfoFragment,
  FollowingFragment,
  FollowerFragment,
  Eip712TypedDataDomainFragment,
  RelayerResultFragment,
  RelayErrorFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
} from '../../graphql/fragments.generated';
export type AddReactionMutationVariables = Types.Exact<{
  publicationId: Types.Scalars['InternalPublicationId'];
  reaction: Types.ReactionTypes;
  profileId: Types.Scalars['ProfileId'];
}>;

export type AddReactionMutation = { addReaction: void | null };

export type RemoveReactionMutationVariables = Types.Exact<{
  publicationId: Types.Scalars['InternalPublicationId'];
  reaction: Types.ReactionTypes;
  profileId: Types.Scalars['ProfileId'];
}>;

export type RemoveReactionMutation = { removeReaction: void | null };

export type WhoReactedResultFragment = {
  __typename: 'WhoReactedResult';
  reactionId: string;
  reaction: Types.ReactionTypes;
  reactionAt: string;
  profile: ProfileFragment;
};

export type WhoReactedPublicationQueryVariables = Types.Exact<{
  request: Types.WhoReactedPublicationRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type WhoReactedPublicationQuery = {
  result: { items: Array<WhoReactedResultFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export const WhoReactedResultFragmentDoc = gql`
  fragment WhoReactedResult on WhoReactedResult {
    __typename
    reactionId
    reaction
    reactionAt
    profile {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const AddReactionDocument = gql`
  mutation AddReaction(
    $publicationId: InternalPublicationId!
    $reaction: ReactionTypes!
    $profileId: ProfileId!
  ) {
    addReaction(
      request: { publicationId: $publicationId, reaction: $reaction, profileId: $profileId }
    )
  }
`;
export const RemoveReactionDocument = gql`
  mutation RemoveReaction(
    $publicationId: InternalPublicationId!
    $reaction: ReactionTypes!
    $profileId: ProfileId!
  ) {
    removeReaction(
      request: { publicationId: $publicationId, reaction: $reaction, profileId: $profileId }
    )
  }
`;
export const WhoReactedPublicationDocument = gql`
  query WhoReactedPublication($request: WhoReactedPublicationRequest!, $observerId: ProfileId) {
    result: whoReactedPublication(request: $request) {
      items {
        ...WhoReactedResult
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${WhoReactedResultFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AddReactionDocumentString = print(AddReactionDocument);
const RemoveReactionDocumentString = print(RemoveReactionDocument);
const WhoReactedPublicationDocumentString = print(WhoReactedPublicationDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddReaction(
      variables: AddReactionMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AddReactionMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddReactionMutation>(AddReactionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AddReaction',
        'mutation',
      );
    },
    RemoveReaction(
      variables: RemoveReactionMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: RemoveReactionMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RemoveReactionMutation>(RemoveReactionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RemoveReaction',
        'mutation',
      );
    },
    WhoReactedPublication(
      variables: WhoReactedPublicationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: WhoReactedPublicationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<WhoReactedPublicationQuery>(
            WhoReactedPublicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'WhoReactedPublication',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
