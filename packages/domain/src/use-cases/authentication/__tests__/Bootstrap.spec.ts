import { failure, never, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockCredentials } from '../../../entities/__helpers__/mocks';
import { mockTransactionQueue } from '../../../mocks';
import { TransactionQueue } from '../../transactions';
import {
  Bootstrap,
  CredentialsExpiredError,
  IBootstrapPresenter,
  ICredentialsGateway,
  ICredentialsRenewer,
} from '../Bootstrap';
import { Logout, LogoutReason } from '../Logout';
import { anonymousSessionData, profileSessionData } from '../SessionData';

type BootstrapSetupConfig = {
  credentialsGateway?: ICredentialsGateway;
  credentialsRenewer?: ICredentialsRenewer;
};

const setupBootstrapInteractor = ({
  credentialsGateway = mock<ICredentialsGateway>(),
  credentialsRenewer = mock<ICredentialsRenewer>(),
}: BootstrapSetupConfig) => {
  const transactionQueue = mockTransactionQueue();
  const presenter = mock<IBootstrapPresenter>();
  const logout = mock<Logout>();

  const bootstrap = new Bootstrap(
    credentialsGateway,
    credentialsRenewer,
    transactionQueue,
    logout,
    presenter,
  );

  return {
    bootstrap,
    transactionQueue,
    logout,
    presenter,
  };
};

describe(`Given the ${Bootstrap.name} interactor`, () => {
  describe(`when executed without credentials`, () => {
    it('should present an anonymous session', async () => {
      const credentialsGateway = mock<ICredentialsGateway>();

      when(credentialsGateway.getCredentials).mockResolvedValue(null);

      const { bootstrap, presenter } = setupBootstrapInteractor({ credentialsGateway });

      await bootstrap.execute();

      expect(presenter.present).toHaveBeenCalledWith(anonymousSessionData());
    });
  });

  describe(`when executed with credentials`, () => {
    const oldCredentials = mockCredentials();
    const newCredentials = mockCredentials(oldCredentials);

    it(`should:
        - renew the credentials and save the new ones
        - present an authenticated session
        - resume the ${TransactionQueue.name}`, async () => {
      const credentialsGateway = mock<ICredentialsGateway>();
      const credentialsRenewer = mock<ICredentialsRenewer>();

      when(credentialsGateway.getCredentials).mockResolvedValue(oldCredentials);
      when(credentialsRenewer.renewCredentials)
        .calledWith(oldCredentials)
        .mockResolvedValue(success(newCredentials));

      const { bootstrap, presenter, transactionQueue } = setupBootstrapInteractor({
        credentialsGateway,
        credentialsRenewer,
      });

      await bootstrap.execute();

      expect(credentialsGateway.save).toHaveBeenCalledWith(newCredentials);
      expect(presenter.present).toHaveBeenCalledWith(
        profileSessionData({
          address: newCredentials.address,
          profileId: newCredentials.profileId ?? never(),
        }),
      );
      expect(transactionQueue.resume).toHaveBeenCalled();
    });

    it(`should log-out with ${LogoutReason.CREDENTIALS_EXPIRED} reason in case of ${CredentialsExpiredError.name} while renewing credentials`, async () => {
      const credentialsGateway = mock<ICredentialsGateway>();
      const credentialsRenewer = mock<ICredentialsRenewer>();

      when(credentialsGateway.getCredentials).mockResolvedValue(oldCredentials);
      when(credentialsRenewer.renewCredentials).mockResolvedValue(
        failure(new CredentialsExpiredError()),
      );

      const { bootstrap, logout } = setupBootstrapInteractor({
        credentialsGateway,
        credentialsRenewer,
      });

      await bootstrap.execute();

      expect(logout.execute).toHaveBeenCalledWith(LogoutReason.CREDENTIALS_EXPIRED);
    });
  });
});
