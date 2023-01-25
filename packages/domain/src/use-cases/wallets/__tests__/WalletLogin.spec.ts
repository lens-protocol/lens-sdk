import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
  Wallet,
} from '../../../entities';
import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveProfileLoader } from '../../profile/ActiveProfileLoader';
import { IActiveWalletPresenter } from '../IActiveWalletPresenter';
import {
  WalletLogin,
  ICredentialsIssuer,
  ICredentialsWriter,
  IWalletFactory,
  IWritableWalletGateway,
  IWalletLoginPresenter,
} from '../WalletLogin';
import { mockWalletLoginRequest } from '../__helpers__/mocks';

function setupTestScenario({
  walletFactory,
  credentialsIssuer,
}: {
  walletFactory: IWalletFactory;
  credentialsIssuer: ICredentialsIssuer;
}) {
  const walletGateway = mock<IWritableWalletGateway>();
  const credentialsWriter = mock<ICredentialsWriter>();
  const walletPresenter = mock<IActiveWalletPresenter>();
  const genericPresenter = mock<IWalletLoginPresenter>();
  const activeProfileLoader = mock<ActiveProfileLoader>();

  const walletLogin = new WalletLogin(
    walletFactory,
    walletGateway,
    credentialsIssuer,
    credentialsWriter,
    walletPresenter,
    genericPresenter,
    activeProfileLoader,
  );

  return {
    activeProfileLoader,
    credentialsIssuer,
    credentialsWriter,
    genericPresenter,
    walletFactory,
    walletGateway,
    walletLogin,
    walletPresenter,
  };
}

describe(`Given the ${WalletLogin.name} interactor`, () => {
  describe(`when "${WalletLogin.prototype.login.name}" is invoked`, () => {
    const request = mockWalletLoginRequest();
    const wallet = mockWallet(request);

    it(`should:
        - use the IWalletFactory to create the specified ${Wallet.name} entity
        - login with the backend
        - save wallet and credentials
        - load the active profile associated with the wallet
        - present successful result`, async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();

      const credentials = mockCredentials({ address: wallet.address });

      when(walletFactory.create).calledWith(request).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials)
        .calledWith(wallet)
        .mockResolvedValue(success(credentials));

      const {
        walletLogin,
        walletGateway,
        credentialsWriter,
        genericPresenter,
        walletPresenter,
        activeProfileLoader,
      } = setupTestScenario({
        credentialsIssuer,
        walletFactory,
      });

      await walletLogin.login(request);

      expect(walletGateway.save).toHaveBeenCalledWith(wallet);
      expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
      expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
      expect(activeProfileLoader.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(
        wallet.address,
      );
      expect(genericPresenter.present).toBeCalledWith(success());
    });

    it('should handle scenarios where the user cancels the challenge signing operation', async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new UserRejectedError();

      when(walletFactory.create).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials).calledWith(wallet).mockResolvedValue(failure(error));

      const { genericPresenter, walletLogin } = setupTestScenario({
        credentialsIssuer,
        walletFactory,
      });

      await walletLogin.login(request);

      expect(genericPresenter.present).toHaveBeenCalledWith(failure(error));
    });

    it('should handle scenarios where there is a wallet connection error', async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT);

      when(walletFactory.create).calledWith(request).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials).calledWith(wallet).mockResolvedValue(failure(error));

      const { genericPresenter, walletLogin } = setupTestScenario({
        credentialsIssuer,
        walletFactory,
      });

      await walletLogin.login(request);

      expect(genericPresenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
