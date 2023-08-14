// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type AddProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type AddProfileInterestsMutation = { result: string };

export type RemoveProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type RemoveProfileInterestsMutation = { result: string };

export const AddProfileInterestsDocument = gql`
  mutation AddProfileInterests($request: ProfileInterestsRequest!) {
    result: addProfileInterests(request: $request)
  }
`;
export const RemoveProfileInterestsDocument = gql`
  mutation RemoveProfileInterests($request: ProfileInterestsRequest!) {
    result: removeProfileInterests(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AddProfileInterestsDocumentString = print(AddProfileInterestsDocument);
const RemoveProfileInterestsDocumentString = print(RemoveProfileInterestsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddProfileInterests(
      variables: AddProfileInterestsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AddProfileInterestsMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddProfileInterestsMutation>(
            AddProfileInterestsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddProfileInterests',
        'mutation',
      );
    },
    RemoveProfileInterests(
      variables: RemoveProfileInterestsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RemoveProfileInterestsMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RemoveProfileInterestsMutation>(
            RemoveProfileInterestsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RemoveProfileInterests',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
