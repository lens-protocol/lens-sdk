import { faker } from '@faker-js/faker';
import { ChainType, failure, Result, success } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import waitFor from 'wait-for-expect';

import {
  AnyTransactionRequestModel,
  DataTransaction,
  ISignedProtocolCall,
  IUnsignedProtocolCall,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProtocolTransactionRequestModel,
  TransactionError,
  TransactionKind,
  UnsignedTransaction,
  Wallet,
} from '../../../entities';
import { mockNonce } from '../../../entities/__helpers__/mocks';
import { BroadcastingError, BroadcastingErrorReason } from '../BroadcastingError';
import {
  DelegableProtocolTransactionRequestModel,
  IDelegatedTransactionGateway,
} from '../DelegableSigning';
import { IPaidTransactionGateway } from '../IPaidTransactionGateway';
import { IMomokaRelayer, ISignedMomokaGateway } from '../SignedMomoka';
import {
  IMetaTransactionNonceGateway,
  IOnChainRelayer,
  ISignedOnChainGateway,
} from '../SignedOnChain';
import { AnyTransactionRequest } from '../SupportedTransactionRequest';
import { TokenAllowanceLimit, TokenAllowanceRequest } from '../TokenAllowance';
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

export function mockIMomokaRelayer<T extends ProtocolTransactionRequestModel>({
  signedCall,
  result,
}: {
  signedCall: ISignedProtocolCall<T>;
  result: Result<DataTransaction<T>, BroadcastingError>;
}) {
  const relayer = mock<IMomokaRelayer<T>>();

  when(relayer.relaySignedMomoka).calledWith(signedCall).mockResolvedValue(result);

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

export function mockISignedOnChainGateway<T extends ProtocolTransactionRequestModel>({
  request,
  nonce,
  unsignedCall,
}: {
  request: T;
  nonce: Nonce | undefined;
  unsignedCall: IUnsignedProtocolCall<T>;
}): ISignedOnChainGateway<T> {
  const gateway = mock<ISignedOnChainGateway<T>>();

  when(gateway.createUnsignedProtocolCall)
    .calledWith(request, nonce)
    .mockResolvedValue(unsignedCall);

  return gateway;
}

export function mockISignedMomokaGateway<T extends ProtocolTransactionRequestModel>({
  request,

  unsignedCall,
}: {
  request: T;
  unsignedCall: IUnsignedProtocolCall<T>;
}): ISignedOnChainGateway<T> {
  const gateway = mock<ISignedMomokaGateway<T>>();

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

export function mockDelegableProtocolTransactionRequestModel({
  signless,
}: {
  signless: boolean;
}): DelegableProtocolTransactionRequestModel {
  return {
    kind: TransactionKind.CREATE_POST,
    signless,
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
    amount: mockDaiAmount(1, ChainType.POLYGON),
    spender: mockEvmAddress(),
    limit: TokenAllowanceLimit.EXACT,
    ...override,
    kind: TransactionKind.APPROVE_MODULE,
  };
}

export function mockAnyBroadcastingError() {
  return new BroadcastingError(BroadcastingErrorReason.UNKNOWN);
}

export function mockIPaidTransactionGateway<T extends AnyTransactionRequestModel>({
  request,
  wallet,
  unsignedTransaction,
}: {
  request: T;
  wallet: Wallet;
  unsignedTransaction: UnsignedTransaction<T>;
}): IPaidTransactionGateway<T> {
  const gateway = mock<IPaidTransactionGateway<T>>();

  when(gateway.createUnsignedTransaction)
    .calledWith(request, wallet)
    .mockResolvedValue(unsignedTransaction);

  return gateway;
}
