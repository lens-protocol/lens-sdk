// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type UserSigNoncesFragment = {
  lensHubOnChainSigNonce: string;
  peripheryOnChainSigNonce: string;
};

export type UserSigNoncesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserSigNoncesQuery = { result: UserSigNoncesFragment };

export const UserSigNoncesFragmentDoc = gql`
  fragment UserSigNonces on UserSigNonces {
    lensHubOnChainSigNonce
    peripheryOnChainSigNonce
  }
`;
export const UserSigNoncesDocument = gql`
  query UserSigNonces {
    result: userSigNonces {
      ...UserSigNonces
    }
  }
  ${UserSigNoncesFragmentDoc}
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
