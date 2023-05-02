import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  PendingSigningRequestError,
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
  Wallet,
  MetaTransaction,
  AnyTransactionRequestModel,
  ProtocolTransactionRequestModel,
} from '../../../entities';
import {
  MockedMetaTransaction,
  mockISignedProtocolCall,
  mockIUnsignedProtocolCall,
  mockNonce,
  mockProtocolTransactionRequestModel,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import { mockActiveWallet } from '../../wallets/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import {
  SubsidizeOnChain,
  ISubsidizeOnChainPresenter,
  IMetaTransactionNonceGateway,
  IUnsignedProtocolCallGateway,
  IProtocolCallRelayer,
} from '../SubsidizeOnChain';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIMetaTransactionNonceGateway,
  mockIProtocolCallRelayer,
  mockIUnsignedProtocolCallGateway,
  mockTransactionQueue,
} from '../__helpers__/mocks';

function setupSubsidizedCall<T extends ProtocolTransactionRequestModel>({
  metaTransactionNonceGateway,
  unsignedProtocolCallGateway,
  protocolCallRelayer = mock<IProtocolCallRelayer<T>>(),
  transactionQueue = mockTransactionQueue(),
  presenter,
  wallet,
}: {
  metaTransactionNonceGateway: IMetaTransactionNonceGateway;
  unsignedProtocolCallGateway: IUnsignedProtocolCallGateway<T>;
  protocolCallRelayer?: IProtocolCallRelayer<T>;
  transactionQueue?: TransactionQueue<AnyTransactionRequestModel>;
  presenter: ISubsidizeOnChainPresenter;
  wallet: Wallet;
}) {
  const activeWallet = mockActiveWallet({ wallet });
  return new SubsidizeOnChain(
    activeWallet,
    metaTransactionNonceGateway,
    unsignedProtocolCallGateway,
    protocolCallRelayer,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${SubsidizeOnChain.name}<T> interactor`, () => {
  describe(`when calling the "${SubsidizeOnChain.prototype.execute.name}" method`, () => {
    const request = mockProtocolTransactionRequestModel();
    const unsignedCall = mockIUnsignedProtocolCall(request);

    it(`should:
        - create an IUnsignedProtocolCall<T> passing the Nonce override from the IMetaTransactionNonceGateway
        - sign it with the user's ${Wallet.name}
        - relay the resulting ISignedProtocolCall<T>
        - push the resulting ${MetaTransaction.name}<T> into the ${TransactionQueue.name}`, async () => {
      const nonce = mockNonce();

      const metaTransactionNonceGateway = mockIMetaTransactionNonceGateway({ nonce });

      const unsignedProtocolCallGateway = mockIUnsignedProtocolCallGateway({
        request,
        nonce,
        unsignedCall,
      });

      const wallet = mockWallet();
      const signedCall = mockISignedProtocolCall(unsignedCall);
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(success(signedCall));

      const transaction = MockedMetaTransaction.fromSignedCall(signedCall);
      const protocolCallRelayer = mockIProtocolCallRelayer({
        signedCall,
        result: success(transaction),
      });

      const transactionQueue = mockTransactionQueue();

      const presenter = mock<ISubsidizeOnChainPresenter>();

      const useCase = setupSubsidizedCall({
        metaTransactionNonceGateway,
        unsignedProtocolCallGateway,
        protocolCallRelayer,
        transactionQueue,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
      expect(presenter.present).toHaveBeenCalledWith(success());
    });

    it.each([
      {
        ErrorCtor: PendingSigningRequestError,
        error: new PendingSigningRequestError(),
      },
      {
        ErrorCtor: WalletConnectionError,
        error: new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT),
      },
      {
        ErrorCtor: UserRejectedError,
        error: new UserRejectedError(),
      },
    ])(`should present any $ErrorCtor.name from the owner's ${Wallet.name}`, async ({ error }) => {
      const metaTransactionNonceGateway = mock<IMetaTransactionNonceGateway>();

      const unsignedProtocolCallGateway = mock<IUnsignedProtocolCallGateway<typeof request>>();
      when(unsignedProtocolCallGateway.createUnsignedProtocolCall).mockResolvedValue(unsignedCall);

      const wallet = mockWallet();
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(failure(error));

      const presenter = mock<ISubsidizeOnChainPresenter>();

      const useCase = setupSubsidizedCall({
        metaTransactionNonceGateway,
        unsignedProtocolCallGateway,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });

    it(`should present any ${BroadcastingError.name} from the IProtocolCallRelayer call`, async () => {
      const nonce = mockNonce();

      const metaTransactionNonceGateway = mockIMetaTransactionNonceGateway({ nonce });

      const unsignedProtocolCallGateway = mockIUnsignedProtocolCallGateway({
        request,
        nonce,
        unsignedCall,
      });

      const wallet = mockWallet();
      const signedCall = mockISignedProtocolCall(unsignedCall);
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(success(signedCall));

      const error = new BroadcastingError('some reason');
      const protocolCallRelayer = mockIProtocolCallRelayer({ signedCall, result: failure(error) });

      const presenter = mock<ISubsidizeOnChainPresenter>();

      const useCase = setupSubsidizedCall({
        metaTransactionNonceGateway,
        unsignedProtocolCallGateway,
        protocolCallRelayer,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
