import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  CreateFollowTypedDataData,
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataVariables,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataVariables,
  FollowData,
  FollowDocument,
  FollowVariables,
  UnfollowData,
  UnfollowDocument,
  UnfollowVariables,
  CreateOnchainSetProfileMetadataTypedDataData,
  CreateOnchainSetProfileMetadataTypedDataDocument,
  OnchainSetProfileMetadataRequest,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables,
  CreateSetFollowModuleTypedDataDocument,
  SetFollowModuleData,
  SetFollowModuleVariables,
  SetFollowModuleDocument,
  CreateHandleLinkToProfileTypedDataData,
  CreateHandleLinkToProfileTypedDataVariables,
  CreateHandleLinkToProfileTypedDataDocument,
  HandleLinkToProfileData,
  HandleLinkToProfileVariables,
  HandleLinkToProfileDocument,
  HandleUnlinkFromProfileData,
  HandleUnlinkFromProfileVariables,
  HandleUnlinkFromProfileDocument,
  CreateHandleUnlinkFromProfileTypedDataData,
  CreateHandleUnlinkFromProfileTypedDataVariables,
  CreateHandleUnlinkFromProfileTypedDataDocument,
} from '../../graphql/generated';
import {
  mockCreateTypedDataResult,
  mockEIP712TypedDataDomain,
  mockEIP712TypedDataField,
} from './utils';

export function mockCreateSetProfileMetadataTypedDataData({
  metadataURI = faker.internet.url(),
  nonce = mockNonce(),
}: {
  metadataURI?: string;
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

export function mockCreateHandleLinkToProfileTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateHandleLinkToProfileTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateHandleLinkToProfileBroadcastItemResult', {
      types: {
        Link: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        handleId: faker.internet.userName(),
      },
    }),
  };
}

export function mockCreateHandleLinkToProfileTypedDataResponse<
  T extends CreateHandleLinkToProfileTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateHandleLinkToProfileTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateHandleLinkToProfileTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockHandleLinkToProfileResponse<
  T extends HandleLinkToProfileData,
  V extends HandleLinkToProfileVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: HandleLinkToProfileDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateHandleUnlinkFromProfileTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateHandleUnlinkFromProfileTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateHandleUnlinkFromProfileBroadcastItemResult', {
      types: {
        Unlink: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        handleId: faker.internet.userName(),
      },
    }),
  };
}

export function mockCreateHandleUnlinkFromProfileTypedDataResponse<
  T extends CreateHandleUnlinkFromProfileTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateHandleUnlinkFromProfileTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateHandleUnlinkFromProfileTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockHandleUnlinkFromProfileResponse<
  T extends HandleUnlinkFromProfileData,
  V extends HandleUnlinkFromProfileVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: HandleUnlinkFromProfileDocument,
      variables,
    },
    result: {
      data,
    },
  };
}
