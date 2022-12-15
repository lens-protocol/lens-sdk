import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
} from '../../../entities';
import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveProfile } from '../../profile/ActiveProfile';
import { IActiveWalletPresenter } from '../IActiveWalletPresenter';
import {
  WalletLogin,
  ICredentialsIssuer,
  ICredentialsWriter,
  IConnectionErrorPresenter,
  IWalletConnector,
  IWritableWalletGateway,
} from '../WalletLogin';

const wallet = mockWallet();

function setupTestScenario({
  walletConnector = mock<IWalletConnector>(),
  credentialsIssuer = mock<ICredentialsIssuer>(),
}: {
  walletConnector?: IWalletConnector;
  credentialsIssuer?: ICredentialsIssuer;
} = {}) {
  const walletGateway = mock<IWritableWalletGateway>();
  const credentialsWriter = mock<ICredentialsWriter>();
  const walletPresenter = mock<IActiveWalletPresenter>();
  const errorPresenter = mock<IConnectionErrorPresenter>();
  const activeProfile = mock<ActiveProfile>();

  const walletLogin = new WalletLogin(
    walletConnector,
    walletGateway,
    credentialsIssuer,
    credentialsWriter,
    walletPresenter,
    errorPresenter,
    activeProfile,
  );

  return {
    activeProfile,
    credentialsIssuer,
    credentialsWriter,
    errorPresenter,
    walletConnector,
    walletGateway,
    walletLogin,
    walletPresenter,
  };
}

describe(`Given the ${WalletLogin.name} interactor`, () => {
  describe(`when "${WalletLogin.prototype.login.name}" is invoked`, () => {
    it(`should:
        - use the IWalletConnector to connect a wallet to the Polygon network
        - login with the backend
        - save wallet and credentials
        - load the active profile associated with the wallet`, async () => {
      const walletConnector = mock<IWalletConnector>();
      const credentialsIssuer = mock<ICredentialsIssuer>();

      const credentials = mockCredentials({ address: wallet.address });

      when(walletConnector.connect)
        .calledWith(ChainType.POLYGON)
        .mockResolvedValue(success(wallet));

      when(credentialsIssuer.issueCredentials)
        .calledWith(wallet)
        .mockResolvedValue(success(credentials));

      const { walletLogin, walletGateway, credentialsWriter, walletPresenter, activeProfile } =
        setupTestScenario({
          credentialsIssuer,
          walletConnector,
        });

      await walletLogin.login();

      expect(walletGateway.save).toHaveBeenCalledWith(wallet);
      expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
      expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
      expect(activeProfile.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(wallet.address);
    });

    it('should handle scenarios where the user cancels the challenge signing operation', async () => {
      const walletConnector = mock<IWalletConnector>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new UserRejectedError();

      when(walletConnector.connect)
        .calledWith(ChainType.POLYGON)
        .mockResolvedValue(success(wallet));

      when(credentialsIssuer.issueCredentials).calledWith(wallet).mockResolvedValue(failure(error));

      const { errorPresenter, walletLogin } = setupTestScenario({
        credentialsIssuer,
        walletConnector,
      });

      await walletLogin.login();

      expect(errorPresenter.presentConnectionError).toHaveBeenCalledWith(error);
    });

    it('should handle scenarios where there is a wallet connection error', async () => {
      const walletConnector = mock<IWalletConnector>();
      const error = new WalletConnectionError(WalletConnectionErrorReason.CONNECTION_REFUSED);

      when(walletConnector.connect).calledWith(ChainType.POLYGON).mockResolvedValue(failure(error));

      const { errorPresenter, walletLogin } = setupTestScenario({ walletConnector });

      await walletLogin.login();

      expect(errorPresenter.presentConnectionError).toHaveBeenCalledWith(error);
    });
  });
});
