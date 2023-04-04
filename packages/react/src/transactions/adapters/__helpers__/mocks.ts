import { faker } from '@faker-js/faker';
import { ProxyActionStatus, TransactionRequestModel } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockTransactionHash,
  mockTransactionRequestModel,
} from '@lens-protocol/domain/mocks';
import { ChainType, Url } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress, mockUint256HexString } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

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
      chainId: mockUint256HexString(),
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
