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
  SignedProtocolCall,
  TransactionRequestModel,
} from '../../../entities';
import {
  MockedMetaTransaction,
  mockNonce,
  mockSignedProtocolCall,
  mockTransactionRequestModel,
  mockUnsignedProtocolCall,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import { mockActiveWallet } from '../../wallets/__helpers__/mocks';
import {
  ProtocolCallUseCase,
  IProtocolCallPresenter,
  IMetaTransactionNonceGateway,
  IUnsignedProtocolCallGateway,
  IProtocolCallRelayer,
} from '../ProtocolCallUseCase';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIMetaTransactionNonceGateway,
  mockIProtocolCallRelayer,
  mockIUnsignedProtocolCallGateway,
  mockTransactionQueue,
} from '../__helpers__/mocks';

function setupMetaTransactionUseCase<T extends TransactionRequestModel>({
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
  transactionQueue?: TransactionQueue<T>;
  presenter: IProtocolCallPresenter;
  wallet: Wallet;
}) {
  const activeWallet = mockActiveWallet({ wallet });
  return new ProtocolCallUseCase(
    activeWallet,
    metaTransactionNonceGateway,
    unsignedProtocolCallGateway,
    protocolCallRelayer,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${ProtocolCallUseCase.name}<T> interactor`, () => {
  describe(`when calling the "${ProtocolCallUseCase.prototype.execute.name}" method`, () => {
    const request = mockTransactionRequestModel();
    const unsignedCall = mockUnsignedProtocolCall(request);

    it(`should:
        - create an IUnsignedProtocolCall<T> passing the Nonce override from the IPendingTransactionGateway
        - sign it with the user's ${Wallet.name}
        - relay the resulting ${SignedProtocolCall.name}<T>
        - push the resulting ${MetaTransaction.name}<T> into the `, async () => {
      const nonce = mockNonce();

      const metaTransactionNonceGateway = mockIMetaTransactionNonceGateway({ nonce });

      const unsignedProtocolCallGateway = mockIUnsignedProtocolCallGateway({
        request,
        nonce,
        unsignedCall,
      });

      const wallet = mockWallet();
      const signedCall = mockSignedProtocolCall(unsignedCall);
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(success(signedCall));

      const transaction = MockedMetaTransaction.fromSignedCall(signedCall);
      const protocolCallRelayer = mockIProtocolCallRelayer({ signedCall, transaction });

      const transactionQueue = mockTransactionQueue();

      const presenter = mock<IProtocolCallPresenter>();

      const useCase = setupMetaTransactionUseCase({
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
    ])(`should present any $ErrorCtor.name from the user's ${Wallet.name}`, async ({ error }) => {
      const metaTransactionNonceGateway = mock<IMetaTransactionNonceGateway>();

      const unsignedProtocolCallGateway = mock<IUnsignedProtocolCallGateway<typeof request>>();
      when(unsignedProtocolCallGateway.createUnsignedProtocolCall).mockResolvedValue(unsignedCall);

      const wallet = mockWallet();
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(failure(error));

      const presenter = mock<IProtocolCallPresenter>();

      const useCase = setupMetaTransactionUseCase({
        metaTransactionNonceGateway,
        unsignedProtocolCallGateway,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
