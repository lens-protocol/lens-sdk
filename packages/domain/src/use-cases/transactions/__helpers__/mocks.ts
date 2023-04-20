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
  ISignedProtocolCall,
  TransactionKind,
  TransactionRequestModel,
  ProtocolCallRequestModel,
} from '../../../entities';
import {
  MockedProxyTransaction,
  mockNonce,
  mockTransactionHash,
} from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import { IDelegatedCallGateway, WithDelegateFlag } from '../DelegableSubsidizedCall';
import { ISignlessSubsidizedCallRelayer } from '../SignlessSubsidizedCall';
import {
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
  IUnsignedProtocolCallGateway,
} from '../SubsidizedCall';
import { SupportedTransactionRequest } from '../SupportedTransactionRequest';
import { TransactionData, TransactionQueue } from '../TransactionQueue';

export function mockIProtocolCallRelayer<T extends ProtocolCallRequestModel>({
  signedCall,
  result,
}: {
  signedCall: ISignedProtocolCall<T>;
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

export function mockIUnsignedProtocolCallGateway<T extends ProtocolCallRequestModel>({
  request,
  nonce,
  unsignedCall,
}: {
  request: T;
  nonce?: Nonce;
  unsignedCall: IUnsignedProtocolCall<T>;
}): IUnsignedProtocolCallGateway<T> {
  const gateway = mock<IUnsignedProtocolCallGateway<T>>();

  when(gateway.createUnsignedProtocolCall)
    .calledWith(request, nonce)
    .mockResolvedValue(unsignedCall);

  return gateway;
}

export function mockIDelegatedCallGateway<T extends ProtocolCallRequestModel>({
  request,
  result,
}: {
  request: T;
  result: Result<NativeTransaction<T>, BroadcastingError>;
}): IDelegatedCallGateway<T> {
  const gateway = mock<IDelegatedCallGateway<T>>();

  when(gateway.createDelegatedTransaction).calledWith(request).mockResolvedValue(result);

  return gateway;
}

export function mockISignlessSubsidizedCallRelayer<
  T extends ProtocolCallRequestModel,
>(instructions: {
  request: T;
  transaction?: ProxyTransaction<T>;
}): ISignlessSubsidizedCallRelayer<T> {
  const signlessProtocolCallRelayer = mock<ISignlessSubsidizedCallRelayer<T>>();

  if (instructions) {
    const { request, transaction = MockedProxyTransaction.fromRequest(request) } = instructions;
    when(signlessProtocolCallRelayer.createProxyTransaction)
      .calledWith(request)
      .mockResolvedValue(transaction);
  }

  return signlessProtocolCallRelayer;
}

export function mockProtocolCallRequestModelWithDelegateFlag({
  delegate,
}: {
  delegate: boolean;
}): WithDelegateFlag<ProtocolCallRequestModel> {
  return {
    kind: TransactionKind.CREATE_POST,
    delegate,
  } as WithDelegateFlag<ProtocolCallRequestModel>;
}
