import { mock } from 'jest-mock-extended';
import { success } from '@lens-protocol/shared-kernel';
import { when } from 'jest-when';

import {
  MockedMetaTransaction,
  MockedNativeTransaction,
  mockNonce,
  mockSignedProtocolCall,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import {
  Wallet,
  MetaTransaction,
  NativeTransaction,
  SignedProtocolCall,
  TransactionRequestModel,
} from '../../../entities';
import {
  mockIMetaTransactionNonceGateway,
  mockIProtocolCallRelayer,
  mockIProtocolCallTransactionGateway,
  mockTransactionQueue,
  mockTransactionRequestModelWithDelegateFlag,
} from '../__helpers__/mocks';
import { TransactionQueue } from '../TransactionQueue';
import { mockActiveWallet } from '../../wallets/__helpers__/mocks';
import {
  IProtocolCallPresenter,
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
} from '../ProtocolCallUseCase';
import {
  DelegableProtocolCallUseCase,
  IProtocolCallGateway,
  WithDelegateFlag,
} from '../DelegableProtocolCallUseCase';

function setupDelegableProtocolCallUseCase<T extends TransactionRequestModel>({
  metaTransactionNonceGateway = mockIMetaTransactionNonceGateway(),
  protocolCallGateway,
  protocolCallRelayer = mock<IProtocolCallRelayer<T>>(),
  transactionQueue = mockTransactionQueue<T>(),
  presenter,
  wallet = mockWallet(),
}: {
  metaTransactionNonceGateway?: IMetaTransactionNonceGateway;
  protocolCallGateway: IProtocolCallGateway<T>;
  protocolCallRelayer?: IProtocolCallRelayer<T>;
  transactionQueue?: TransactionQueue<T>;
  presenter: IProtocolCallPresenter;
  wallet?: Wallet;
}) {
  const activeWallet = mockActiveWallet({ wallet });
  return new DelegableProtocolCallUseCase(
    activeWallet,
    metaTransactionNonceGateway,
    protocolCallGateway,
    protocolCallRelayer,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${DelegableProtocolCallUseCase.name}<T> interactor`, () => {
  describe(`when calling the "${DelegableProtocolCallUseCase.prototype.execute.name}" method`, () => {
    describe('with a SupportedRequestModel that has the "delegate" flag unset', () => {
      const request = mockTransactionRequestModelWithDelegateFlag({ delegate: false });

      it(`should:
          - create an IUnsignedProtocolCall<T> passing the Nonce override from the IPendingTransactionGateway
          - sign it with the user's ${Wallet.name}
          - relay the resulting ${SignedProtocolCall.name}<T>
          - push the resulting ${MetaTransaction.name}<T> into the ${TransactionQueue.name}`, async () => {
        const nonce = mockNonce();

        const metaTransactionNonceGateway = mockIMetaTransactionNonceGateway({ nonce });

        const protocolCallGateway = mockIProtocolCallTransactionGateway({
          request,
          nonce,
        });

        const wallet = mockWallet();
        const signedCall = mockSignedProtocolCall(request);
        when(wallet.signProtocolCall).mockResolvedValue(success(signedCall));

        const transaction = MockedMetaTransaction.fromSignedCall(signedCall);
        const protocolCallRelayer = mockIProtocolCallRelayer({ signedCall, transaction });

        const transactionQueue = mockTransactionQueue<WithDelegateFlag<TransactionRequestModel>>();

        const presenter = mock<IProtocolCallPresenter>();

        const useCase = setupDelegableProtocolCallUseCase({
          metaTransactionNonceGateway,
          protocolCallGateway: protocolCallGateway,
          protocolCallRelayer,
          transactionQueue,
          presenter,
          wallet,
        });

        await useCase.execute(request);

        expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
        expect(presenter.present).toHaveBeenCalledWith(success());
        expect(protocolCallGateway.createDelegatedTransaction).not.toHaveBeenCalled();
      });
    });

    describe('with a SupportedRequestModel that has the "delegate" flag set', () => {
      const request = mockTransactionRequestModelWithDelegateFlag({ delegate: true });

      it(`should:
          - create a ${NativeTransaction.name}<T>
          - queue it into the ${TransactionQueue.name}
          - present successful result`, async () => {
        const transaction = MockedNativeTransaction.fromRequest(request);
        const protocolCallGateway = mockIProtocolCallTransactionGateway({
          request,
          delegatedTransaction: transaction,
        });

        const transactionQueue = mockTransactionQueue<TransactionRequestModel>();

        const presenter = mock<IProtocolCallPresenter>();

        const useCase = setupDelegableProtocolCallUseCase({
          protocolCallGateway: protocolCallGateway,
          transactionQueue,
          presenter,
        });

        await useCase.execute(request);

        expect(protocolCallGateway.createDelegatedTransaction).toHaveBeenCalledWith(request);
        expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
        expect(presenter.present).toHaveBeenCalledWith(success());
      });
    });
  });
});
