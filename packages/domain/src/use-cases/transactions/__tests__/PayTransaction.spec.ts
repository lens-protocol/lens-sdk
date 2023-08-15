import { failure, matic, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  NativeTransaction,
  UnsignedTransaction,
  InsufficientGasError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
  PendingSigningRequestError,
  AnyTransactionRequestModel,
} from '../../../entities';
import {
  MockedNativeTransaction,
  mockAnyTransactionRequestModel,
  mockUnsignedTransaction,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import { mockActiveWallet, mockIPayTransactionGateway } from '../../../mocks';
import {
  IPayTransactionGateway,
  IPayTransactionPresenter,
  PayTransaction,
} from '../PayTransaction';
import { TransactionQueue } from '../TransactionQueue';
import { mockTransactionQueue } from '../__helpers__/mocks';

function setupPayTransaction({
  gateway,
  presenter = mock<IPayTransactionPresenter<AnyTransactionRequestModel>>(),
  queue = mockTransactionQueue<AnyTransactionRequestModel>(),
  wallet,
}: {
  gateway: IPayTransactionGateway<AnyTransactionRequestModel>;
  presenter?: IPayTransactionPresenter<AnyTransactionRequestModel>;
  queue?: TransactionQueue<AnyTransactionRequestModel>;
  wallet: Wallet;
}) {
  return new PayTransaction(mockActiveWallet({ wallet }), gateway, presenter, queue);
}

describe(`Given the ${PayTransaction.name} interactor`, () => {
  const request = mockAnyTransactionRequestModel();
  const unsignedTransaction = mockUnsignedTransaction(request);
  const transaction = MockedNativeTransaction.fromUnsignedTransaction(unsignedTransaction);

  describe(`when invoking the "${PayTransaction.prototype.execute.name}" method`, () => {
    it(`should:
        - create an ${UnsignedTransaction.name}<T>
        - sign and broadcast the transaction with the user's wallet
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}`, async () => {
      const wallet = mockWallet();
      const queue = mockTransactionQueue<AnyTransactionRequestModel>();
      const gateway = mockIPayTransactionGateway({
        request,
        wallet,
        unsignedTransaction,
      });
      const presenter = mock<IPayTransactionPresenter<AnyTransactionRequestModel>>();
      const payTransaction = setupPayTransaction({
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

        const gateway = mockIPayTransactionGateway({
          request,
          wallet,
          unsignedTransaction,
        });

        const presenter = mock<IPayTransactionPresenter<AnyTransactionRequestModel>>();
        const payTransaction = setupPayTransaction({
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
