import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { createGraphQLValidationError } from '../../apollo/__helpers__/mocks';
import {
  AddReactionDocument,
  BroadcastProtocolCallDocument,
  CreateSetProfileImageUriTypedDataDocument,
  CreateSetProfileMetadataTypedDataDocument,
  CreateSetProfileMetadataViaDispatcherDocument,
  HidePublicationDocument,
  ProxyActionDocument,
  RemoveReactionDocument,
  CreateCommentTypedDataDocument,
  CreateCommentViaDispatcherDocument,
  CreatePostTypedDataDocument,
  CreatePostViaDispatcherDocument,
  CreateSetProfileImageUriViaDispatcherDocument,
  ReportPublicationDocument,
  CreateProfileDocument,
} from '../hooks';
import {
  AddReactionVariables,
  BroadcastProtocolCallVariables,
  CreateSetProfileImageUriTypedDataVariables,
  CreatePublicSetProfileMetadataUriRequest,
  CreateSetProfileMetadataViaDispatcherVariables,
  Eip712TypedDataDomain,
  HidePublicationVariables,
  ProxyActionVariables,
  RemoveReactionVariables,
  CreateCommentTypedDataVariables,
  CreateCommentViaDispatcherVariables,
  CreatePostTypedDataVariables,
  CreatePostViaDispatcherVariables,
  CreateSetProfileImageUriViaDispatcherVariables,
  CreateCollectTypedDataData,
  ReportPublicationVariables,
  CreateProfileVariables,
  CreateProfileData,
  RelayResult,
  BroadcastProtocolCallData,
  CreatePostTypedDataData,
  CreateCommentTypedDataData,
  HidePublicationData,
  AddReactionData,
  RemoveReactionData,
  CreateFollowTypedDataData,
  CreateSetProfileMetadataTypedDataData,
  CreateUnfollowTypedDataData,
  ProxyActionData,
  CreateSetFollowModuleTypedDataData,
  CreateSetProfileImageUriTypedDataData,
  CreateSetDispatcherTypedDataData,
  CreateSetProfileMetadataViaDispatcherData,
  CreateCommentViaDispatcherData,
  CreatePostViaDispatcherData,
  CreateSetProfileImageUriViaDispatcherData,
  ReportPublicationData,
} from '../operations';

export function createCreateProfileMockedResponse({
  request,
  result,
}: {
  request: CreateProfileVariables['request'];
  result: Required<RelayResult>;
}): MockedResponse<CreateProfileData> {
  return {
    request: {
      query: CreateProfileDocument,
      variables: { request },
    },
    result: {
      data: { result },
    },
  };
}

function mockBroadcastProtocolCallData(result: Required<RelayResult>): BroadcastProtocolCallData {
  return {
    result,
  };
}

export function createBroadcastProtocolCallMockedResponse(
  instructions:
    | {
        error: Error;
        variables: BroadcastProtocolCallVariables;
      }
    | {
        result: Required<RelayResult>;
        variables: BroadcastProtocolCallVariables;
      },
): MockedResponse<BroadcastProtocolCallData> {
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
      data: mockBroadcastProtocolCallData(instructions.result),
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

function mockEIP712TypedDataField() {
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

export function mockCreatePostTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreatePostTypedDataData {
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

export function mockCreateCommentTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateCommentTypedDataData {
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
        profileIdPointed: mockProfileId(),
        pubIdPointed: '',
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
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

export function createHidePublicationMockedResponse(args: {
  variables: HidePublicationVariables;
}): MockedResponse<HidePublicationData> {
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

export function createAddReactionMockedResponse(args: {
  variables: AddReactionVariables;
}): MockedResponse<AddReactionData> {
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

export function createRemoveReactionMockedResponse(args: {
  variables: RemoveReactionVariables;
}): MockedResponse<RemoveReactionData> {
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

export function createRemoveReactionMockedResponseWithGraphqlValidationError(args: {
  variables: RemoveReactionVariables;
}): MockedResponse<RemoveReactionData> {
  return {
    request: {
      query: RemoveReactionDocument,
      variables: args.variables,
    },
    result: {
      errors: [
        createGraphQLValidationError(
          `You have not reacted to this publication with action ${args.variables.reaction}}`,
        ),
      ],
    },
  };
}

export function mockCreateFollowTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateFollowTypedDataData {
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
        profileIds: [mockProfileId()],
        datas: ['0x00'],
      },
    }),
  };
}

export function mockCreateSetProfileMetadataTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateSetProfileMetadataTypedDataData {
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
        profileId: mockProfileId(),
        metadata: faker.internet.url(),
      },
    }),
  };
}

export function mockCreateUnfollowTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateUnfollowTypedDataData {
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

export function createBroadcastProxyActionCallMockedResponse(instructions: {
  result: string;
  variables: ProxyActionVariables;
}): MockedResponse<ProxyActionData> {
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

export function mockCreateSetFollowModuleTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateSetFollowModuleTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateSetFollowModuleBroadcastItemResult', {
      __typename: 'CreateSetFollowModuleEIP712TypedData',
      types: {
        __typename: 'CreateSetFollowModuleEIP712TypedDataTypes',
        SetFollowModuleWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateSetFollowModuleEIP712TypedDataValue',
        nonce,
        deadline: '0',
        profileId: mockProfileId(),
        followModule: mockEthereumAddress(),
        followModuleInitData: '0x00',
      },
    }),
  };
}

export function mockCreateSetProfileImageUriTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateSetProfileImageUriTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateSetProfileImageUriBroadcastItemResult', {
      __typename: 'CreateSetProfileImageUriEIP712TypedData',
      types: {
        __typename: 'CreateSetProfileImageUriEIP712TypedDataTypes',
        SetProfileImageURIWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateSetProfileImageUriEIP712TypedDataValue',
        nonce,
        deadline: 1644303500,
        profileId: '0x0132',
        imageURI: faker.internet.url(),
      },
    }),
  };
}

export function createCreateSetProfileImageUriTypedDataMockedResponse<
  T extends CreateSetProfileImageUriTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateSetProfileImageUriTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateSetProfileImageUriTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateSetDispatcherTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateSetDispatcherTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateSetDispatcherBroadcastItemResult', {
      __typename: 'CreateSetDispatcherEIP712TypedData',
      types: {
        __typename: 'CreateSetDispatcherEIP712TypedDataTypes',
        SetDispatcherWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateSetDispatcherEIP712TypedDataValue',
        nonce,
        deadline: '0',
        profileId: mockProfileId(),
        dispatcher: faker.datatype.uuid(),
      },
    }),
  };
}

export function createCreateSetProfileMetadataTypedDataMockedResponse({
  request,
  overrideSigNonce,
  data = mockCreateSetProfileMetadataTypedDataData({ nonce: overrideSigNonce }),
}: {
  request: CreatePublicSetProfileMetadataUriRequest;
  overrideSigNonce?: Nonce;
  data?: CreateSetProfileMetadataTypedDataData;
}): MockedResponse<CreateSetProfileMetadataTypedDataData> {
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

export function createCreateSetProfileMetadataViaDispatcherMockedResponse<
  T extends CreateSetProfileMetadataViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateSetProfileMetadataViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateSetProfileMetadataViaDispatcherDocument,
      variables,
    },
    result: { data },
  };
}

export function createCreateCommentTypedDataMockedResponse<T extends CreateCommentTypedDataData>({
  variables,
  data,
}: {
  variables: CreateCommentTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateCommentTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreateCommentViaDispatcherMockedResponse<
  T extends CreateCommentViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateCommentViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateCommentViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreatePostTypedDataMockedResponse<T extends CreatePostTypedDataData>({
  variables,
  data,
}: {
  variables: CreatePostTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreatePostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreatePostViaDispatcherMockedResponse<T extends CreatePostViaDispatcherData>({
  variables,
  data,
}: {
  variables: CreatePostViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreatePostViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createSetProfileImageURIViaDispatcherMockedResponse<
  T extends CreateSetProfileImageUriViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateSetProfileImageUriViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateSetProfileImageUriViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateCollectTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateCollectTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateCollectBroadcastItemResult', {
      __typename: 'CreateCollectEIP712TypedData',
      types: {
        __typename: 'CreateCollectEIP712TypedDataTypes',
        CollectWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateCollectEIP712TypedDataValue',
        nonce,
        deadline: '0',
        profileId: mockProfileId(),
        pubId: faker.datatype.uuid(),
        data: ['0x00'],
      },
    }),
  };
}

export function createReportPublicationMockedResponse(args: {
  variables: ReportPublicationVariables;
}): MockedResponse<ReportPublicationData> {
  return {
    request: {
      query: ReportPublicationDocument,
      variables: args.variables,
    },
    result: { data: { reportPublication: null } },
  };
}
