// @ts-nocheck
import * as Types from '../../../../../graphql/types.generated';

import {
  ProfileFragment,
  PaginatedResultInfoFragment,
} from '../../../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  PaginatedResultInfoFragmentDoc,
} from '../../../../../graphql/fragments.generated';
export type AddReactionMutationVariables = Types.Exact<{
  request: Types.ReactionRequest;
}>;

export type AddReactionMutation = { addReaction: string };

export type RemoveReactionMutationVariables = Types.Exact<{
  request: Types.ReactionRequest;
}>;

export type RemoveReactionMutation = { removeReaction: string };

export type WhoReactedPublicationQueryVariables = Types.Exact<{
  request: Types.WhoReactedPublicationRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type WhoReactedPublicationQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const AddReactionDocument = gql`
  mutation AddReaction($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`;
export const RemoveReactionDocument = gql`
  mutation RemoveReaction($request: ReactionRequest!) {
    removeReaction(request: $request)
  }
`;
export const WhoReactedPublicationDocument = gql`
  query WhoReactedPublication(
    $request: WhoReactedPublicationRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: whoReactedPublication(request: $request) {
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
const AddReactionDocumentString = print(AddReactionDocument);
const RemoveReactionDocumentString = print(RemoveReactionDocument);
const WhoReactedPublicationDocumentString = print(WhoReactedPublicationDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddReaction(
      variables: AddReactionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
