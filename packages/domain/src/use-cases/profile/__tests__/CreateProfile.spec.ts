import { failure, matic, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  AnyTransactionRequestModel,
  InsufficientGasError,
  NativeTransaction,
  PendingSigningRequestError,
  UnsignedTransaction,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '../../../entities';
import {
  MockedNativeTransaction,
  mockCreateProfileRequest,
  mockIPaidTransactionGateway,
  mockTransactionQueue,
  mockUnsignedTransaction,
  mockWallet,
} from '../../../mocks';
import { TransactionQueue } from '../../transactions';
import { IWalletGateway } from '../../wallets';
import {
  CreateProfile,
  ICreateProfilePresenter,
  ICreateProfileTransactionGateway,
} from '../CreateProfile';

function setupCreateProfile({
  gateway,
  presenter = mock<ICreateProfilePresenter>(),
  queue = mockTransactionQueue<AnyTransactionRequestModel>(),
  wallet,
}: {
  gateway: ICreateProfileTransactionGateway;
  presenter?: ICreateProfilePresenter;
  queue?: TransactionQueue<AnyTransactionRequestModel>;
  wallet: Wallet;
}) {
  const walletGateway = mock<IWalletGateway>();

  when(walletGateway.getByAddress).calledWith(wallet.address).mockResolvedValue(wallet);

  return new CreateProfile(walletGateway, gateway, presenter, queue);
}

describe(`Given the ${CreateProfile.name} interactor`, () => {
  const wallet = mockWallet();
  const request = mockCreateProfileRequest({ to: wallet.address });
  const unsignedTransaction = mockUnsignedTransaction(request);
  const transaction = MockedNativeTransaction.fromUnsignedTransaction(unsignedTransaction);

  describe(`when invoking the "${CreateProfile.prototype.execute.name}" method`, () => {
    it(`should:
        - create an ${UnsignedTransaction.name}<T>
        - sign and broadcast the transaction with the user's wallet
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}`, async () => {
      const queue = mockTransactionQueue<AnyTransactionRequestModel>();
      const gateway = mockIPaidTransactionGateway({
        request,
        wallet,
        unsignedTransaction,
      });
      const presenter = mock<ICreateProfilePresenter>();
      const payTransaction = setupCreateProfile({
        gateway,
        presenter,
        queue,
        wallet,
      });

      when(wallet.sendTransaction)
        .calledWith(unsignedTransaction)
        .mockResolvedValue(success(transaction));

      await payTransaction.execute(request);

      expect(queue.push).toHaveBeenCalledWith(transaction, presenter);
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
        ErrorCtor: InsufficientGasError,
        error: new InsufficientGasError(matic()),
      },
      {
        ErrorCtor: UserRejectedError,
        error: new UserRejectedError('user does not want'),
      },
    ])(
      `should present any "$ErrorCtor.name" the transaction sending fails with`,
      async ({ error }) => {
        when(wallet.sendTransaction)
          .calledWith(unsignedTransaction)
          .mockResolvedValue(failure(error));

        const gateway = mockIPaidTransactionGateway({
          request,
          wallet,
          unsignedTransaction,
        });

        const presenter = mock<ICreateProfilePresenter>();
        const payTransaction = setupCreateProfile({
          gateway,
          presenter,
          wallet,
        });

        await payTransaction.execute(request);

        expect(presenter.present).toHaveBeenCalledWith(failure(error));
      },
    );
  });
});
