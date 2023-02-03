import * as Types from '../../graphql/types.generated.js';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type AddReactionMutationVariables = Types.Exact<{
  publicationId: Types.Scalars['InternalPublicationId'];
  reaction: Types.ReactionTypes;
  profileId: Types.Scalars['ProfileId'];
}>;

export type AddReactionMutation = Pick<Types.Mutation, 'addReaction'>;

export type RemoveReactionMutationVariables = Types.Exact<{
  publicationId: Types.Scalars['InternalPublicationId'];
  reaction: Types.ReactionTypes;
  profileId: Types.Scalars['ProfileId'];
}>;

export type RemoveReactionMutation = Pick<Types.Mutation, 'removeReaction'>;

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

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AddReactionDocumentString = print(AddReactionDocument);
const RemoveReactionDocumentString = print(RemoveReactionDocument);
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
