import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  UserRejectedError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '../../../entities';
import { mockCredentials, mockProfile, mockWallet } from '../../../entities/__helpers__/mocks';
import { IActiveProfilePresenter } from '../../profile';
import { ActiveProfileLoader } from '../../profile/ActiveProfileLoader';
import { IActiveWalletPresenter } from '../IActiveWalletPresenter';
import {
  ICredentialsIssuer,
  ICredentialsWriter,
  IWalletFactory,
  IWalletLoginPresenter,
  IWritableWalletGateway,
  WalletLogin,
} from '../WalletLogin';
import { mockWalletLoginRequest } from '../__helpers__/mocks';

function setupTestScenario({
  activeProfileLoader = mock<ActiveProfileLoader>(),
  walletFactory,
  credentialsIssuer,
}: {
  activeProfileLoader?: ActiveProfileLoader;
  walletFactory: IWalletFactory;
  credentialsIssuer: ICredentialsIssuer;
}) {
  const walletGateway = mock<IWritableWalletGateway>();
  const credentialsWriter = mock<ICredentialsWriter>();
  const walletPresenter = mock<IActiveWalletPresenter>();
  const genericPresenter = mock<IWalletLoginPresenter>();
  const activeProfilePresenter = mock<IActiveProfilePresenter>();

  const walletLogin = new WalletLogin(
    walletFactory,
    walletGateway,
    credentialsIssuer,
    credentialsWriter,
    walletPresenter,
    genericPresenter,
    activeProfileLoader,
    activeProfilePresenter,
  );

  return {
    activeProfileLoader,
    activeProfilePresenter,
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
    const activeProfile = mockProfile();

    it(`should:
        - use the IWalletFactory to create the specified ${Wallet.name} entity
        - login with the backend
        - save wallet and credentials
        - load the active profile associated with the wallet
        - present active wallet
        - present active profile
        - present successful result`, async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const activeProfileLoader = mock<ActiveProfileLoader>();

      const credentials = mockCredentials({ address: wallet.address });

      when(walletFactory.create).calledWith(request).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials)
        .calledWith(wallet)
        .mockResolvedValue(success(credentials));
      when(activeProfileLoader.loadActiveProfileByOwnerAddress)
        .calledWith(wallet.address, undefined)
        .mockResolvedValue(activeProfile);

      const {
        walletLogin,
        walletGateway,
        credentialsWriter,
        genericPresenter,
        walletPresenter,
        activeProfilePresenter,
      } = setupTestScenario({
        activeProfileLoader,
        credentialsIssuer,
        walletFactory,
      });

      await walletLogin.login(request);

      expect(walletGateway.save).toHaveBeenCalledWith(wallet);
      expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
      expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(activeProfile);

      expect(genericPresenter.present).toBeCalledWith(success(activeProfile));
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
