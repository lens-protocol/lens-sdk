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
  mockActiveWallet,
  mockIMetaTransactionNonceGateway,
  mockIOnChainRelayer,
  mockISignedOnChainGateway,
  mockTransactionQueue,
  mockAnyBroadcastingError,
} from '../../../mocks';
import { BroadcastingError } from '../BroadcastingError';
import {
  SignedOnChain,
  ISignedOnChainPresenter,
  IMetaTransactionNonceGateway,
  ISignedOnChainGateway,
  IOnChainRelayer,
} from '../SignedOnChain';
import { TransactionQueue } from '../TransactionQueue';

function setupSubsidizedCall<T extends ProtocolTransactionRequestModel>({
  metaTransactionNonceGateway,
  onChainProtocolCallGateway,
  relayer = mock<IOnChainRelayer<T>>(),
  transactionQueue = mockTransactionQueue(),
  presenter,
  wallet,
}: {
  metaTransactionNonceGateway: IMetaTransactionNonceGateway;
  onChainProtocolCallGateway: ISignedOnChainGateway<T>;
  relayer?: IOnChainRelayer<T>;
  transactionQueue?: TransactionQueue<AnyTransactionRequestModel>;
  presenter: ISignedOnChainPresenter<T>;
  wallet: Wallet;
}) {
  const activeWallet = mockActiveWallet({ wallet });
  return new SignedOnChain(
    activeWallet,
    metaTransactionNonceGateway,
    onChainProtocolCallGateway,
    relayer,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${SignedOnChain.name}<T> interactor`, () => {
  describe(`when calling the "${SignedOnChain.prototype.execute.name}" method`, () => {
    const request = mockProtocolTransactionRequestModel();
    const unsignedCall = mockIUnsignedProtocolCall(request);

    it(`should:
        - create an IUnsignedProtocolCall<T> passing the Nonce override from the IMetaTransactionNonceGateway
        - sign it with the user's ${Wallet.name}
        - relay the resulting ISignedProtocolCall<T>
        - push the resulting ${MetaTransaction.name}<T> into the ${TransactionQueue.name}`, async () => {
      const nonce = mockNonce();

      const metaTransactionNonceGateway = mockIMetaTransactionNonceGateway({ nonce });

      const onChainProtocolCallGateway = mockISignedOnChainGateway({
        request,
        nonce,
        unsignedCall,
      });

      const wallet = mockWallet();
      const signedCall = mockISignedProtocolCall(unsignedCall);
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(success(signedCall));

      const transaction = MockedMetaTransaction.fromSignedCall(signedCall);
      const relayer = mockIOnChainRelayer({
        signedCall,
        result: success(transaction),
      });

      const transactionQueue = mockTransactionQueue();

      const presenter = mock<ISignedOnChainPresenter<typeof request>>();

      const useCase = setupSubsidizedCall({
        metaTransactionNonceGateway,
        onChainProtocolCallGateway,
        relayer,
        transactionQueue,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(transactionQueue.push).toHaveBeenCalledWith(transaction, presenter);
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

      const onChainProtocolCallGateway = mock<ISignedOnChainGateway<typeof request>>();
      when(onChainProtocolCallGateway.createUnsignedProtocolCall).mockResolvedValue(unsignedCall);

      const wallet = mockWallet();
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(failure(error));

      const presenter = mock<ISignedOnChainPresenter<typeof request>>();

      const useCase = setupSubsidizedCall({
        metaTransactionNonceGateway,
        onChainProtocolCallGateway,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });

    it(`should present any ${BroadcastingError.name} from the IOnChainRelayer call`, async () => {
      const nonce = mockNonce();

      const metaTransactionNonceGateway = mockIMetaTransactionNonceGateway({ nonce });

      const onChainProtocolCallGateway = mockISignedOnChainGateway({
        request,
        nonce,
        unsignedCall,
      });

      const wallet = mockWallet();
      const signedCall = mockISignedProtocolCall(unsignedCall);
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(success(signedCall));

      const error = mockAnyBroadcastingError();

      const relayer = mockIOnChainRelayer({
        signedCall,
        result: failure(error),
      });

      const presenter = mock<ISignedOnChainPresenter<typeof request>>();

      const useCase = setupSubsidizedCall({
        metaTransactionNonceGateway,
        onChainProtocolCallGateway,
        relayer,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
