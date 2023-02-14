// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type AuthChallengeQueryVariables = Types.Exact<{
  address: Types.Scalars['EthereumAddress'];
}>;

export type AuthChallengeQuery = { result: Pick<Types.AuthChallengeResult, 'text'> };

export type AuthVerifyQueryVariables = Types.Exact<{
  accessToken: Types.Scalars['Jwt'];
}>;

export type AuthVerifyQuery = { result: Types.Query['verify'] };

export type AuthAuthenticateMutationVariables = Types.Exact<{
  address: Types.Scalars['EthereumAddress'];
  signature: Types.Scalars['Signature'];
}>;

export type AuthAuthenticateMutation = {
  result: Pick<Types.AuthenticationResult, 'accessToken' | 'refreshToken'>;
};

export type AuthRefreshMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['Jwt'];
}>;

export type AuthRefreshMutation = {
  result: Pick<Types.AuthenticationResult, 'accessToken' | 'refreshToken'>;
};

export const AuthChallengeDocument = gql`
  query AuthChallenge($address: EthereumAddress!) {
    result: challenge(request: { address: $address }) {
      text
    }
  }
`;
export const AuthVerifyDocument = gql`
  query AuthVerify($accessToken: Jwt!) {
    result: verify(request: { accessToken: $accessToken })
  }
`;
export const AuthAuthenticateDocument = gql`
  mutation AuthAuthenticate($address: EthereumAddress!, $signature: Signature!) {
    result: authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;
export const AuthRefreshDocument = gql`
  mutation AuthRefresh($refreshToken: Jwt!) {
    result: refresh(request: { refreshToken: $refreshToken }) {
      accessToken
      refreshToken
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AuthChallengeDocumentString = print(AuthChallengeDocument);
const AuthVerifyDocumentString = print(AuthVerifyDocument);
const AuthAuthenticateDocumentString = print(AuthAuthenticateDocument);
const AuthRefreshDocumentString = print(AuthRefreshDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AuthChallenge(
      variables: AuthChallengeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AuthChallengeQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AuthChallengeQuery>(AuthChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AuthChallenge',
        'query',
      );
    },
    AuthVerify(
      variables: AuthVerifyQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AuthVerifyQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AuthVerifyQuery>(AuthVerifyDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AuthVerify',
        'query',
      );
    },
    AuthAuthenticate(
      variables: AuthAuthenticateMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AuthAuthenticateMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AuthAuthenticateMutation>(AuthAuthenticateDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AuthAuthenticate',
        'mutation',
      );
    },
    AuthRefresh(
      variables: AuthRefreshMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AuthRefreshMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AuthRefreshMutation>(AuthRefreshDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AuthRefresh',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
