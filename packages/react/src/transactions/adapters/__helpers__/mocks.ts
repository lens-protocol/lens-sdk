import { faker } from '@faker-js/faker';
import { TypedData } from '@lens-protocol/blockchain-bindings';
import {
  AnyTransactionRequestModel,
  ProtocolTransactionRequestModel,
} from '@lens-protocol/domain/entities';
import {
  mockAnyTransactionRequestModel,
  mockNonce,
  mockProtocolTransactionRequestModel,
  mockTransactionHash,
} from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';

import { ITransactionObserver, TransactionFactory } from '../../infrastructure/TransactionFactory';
import { MetaTransactionData, NativeTransactionData } from '../ITransactionFactory';
import {
  Data,
  SelfFundedProtocolTransactionRequest,
} from '../SelfFundedProtocolTransactionRequest';

export function mockITransactionFactory(
  transactionObserver: ITransactionObserver = mock<ITransactionObserver>(),
) {
  // we create a TransactionFactory instance so to minimize the amount of mocking required,
  // although consumers can still rely solely on the ITransactionFactory interface
  return new TransactionFactory(transactionObserver);
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
      verifyingContract: mockEvmAddress(),
    },
    message: {
      nonce: 0,
    },
  };
}

export function mockMetaTransactionData<T extends ProtocolTransactionRequestModel>({
  request = mockProtocolTransactionRequestModel() as T,
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

export function mockNativeTransactionData<T extends AnyTransactionRequestModel>({
  request = mockAnyTransactionRequestModel() as T,
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
  T extends AnyTransactionRequestModel,
>(): Required<NativeTransactionData<T>> {
  return {
    chainType: ChainType.ETHEREUM,
    id: faker.datatype.uuid(),
    indexingId: faker.datatype.uuid(),
    request: mockAnyTransactionRequestModel() as T,
    txHash: mockTransactionHash(),
  };
}

export function mockSelfFundedProtocolTransactionRequest<
  TRequest extends ProtocolTransactionRequestModel,
>(): SelfFundedProtocolTransactionRequest<TRequest> {
  return {
    contractAddress: mockEvmAddress(),
    encodedData: faker.datatype.hexadecimal({ length: 32 }) as Data,
    ...mockAnyTransactionRequestModel(),
  } as SelfFundedProtocolTransactionRequest<TRequest>;
}
