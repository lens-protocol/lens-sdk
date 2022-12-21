import { faker } from '@faker-js/faker';
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
  MockedMetaTransaction,
  MockedProxyTransaction,
  mockNonce,
  mockTransactionHash,
  mockUnsignedProtocolCall,
} from '../../../entities/__helpers__/mocks';
import { IDelegableProtocolCallGateway, WithDelegateFlag } from '../DelegableProtocolCallUseCase';
import {
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
  IUnsignedProtocolCallGateway,
} from '../ProtocolCallUseCase';
import { ISignlessProtocolCallRelayer } from '../SignlessProtocolCallUseCase';
import { SupportedTransactionRequest } from '../SupportedTransactionRequest';
import {
  BroadcastedTransactionData,
  PendingTransactionData,
  TransactionQueue,
} from '../TransactionQueue';

export function mockIProtocolCallRelayer<T extends TransactionRequestModel>(instructions?: {
  signedCall: SignedProtocolCall<T>;
  transaction?: MetaTransaction<T>;
}) {
  const transactionRelayer = mock<IProtocolCallRelayer<T>>();

  if (instructions) {
    const { signedCall, transaction = MockedMetaTransaction.fromSignedCall(signedCall) } =
      instructions;
    when(transactionRelayer.relayProtocolCall)
      .calledWith(signedCall)
      .mockResolvedValue(transaction);
  } else {
    when(transactionRelayer.relayProtocolCall).mockImplementation(async (signedCall) =>
      MockedMetaTransaction.fromSignedCall(signedCall),
    );
  }

  return transactionRelayer;
}

export function mockTransactionQueue<
  T extends TransactionRequestModel = TransactionRequestModel,
>() {
  return mock<TransactionQueue<T>>();
}

export function mockPendingTransactionData<T extends SupportedTransactionRequest>(
  overrides?: Partial<PendingTransactionData<T>>,
): PendingTransactionData<T> {
  return {
    id: faker.datatype.uuid(),
    request: mock(),
    ...overrides,
  };
}

export function mockBroadcastedTransactionData<T extends SupportedTransactionRequest>(
  overrides?: Partial<BroadcastedTransactionData<T>>,
): BroadcastedTransactionData<T> {
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
  delegatedTransaction,
}: {
  request: T;
  delegatedTransaction: NativeTransaction<T>;
}): IDelegableProtocolCallGateway<T> {
  const gateway = mock<IDelegableProtocolCallGateway<T>>();

  when(gateway.createDelegatedTransaction)
    .calledWith(request)
    .mockResolvedValue(delegatedTransaction);

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
