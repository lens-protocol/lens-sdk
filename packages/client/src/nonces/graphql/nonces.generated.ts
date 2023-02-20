// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type UserSigNoncesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserSigNoncesQuery = {
  result: { lensHubOnChainSigNonce: number; peripheryOnChainSigNonce: number };
};

export const UserSigNoncesDocument = gql`
  query UserSigNonces {
    result: userSigNonces {
      lensHubOnChainSigNonce
      peripheryOnChainSigNonce
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const UserSigNoncesDocumentString = print(UserSigNoncesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UserSigNonces(
      variables?: UserSigNoncesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: UserSigNoncesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserSigNoncesQuery>(UserSigNoncesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserSigNonces',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
