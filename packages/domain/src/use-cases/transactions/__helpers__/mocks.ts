import { faker } from '@faker-js/faker';
import { Result } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  IUnsignedProtocolCall,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProxyTransaction,
  SignedProtocolCall,
  TransactionKind,
  TransactionRequestModel,
} from '../../../entities';
import {
  MockedProxyTransaction,
  mockNonce,
  mockTransactionHash,
  mockUnsignedProtocolCall,
} from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import { IDelegableProtocolCallGateway, WithDelegateFlag } from '../DelegableProtocolCallUseCase';
import { Data, WithData } from '../PayTransaction';
import {
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
  IUnsignedProtocolCallGateway,
} from '../ProtocolCallUseCase';
import { ISignlessProtocolCallRelayer } from '../SignlessProtocolCallUseCase';
import { SupportedTransactionRequest } from '../SupportedTransactionRequest';
import { TransactionData, TransactionQueue } from '../TransactionQueue';

export function mockIProtocolCallRelayer<T extends TransactionRequestModel>({
  signedCall,
  result,
}: {
  signedCall: SignedProtocolCall<T>;
  result: Result<MetaTransaction<T>, BroadcastingError>;
}) {
  const transactionRelayer = mock<IProtocolCallRelayer<T>>();

  when(transactionRelayer.relayProtocolCall).calledWith(signedCall).mockResolvedValue(result);

  return transactionRelayer;
}

export function mockTransactionQueue<
  T extends TransactionRequestModel = TransactionRequestModel,
>() {
  return mock<TransactionQueue<T>>();
}

export function mockTransactionData<T extends SupportedTransactionRequest>(
  overrides?: Partial<TransactionData<T>>,
): TransactionData<T> {
  return {
    id: faker.datatype.uuid(),
    request: mock(),
    txHash: mockTransactionHash(),
    ...overrides,
  };
}

export function mockIMetaTransactionNonceGateway({
  nonce = mockNonce(),
} = {}): IMetaTransactionNonceGateway {
  const gateway = mock<IMetaTransactionNonceGateway>();
  when(gateway.getNextMetaTransactionNonceFor).mockResolvedValue(nonce);
  return gateway;
}

export function mockIUnsignedProtocolCallGateway<T extends TransactionRequestModel>({
  request,
  nonce,
  unsignedCall = mockUnsignedProtocolCall(request),
}: {
  request: T;
  nonce?: Nonce;
  unsignedCall?: IUnsignedProtocolCall<T>;
}): IUnsignedProtocolCallGateway<T> {
  const gateway = mock<IUnsignedProtocolCallGateway<T>>();

  when(gateway.createUnsignedProtocolCall)
    .calledWith(request, nonce)
    .mockResolvedValue(unsignedCall);

  return gateway;
}

export function mockIDelegableProtocolCallGateway<T extends TransactionRequestModel>({
  request,
  result,
}: {
  request: T;
  result: Result<NativeTransaction<T>, BroadcastingError>;
}): IDelegableProtocolCallGateway<T> {
  const gateway = mock<IDelegableProtocolCallGateway<T>>();

  when(gateway.createDelegatedTransaction).calledWith(request).mockResolvedValue(result);

  return gateway;
}

export function mockISignlessProtocolCallRelayer<T extends TransactionRequestModel>(instructions: {
  request: T;
  transaction?: ProxyTransaction<T>;
}): ISignlessProtocolCallRelayer<T> {
  const signlessProtocolCallRelayer = mock<ISignlessProtocolCallRelayer<T>>();

  if (instructions) {
    const { request, transaction = MockedProxyTransaction.fromRequest(request) } = instructions;
    when(signlessProtocolCallRelayer.relaySignlessProtocolCall)
      .calledWith(request)
      .mockResolvedValue(transaction);
  }

  return signlessProtocolCallRelayer;
}

export function mockTransactionRequestModelWithDelegateFlag({
  delegate,
}: {
  delegate: boolean;
}): WithDelegateFlag<TransactionRequestModel> {
  return {
    kind: TransactionKind.CREATE_POST,
    delegate,
  } as WithDelegateFlag<TransactionRequestModel>;
}

export function mockTransactionRequestModelWithData(): WithData<TransactionRequestModel> {
  return {
    kind: TransactionKind.CREATE_POST,
    data: faker.datatype.hexadecimal({ length: 32 }) as Data,
  } as WithDelegateFlag<TransactionRequestModel>;
}
