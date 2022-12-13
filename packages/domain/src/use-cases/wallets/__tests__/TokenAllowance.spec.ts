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
} from '../../../entities';
import {
  MockedNativeTransaction,
  mockUnsignedTransaction,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import { TransactionQueue } from '../../transactions/TransactionQueue';
import { mockTransactionQueue } from '../../transactions/__helpers__/mocks';
import {
  IApproveTransactionGateway,
  ITokenAllowancePresenter,
  TokenAllowance,
  TokenAllowanceRequest,
} from '../TokenAllowance';
import {
  mockActiveWallet,
  mockIApproveTransactionGateway,
  mockTokenAllowanceRequest,
} from '../__helpers__/mocks';

function setupTokenAllowance({
  gateway,
  presenter = mock<ITokenAllowancePresenter>(),
  queue = mockTransactionQueue<TokenAllowanceRequest>(),
  wallet,
}: {
  gateway: IApproveTransactionGateway;
  presenter?: ITokenAllowancePresenter;
  queue?: TransactionQueue<TokenAllowanceRequest>;
  wallet: Wallet;
}) {
  return new TokenAllowance(mockActiveWallet({ wallet }), gateway, presenter, queue);
}

describe(`Given the ${TokenAllowance.name} interactor`, () => {
  const request = mockTokenAllowanceRequest();
  const unsignedTransaction = mockUnsignedTransaction(request);
  const transaction = MockedNativeTransaction.fromUnsignedTransaction(unsignedTransaction);

  describe('when increasing the token allowance for a given spender', () => {
    it(`should:
        - create an ${UnsignedTransaction.name}<TokenAllowanceRequest>
        - sign and broadcast the transaction with the user's wallet
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}
        - present successful result`, async () => {
      const wallet = mockWallet();
      const queue = mockTransactionQueue<TokenAllowanceRequest>();
      const gateway = mockIApproveTransactionGateway({
        request,
        wallet,
        unsignedTransaction,
      });
      const presenter = mock<ITokenAllowancePresenter>();
      const tokenAllowance = setupTokenAllowance({
        gateway,
        presenter,
        queue,
        wallet,
      });

      when(wallet.sendTransaction)
        .calledWith(unsignedTransaction)
        .mockResolvedValue(success(transaction));

      await tokenAllowance.increaseAllowance(request);

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
        error: new WalletConnectionError(WalletConnectionErrorReason.CONNECTION_REFUSED),
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

        const gateway = mockIApproveTransactionGateway({
          request,
          wallet,
          unsignedTransaction,
        });

        const presenter = mock<ITokenAllowancePresenter>();
        const tokenAllowance = setupTokenAllowance({
          gateway,
          presenter,
          wallet,
        });

        await tokenAllowance.increaseAllowance(request);

        expect(presenter.present).toHaveBeenCalledWith(failure(error));
      },
    );
  });
});
