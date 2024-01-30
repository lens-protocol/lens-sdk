import { faker } from '@faker-js/faker';
import { omitTypename } from '@lens-protocol/api-bindings';
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
import { MockProvider } from 'ethereum-waffle';
import { mock } from 'jest-mock-extended';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionObserver, TransactionFactory } from '../../infrastructure/TransactionFactory';
import { MetaTransactionData, NativeTransactionData } from '../ITransactionFactory';

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
    relayerTxId: faker.datatype.uuid(),
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

export function mockNativeTransactionDataWithRelayerTxId<
  T extends AnyTransactionRequestModel,
>(): Required<NativeTransactionData<T>> {
  return {
    chainType: ChainType.ETHEREUM,
    id: faker.datatype.uuid(),
    relayerTxId: faker.datatype.uuid(),
    request: mockAnyTransactionRequestModel() as T,
    txHash: mockTransactionHash(),
  };
}

export function assertUnsignedProtocolCallCorrectness<T extends ProtocolTransactionRequestModel>(
  unsignedProtocolCall: UnsignedProtocolCall<T>,
  broadcastResult: {
    id: string;
    typedData: TypedData;
  },
) {
  expect(unsignedProtocolCall.id).toEqual(broadcastResult.id);
  expect(unsignedProtocolCall.typedData).toEqual(omitTypename(broadcastResult.typedData));
}

async function mineNBlocks(provider: MockProvider, blocks: number) {
  return provider.send('evm_mine', [{ blocks }]);
}

export async function mockJsonRpcProvider() {
  const provider = new MockProvider({
    ganacheOptions: {
      chain: {
        hardfork: 'london',
      },
    },
  });
  await mineNBlocks(provider, 20);
  return provider;
}
