// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PostFragment,
  ProfileFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  Eip712TypedDataFieldFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
  OptimisticStatusResultFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
export type ExplorePublicationsQueryVariables = Types.Exact<{
  request: Types.ExplorePublicationRequest;
  publicationImageSmallTransform: Types.ImageTransform;
  publicationImageMediumTransform: Types.ImageTransform;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  publicationStatsInput: Types.PublicationStatsInput;
  publicationStatsCountOpenActionArgs: Types.PublicationStatsCountOpenActionArgs;
  profileCoverTransform: Types.ImageTransform;
  profilePictureTransform: Types.ImageTransform;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  profileMetadataSource?: Types.InputMaybe<Types.Scalars['AppId']['input']>;
  rateRequest: Types.RateRequest;
}>;

export type ExplorePublicationsQuery = {
  result: { items: Array<PostFragment | QuoteFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ExploreProfilesQueryVariables = Types.Exact<{
  request: Types.ExploreProfilesRequest;
  profileCoverTransform: Types.ImageTransform;
  profilePictureTransform: Types.ImageTransform;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  profileMetadataSource?: Types.InputMaybe<Types.Scalars['AppId']['input']>;
  rateRequest: Types.RateRequest;
}>;

export type ExploreProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const ExplorePublicationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ExplorePublications' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExplorePublicationRequest' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'publicationImageSmallTransform' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageTransform' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'publicationImageMediumTransform' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageTransform' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'publicationOperationsActedArgs' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PublicationOperationsActedArgs' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'publicationStatsInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PublicationStatsInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'publicationStatsCountOpenActionArgs' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PublicationStatsCountOpenActionArgs' },
            },
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
            name: { kind: 'Name', value: 'explorePublications' },
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
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Post' } },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'Quote' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Quote' } },
                          ],
                        },
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
      name: { kind: 'Name', value: 'Post' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishedOn' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'App' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'momoka' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MomokaInfo' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isEncrypted' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'by' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Profile' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'publicationStatsInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PublicationStats' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'operations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PublicationOperations' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadata' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AudioMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AudioMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'VideoMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'VideoMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ImageMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImageMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ArticleMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ArticleMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EventMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LinkMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LinkMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EmbedMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EmbedMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CheckingInMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CheckingInMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ThreeDMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ThreeDMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'StoryMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'StoryMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TransactionMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TransactionMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MintMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MintMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SpaceMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SpaceMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'openActionModules' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyMultirecipientFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'LegacyMultirecipientFeeCollectModuleSettings',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'referenceModule' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'LegacyDegreesOfSeparationReferenceModuleSettings',
                    },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'LegacyDegreesOfSeparationReferenceModuleSettings',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profilesMentioned' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProfileMentioned' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'hashtagsMentioned' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'App' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'App' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MomokaInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MomokaInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proof' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asFiat' },
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PublicationStats' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PublicationStats' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'comments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mirrors' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bookmarks' } },
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
                  name: { kind: 'Name', value: 'publicationStatsCountOpenActionArgs' },
                },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PublicationOperations' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PublicationOperations' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isNotInterested' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasBookmarked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasReported' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'canAct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationOperationsActedArgs' },
                },
              },
            ],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'hasActed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationOperationsActedArgs' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OptimisticStatusResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'actedOn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationOperationsActedArgs' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OpenActionResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'canCollect' },
            name: { kind: 'Name', value: 'canAct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'filter' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'category' },
                            value: { kind: 'EnumValue', value: 'COLLECT' },
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
            alias: { kind: 'Name', value: 'hasCollected' },
            name: { kind: 'Name', value: 'hasActed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'filter' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'category' },
                            value: { kind: 'EnumValue', value: 'COLLECT' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OptimisticStatusResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'hasUpvoted' },
            name: { kind: 'Name', value: 'hasReacted' },
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
            alias: { kind: 'Name', value: 'hasDownvoted' },
            name: { kind: 'Name', value: 'hasReacted' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'canComment' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canMirror' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canQuote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasQuoted' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasMirrored' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'canDecrypt' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanDecryptResponse' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OpenActionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OpenActionResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'InlineFragment',
            typeCondition: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'KnownCollectOpenActionResult' },
            },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'KnownCollectOpenActionResult' },
                },
              ],
            },
          },
          {
            kind: 'InlineFragment',
            typeCondition: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UnknownOpenActionResult' },
            },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UnknownOpenActionResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'KnownCollectOpenActionResult' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'KnownCollectOpenActionResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UnknownOpenActionResult' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UnknownOpenActionResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
          { kind: 'Field', name: { kind: 'Name', value: 'initReturnData' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanDecryptResponse' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanDecryptResponse' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'result' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reasons' } },
          { kind: 'Field', name: { kind: 'Name', value: 'extraDetails' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AudioMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AudioMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MarketplaceMetadata' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalURL' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PublicationMarketplaceMetadataAttribute' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'image' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImageSet' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'animationUrl' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PublicationMarketplaceMetadataAttribute' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PublicationMarketplaceMetadataAttribute' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'traitType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImageSet' },
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
            alias: { kind: 'Name', value: 'small' },
            name: { kind: 'Name', value: 'transformed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationImageSmallTransform' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'medium' },
            name: { kind: 'Name', value: 'transformed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationImageMediumTransform' },
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
      name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'encryptionKey' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accessCondition' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RootCondition' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'encryptedPaths' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RootCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RootCondition' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'criteria' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'NftOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'NftOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EoaOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EoaOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FollowCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FollowCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CollectCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CollectCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AndCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AndCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'OrCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OrCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AdvancedContractCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AdvancedContractCondition' },
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
      name: { kind: 'Name', value: 'NftOwnershipCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NftOwnershipCondition' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'contractType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tokenIds' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'condition' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EoaOwnershipCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EoaOwnershipCondition' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FollowCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'FollowCondition' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'follow' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CollectCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CollectCondition' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publicationId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thisPublication' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AndCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AndCondition' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'criteria' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'NftOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'NftOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EoaOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EoaOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FollowCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FollowCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CollectCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CollectCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AdvancedContractCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AdvancedContractCondition' },
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
      name: { kind: 'Name', value: 'AdvancedContractCondition' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'AdvancedContractCondition' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'functionName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'abi' } },
          { kind: 'Field', name: { kind: 'Name', value: 'params' } },
          { kind: 'Field', name: { kind: 'Name', value: 'comparison' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OrCondition' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OrCondition' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'criteria' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'NftOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'NftOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'Erc20OwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EoaOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EoaOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProfileOwnershipCondition' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FollowCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FollowCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CollectCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CollectCondition' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AdvancedContractCondition' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AdvancedContractCondition' },
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
      name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'audio' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableAudioSet' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cover' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableImageSet' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
          { kind: 'Field', name: { kind: 'Name', value: 'license' } },
          { kind: 'Field', name: { kind: 'Name', value: 'credits' } },
          { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
          { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recordLabel' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lyrics' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EncryptableAudioSet' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EncryptableAudioSet' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'raw' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableAudio' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'optimized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Audio' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EncryptableAudio' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EncryptableAudio' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uri' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Audio' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Audio' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uri' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EncryptableImageSet' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EncryptableImageSet' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'raw' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableImage' } },
              ],
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
            alias: { kind: 'Name', value: 'small' },
            name: { kind: 'Name', value: 'transformed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationImageSmallTransform' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Image' } }],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'medium' },
            name: { kind: 'Name', value: 'transformed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'publicationImageMediumTransform' },
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
      name: { kind: 'Name', value: 'EncryptableImage' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EncryptableImage' } },
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
      name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'video' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableVideoSet' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cover' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableImageSet' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
          { kind: 'Field', name: { kind: 'Name', value: 'license' } },
          { kind: 'Field', name: { kind: 'Name', value: 'altTag' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EncryptableVideoSet' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EncryptableVideoSet' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'raw' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableVideo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'optimized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Video' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EncryptableVideo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EncryptableVideo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uri' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Video' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Video' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uri' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'image' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EncryptableImageSet' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'altTag' } },
          { kind: 'Field', name: { kind: 'Name', value: 'license' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VideoMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'VideoMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isShortVideo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImageMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ImageMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'ArticleMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArticleMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'EventMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EventMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'geographic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'GeoLocation' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'links' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'GeoLocation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GeoLocation' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
          { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LinkMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LinkMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sharingLink' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'EmbedMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EmbedMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'embed' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'CheckingInMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CheckingInMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'geographic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'GeoLocation' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TextOnlyMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ThreeDMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ThreeDMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ThreeDMetadataV3Asset' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'ThreeDMetadataV3Asset' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ThreeDMetadataV3Asset' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uri' } },
          { kind: 'Field', name: { kind: 'Name', value: 'zipPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'playerURL' } },
          { kind: 'Field', name: { kind: 'Name', value: 'format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'license' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StoryMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'StoryMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'TransactionMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chainId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'MintMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MintMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mintLink' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'SpaceMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SpaceMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'link' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LiveStreamMetadataV3' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rawURI' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentWarning' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hideFromFeed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'appId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'marketplace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MarketplaceMetadata' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attributes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'encryptedWith' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataLitEncryption' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'playbackURL' } },
          { kind: 'Field', name: { kind: 'Name', value: 'liveURL' } },
          { kind: 'Field', name: { kind: 'Name', value: 'checkLiveAPI' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaVideo' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PublicationMetadataMediaAudio' },
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
      name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endTimestamp' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
      name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endTimestamp' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyMultirecipientFeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyMultirecipientFeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
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
            name: { kind: 'Name', value: 'recipients' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
                { kind: 'Field', name: { kind: 'Name', value: 'split' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NetworkAddress' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
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
            name: { kind: 'Name', value: 'recipients' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
                { kind: 'Field', name: { kind: 'Name', value: 'split' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'amount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Amount' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'recipient' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referralFee' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerOnly' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectLimit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'collectNft' } },
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
      name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
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
      name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
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
      name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'commentsRestricted' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mirrorsRestricted' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quotesRestricted' } },
          { kind: 'Field', name: { kind: 'Name', value: 'degreesOfSeparation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sourceProfileId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LegacyDegreesOfSeparationReferenceModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LegacyDegreesOfSeparationReferenceModuleSettings' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'commentsRestricted' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mirrorsRestricted' } },
          { kind: 'Field', name: { kind: 'Name', value: 'degreesOfSeparation' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
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
      name: { kind: 'Name', value: 'ProfileMentioned' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ProfileMentioned' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'snapshotHandleMentioned' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'HandleInfo' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'stillOwnsHandle' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Quote' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Quote' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'QuoteBase' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profilesMentioned' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProfileMentioned' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'hashtagsMentioned' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quoteOn' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Post' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommentBase' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Quote' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'QuoteBase' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'request' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'publicationStatsInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PublicationStats' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuoteBase' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Quote' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishedOn' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'App' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'momoka' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MomokaInfo' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isEncrypted' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'by' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Profile' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'operations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PublicationOperations' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadata' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AudioMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AudioMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'VideoMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'VideoMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ImageMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImageMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ArticleMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ArticleMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EventMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LinkMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LinkMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EmbedMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EmbedMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CheckingInMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CheckingInMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ThreeDMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ThreeDMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'StoryMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'StoryMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TransactionMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TransactionMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MintMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MintMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SpaceMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SpaceMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'openActionModules' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyMultirecipientFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'LegacyMultirecipientFeeCollectModuleSettings',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'referenceModule' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'LegacyDegreesOfSeparationReferenceModuleSettings',
                    },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'LegacyDegreesOfSeparationReferenceModuleSettings',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
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
      name: { kind: 'Name', value: 'CommentBase' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishedOn' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'App' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hiddenByAuthor' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'momoka' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MomokaInfo' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isEncrypted' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'by' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Profile' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'operations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PublicationOperations' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadata' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AudioMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AudioMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'VideoMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'VideoMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ImageMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ImageMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ArticleMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ArticleMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EventMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LinkMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LinkMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EmbedMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EmbedMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CheckingInMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CheckingInMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TextOnlyMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ThreeDMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ThreeDMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'StoryMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'StoryMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TransactionMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TransactionMetadataV3' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MintMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MintMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SpaceMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SpaceMetadataV3' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LiveStreamMetadataV3' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'openActionModules' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFreeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyLimitedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyLimitedTimedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyRevertCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyTimedFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyMultirecipientFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'LegacyMultirecipientFeeCollectModuleSettings',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacySimpleCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyERC4626FeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyAaveFeeCollectModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'MultirecipientFeeCollectOpenActionSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'SimpleCollectOpenActionSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownOpenActionModuleSettings' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'referenceModule' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FollowOnlyReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'LegacyFollowOnlyReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'DegreesOfSeparationReferenceModuleSettings' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'LegacyDegreesOfSeparationReferenceModuleSettings',
                    },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'LegacyDegreesOfSeparationReferenceModuleSettings',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UnknownReferenceModuleSettings' },
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
export const ExploreProfilesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ExploreProfiles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExploreProfilesRequest' } },
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
            name: { kind: 'Name', value: 'exploreProfiles' },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asFiat' },
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

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ExplorePublicationsDocumentString = print(ExplorePublicationsDocument);
const ExploreProfilesDocumentString = print(ExploreProfilesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ExplorePublications(
      variables: ExplorePublicationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ExplorePublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ExplorePublicationsQuery>(
            ExplorePublicationsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ExplorePublications',
        'query',
      );
    },
    ExploreProfiles(
      variables: ExploreProfilesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ExploreProfilesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ExploreProfilesQuery>(ExploreProfilesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ExploreProfiles',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
