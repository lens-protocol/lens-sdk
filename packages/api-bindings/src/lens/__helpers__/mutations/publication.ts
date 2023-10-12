import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';

import {
  HidePublicationVariables,
  HidePublicationData,
  HidePublicationDocument,
  AddReactionDocument,
  AddReactionVariables,
  ReportPublicationVariables,
  ReportPublicationData,
  ReportPublicationDocument,
  CreateOnchainPostTypedDataData,
  CreateOnchainPostTypedDataVariables,
  CreateOnchainPostTypedDataDocument,
  CreateMomokaPostTypedDataData,
  CreateMomokaPostTypedDataVariables,
  CreateMomokaPostTypedDataDocument,
  PostOnchainData,
  PostOnchainVariables,
  PostOnchainDocument,
  CreateMomokaPublicationResult,
  PostOnMomokaDocument,
  PostOnMomokaData,
  PostOnMomokaVariables,
} from '../../graphql/generated';
import {
  mockCreateTypedDataResult,
  mockEIP712TypedDataDomain,
  mockEIP712TypedDataField,
} from './utils';

export function mockHidePublicationResponse(args: {
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

export function mockReportPublicationResponse(args: {
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

export function mockAddReactionResponse({ variables }: { variables: AddReactionVariables }) {
  return {
    request: {
      query: AddReactionDocument,
      variables,
    },
    result: {
      data: { addReaction: null },
    },
  };
}

export function mockCreateOnchainPostTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateOnchainPostTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateOnchainPostBroadcastItemResult', {
      types: {
        Post: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json',
        actionModules: ['0xd6072BB2ABc0a9d1331c7d0B83AE6C47f2Cb86A3'],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateOnchainPostTypedDataResponse<T extends CreateOnchainPostTypedDataData>({
  variables,
  data,
}: {
  variables: CreateOnchainPostTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateOnchainPostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockPostOnchainResponse<T extends PostOnchainData, V extends PostOnchainVariables>({
  variables,
  data,
}: {
  variables: V;
  data: T;
}): MockedResponse<T, V> {
  return {
    request: {
      query: PostOnchainDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaPostTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateMomokaPostTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateMomokaPostBroadcastItemResult', {
      types: {
        Post: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json',
        actionModules: ['0xd6072BB2ABc0a9d1331c7d0B83AE6C47f2Cb86A3'],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateMomokaPostTypedDataResponse<T extends CreateMomokaPostTypedDataData>({
  variables,
  data,
}: {
  variables: CreateMomokaPostTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMomokaPostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockPostOnMomokaResponse<
  T extends PostOnMomokaData,
  V extends PostOnMomokaVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: PostOnMomokaDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaPublicationResult(): CreateMomokaPublicationResult {
  return {
    __typename: 'CreateMomokaPublicationResult',
    id: mockPublicationId(),
    momokaId: faker.datatype.uuid(),
    proof: '...',
  };
}
