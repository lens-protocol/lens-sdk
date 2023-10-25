import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  UserRejectedError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '../../../entities';
import { mockICredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { ICredentialsWriter } from '../ICredentialsWriter';
import {
  ICredentialsIssuer,
  IWalletFactory,
  ILoginPresenter,
  IWritableWalletGateway,
  Login,
} from '../Login';
import { profileSessionData } from '../SessionData';
import { mockLoginRequest } from '../__helpers__/mocks';

function setupTestScenario({
  walletFactory,
  credentialsIssuer,
}: {
  walletFactory: IWalletFactory;
  credentialsIssuer: ICredentialsIssuer;
}) {
  const walletGateway = mock<IWritableWalletGateway>();
  const credentialsWriter = mock<ICredentialsWriter>();
  const loginPresenter = mock<ILoginPresenter>();

  const interactor = new Login(
    walletFactory,
    walletGateway,
    credentialsIssuer,
    credentialsWriter,
    loginPresenter,
  );

  return {
    credentialsIssuer,
    credentialsWriter,
    loginPresenter,
    walletFactory,
    walletGateway,
    interactor,
  };
}

describe(`Given the ${Login.name} interactor`, () => {
  describe(`when "${Login.prototype.execute.name}" is invoked`, () => {
    const request = mockLoginRequest();
    const wallet = mockWallet(request);

    it(`should:
        - use the IWalletFactory to create the specified ${Wallet.name} entity
        - generate new credentials for the wallet
        - save wallet and credentials
        - present successful result`, async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();

      const credentials = mockICredentials({ address: wallet.address });

      when(walletFactory.create).calledWith(request.address).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials)
        .calledWith(request.profileId, wallet)
        .mockResolvedValue(success(credentials));

      const { interactor, walletGateway, credentialsWriter, loginPresenter } = setupTestScenario({
        credentialsIssuer,
        walletFactory,
      });

      await interactor.execute(request);

      expect(walletGateway.save).toHaveBeenCalledWith(wallet);
      expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
      expect(loginPresenter.present).toBeCalledWith(success(profileSessionData(request)));
    });

    it('should handle scenarios where the user cancels the challenge signing operation', async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new UserRejectedError();

      when(walletFactory.create).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials).mockResolvedValue(failure(error));

      const { loginPresenter, interactor } = setupTestScenario({
        credentialsIssuer,
        walletFactory,
      });

      await interactor.execute(request);

      expect(loginPresenter.present).toHaveBeenCalledWith(failure(error));
    });

    it('should handle scenarios where there is a wallet connection error', async () => {
      const walletFactory = mock<IWalletFactory>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT);

      when(walletFactory.create).calledWith(request.address).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials).mockResolvedValue(failure(error));

      const { loginPresenter, interactor } = setupTestScenario({
        credentialsIssuer,
        walletFactory,
      });

      await interactor.execute(request);

      expect(loginPresenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
