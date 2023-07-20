import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockCredentials, mockProfile, mockWallet } from '../../../entities/__helpers__/mocks';
import { mockTransactionQueue } from '../../../mocks';
import { ActiveProfileLoader } from '../../profile';
import { TransactionQueue } from '../../transactions';
import { ActiveWallet, LogoutReason, WalletLogout } from '../../wallets';
import {
  Bootstrap,
  CredentialsExpiredError,
  ICredentialsGateway,
  ICredentialsRenewer,
} from '../Bootstrap';
import { ISessionPresenter } from '../ISessionPresenter';

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
  const transactionQueue = mockTransactionQueue();
  const sessionPresenter = mock<ISessionPresenter>();
  const walletLogout = mock<WalletLogout>();

  const bootstrap = new Bootstrap(
    activeWallet,
    credentialsGateway,
    credentialsRenewer,
    activeProfileLoader,
    transactionQueue,
    sessionPresenter,
    walletLogout,
  );

  return {
    bootstrap,
    sessionPresenter,
    transactionQueue,
    walletLogout,
  };
};

describe(`Given the ${Bootstrap.name} interactor`, () => {
  describe(`when executed with no active wallet`, () => {
    it('should present an anonymous session', async () => {
      const activeWallet = mock<ActiveWallet>();
      when(activeWallet.getActiveWallet).mockResolvedValue(null);

      const { bootstrap, sessionPresenter } = setupBootstrapInteractor({ activeWallet });

      await bootstrap.execute();

      expect(sessionPresenter.anonymous).toHaveBeenCalled();
    });
  });

  describe(`and an active wallet`, () => {
    const wallet = mockWallet();
    const profile = mockProfile();

    describe(`when executed with credentials`, () => {
      const oldCredentials = mockCredentials();
      const newCredentials = mockCredentials();

      it(`should:
          - renew the credentials and save the new ones
          - present an authenticated session
          - resume the ${TransactionQueue.name}`, async () => {
        const activeWallet = mock<ActiveWallet>();
        const credentialsGateway = mock<ICredentialsGateway>();
        const credentialsRenewer = mock<ICredentialsRenewer>();
        const activeProfileLoader = mock<ActiveProfileLoader>();

        when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
        when(activeProfileLoader.loadActiveProfileByOwnerAddress)
          .calledWith(wallet.address)
          .mockResolvedValue(profile);
        when(credentialsGateway.getCredentials).mockResolvedValue(oldCredentials);
        when(credentialsRenewer.renewCredentials)
          .calledWith(oldCredentials)
          .mockResolvedValue(success(newCredentials));

        const { bootstrap, sessionPresenter, transactionQueue } = setupBootstrapInteractor({
          activeProfileLoader,
          activeWallet,
          credentialsGateway,
          credentialsRenewer,
        });

        await bootstrap.execute();

        expect(credentialsGateway.save).toHaveBeenCalledWith(newCredentials);
        expect(sessionPresenter.authenticated).toHaveBeenCalledWith(wallet, profile);
        expect(transactionQueue.init).toHaveBeenCalled();
      });

      it(`should execute the ${WalletLogout.name} interactor with ${LogoutReason.CREDENTIALS_EXPIRED} reason`, async () => {
        const activeWallet = mock<ActiveWallet>();
        const credentialsGateway = mock<ICredentialsGateway>();
        const credentialsRenewer = mock<ICredentialsRenewer>();

        when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
        when(credentialsGateway.getCredentials).mockResolvedValue(oldCredentials);
        when(credentialsRenewer.renewCredentials).mockResolvedValue(
          failure(new CredentialsExpiredError()),
        );

        const { bootstrap, walletLogout } = setupBootstrapInteractor({
          activeWallet,
          credentialsGateway,
          credentialsRenewer,
        });

        await bootstrap.execute();

        expect(walletLogout.logout).toHaveBeenCalledWith(LogoutReason.CREDENTIALS_EXPIRED);
      });
    });

    describe(`when executed without credentials`, () => {
      it(`should execute the ${WalletLogout.name} interactor with ${LogoutReason.CREDENTIALS_EXPIRED} reason`, async () => {
        const activeWallet = mock<ActiveWallet>();
        const credentialsGateway = mock<ICredentialsGateway>();

        when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
        when(credentialsGateway.getCredentials).mockResolvedValue(null);

        const { bootstrap, walletLogout } = setupBootstrapInteractor({
          activeWallet,
          credentialsGateway,
        });

        await bootstrap.execute();

        expect(walletLogout.logout).toHaveBeenCalledWith(LogoutReason.CREDENTIALS_EXPIRED);
      });
    });
  });
});
