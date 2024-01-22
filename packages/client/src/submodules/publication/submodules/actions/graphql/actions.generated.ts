// @ts-nocheck
import * as Types from '../../../../../graphql/types.generated';

import {
  Eip712TypedDataFieldFragment,
  Eip712TypedDataDomainFragment,
  ProfileFragment,
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
  OptimisticStatusResultFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
} from '../../../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
export type CreateActOnOpenActionEip712TypedDataFragment = {
  types: { Act: Array<Eip712TypedDataFieldFragment> };
  domain: Eip712TypedDataDomainFragment;
  value: {
    nonce: number;
    deadline: number;
    publicationActedProfileId: string;
    publicationActedId: string;
    actorProfileId: string;
    referrerProfileIds: Array<string>;
    referrerPubIds: Array<string>;
    actionModuleAddress: string;
    actionModuleData: string;
  };
};

export type CreateActOnOpenActionBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: CreateActOnOpenActionEip712TypedDataFragment;
};

export type ActOnOpenActionMutationVariables = Types.Exact<{
  request: Types.ActOnOpenActionLensManagerRequest;
}>;

export type ActOnOpenActionMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CreateActOnOpenActionTypedDataMutationVariables = Types.Exact<{
  request: Types.ActOnOpenActionRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateActOnOpenActionTypedDataMutation = {
  result: CreateActOnOpenActionBroadcastItemResultFragment;
};

export const CreateActOnOpenActionEip712TypedDataFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Act' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EIP712TypedDataField' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domain' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EIP712TypedDataDomain' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'value' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicationActedProfileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicationActedId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actorProfileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referrerProfileIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referrerPubIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionModuleAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionModuleData' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EIP712TypedDataField' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EIP712TypedDataField' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EIP712TypedDataDomain' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EIP712TypedDataDomain' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'verifyingContract' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const CreateActOnOpenActionBroadcastItemResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateActOnOpenActionBroadcastItemResult' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateActOnOpenActionBroadcastItemResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'typedData' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Act' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EIP712TypedDataField' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domain' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EIP712TypedDataDomain' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'value' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicationActedProfileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicationActedId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actorProfileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referrerProfileIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referrerPubIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionModuleAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionModuleData' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EIP712TypedDataField' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EIP712TypedDataField' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EIP712TypedDataDomain' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EIP712TypedDataDomain' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'verifyingContract' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const ActOnOpenActionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ActOnOpenAction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ActOnOpenActionLensManagerRequest' },
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
            name: { kind: 'Name', value: 'actOnOpenAction' },
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
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'RelaySuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RelaySuccess' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LensProfileManagerRelayError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LensProfileManagerRelayError' },
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
      name: { kind: 'Name', value: 'RelaySuccess' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RelaySuccess' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'txId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LensProfileManagerRelayError' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LensProfileManagerRelayError' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const CreateActOnOpenActionTypedDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateActOnOpenActionTypedData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ActOnOpenActionRequest' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'options' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TypedDataOptions' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'createActOnOpenActionTypedData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'options' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'options' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CreateActOnOpenActionBroadcastItemResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Act' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EIP712TypedDataField' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domain' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EIP712TypedDataDomain' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'value' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicationActedProfileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicationActedId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actorProfileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referrerProfileIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referrerPubIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionModuleAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionModuleData' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateActOnOpenActionBroadcastItemResult' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateActOnOpenActionBroadcastItemResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'typedData' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CreateActOnOpenActionEIP712TypedData' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EIP712TypedDataField' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EIP712TypedDataField' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EIP712TypedDataDomain' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EIP712TypedDataDomain' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          { kind: 'Field', name: { kind: 'Name', value: 'verifyingContract' } },
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
const ActOnOpenActionDocumentString = print(ActOnOpenActionDocument);
const CreateActOnOpenActionTypedDataDocumentString = print(CreateActOnOpenActionTypedDataDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ActOnOpenAction(
      variables: ActOnOpenActionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ActOnOpenActionMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ActOnOpenActionMutation>(ActOnOpenActionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ActOnOpenAction',
        'mutation',
      );
    },
    CreateActOnOpenActionTypedData(
      variables: CreateActOnOpenActionTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateActOnOpenActionTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateActOnOpenActionTypedDataMutation>(
            CreateActOnOpenActionTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateActOnOpenActionTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
