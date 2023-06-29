import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockCredentials, mockProfile, mockWallet } from '../../../entities/__helpers__/mocks';
import { mockTransactionQueue } from '../../../mocks';
import { ActiveProfileLoader } from '../../profile';
import { TransactionQueue } from '../../transactions';
import { ActiveWallet, LogoutReason } from '../../wallets';
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

  const bootstrap = new Bootstrap(
    activeWallet,
    credentialsGateway,
    credentialsRenewer,
    activeProfileLoader,
    transactionQueue,
    sessionPresenter,
  );

  return {
    bootstrap,
    sessionPresenter,
    transactionQueue,
  };
};

describe(`Given the ${Bootstrap.name} interactor`, () => {
  describe(`when executed there is not active wallet`, () => {
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

    describe(`when credentials are present`, () => {
      const oldCredentials = mockCredentials();
      const newCredentials = mockCredentials();

      it(`should:
          - renew the credentials and save the new credentials
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

        const { bootstrap, sessionPresenter } = setupBootstrapInteractor({
          activeWallet,
          credentialsGateway,
          credentialsRenewer,
        });

        await bootstrap.execute();

        expect(sessionPresenter.logout).toHaveBeenCalledWith({
          lastLoggedInWallet: wallet,
          logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
        });
      });
    });

    describe(`when credentials are NOT available`, () => {
      it(`should present the logout reason`, async () => {
        const activeWallet = mock<ActiveWallet>();
        const credentialsGateway = mock<ICredentialsGateway>();

        when(activeWallet.getActiveWallet).mockResolvedValue(wallet);
        when(credentialsGateway.getCredentials).mockResolvedValue(null);

        const { bootstrap, sessionPresenter } = setupBootstrapInteractor({
          activeWallet,
          credentialsGateway,
        });

        await bootstrap.execute();

        expect(sessionPresenter.logout).toHaveBeenCalledWith({
          lastLoggedInWallet: wallet,
          logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
        });
      });
    });
  });
});
