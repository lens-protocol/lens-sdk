// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  NetworkAddressFragment,
  AmountFragment,
  Erc20Fragment,
  PaginatedResultInfoFragment,
  ImageFragment,
  ProfileFragment,
  PostFragment,
  QuoteFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
  RelaySuccessFragment,
  RelayErrorFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
export type PoapEventFragment = {
  id: string;
  fancyId: string | null;
  name: string | null;
  eventUrl: string | null;
  imageUrl: string | null;
  country: string | null;
  city: string | null;
  description: string | null;
  year: number | null;
  startDate: string | null;
  endDate: string | null;
  expiryDate: string | null;
  virtualEvent: boolean | null;
  fromAdmin: boolean | null;
  animationUrl: string | null;
  eventTemplateId: number | null;
  privateEvent: boolean | null;
};

export type PoapTokenFragment = {
  tokenId: string;
  eventId: string;
  layer: Types.PoapTokenLayerType;
  created: string;
  migrated: string | null;
  owner: NetworkAddressFragment;
  event: PoapEventFragment;
};

export type PoapsQueryVariables = Types.Exact<{
  request: Types.UserPoapsQueryRequest;
}>;

export type PoapsQuery = {
  result: { items: Array<PoapTokenFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type MutualPoapsQueryVariables = Types.Exact<{
  request: Types.MutualPoapsQueryRequest;
}>;

export type MutualPoapsQuery = {
  result: { items: Array<PoapEventFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type PoapHoldersQueryVariables = Types.Exact<{
  request: Types.PoapHoldersQueryRequest;
  profileCoverTransform: Types.ImageTransform;
  profilePictureTransform: Types.ImageTransform;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  profileMetadataSource?: Types.InputMaybe<Types.Scalars['AppId']['input']>;
  rateRequest: Types.RateRequest;
}>;

export type PoapHoldersQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type PoapEventQueryVariables = Types.Exact<{
  request: Types.PoapEventQueryRequest;
}>;

export type PoapEventQuery = { result: PoapEventFragment | null };

export const PoapEventFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PoapEvent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapEvent' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fancyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiryDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'virtualEvent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fromAdmin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'animationUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventTemplateId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privateEvent' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const PoapTokenFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PoapToken' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapToken' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'tokenId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'layer' } },
          { kind: 'Field', name: { kind: 'Name', value: 'created' } },
          { kind: 'Field', name: { kind: 'Name', value: 'migrated' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PoapEvent' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PoapEvent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapEvent' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fancyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiryDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'virtualEvent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fromAdmin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'animationUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventTemplateId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privateEvent' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NetworkAddress' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkAddress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const PoapsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Poaps' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserPoapsQueryRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'poaps' },
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
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PoapToken' } },
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
      name: { kind: 'Name', value: 'PoapEvent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapEvent' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fancyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiryDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'virtualEvent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fromAdmin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'animationUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventTemplateId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privateEvent' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PoapToken' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapToken' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'tokenId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'layer' } },
          { kind: 'Field', name: { kind: 'Name', value: 'created' } },
          { kind: 'Field', name: { kind: 'Name', value: 'migrated' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PoapEvent' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NetworkAddress' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkAddress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
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
export const MutualPoapsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MutualPoaps' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MutualPoapsQueryRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'mutualPoaps' },
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
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PoapEvent' } },
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
      name: { kind: 'Name', value: 'PoapEvent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapEvent' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fancyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiryDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'virtualEvent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fromAdmin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'animationUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventTemplateId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privateEvent' } },
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
export const PoapHoldersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PoapHolders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapHoldersQueryRequest' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profileCoverTransform' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageTransform' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profilePictureTransform' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageTransform' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profileStatsArg' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProfileStatsArg' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'profileStatsCountOpenActionArgs' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProfileStatsCountOpenActionArgs' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profileMetadataSource' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AppId' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rateRequest' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RateRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'poapHolders' },
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
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Profile' } },
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
      name: { kind: 'Name', value: 'NetworkAddress' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkAddress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Profile' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Profile' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ownedBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'operations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isBlockedByMe' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'OptimisticStatusResult' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isFollowedByMe' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'OptimisticStatusResult' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isFollowingMe' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'OptimisticStatusResult' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'canBlock' } },
                { kind: 'Field', name: { kind: 'Name', value: 'canUnblock' } },
                { kind: 'Field', name: { kind: 'Name', value: 'canFollow' } },
                { kind: 'Field', name: { kind: 'Name', value: 'canUnfollow' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'interests' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guardian' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'protected' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cooldownEndsOn' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'invitesLeft' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onchainIdentity' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'proofOfHumanity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ens' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sybilDotOrg' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'source' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'twitter' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
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
                  kind: 'Field',
                  name: { kind: 'Name', value: 'worldcoin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'isHuman' } }],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'followNftAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'followModule' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FeeFollowModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FeeFollowModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'RevertFollowModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'RevertFollowModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownFollowModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownFollowModuleSettings' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadata' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'appId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'profileMetadataSource' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'useFallback' },
                      value: { kind: 'BooleanValue', value: true },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProfileMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'handle' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'HandleInfo' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'sponsor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'signless' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invitedBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'profileStatsArg' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProfileStats' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'peerToPeerRecommendedByMe' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OptimisticStatusResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OptimisticStatusResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isFinalisedOnchain' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeFollowModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'FeeFollowModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contract' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Amount' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Amount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Erc20' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'rateRequest' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'FiatAmount' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Erc20' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Erc20' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
          { kind: 'Field', name: { kind: 'Name', value: 'decimals' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contract' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FiatAmount' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'FiatAmount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Fiat' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Fiat' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fiat' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
          { kind: 'Field', name: { kind: 'Name', value: 'decimals' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RevertFollowModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'RevertFollowModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contract' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UnknownFollowModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UnknownFollowModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contract' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'initializeCalldata' } },
          { kind: 'Field', name: { kind: 'Name', value: 'initializeResultData' } },
          { kind: 'Field', name: { kind: 'Name', value: 'signlessApproved' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sponsoredApproved' } },
          { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfileMetadata' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ProfileMetadata' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'picture' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageSet' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProfilePictureSet' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NftImage' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NftImage' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coverPicture' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProfileCoverSet' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfilePictureSet' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageSet' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'raw' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'optimized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'thumbnail' },
            name: { kind: 'Name', value: 'transformed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'profilePictureTransform' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Image' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Image' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uri' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NftImage' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NftImage' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'tokenId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'image' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProfilePictureSet' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfileCoverSet' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageSet' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'raw' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'optimized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transformed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'profileCoverTransform' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HandleInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'HandleInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
          { kind: 'Field', name: { kind: 'Name', value: 'localName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'suggestedFormatted' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'full' } },
                { kind: 'Field', name: { kind: 'Name', value: 'localName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'linkedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contract' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'nftTokenId' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ownedBy' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfileStats' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ProfileStats' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followers' } },
          { kind: 'Field', name: { kind: 'Name', value: 'following' } },
          { kind: 'Field', name: { kind: 'Name', value: 'comments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'posts' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mirrors' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publications' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'upvotes' },
            name: { kind: 'Name', value: 'reactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'EnumValue', value: 'UPVOTE' },
                    },
                  ],
                },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'downvotes' },
            name: { kind: 'Name', value: 'reactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'EnumValue', value: 'DOWNVOTE' },
                    },
                  ],
                },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'upvoted' },
            name: { kind: 'Name', value: 'reacted' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'EnumValue', value: 'UPVOTE' },
                    },
                  ],
                },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'downvoted' },
            name: { kind: 'Name', value: 'reacted' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'EnumValue', value: 'DOWNVOTE' },
                    },
                  ],
                },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'collects' },
            name: { kind: 'Name', value: 'countOpenActions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'anyOf' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'category' },
                                value: { kind: 'EnumValue', value: 'COLLECT' },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countOpenActions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'profileStatsCountOpenActionArgs' },
                },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'lensClassifierScore' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const PoapEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PoapEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapEventQueryRequest' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'poapEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PoapEvent' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PoapEvent' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PoapEvent' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fancyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiryDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'virtualEvent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fromAdmin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'animationUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventTemplateId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'privateEvent' } },
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
const PoapsDocumentString = print(PoapsDocument);
const MutualPoapsDocumentString = print(MutualPoapsDocument);
const PoapHoldersDocumentString = print(PoapHoldersDocument);
const PoapEventDocumentString = print(PoapEventDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Poaps(
      variables: PoapsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PoapsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PoapsQuery>(PoapsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Poaps',
        'query',
      );
    },
    MutualPoaps(
      variables: MutualPoapsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MutualPoapsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MutualPoapsQuery>(MutualPoapsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MutualPoaps',
        'query',
      );
    },
    PoapHolders(
      variables: PoapHoldersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PoapHoldersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PoapHoldersQuery>(PoapHoldersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PoapHolders',
        'query',
      );
    },
    PoapEvent(
      variables: PoapEventQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PoapEventQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PoapEventQuery>(PoapEventDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PoapEvent',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
