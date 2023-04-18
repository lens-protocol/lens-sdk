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
  TransactionRequestModel,
} from '../../../entities';
import {
  MockedNativeTransaction,
  mockUnsignedTransaction,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import { mockActiveWallet, mockIPayTransactionGateway } from '../../../mocks';
import { TransactionQueue } from '../../transactions/TransactionQueue';
import {
  mockTransactionQueue,
  mockTransactionRequestModelWithData,
} from '../../transactions/__helpers__/mocks';
import {
  IPayTransactionGateway,
  IPayTransactionPresenter,
  PayTransaction,
} from '../PayTransaction';

function setupPayTransaction({
  gateway,
  presenter = mock<IPayTransactionPresenter>(),
  queue = mockTransactionQueue<TransactionRequestModel>(),
  wallet,
}: {
  gateway: IPayTransactionGateway<TransactionRequestModel>;
  presenter?: IPayTransactionPresenter;
  queue?: TransactionQueue<TransactionRequestModel>;
  wallet: Wallet;
}) {
  return new PayTransaction(mockActiveWallet({ wallet }), gateway, presenter, queue);
}

describe(`Given the ${PayTransaction.name} interactor`, () => {
  const request = mockTransactionRequestModelWithData();
  const unsignedTransaction = mockUnsignedTransaction(request);
  const transaction = MockedNativeTransaction.fromUnsignedTransaction(unsignedTransaction);

  describe(`when invoking the "${PayTransaction.prototype.execute.name}" method with a request if type WithData<T>`, () => {
    it(`should:
        - create an ${UnsignedTransaction.name}<T>
        - sign and broadcast the transaction with the user's wallet
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}
        - present successful result`, async () => {
      const wallet = mockWallet();
      const queue = mockTransactionQueue<TransactionRequestModel>();
      const gateway = mockIPayTransactionGateway({
        request,
        wallet,
        unsignedTransaction,
      });
      const presenter = mock<IPayTransactionPresenter>();
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

      expect(queue.push).toHaveBeenCalledWith(transaction);
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

        const presenter = mock<IPayTransactionPresenter>();
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
