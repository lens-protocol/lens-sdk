// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  Eip712TypedDataDomainFragment,
  Eip712TypedDataFieldFragment,
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
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
export type VerifyFrameSignatureQueryVariables = Types.Exact<{
  request: Types.FrameVerifySignature;
}>;

export type VerifyFrameSignatureQuery = { result: Types.FrameVerifySignatureResult };

export type CreateFrameTypedDataQueryVariables = Types.Exact<{
  request: Types.FrameEip712Request;
}>;

export type CreateFrameTypedDataQuery = { result: CreateFrameEip712TypedDataFragment };

export type CreateFrameEip712TypedDataFragment = {
  types: { FrameData: Array<{ name: string; type: string }> };
  domain: Eip712TypedDataDomainFragment;
  value: {
    specVersion: string;
    url: string;
    buttonIndex: number;
    profileId: string;
    pubId: string;
    inputText: string;
    state: string;
    actionResponse: string;
    deadline: number;
  };
};

export type FrameLensManagerSignatureResultFragment = {
  signature: string;
  signedTypedData: CreateFrameEip712TypedDataFragment;
};

export type SignFrameActionMutationVariables = Types.Exact<{
  request: Types.FrameLensManagerEip712Request;
}>;

export type SignFrameActionMutation = { result: FrameLensManagerSignatureResultFragment };

export const CreateFrameEip712TypedDataFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
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
                  name: { kind: 'Name', value: 'FrameData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'specVersion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'buttonIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pubId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'inputText' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionResponse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
              ],
            },
          },
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
export const FrameLensManagerSignatureResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FrameLensManagerSignatureResult' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'FrameLensManagerSignatureResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signedTypedData' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'signature' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
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
                  name: { kind: 'Name', value: 'FrameData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'specVersion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'buttonIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pubId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'inputText' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionResponse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
              ],
            },
          },
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
export const VerifyFrameSignatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VerifyFrameSignature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FrameVerifySignature' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'verifyFrameSignature' },
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
export const CreateFrameTypedDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CreateFrameTypedData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FrameEIP712Request' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'createFrameTypedData' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
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
                  name: { kind: 'Name', value: 'FrameData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'specVersion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'buttonIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pubId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'inputText' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionResponse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
              ],
            },
          },
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
export const SignFrameActionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignFrameAction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'FrameLensManagerEIP712Request' },
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
            name: { kind: 'Name', value: 'signFrameAction' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'FrameLensManagerSignatureResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
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
                  name: { kind: 'Name', value: 'FrameData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'specVersion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'buttonIndex' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pubId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'inputText' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actionResponse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deadline' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FrameLensManagerSignatureResult' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'FrameLensManagerSignatureResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signedTypedData' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CreateFrameEIP712TypedData' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'signature' } },
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
const VerifyFrameSignatureDocumentString = print(VerifyFrameSignatureDocument);
const CreateFrameTypedDataDocumentString = print(CreateFrameTypedDataDocument);
const SignFrameActionDocumentString = print(SignFrameActionDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    VerifyFrameSignature(
      variables: VerifyFrameSignatureQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: VerifyFrameSignatureQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<VerifyFrameSignatureQuery>(
            VerifyFrameSignatureDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'VerifyFrameSignature',
        'query',
      );
    },
    CreateFrameTypedData(
      variables: CreateFrameTypedDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateFrameTypedDataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateFrameTypedDataQuery>(
            CreateFrameTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateFrameTypedData',
        'query',
      );
    },
    SignFrameAction(
      variables: SignFrameActionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SignFrameActionMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SignFrameActionMutation>(SignFrameActionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SignFrameAction',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
