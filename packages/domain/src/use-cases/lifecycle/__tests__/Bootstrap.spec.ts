import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { TransactionRequestModel } from '../../../entities';
import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveProfile } from '../../profile/ActiveProfile';
import { TransactionQueue } from '../../transactions/TransactionQueue';
import { mockTransactionQueue } from '../../transactions/__helpers__/mocks';
import { ActiveWallet } from '../../wallets/ActiveWallet';
import { IActiveWalletPresenter } from '../../wallets/IActiveWalletPresenter';
import { ILoginPresenter } from '../../wallets/ILoginPresenter';
import {
  Bootstrap,
  CredentialsExpiredError,
  IApplicationPresenter,
  IAuthorizationGateway,
} from '../Bootstrap';

const wallet = mockWallet();

type BootstrapSetupConfig = {
  activeProfile?: ActiveProfile;
  activeWallet?: ActiveWallet;
  authGateway?: IAuthorizationGateway;
  walletPresenter?: IActiveWalletPresenter;
  applicationPresenter?: IApplicationPresenter;
  loginPresenter?: ILoginPresenter;
  transactionQueue?: TransactionQueue<TransactionRequestModel>;
};

const setupBootstrapInteractor = ({
  activeProfile = mock<ActiveProfile>(),
  activeWallet = mock<ActiveWallet>(),
  authGateway = mock<IAuthorizationGateway>(),
  walletPresenter = mock<IActiveWalletPresenter>(),
  applicationPresenter = mock<IApplicationPresenter>(),
  loginPresenter = mock<ILoginPresenter>(),
  transactionQueue = mockTransactionQueue(),
}: BootstrapSetupConfig = {}) => {
  return new Bootstrap(
    activeWallet,
    authGateway,
    walletPresenter,
    applicationPresenter,
    loginPresenter,
    activeProfile,
    transactionQueue,
  );
};

describe(`Given the ${Bootstrap.name} interactor`, () => {
  describe(`when "${Bootstrap.prototype.start.name}" is invoked`, () => {
    describe('without wallet', () => {
      it('should just signal readiness', async () => {
        const activeWallet = mock<ActiveWallet>();
        const applicationPresenter = mock<IApplicationPresenter>();

        when(activeWallet.getActiveWallet).mockResolvedValue(null);

        const bootstrap = setupBootstrapInteractor({ activeWallet, applicationPresenter });

        await bootstrap.start();

        expect(applicationPresenter.signalReady).toHaveBeenCalled();
      });
    });

    describe('with wallet', () => {
      describe('and with not expired credentials', () => {
        it(`should:
            - present wallet and signal readiness
            - resume the ${TransactionQueue.name}`, async () => {
          const activeProfile = mock<ActiveProfile>();
          const activeWallet = mock<ActiveWallet>();
          const applicationPresenter = mock<IApplicationPresenter>();
          const authGateway = mock<IAuthorizationGateway>();
          const transactionQueue = mockTransactionQueue();
          const walletPresenter = mock<IActiveWalletPresenter>();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(authGateway.authorize)
            .calledWith(wallet)
            .mockResolvedValue(success(mockCredentials()));

          const bootstrap = setupBootstrapInteractor({
            activeProfile,
            activeWallet,
            applicationPresenter,
            authGateway,
            transactionQueue,
            walletPresenter,
          });

          await bootstrap.start();

          expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
          expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
          expect(activeProfile.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(
            wallet.address,
          );
          expect(transactionQueue.init).toHaveBeenCalled();
        });
      });

      describe('and with expired credentials', () => {
        it("should present login options and signal readiness if we can't refresh credentials", async () => {
          const activeWallet = mock<ActiveWallet>();
          const loginPresenter = mock<ILoginPresenter>();
          const authGateway = mock<IAuthorizationGateway>();
          const applicationPresenter = mock<IApplicationPresenter>();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(authGateway.authorize)
            .calledWith(wallet)
            .mockResolvedValue(failure(new CredentialsExpiredError()));

          const bootstrap = setupBootstrapInteractor({
            activeWallet,
            applicationPresenter,
            loginPresenter,
            authGateway,
          });

          await bootstrap.start();

          expect(loginPresenter.presentLoginOptions).toHaveBeenCalledWith(wallet);
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
        });
      });
    });
  });
});
