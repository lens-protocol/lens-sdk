// @ts-nocheck
import * as Types from '../../../../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type AddPublicationNotInterestedMutationVariables = Types.Exact<{
  request: Types.PublicationNotInterestedRequest;
}>;

export type AddPublicationNotInterestedMutation = { addPublicationNotInterested: string | null };

export type UndoPublicationNotInterestedMutationVariables = Types.Exact<{
  request: Types.PublicationNotInterestedRequest;
}>;

export type UndoPublicationNotInterestedMutation = { undoPublicationNotInterested: string | null };

export const AddPublicationNotInterestedDocument = gql`
  mutation AddPublicationNotInterested($request: PublicationNotInterestedRequest!) {
    addPublicationNotInterested(request: $request)
  }
`;
export const UndoPublicationNotInterestedDocument = gql`
  mutation UndoPublicationNotInterested($request: PublicationNotInterestedRequest!) {
    undoPublicationNotInterested(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AddPublicationNotInterestedDocumentString = print(AddPublicationNotInterestedDocument);
const UndoPublicationNotInterestedDocumentString = print(UndoPublicationNotInterestedDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddPublicationNotInterested(
      variables: AddPublicationNotInterestedMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AddPublicationNotInterestedMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddPublicationNotInterestedMutation>(
            AddPublicationNotInterestedDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddPublicationNotInterested',
        'mutation',
      );
    },
    UndoPublicationNotInterested(
      variables: UndoPublicationNotInterestedMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UndoPublicationNotInterestedMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UndoPublicationNotInterestedMutation>(
            UndoPublicationNotInterestedDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UndoPublicationNotInterested',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
