import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel';
import { GraphQLError } from 'graphql';

import {
  AddReactionDocument,
  AddReactionMutation,
  AddReactionMutationVariables,
  BroadcastProtocolCallDocument,
  BroadcastProtocolCallMutation,
  BroadcastProtocolCallMutationVariables,
  CreateCommentTypedDataMutation,
  CreateFollowTypedDataMutation,
  CreatePostTypedDataMutation,
  CreateProfileMutation,
  CreateUnfollowTypedDataMutation,
  CreatePublicSetProfileMetadataUriRequest,
  CreateSetProfileMetadataTypedDataDocument,
  CreateSetProfileMetadataTypedDataMutation,
  CreateSetProfileMetadataViaDispatcherDocument,
  CreateSetProfileMetadataViaDispatcherMutation,
  CreateSetProfileMetadataViaDispatcherMutationVariables,
  Eip712TypedDataDomain,
  Eip712TypedDataField,
  HidePublicationDocument,
  HidePublicationMutation,
  HidePublicationMutationVariables,
  ProxyActionDocument,
  ProxyActionMutation,
  ProxyActionMutationVariables,
  RelayResult,
  RemoveReactionDocument,
  RemoveReactionMutation,
  RemoveReactionMutationVariables,
} from '../generated';

export function mockCreateProfileMutation(result: Required<RelayResult>): CreateProfileMutation {
  return {
    result,
  };
}

function mockBroadcastProtocolCallMutation(
  result: Required<RelayResult>,
): BroadcastProtocolCallMutation {
  return {
    result,
  };
}

export function createBroadcastProtocolCallMutationMockedResponse(
  instructions:
    | {
        error: Error;
        variables: BroadcastProtocolCallMutationVariables;
      }
    | {
        result: Required<RelayResult>;
        variables: BroadcastProtocolCallMutationVariables;
      },
): MockedResponse<BroadcastProtocolCallMutation> {
  if ('error' in instructions) {
    return {
      request: {
        query: BroadcastProtocolCallDocument,
        variables: instructions.variables,
      },
      error: instructions.error,
    };
  }
  return {
    request: {
      query: BroadcastProtocolCallDocument,
      variables: instructions.variables,
    },
    result: {
      data: mockBroadcastProtocolCallMutation(instructions.result),
    },
  };
}

function mockCreateTypedDataResult<T extends string, D extends object>(
  __typename: T,
  typedData: D,
) {
  return {
    __typename,
    id: faker.datatype.uuid(),
    expiresAt: faker.date.future().toISOString(),
    typedData,
  };
}

function mockEIP712TypedDataField(): Eip712TypedDataField {
  return {
    __typename: 'EIP712TypedDataField',
    name: 'nonce',
    type: 'uint256',
  };
}

function mockEIP712TypedDataDomain(): Eip712TypedDataDomain {
  return {
    __typename: 'EIP712TypedDataDomain',
    name: 'Lens',
    version: '1',
    chainId: 0,
    verifyingContract: mockEthereumAddress(),
  };
}

export function mockCreatePostTypedDataMutation({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreatePostTypedDataMutation {
  return {
    result: mockCreateTypedDataResult('CreatePostBroadcastItemResult', {
      __typename: 'CreatePostEIP712TypedData',
      types: {
        __typename: 'CreatePostEIP712TypedDataTypes',
        PostWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreatePostEIP712TypedDataValue',
        nonce,
        deadline: 1644303500,
        profileId: '0x0132',
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json',
        collectModule: '0xd6072BB2ABc0a9d1331c7d0B83AE6C47f2Cb86A3',
        collectModuleInitData: '0x',
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateCommentTypedDataMutation({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateCommentTypedDataMutation {
  return {
    result: mockCreateTypedDataResult('CreateCommentBroadcastItemResult', {
      __typename: 'CreateCommentEIP712TypedData',
      types: {
        __typename: 'CreateCommentEIP712TypedDataTypes',
        CommentWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateCommentEIP712TypedDataValue',
        profileIdPointed: '',
        pubIdPointed: '',
        nonce,
        deadline: 1644303500,
        profileId: '0x0132',
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json',
        collectModule: '0xd6072BB2ABc0a9d1331c7d0B83AE6C47f2Cb86A3',
        collectModuleInitData: '0x',
        referenceModuleData: '0x0000000000000000000000000000000000000000',
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function createHidePublicationMutationMockedResponse(args: {
  variables: HidePublicationMutationVariables;
}): MockedResponse<HidePublicationMutation> {
  return {
    request: {
      query: HidePublicationDocument,
      variables: args.variables,
    },
    result: {
      data: { hidePublication: null },
    },
  };
}

export function createAddReactionMutationMockedResponse(args: {
  variables: AddReactionMutationVariables;
}): MockedResponse<AddReactionMutation> {
  return {
    request: {
      query: AddReactionDocument,
      variables: args.variables,
    },
    result: {
      data: { addReaction: null },
    },
  };
}

export function createRemoveReactionMutationMockedResponse(args: {
  variables: RemoveReactionMutationVariables;
}): MockedResponse<RemoveReactionMutation> {
  return {
    request: {
      query: RemoveReactionDocument,
      variables: args.variables,
    },
    result: {
      data: { removeReaction: null },
    },
  };
}

export function createAddReactionMutationWithGraphqlValidationErrorResponse(args: {
  variables: AddReactionMutationVariables;
}): MockedResponse<AddReactionMutation> {
  return {
    request: {
      query: AddReactionDocument,
      variables: args.variables,
    },
    result: {
      errors: [
        new GraphQLError('Wrong vars', undefined, undefined, undefined, undefined, undefined, {
          code: 'GRAPHQL_VALIDATION_FAILED',
        }),
      ],
    },
  };
}

export function createRemoveReactionMutationWithGraphqlValidationErrorResponse(args: {
  variables: RemoveReactionMutationVariables;
}): MockedResponse<RemoveReactionMutation> {
  return {
    request: {
      query: AddReactionDocument,
      variables: args.variables,
    },
    result: {
      errors: [
        new GraphQLError(
          'You have not reacted to this publication with action UPVOTE',
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            code: 'GRAPHQL_VALIDATION_FAILED',
          },
        ),
      ],
    },
  };
}

export function mockCreateFollowTypedDataMutation({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateFollowTypedDataMutation {
  return {
    result: mockCreateTypedDataResult('CreateFollowBroadcastItemResult', {
      __typename: 'CreateFollowEIP712TypedData',
      types: {
        __typename: 'CreateFollowEIP712TypedDataTypes',
        FollowWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateFollowEIP712TypedDataValue',
        nonce,
        deadline: '0',
        profileIds: [faker.datatype.uuid()],
        datas: ['0x00'],
      },
    }),
  };
}

export function mockCreateSetProfileMetadataTypedDataMutation({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateSetProfileMetadataTypedDataMutation {
  return {
    result: mockCreateTypedDataResult('CreateSetProfileMetadataURIBroadcastItemResult', {
      __typename: 'CreateSetProfileMetadataURIEIP712TypedData',
      types: {
        __typename: 'CreateSetProfileMetadataURIEIP712TypedDataTypes',
        SetProfileMetadataURIWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateSetProfileMetadataURIEIP712TypedDataValue',
        nonce,
        deadline: '0',
        profileId: faker.datatype.uuid(),
        metadata: faker.internet.url(),
      },
    }),
  };
}

export function mockCreateUnfollowTypedDataMutation({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateUnfollowTypedDataMutation {
  return {
    result: mockCreateTypedDataResult('CreateUnfollowBroadcastItemResult', {
      __typename: 'CreateBurnEIP712TypedData',
      types: {
        __typename: 'CreateBurnEIP712TypedDataTypes',
        BurnWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateBurnEIP712TypedDataValue',
        nonce,
        deadline: '0',
        tokenId: faker.datatype.uuid(),
      },
    }),
  };
}

export function createBroadcastProxyActionCallMutationMockedResponse(instructions: {
  result: string;
  variables: ProxyActionMutationVariables;
}): MockedResponse<ProxyActionMutation> {
  return {
    request: {
      query: ProxyActionDocument,
      variables: instructions.variables,
    },
    result: {
      data: { result: instructions.result },
    },
  };
}

export function createCreateSetProfileMetadataTypedDataMutationMockedResponse({
  request,
  overrideSigNonce,
  data = mockCreateSetProfileMetadataTypedDataMutation({ nonce: overrideSigNonce }),
}: {
  request: CreatePublicSetProfileMetadataUriRequest;
  overrideSigNonce?: Nonce;
  data?: CreateSetProfileMetadataTypedDataMutation;
}): MockedResponse<CreateSetProfileMetadataTypedDataMutation> {
  return {
    request: {
      query: CreateSetProfileMetadataTypedDataDocument,
      variables: {
        request,
        options: overrideSigNonce ? { overrideSigNonce } : undefined,
      },
    },
    result: { data },
  };
}

export function createCreateSetProfileMetadataViaDispatcherMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateSetProfileMetadataViaDispatcherMutationVariables;
  data: CreateSetProfileMetadataViaDispatcherMutation;
}): MockedResponse<CreateSetProfileMetadataViaDispatcherMutation> {
  return {
    request: {
      query: CreateSetProfileMetadataViaDispatcherDocument,
      variables,
    },
    result: { data },
  };
}
