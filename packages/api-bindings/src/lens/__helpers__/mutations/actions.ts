import { MockedResponse } from '@apollo/client/testing';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  CreateActOnOpenActionTypedDataData,
  CreateActOnOpenActionTypedDataVariables,
  CreateActOnOpenActionTypedDataDocument,
  ActOnOpenActionData,
  ActOnOpenActionVariables,
  ActOnOpenActionDocument,
} from '../../graphql/generated';
import {
  mockCreateTypedDataResult,
  mockEIP712TypedDataDomain,
  mockEIP712TypedDataField,
} from './utils';

export function mockCreateActOnOpenActionTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateActOnOpenActionTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateActOnOpenActionBroadcastItemResult', {
      types: {
        Act: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        publicationActedProfileId: mockProfileId(),
        publicationActedId: '0x01',
        actorProfileId: mockProfileId(),
        referrerProfileIds: [],
        referrerPubIds: [],
        actionModuleAddress: mockEvmAddress(),
        actionModuleData: '0x',
      },
    }),
  };
}

export function mockCreateActOnOpenActionTypedDataResponse<
  T extends CreateActOnOpenActionTypedDataData,
  V extends CreateActOnOpenActionTypedDataVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: CreateActOnOpenActionTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockActOnOpenActionResponse<
  T extends ActOnOpenActionData,
  V extends ActOnOpenActionVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: ActOnOpenActionDocument,
      variables,
    },
    result: {
      data,
    },
  };
}
