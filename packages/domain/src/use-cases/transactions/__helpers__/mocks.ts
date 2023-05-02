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
  AnyTransactionRequestModel,
  ProtocolTransactionRequestModel,
  DataTransaction,
} from '../../../entities';
import {
  MockedProxyTransaction,
  mockNonce,
  mockTransactionHash,
} from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import { IDelegatedTransactionGateway, WithDelegateFlag } from '../DelegableSigning';
import { ISignlessSubsidizedCallRelayer } from '../SignlessSubsidizeOnChain';
import {
  IDataAvailabilityRelayer,
  IOffChainProtocolCallGateway,
  WithOffChainFlag,
} from '../SubsidizeOffChain';
import {
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
  IUnsignedProtocolCallGateway,
} from '../SubsidizeOnChain';
import { AnyTransactionRequest } from '../SupportedTransactionRequest';
import { TransactionData, TransactionQueue } from '../TransactionQueue';

export function mockIProtocolCallRelayer<T extends ProtocolTransactionRequestModel>({
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

export function mockIDataAvailabilityRelayer<
  T extends WithOffChainFlag<ProtocolTransactionRequestModel>,
>({
  signedCall,
  result,
}: {
  signedCall: ISignedProtocolCall<T>;
  result: Result<DataTransaction<T>, BroadcastingError>;
}) {
  const transactionRelayer = mock<IDataAvailabilityRelayer<T>>();

  when(transactionRelayer.relayProtocolCall).calledWith(signedCall).mockResolvedValue(result);

  return transactionRelayer;
}

export function mockTransactionQueue<
  T extends AnyTransactionRequestModel = AnyTransactionRequestModel,
>() {
  return mock<TransactionQueue<T>>();
}

export function mockTransactionData<T extends AnyTransactionRequest>(
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

export function mockIUnsignedProtocolCallGateway<T extends ProtocolTransactionRequestModel>({
  request,
  nonce,
  unsignedCall,
}: {
  request: T;
  nonce: Nonce | undefined;
  unsignedCall: IUnsignedProtocolCall<T>;
}): IUnsignedProtocolCallGateway<T> {
  const gateway = mock<IUnsignedProtocolCallGateway<T>>();

  when(gateway.createUnsignedProtocolCall)
    .calledWith(request, nonce)
    .mockResolvedValue(unsignedCall);

  return gateway;
}

export function mockIOffChainProtocolCallGateway<
  T extends WithOffChainFlag<ProtocolTransactionRequestModel>,
>({
  request,

  unsignedCall,
}: {
  request: T;
  unsignedCall: IUnsignedProtocolCall<T>;
}): IUnsignedProtocolCallGateway<T> {
  const gateway = mock<IOffChainProtocolCallGateway<T>>();

  when(gateway.createUnsignedProtocolCall).calledWith(request).mockResolvedValue(unsignedCall);

  return gateway;
}

export function mockIDelegatedTransactionGateway<T extends ProtocolTransactionRequestModel>({
  request,
  result,
}: {
  request: T;
  result: Result<NativeTransaction<T>, BroadcastingError>;
}): IDelegatedTransactionGateway<T> {
  const gateway = mock<IDelegatedTransactionGateway<T>>();

  when(gateway.createDelegatedTransaction).calledWith(request).mockResolvedValue(result);

  return gateway;
}

export function mockISignlessSubsidizedCallRelayer<
  T extends ProtocolTransactionRequestModel,
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

export function mockProtocolTransactionRequestModelWithDelegateFlag({
  delegate,
}: {
  delegate: boolean;
}): WithDelegateFlag<ProtocolTransactionRequestModel> {
  return {
    kind: TransactionKind.CREATE_POST,
    delegate,
  } as WithDelegateFlag<ProtocolTransactionRequestModel>;
}

export function mockProtocolTransactionRequestModelWithOffChainFlag(): WithOffChainFlag<ProtocolTransactionRequestModel> {
  return {
    kind: TransactionKind.CREATE_POST,
    offChain: true,
  } as WithOffChainFlag<ProtocolTransactionRequestModel>;
}
