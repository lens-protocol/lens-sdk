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
  mockActiveWallet,
  mockAnyTransactionRequestModel,
  mockIPaidTransactionGateway,
  mockTransactionQueue,
  mockUnsignedTransaction,
  mockWallet,
} from '../../../mocks';
import { IPaidTransactionGateway } from '../IPaidTransactionGateway';
import { IPaidTransactionPresenter, PaidTransaction } from '../PaidTransaction';
import { TransactionQueue } from '../TransactionQueue';

function setupPaidTransaction({
  gateway,
  presenter = mock<IPaidTransactionPresenter<AnyTransactionRequestModel>>(),
  queue = mockTransactionQueue<AnyTransactionRequestModel>(),
  wallet,
}: {
  gateway: IPaidTransactionGateway<AnyTransactionRequestModel>;
  presenter?: IPaidTransactionPresenter<AnyTransactionRequestModel>;
  queue?: TransactionQueue<AnyTransactionRequestModel>;
  wallet: Wallet;
}) {
  return new PaidTransaction(mockActiveWallet({ wallet }), gateway, presenter, queue);
}

describe(`Given the ${PaidTransaction.name} interactor`, () => {
  const request = mockAnyTransactionRequestModel();
  const unsignedTransaction = mockUnsignedTransaction(request);
  const transaction = MockedNativeTransaction.fromUnsignedTransaction(unsignedTransaction);

  describe(`when invoking the "${PaidTransaction.prototype.execute.name}" method`, () => {
    it(`should:
        - create an ${UnsignedTransaction.name}<T>
        - sign and broadcast the transaction with the user's wallet
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}`, async () => {
      const wallet = mockWallet();
      const queue = mockTransactionQueue<AnyTransactionRequestModel>();
      const gateway = mockIPaidTransactionGateway({
        request,
        wallet,
        unsignedTransaction,
      });
      const presenter = mock<IPaidTransactionPresenter<AnyTransactionRequestModel>>();
      const payTransaction = setupPaidTransaction({
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
        const wallet = mockWallet();
        when(wallet.sendTransaction)
          .calledWith(unsignedTransaction)
          .mockResolvedValue(failure(error));

        const gateway = mockIPaidTransactionGateway({
          request,
          wallet,
          unsignedTransaction,
        });

        const presenter = mock<IPaidTransactionPresenter<AnyTransactionRequestModel>>();
        const payTransaction = setupPaidTransaction({
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
