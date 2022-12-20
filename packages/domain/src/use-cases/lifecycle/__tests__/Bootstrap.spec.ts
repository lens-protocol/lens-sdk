import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { TransactionRequestModel } from '../../../entities';
import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { mockTransactionQueue } from '../../../mocks';
import { ActiveProfile } from '../../profile/ActiveProfile';
import { TransactionQueue } from '../../transactions/TransactionQueue';
import { ActiveWallet } from '../../wallets/ActiveWallet';
import { IActiveWalletPresenter } from '../../wallets/IActiveWalletPresenter';
import { ILogoutPresenter, LogoutReason } from '../../wallets/ILogoutPresenter';
import {
  Bootstrap,
  CredentialsExpiredError,
  IApplicationPresenter,
  ICredentialsGateway,
  ICredentialsRenewer,
} from '../Bootstrap';

const wallet = mockWallet();

type BootstrapSetupConfig = {
  activeWallet: ActiveWallet;
  credentialsGateway?: ICredentialsGateway;
  credentialsRenewer?: ICredentialsRenewer;
  walletPresenter?: IActiveWalletPresenter;
  applicationPresenter?: IApplicationPresenter;
  logoutPresenter?: ILogoutPresenter;
  transactionQueue?: TransactionQueue<TransactionRequestModel>;
};

const setupBootstrapInteractor = ({
  activeWallet,
  credentialsGateway = mock<ICredentialsGateway>(),
  credentialsRenewer = mock<ICredentialsRenewer>(),
}: BootstrapSetupConfig) => {
  const activeProfile = mock<ActiveProfile>();
  const walletPresenter = mock<IActiveWalletPresenter>();
  const applicationPresenter = mock<IApplicationPresenter>();
  const logoutPresenter = mock<ILogoutPresenter>();
  const transactionQueue = mockTransactionQueue();

  const bootstrap = new Bootstrap(
    activeWallet,
    credentialsGateway,
    credentialsRenewer,
    walletPresenter,
    applicationPresenter,
    logoutPresenter,
    activeProfile,
    transactionQueue,
  );

  return {
    bootstrap,
    activeProfile,
    walletPresenter,
    applicationPresenter,
    logoutPresenter,
    transactionQueue,
  };
};

describe(`Given the ${Bootstrap.name} interactor`, () => {
  describe('and there is no active wallet', () => {
    describe(`when the "${Bootstrap.prototype.start.name}" method is invoked`, () => {
      it('should just signal readiness', async () => {
        const activeWallet = mock<ActiveWallet>();
        when(activeWallet.getActiveWallet).mockResolvedValue(null);

        const { applicationPresenter, bootstrap } = setupBootstrapInteractor({ activeWallet });

        await bootstrap.start();

        expect(applicationPresenter.signalReady).toHaveBeenCalled();
      });
    });

    describe('and there is an active wallet', () => {
      describe(`when the "${Bootstrap.prototype.start.name}" method is invoked`, () => {
        it(`should check if the credentials are expired and if not:
            - present the wallet
            - resume the ${TransactionQueue.name} (TODO)
            - and finally signal readiness`, async () => {
          const activeWallet = mock<ActiveWallet>();
          const credentialsGateway = mock<ICredentialsGateway>();
          const credentialsRenewer = mock<ICredentialsRenewer>();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(credentialsRenewer.renewCredentials).mockResolvedValue(success(mockCredentials()));
          when(credentialsGateway.getCredentials).mockResolvedValue(mockCredentials());

          const {
            activeProfile,
            applicationPresenter,
            bootstrap,
            walletPresenter,
            transactionQueue,
          } = setupBootstrapInteractor({
            activeWallet,
            credentialsGateway,
            credentialsRenewer,
          });

          await bootstrap.start();

          expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
          expect(activeProfile.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(
            wallet.address,
          );
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
          expect(transactionQueue.init).toHaveBeenCalled();
        });

        it(`should renew the credentials if expired and then:
            - save the new credentials
            - present the wallet
            - resume the ${TransactionQueue.name} (TODO)
            - and finally signal readiness`, async () => {
          const activeWallet = mock<ActiveWallet>();
          const credentialsGateway = mock<ICredentialsGateway>();
          const credentialsRenewer = mock<ICredentialsRenewer>();
          const oldCredentials = mockCredentials();
          const newCredentials = mockCredentials();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(credentialsGateway.getCredentials).mockResolvedValue(oldCredentials);
          when(credentialsRenewer.renewCredentials)
            .calledWith(oldCredentials)
            .mockResolvedValue(success(newCredentials));

          const {
            bootstrap,
            activeProfile,
            applicationPresenter,
            walletPresenter,
            transactionQueue,
          } = setupBootstrapInteractor({
            activeWallet,
            credentialsGateway,
            credentialsRenewer,
          });

          await bootstrap.start();

          expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
          expect(activeProfile.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(
            wallet.address,
          );
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
          expect(transactionQueue.init).toHaveBeenCalled();
        });

        it(`should:
            - present the logout reason if it fails to renew the credentials
            - and finally signal readiness`, async () => {
          const activeWallet = mock<ActiveWallet>();
          const credentialsGateway = mock<ICredentialsGateway>();
          const credentialsRenewer = mock<ICredentialsRenewer>();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(credentialsRenewer.renewCredentials).mockResolvedValue(
            failure(new CredentialsExpiredError()),
          );

          const { bootstrap, applicationPresenter, logoutPresenter } = setupBootstrapInteractor({
            activeWallet,
            credentialsGateway,
            credentialsRenewer,
          });

          await bootstrap.start();

          expect(logoutPresenter.presentLogout).toHaveBeenCalledWith({
            lastLoggedInWallet: wallet,
            logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
          });
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
        });
      });
    });
  });
});
