// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type AuthChallengeFragment = { id: string; text: string };

export type AuthChallengeQueryVariables = Types.Exact<{
  request: Types.ChallengeRequest;
}>;

export type AuthChallengeQuery = { result: AuthChallengeFragment };

export type AuthVerifyQueryVariables = Types.Exact<{
  request: Types.VerifyRequest;
}>;

export type AuthVerifyQuery = { result: boolean };

export type AuthAuthenticateMutationVariables = Types.Exact<{
  request: Types.SignedAuthChallenge;
}>;

export type AuthAuthenticateMutation = { result: { accessToken: string; refreshToken: string } };

export type AuthRefreshMutationVariables = Types.Exact<{
  request: Types.RefreshRequest;
}>;

export type AuthRefreshMutation = { result: { accessToken: string; refreshToken: string } };

export const AuthChallengeFragmentDoc = gql`
  fragment AuthChallenge on AuthChallengeResult {
    id
    text
  }
`;
export const AuthChallengeDocument = gql`
  query AuthChallenge($request: ChallengeRequest!) {
    result: challenge(request: $request) {
      ...AuthChallenge
    }
  }
  ${AuthChallengeFragmentDoc}
`;
export const AuthVerifyDocument = gql`
  query AuthVerify($request: VerifyRequest!) {
    result: verify(request: $request)
  }
`;
export const AuthAuthenticateDocument = gql`
  mutation AuthAuthenticate($request: SignedAuthChallenge!) {
    result: authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;
export const AuthRefreshDocument = gql`
  mutation AuthRefresh($request: RefreshRequest!) {
    result: refresh(request: $request) {
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
