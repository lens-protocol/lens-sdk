import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  CreateOnchainSetProfileMetadataTypedDataData,
  CreateOnchainSetProfileMetadataTypedDataDocument,
  Eip712TypedDataDomain,
  OnchainSetProfileMetadataRequest,
} from '../../graphql/generated';

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
    name: 'Lens',
    version: '1',
    chainId: 0,
    verifyingContract: mockEvmAddress(),
  };
}

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
