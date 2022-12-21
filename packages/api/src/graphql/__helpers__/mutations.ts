import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel';

import {
  BroadcastProtocolCallDocument,
  BroadcastProtocolCallMutation,
  BroadcastProtocolCallMutationVariables,
  CreatePostTypedDataMutation,
  CreateProfileMutation,
  Eip712TypedDataDomain,
  Eip712TypedDataField,
  RelayResult,
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

export function mockBroadcastProtocolCallMutationMockedResponse(
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
