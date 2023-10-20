import { faker } from '@faker-js/faker';
import { failure, Result, success } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import waitFor from 'wait-for-expect';

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
  TransactionError,
  Wallet,
} from '../../../entities';
import { MockedProxyTransaction, mockNonce } from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import {
  DelegableProtocolTransactionRequestModel,
  IDelegatedTransactionGateway,
} from '../DelegableSigning';
import { ISignlessSubsidizedCallRelayer } from '../SignlessSubsidizeOnChain';
import { IOffChainRelayer, IOffChainProtocolCallGateway } from '../SubsidizeOffChain';
import {
  IMetaTransactionNonceGateway,
  IOnChainRelayer,
  IOnChainProtocolCallGateway,
} from '../SubsidizeOnChain';
import { AnyTransactionRequest } from '../SupportedTransactionRequest';
import {
  IApproveTransactionGateway,
  TokenAllowanceLimit,
  TokenAllowanceRequest,
  UnsignedTokenAllowanceTransaction,
} from '../TokenAllowance';
import { TransactionData, TransactionQueue } from '../TransactionQueue';

export function mockIOnChainRelayer<T extends ProtocolTransactionRequestModel>({
  signedCall,
  result,
}: {
  signedCall: ISignedProtocolCall<T>;
  result: Result<MetaTransaction<T>, BroadcastingError>;
}) {
  const relayer = mock<IOnChainRelayer<T>>();

  when(relayer.relayProtocolCall).calledWith(signedCall).mockResolvedValue(result);

  return relayer;
}

export function mockIOffChainRelayer<T extends ProtocolTransactionRequestModel>({
  signedCall,
  result,
}: {
  signedCall: ISignedProtocolCall<T>;
  result: Result<DataTransaction<T>, BroadcastingError>;
}) {
  const relayer = mock<IOffChainRelayer<T>>();

  when(relayer.relayProtocolCall).calledWith(signedCall).mockResolvedValue(result);

  return relayer;
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

export function mockIOnChainProtocolCallGateway<T extends ProtocolTransactionRequestModel>({
  request,
  nonce,
  unsignedCall,
}: {
  request: T;
  nonce: Nonce | undefined;
  unsignedCall: IUnsignedProtocolCall<T>;
}): IOnChainProtocolCallGateway<T> {
  const gateway = mock<IOnChainProtocolCallGateway<T>>();

  when(gateway.createUnsignedProtocolCall)
    .calledWith(request, nonce)
    .mockResolvedValue(unsignedCall);

  return gateway;
}

export function mockIOffChainProtocolCallGateway<T extends ProtocolTransactionRequestModel>({
  request,

  unsignedCall,
}: {
  request: T;
  unsignedCall: IUnsignedProtocolCall<T>;
}): IOnChainProtocolCallGateway<T> {
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
  const relayer = mock<ISignlessSubsidizedCallRelayer<T>>();

  if (instructions) {
    const { request, transaction = MockedProxyTransaction.fromRequest(request) } = instructions;
    when(relayer.createProxyTransaction)
      .calledWith(request)
      .mockResolvedValue(success(transaction));
  }

  return relayer;
}

export function mockDelegableProtocolTransactionRequestModel({
  delegate,
}: {
  delegate: boolean;
}): DelegableProtocolTransactionRequestModel {
  return {
    kind: TransactionKind.CREATE_POST,
    delegate,
  };
}

export function mockProtocolTransactionRequestModelWithOffChainFlag(): ProtocolTransactionRequestModel {
  return {
    kind: TransactionKind.CREATE_POST,
    offChain: true,
  } as ProtocolTransactionRequestModel;
}

export function mockITransactionCompletionPresenter() {
  return {
    present: jest.fn().mockResolvedValue(undefined),

    async waitForSuccess() {
      await waitFor(() => {
        expect(this.present).toBeCalledWith(success(expect.anything()));
      });
    },

    async waitForFailure() {
      await waitFor(() => {
        expect(this.present).toBeCalledWith(failure(expect.any(TransactionError)));
      });
    },
  };
}

export function mockTokenAllowanceRequest(
  override: Partial<TokenAllowanceRequest> = {},
): TokenAllowanceRequest {
  return {
    amount: mockDaiAmount(1),
    spender: mockEvmAddress(),
    limit: TokenAllowanceLimit.EXACT,
    ...override,
    kind: TransactionKind.APPROVE_MODULE,
  };
}

export function mockIApproveTransactionGateway({
  request,
  wallet,
  unsignedTransaction,
}: {
  request: TokenAllowanceRequest;
  wallet: Wallet;
  unsignedTransaction: UnsignedTokenAllowanceTransaction;
}): IApproveTransactionGateway {
  const gateway = mock<IApproveTransactionGateway>();

  when(gateway.createApproveTransaction)
    .calledWith(request, wallet)
    .mockResolvedValue(unsignedTransaction);

  return gateway;
}
