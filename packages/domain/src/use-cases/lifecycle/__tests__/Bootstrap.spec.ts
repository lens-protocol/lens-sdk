import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Profile } from '../../../entities';
import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { mockTransactionQueue } from '../../../mocks';
import { ActiveProfileLoader, IActiveProfilePresenter } from '../../profile';
import { TransactionQueue } from '../../transactions';
import {
  ILogoutPresenter,
  LogoutReason,
  IActiveWalletPresenter,
  ActiveWallet,
} from '../../wallets';
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
  activeProfileLoader?: ActiveProfileLoader;
};

const setupBootstrapInteractor = ({
  activeWallet,
  credentialsGateway = mock<ICredentialsGateway>(),
  credentialsRenewer = mock<ICredentialsRenewer>(),
  activeProfileLoader = mock<ActiveProfileLoader>(),
}: BootstrapSetupConfig) => {
  const walletPresenter = mock<IActiveWalletPresenter>();
  const applicationPresenter = mock<IApplicationPresenter>();
  const logoutPresenter = mock<ILogoutPresenter>();
  const transactionQueue = mockTransactionQueue();
  const activeProfilePresenter = mock<IActiveProfilePresenter>();

  const bootstrap = new Bootstrap(
    activeWallet,
    credentialsGateway,
    credentialsRenewer,
    walletPresenter,
    applicationPresenter,
    logoutPresenter,
    activeProfileLoader,
    transactionQueue,
    activeProfilePresenter,
  );

  return {
    bootstrap,
    activeProfilePresenter,
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
            - present the active profile
            - resume the ${TransactionQueue.name} (TODO)
            - and finally signal readiness`, async () => {
          const activeWallet = mock<ActiveWallet>();
          const activeProfile = mock<Profile>();
          const credentialsGateway = mock<ICredentialsGateway>();
          const credentialsRenewer = mock<ICredentialsRenewer>();
          const activeProfileLoader = mock<ActiveProfileLoader>();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(activeProfileLoader.loadActiveProfileByOwnerAddress)
            .calledWith(wallet.address)
            .mockResolvedValue(activeProfile);
          when(credentialsRenewer.renewCredentials).mockResolvedValue(success(mockCredentials()));
          when(credentialsGateway.getCredentials).mockResolvedValue(mockCredentials());

          const {
            applicationPresenter,
            bootstrap,
            walletPresenter,
            transactionQueue,
            activeProfilePresenter,
          } = setupBootstrapInteractor({
            activeProfileLoader,
            activeWallet,
            credentialsGateway,
            credentialsRenewer,
          });

          await bootstrap.start();

          expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
          expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(activeProfile);
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
          expect(transactionQueue.init).toHaveBeenCalled();
        });

        it(`should renew the credentials if expired and then:
            - save the new credentials
            - present the wallet
            - present active profile
            - resume the ${TransactionQueue.name} (TODO)
            - and finally signal readiness`, async () => {
          const activeWallet = mock<ActiveWallet>();
          const activeProfile = mock<Profile>();
          const credentialsGateway = mock<ICredentialsGateway>();
          const credentialsRenewer = mock<ICredentialsRenewer>();
          const activeProfileLoader = mock<ActiveProfileLoader>();
          const oldCredentials = mockCredentials();
          const newCredentials = mockCredentials();

          when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
          when(credentialsGateway.getCredentials).mockResolvedValue(oldCredentials);
          when(activeProfileLoader.loadActiveProfileByOwnerAddress)
            .calledWith(wallet.address)
            .mockResolvedValue(activeProfile);
          when(credentialsRenewer.renewCredentials)
            .calledWith(oldCredentials)
            .mockResolvedValue(success(newCredentials));

          const {
            bootstrap,
            applicationPresenter,
            walletPresenter,
            transactionQueue,
            activeProfilePresenter,
          } = setupBootstrapInteractor({
            activeProfileLoader,
            activeWallet,
            credentialsGateway,
            credentialsRenewer,
          });

          await bootstrap.start();

          expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
          expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(activeProfile);
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

          expect(logoutPresenter.present).toHaveBeenCalledWith(
            success({
              lastLoggedInWallet: wallet,
              logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
            }),
          );
          expect(applicationPresenter.signalReady).toHaveBeenCalled();
        });
      });
    });
  });
});
