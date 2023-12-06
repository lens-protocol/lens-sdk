// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { PaginatedResultInfoFragment } from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
export type AuthChallengeFragment = { __typename: 'AuthChallengeResult'; id: string; text: string };

export type ApprovedAuthenticationFragment = {
  __typename: 'ApprovedAuthentication';
  authorizationId: string;
  browser: string | null;
  device: string | null;
  os: string | null;
  origin: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthChallengeQueryVariables = Types.Exact<{
  request: Types.ChallengeRequest;
}>;

export type AuthChallengeQuery = { result: AuthChallengeFragment };

export type AuthVerifyQueryVariables = Types.Exact<{
  request: Types.VerifyRequest;
}>;

export type AuthVerifyQuery = { result: boolean };

export type CurrentSessionQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CurrentSessionQuery = { result: ApprovedAuthenticationFragment };

export type ApprovedAuthenticationsQueryVariables = Types.Exact<{
  request: Types.ApprovedAuthenticationRequest;
}>;

export type ApprovedAuthenticationsQuery = {
  result: { items: Array<ApprovedAuthenticationFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type AuthAuthenticateMutationVariables = Types.Exact<{
  request: Types.SignedAuthChallenge;
}>;

export type AuthAuthenticateMutation = { result: { accessToken: string; refreshToken: string } };

export type AuthRefreshMutationVariables = Types.Exact<{
  request: Types.RefreshRequest;
}>;

export type AuthRefreshMutation = { result: { accessToken: string; refreshToken: string } };

export type WalletAuthenticationToProfileAuthenticationMutationVariables = Types.Exact<{
  request: Types.WalletAuthenticationToProfileAuthenticationRequest;
}>;

export type WalletAuthenticationToProfileAuthenticationMutation = {
  result: { accessToken: string; refreshToken: string };
};

export type RevokeAuthenticationMutationVariables = Types.Exact<{
  request: Types.RevokeAuthenticationRequest;
}>;

export type RevokeAuthenticationMutation = { revokeAuthentication: string | null };

export const AuthChallengeFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthChallenge' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthChallengeResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const ApprovedAuthenticationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApprovedAuthentication' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ApprovedAuthentication' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorizationId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'browser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'device' } },
          { kind: 'Field', name: { kind: 'Name', value: 'os' } },
          { kind: 'Field', name: { kind: 'Name', value: 'origin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const AuthChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AuthChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ChallengeRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'challenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthChallenge' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthChallenge' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthChallengeResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const AuthVerifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AuthVerify' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'VerifyRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'verify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const CurrentSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CurrentSession' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'currentSession' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ApprovedAuthentication' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApprovedAuthentication' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ApprovedAuthentication' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorizationId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'browser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'device' } },
          { kind: 'Field', name: { kind: 'Name', value: 'os' } },
          { kind: 'Field', name: { kind: 'Name', value: 'origin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const ApprovedAuthenticationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ApprovedAuthentications' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ApprovedAuthenticationRequest' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'approvedAuthentications' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ApprovedAuthentication' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PaginatedResultInfo' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApprovedAuthentication' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ApprovedAuthentication' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorizationId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'browser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'device' } },
          { kind: 'Field', name: { kind: 'Name', value: 'os' } },
          { kind: 'Field', name: { kind: 'Name', value: 'origin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaginatedResultInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedResultInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'prev' } },
          { kind: 'Field', name: { kind: 'Name', value: 'next' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const AuthAuthenticateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthAuthenticate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SignedAuthChallenge' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'authenticate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refreshToken' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const AuthRefreshDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthRefresh' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RefreshRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'refresh' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refreshToken' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const WalletAuthenticationToProfileAuthenticationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'WalletAuthenticationToProfileAuthentication' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'WalletAuthenticationToProfileAuthenticationRequest' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'walletAuthenticationToProfileAuthentication' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refreshToken' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const RevokeAuthenticationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RevokeAuthentication' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RevokeAuthenticationRequest' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revokeAuthentication' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AuthChallengeDocumentString = print(AuthChallengeDocument);
const AuthVerifyDocumentString = print(AuthVerifyDocument);
const CurrentSessionDocumentString = print(CurrentSessionDocument);
const ApprovedAuthenticationsDocumentString = print(ApprovedAuthenticationsDocument);
const AuthAuthenticateDocumentString = print(AuthAuthenticateDocument);
const AuthRefreshDocumentString = print(AuthRefreshDocument);
const WalletAuthenticationToProfileAuthenticationDocumentString = print(
  WalletAuthenticationToProfileAuthenticationDocument,
);
const RevokeAuthenticationDocumentString = print(RevokeAuthenticationDocument);
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
    CurrentSession(
      variables?: CurrentSessionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CurrentSessionQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CurrentSessionQuery>(CurrentSessionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CurrentSession',
        'query',
      );
    },
    ApprovedAuthentications(
      variables: ApprovedAuthenticationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ApprovedAuthenticationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ApprovedAuthenticationsQuery>(
            ApprovedAuthenticationsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ApprovedAuthentications',
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
    WalletAuthenticationToProfileAuthentication(
      variables: WalletAuthenticationToProfileAuthenticationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: WalletAuthenticationToProfileAuthenticationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<WalletAuthenticationToProfileAuthenticationMutation>(
            WalletAuthenticationToProfileAuthenticationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'WalletAuthenticationToProfileAuthentication',
        'mutation',
      );
    },
    RevokeAuthentication(
      variables: RevokeAuthenticationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RevokeAuthenticationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RevokeAuthenticationMutation>(
            RevokeAuthenticationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RevokeAuthentication',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
