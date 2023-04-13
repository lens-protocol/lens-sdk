import { faker } from '@faker-js/faker';
import { omitTypename } from '@lens-protocol/api-bindings';
import { ProxyActionStatus, TransactionRequestModel } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockTransactionHash,
  mockTransactionRequestModel,
} from '@lens-protocol/domain/mocks';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertFailure, ChainType, Result, Url } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionObserver, TransactionFactory } from '../../infrastructure/TransactionFactory';
import { IMetadataUploader } from '../IMetadataUploader';
import {
  MetaTransactionData,
  NativeTransactionData,
  ProxyTransactionData,
} from '../ITransactionFactory';
import { RelayReceipt } from '../RelayReceipt';
import { TypedData } from '../TypedData';

export function mockITransactionFactory(
  transactionObserver: ITransactionObserver = mock<ITransactionObserver>(),
) {
  // we create a TransactionFactory instance so to minimize the amount of mocking required,
  // although consumers can still rely solely on the ITransactionFactory interface
  return new TransactionFactory(transactionObserver);
}

export function mockRelayReceipt(): RelayReceipt {
  return {
    indexingId: faker.datatype.uuid(),
    txHash: mockTransactionHash(),
  };
}

export function mockTypedData(): TypedData {
  return {
    types: {
      CreateProfileWithSig: [{ name: 'foo', type: 'string' }],
    },
    domain: {
      name: 'none',
      version: '1',
      chainId: 1,
      verifyingContract: mockEthereumAddress(),
    },
    value: {
      nonce: 0,
    },
  };
}

export function mockMetaTransactionData<T extends TransactionRequestModel>({
  request = mockTransactionRequestModel() as T,
  ...others
}: Partial<MetaTransactionData<T>> = {}): MetaTransactionData<T> {
  return {
    chainType: ChainType.ETHEREUM,
    id: faker.datatype.uuid(),
    indexingId: faker.datatype.uuid(),
    nonce: mockNonce(),
    request,
    txHash: mockTransactionHash(),
    ...others,
  };
}

export function mockNativeTransactionData<T extends TransactionRequestModel>({
  request = mockTransactionRequestModel() as T,
  ...others
}: Partial<NativeTransactionData<T>> = {}): NativeTransactionData<T> {
  return {
    chainType: ChainType.ETHEREUM,
    id: faker.datatype.uuid(),
    request,
    txHash: mockTransactionHash(),
    ...others,
  };
}

export function mockNativeTransactionDataWithIndexingId<
  T extends TransactionRequestModel,
>(): Required<NativeTransactionData<T>> {
  return {
    chainType: ChainType.ETHEREUM,
    id: faker.datatype.uuid(),
    indexingId: faker.datatype.uuid(),
    request: mockTransactionRequestModel() as T,
    txHash: mockTransactionHash(),
  };
}

export function mockProxyTransactionData<T extends TransactionRequestModel>({
  request = mockTransactionRequestModel() as T,
  ...others
}: Partial<ProxyTransactionData<T>> = {}): ProxyTransactionData<T> {
  return {
    status: ProxyActionStatus.MINTING,
    chainType: ChainType.ETHEREUM,
    proxyId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    request,
    txHash: mockTransactionHash(),
    ...others,
  };
}

export function mockIMetadataUploader(urlOrError: Url | Error): IMetadataUploader<unknown> {
  const uploader = mock<IMetadataUploader<unknown>>();

  if (urlOrError instanceof Error) {
    when(uploader.upload).mockRejectedValue(urlOrError);
  } else {
    when(uploader.upload).mockResolvedValue(urlOrError);
  }

  return uploader;
}

export function assertUnsignedProtocolCallCorrectness<T extends TransactionRequestModel>(
  unsignedProtocolCall: UnsignedProtocolCall<T>,
  broadcastResult: {
    id: string;
    typedData: TypedData;
  },
) {
  expect(unsignedProtocolCall.id).toEqual(broadcastResult.id);
  expect(unsignedProtocolCall.typedData).toEqual(omitTypename(broadcastResult.typedData));
}

export function assertBroadcastingErrorResultWithRequestFallback(
  result: Result<unknown, BroadcastingError>,
  expectedBroadcastingErrorReason: BroadcastingErrorReason,
  typedData: TypedData,
) {
  assertFailure(result);
  expect(result.error.reason).toEqual(expectedBroadcastingErrorReason);
  expect(result.error.fallback).toMatchObject({
    contractAddress: typedData.domain.verifyingContract,
    encodedData: expect.any(String),
  });
}
