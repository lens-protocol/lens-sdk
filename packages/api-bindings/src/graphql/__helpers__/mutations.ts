import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { createGraphQLValidationError } from '../../apollo/__helpers__/mocks';
import {
  AddReactionDocument,
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
  CreateDataAvailabilityPostTypedDataDocument,
  CreateDataAvailabilityPostViaDispatcherDocument,
  BroadcastOnChainDocument,
  BroadcastOffChainDocument,
  CreateDataAvailabilityCommentTypedDataDocument,
  CreateDataAvailabilityCommentViaDispatcherDocument,
  CreateMirrorTypedDataDocument,
  CreateMirrorViaDispatcherDocument,
  CreateDataAvailabilityMirrorTypedDataDocument,
  CreateDataAvailabilityMirrorViaDispatcherDocument,
} from '../hooks';
import {
  AddReactionVariables,
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
  CreateDataAvailabilityPostTypedDataVariables,
  CreateDataAvailabilityPostTypedDataData,
  CreateDataAvailabilityPostViaDispatcherData,
  CreateDataAvailabilityPostViaDispatcherVariables,
  BroadcastOnChainData,
  BroadcastOnChainVariables,
  BroadcastOnChainResult,
  BroadcastOffChainResult,
  BroadcastOffChainData,
  BroadcastOffChainVariables,
  CreateDataAvailabilityCommentTypedDataData,
  CreateDataAvailabilityCommentTypedDataVariables,
  CreateDataAvailabilityCommentViaDispatcherData,
  CreateDataAvailabilityCommentViaDispatcherVariables,
  CreateMirrorTypedDataData,
  CreateMirrorTypedDataVariables,
  CreateMirrorViaDispatcherData,
  CreateMirrorViaDispatcherVariables,
  CreateDataAvailabilityMirrorTypedDataData,
  CreateDataAvailabilityMirrorTypedDataVariables,
  CreateDataAvailabilityMirrorViaDispatcherData,
  CreateDataAvailabilityMirrorViaDispatcherVariables,
} from '../operations';

export function createCreateProfileMockedResponse({
  request,
  result,
}: {
  request: CreateProfileVariables['request'];
  result: Required<BroadcastOnChainResult>;
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

function mockBroadcastOnChainData(result: Required<BroadcastOnChainResult>): BroadcastOnChainData {
  return {
    result,
  };
}

export function createBroadcastOnChainMockedResponse({
  result,
  variables,
}: {
  result: Required<BroadcastOnChainResult>;
  variables: BroadcastOnChainVariables;
}): MockedResponse<BroadcastOnChainData> {
  return {
    request: {
      query: BroadcastOnChainDocument,
      variables: variables,
    },
    result: {
      data: mockBroadcastOnChainData(result),
    },
  };
}

function mockBroadcastOffChainData(
  result: Required<BroadcastOffChainResult>,
): BroadcastOffChainData {
  return {
    result,
  };
}

export function createBroadcastOffChainMockedResponse({
  result,
  variables,
}: {
  result: Required<BroadcastOffChainResult>;
  variables: BroadcastOffChainVariables;
}): MockedResponse<BroadcastOffChainData> {
  return {
    request: {
      query: BroadcastOffChainDocument,
      variables: variables,
    },
    result: {
      data: mockBroadcastOffChainData(result),
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
        profileId: mockProfileId(),
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
        pubIdPointed: faker.datatype.hexadecimal({ length: 2 }),
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

export function mockCreateMirrorTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateMirrorTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateMirrorBroadcastItemResult', {
      __typename: 'CreateMirrorEIP712TypedData',
      types: {
        __typename: 'CreateMirrorEIP712TypedDataTypes',
        MirrorWithSig: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      value: {
        __typename: 'CreateMirrorEIP712TypedDataValue',
        profileIdPointed: mockProfileId(),
        pubIdPointed: faker.datatype.hexadecimal({ length: 2 }),
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
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
        datas: [faker.datatype.hexadecimal({ length: 2 })],
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
        tokenId: faker.datatype.hexadecimal({ length: 2 }),
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
        profileId: mockProfileId(),
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
        dispatcher: mockEthereumAddress(),
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

export function createCreateDataAvailabilityCommentTypedDataMockedResponse<
  T extends CreateDataAvailabilityCommentTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateDataAvailabilityCommentTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateDataAvailabilityCommentTypedDataDocument,
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

export function createCreateDataAvailabilityCommentViaDispatcherDataMockedResponse<
  T extends CreateDataAvailabilityCommentViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateDataAvailabilityCommentViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateDataAvailabilityCommentViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreateMirrorTypedDataMockedResponse<T extends CreateMirrorTypedDataData>({
  variables,
  data,
}: {
  variables: CreateMirrorTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMirrorTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreateDataAvailabilityMirrorTypedDataMockedResponse<
  T extends CreateDataAvailabilityMirrorTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateDataAvailabilityMirrorTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateDataAvailabilityMirrorTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreateMirrorViaDispatcherMockedResponse<
  T extends CreateMirrorViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateMirrorViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMirrorViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreateDataAvailabilityMirrorViaDispatcherDataMockedResponse<
  T extends CreateDataAvailabilityMirrorViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateDataAvailabilityMirrorViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateDataAvailabilityMirrorViaDispatcherDocument,
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

export function createCreateDataAvailabilityPostTypedDataMockedResponse<
  T extends CreateDataAvailabilityPostTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateDataAvailabilityPostTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateDataAvailabilityPostTypedDataDocument,
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

export function createCreateDataAvailabilityPostViaDispatcherDataMockedResponse<
  T extends CreateDataAvailabilityPostViaDispatcherData,
>({
  variables,
  data,
}: {
  variables: CreateDataAvailabilityPostViaDispatcherVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateDataAvailabilityPostViaDispatcherDocument,
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
        pubId: faker.datatype.hexadecimal({ length: 2 }),
        data: faker.datatype.hexadecimal({ length: 2 }),
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
