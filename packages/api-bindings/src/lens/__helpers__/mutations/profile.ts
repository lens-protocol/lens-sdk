import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId } from '@lens-protocol/domain/mocks';
import { URI } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  BlockData,
  BlockDocument,
  BlockVariables,
  CreateBlockProfilesTypedDataData,
  CreateBlockProfilesTypedDataDocument,
  CreateBlockProfilesTypedDataVariables,
  CreateFollowTypedDataData,
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataVariables,
  CreateLinkHandleToProfileTypedDataData,
  CreateLinkHandleToProfileTypedDataDocument,
  CreateLinkHandleToProfileTypedDataVariables,
  CreateOnchainSetProfileMetadataTypedDataData,
  CreateOnchainSetProfileMetadataTypedDataDocument,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataVariables,
  CreateUnblockProfilesTypedDataData,
  CreateUnblockProfilesTypedDataDocument,
  CreateUnblockProfilesTypedDataVariables,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataVariables,
  CreateUnlinkHandleFromProfileTypedDataData,
  CreateUnlinkHandleFromProfileTypedDataDocument,
  CreateUnlinkHandleFromProfileTypedDataVariables,
  FollowData,
  FollowDocument,
  FollowVariables,
  LinkHandleToProfileData,
  LinkHandleToProfileDocument,
  LinkHandleToProfileVariables,
  OnchainSetProfileMetadataRequest,
  SetFollowModuleData,
  SetFollowModuleDocument,
  SetFollowModuleVariables,
  UnblockData,
  UnblockDocument,
  UnblockVariables,
  UnfollowData,
  UnfollowDocument,
  UnfollowVariables,
  UnlinkHandleFromProfileData,
  UnlinkHandleFromProfileDocument,
  UnlinkHandleFromProfileVariables,
} from '../../graphql/generated';
import {
  mockCreateTypedDataResult,
  mockEIP712TypedDataDomain,
  mockEIP712TypedDataField,
} from './utils';

export function mockCreateSetProfileMetadataTypedDataData({
  metadataURI = faker.internet.url() as URI,
  nonce = mockNonce(),
}: {
  metadataURI?: URI;
  nonce?: Nonce;
} = {}): CreateOnchainSetProfileMetadataTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateOnchainSetProfileMetadataBroadcastItemResult', {
      __typename: 'CreateOnchainSetProfileMetadataBroadcastItemResult',
      types: {
        __typename: 'CreateSetProfileMetadataURIEIP712TypedDataTypes',
        SetProfileMetadataURI: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        __typename: 'CreateSetProfileMetadataURIEIP712TypedDataValue',
        nonce,
        deadline: faker.datatype.number(),
        profileId: mockProfileId(),
        metadataURI,
      },
    }),
  };
}

export function mockCreateSetProfileMetadataTypedDataResponse({
  request,
  overrideSigNonce,
  data = mockCreateSetProfileMetadataTypedDataData({ nonce: overrideSigNonce }),
}: {
  request: OnchainSetProfileMetadataRequest;
  overrideSigNonce?: Nonce;
  data?: CreateOnchainSetProfileMetadataTypedDataData;
}): MockedResponse<CreateOnchainSetProfileMetadataTypedDataData> {
  return {
    request: {
      query: CreateOnchainSetProfileMetadataTypedDataDocument,
      variables: {
        request,
        options: overrideSigNonce ? { overrideSigNonce } : undefined,
      },
    },
    result: { data },
  };
}

export function mockUnblockProfilesTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateUnblockProfilesTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateUnblockProfilesBroadcastItemResult', {
      types: {
        SetBlockStatus: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        blockStatus: [false],
        byProfileId: mockProfileId(),
        idsOfProfilesToSetBlockStatus: [mockProfileId()],
        datas: [],
      },
    }),
  };
}

export function mockUnblockProfilesResponse<T extends UnblockData, V extends UnblockVariables>({
  variables,
  data,
}: {
  variables: V;
  data: T;
}): MockedResponse<T, V> {
  return {
    request: {
      query: UnblockDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockUnblockProfilesTypedDataResponse<T extends CreateUnblockProfilesTypedDataData>({
  variables,
  data,
}: {
  variables: CreateUnblockProfilesTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateUnblockProfilesTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockBlockProfilesResponse<T extends BlockData, V extends BlockVariables>({
  variables,
  data,
}: {
  variables: V;
  data: T;
}): MockedResponse<T, V> {
  return {
    request: {
      query: BlockDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockBlockProfilesTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateBlockProfilesTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateBlockProfilesBroadcastItemResult', {
      types: {
        SetBlockStatus: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        blockStatus: [true],
        byProfileId: mockProfileId(),
        idsOfProfilesToSetBlockStatus: [mockProfileId()],
        datas: [],
      },
    }),
  };
}

export function mockBlockProfilesTypedDataResponse<T extends CreateBlockProfilesTypedDataData>({
  variables,
  data,
}: {
  variables: CreateBlockProfilesTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateBlockProfilesTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateFollowTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateFollowTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateFollowBroadcastItemResult', {
      types: {
        Follow: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        followerProfileId: mockProfileId(),
        idsOfProfilesToFollow: [mockProfileId()],
        followTokenIds: [],
        datas: [],
      },
    }),
  };
}

export function mockCreateFollowTypedDataResponse<T extends CreateFollowTypedDataData>({
  variables,
  data,
}: {
  variables: CreateFollowTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateFollowTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockFollowResponse<T extends FollowData, V extends FollowVariables>({
  variables,
  data,
}: {
  variables: V;
  data: T;
}): MockedResponse<T, V> {
  return {
    request: {
      query: FollowDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateUnfollowTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateUnfollowTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateUnfollowBroadcastItemResult', {
      types: {
        Unfollow: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        unfollowerProfileId: mockProfileId(),
        idsOfProfilesToUnfollow: [mockProfileId()],
      },
    }),
  };
}

export function mockCreateUnfollowTypedDataResponse<T extends CreateUnfollowTypedDataData>({
  variables,
  data,
}: {
  variables: CreateUnfollowTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateUnfollowTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockUnfollowResponse<T extends UnfollowData, V extends UnfollowVariables>({
  variables,
  data,
}: {
  variables: V;
  data: T;
}): MockedResponse<T, V> {
  return {
    request: {
      query: UnfollowDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateSetFollowModuleTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateSetFollowModuleTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateSetFollowModuleBroadcastItemResult', {
      types: {
        SetFollowModule: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        followModule: mockEvmAddress(),
        followModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateSetFollowModuleTypedDataResponse<
  T extends CreateSetFollowModuleTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateSetFollowModuleTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateSetFollowModuleTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockSetFollowModuleResponse<
  T extends SetFollowModuleData,
  V extends SetFollowModuleVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: SetFollowModuleDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateLinkHandleToProfileTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateLinkHandleToProfileTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateLinkHandleToProfileBroadcastItemResult', {
      types: {
        Link: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        handleId: mockEvmAddress(),
      },
    }),
  };
}

export function mockCreateLinkHandleToProfileTypedDataResponse<
  T extends CreateLinkHandleToProfileTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateLinkHandleToProfileTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateLinkHandleToProfileTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockLinkHandleToProfileResponse<
  T extends LinkHandleToProfileData,
  V extends LinkHandleToProfileVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: LinkHandleToProfileDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateUnlinkHandleFromProfileTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateUnlinkHandleFromProfileTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateUnlinkHandleFromProfileBroadcastItemResult', {
      types: {
        Unlink: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        handleId: mockEvmAddress(),
      },
    }),
  };
}

export function mockCreateUnlinkHandleFromProfileTypedDataResponse<
  T extends CreateUnlinkHandleFromProfileTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateUnlinkHandleFromProfileTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateUnlinkHandleFromProfileTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockUnlinkHandleFromProfileResponse<
  T extends UnlinkHandleFromProfileData,
  V extends UnlinkHandleFromProfileVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: UnlinkHandleFromProfileDocument,
      variables,
    },
    result: {
      data,
    },
  };
}
