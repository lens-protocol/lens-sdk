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
  IExternalWalletGateway,
} from '../WalletLogin';

const wallet = mockWallet();

function setupConnectWallet({
  walletGateway = mock<IExternalWalletGateway>(),
  credentialsIssuer = mock<ICredentialsIssuer>(),
  credentialsWriter = mock<ICredentialsWriter>(),
  walletPresenter = mock<IActiveWalletPresenter>(),
  errorPresenter = mock<IConnectionErrorPresenter>(),
  activeProfile = mock<ActiveProfile>(),
}: {
  walletGateway?: IExternalWalletGateway;
  credentialsIssuer?: ICredentialsIssuer;
  credentialsWriter?: ICredentialsWriter
  walletPresenter?: IActiveWalletPresenter;
  errorPresenter?: IConnectionErrorPresenter;
  activeProfile?: ActiveProfile;
} = {}) {
  return new WalletLogin(
    walletGateway,
    credentialsIssuer,
    credentialsWriter,
    walletPresenter,
    errorPresenter,
    activeProfile,
  );
}

describe(`Given the ${WalletLogin.name} interactor`, () => {
  describe(`when "${WalletLogin.prototype.login.name}" is invoked`, () => {
    it(`should:
        - connect with an external wallet
        - login with the backend
        - save the credentials
        - load the active profile associated with the wallet`, async () => {
      const walletGateway = mock<IExternalWalletGateway>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const credentialsWriter = mock<ICredentialsWriter>();
      const walletPresenter = mock<IActiveWalletPresenter>();
      const activeProfile = mock<ActiveProfile>();

      const credentials = mockCredentials({ address: wallet.address })

      when(walletGateway.connect)
        .calledWith(wallet.type, ChainType.POLYGON)
        .mockResolvedValue(success(wallet));

      when(credentialsIssuer.issueCredentials)
        .calledWith(wallet)
        .mockResolvedValue(success(credentials));

      const connectWallet = setupConnectWallet({
        credentialsIssuer,
        activeProfile,
        walletGateway,
        walletPresenter,
        credentialsWriter
      });

      await connectWallet.login(wallet.type);

      expect(credentialsWriter.save).toHaveBeenCalledWith(credentials)
      expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
      expect(activeProfile.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(wallet.address);
    });

    it('should handle scenarios where the user cancels the challenge signing operation', async () => {
      const walletGateway = mock<IExternalWalletGateway>();
      const errorPresenter = mock<IConnectionErrorPresenter>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new UserRejectedError();

      when(walletGateway.connect)
        .calledWith(wallet.type, ChainType.POLYGON)
        .mockResolvedValue(success(wallet));

      when(credentialsIssuer.issueCredentials).calledWith(wallet).mockResolvedValue(failure(error));

      const connectWallet = setupConnectWallet({
        credentialsIssuer,
        errorPresenter,
        walletGateway,
      });

      await connectWallet.login(wallet.type);

      expect(errorPresenter.presentConnectionError).toHaveBeenCalledWith(error);
    });

    it('should handle scenarios where there is a wallet connection error', async () => {
      const walletGateway = mock<IExternalWalletGateway>();
      const errorPresenter = mock<IConnectionErrorPresenter>();
      const error = new WalletConnectionError(WalletConnectionErrorReason.CONNECTION_REFUSED);

      when(walletGateway.connect)
        .calledWith(wallet.type, ChainType.POLYGON)
        .mockResolvedValue(failure(error));

      const connectWallet = setupConnectWallet({ errorPresenter, walletGateway });

      await connectWallet.login(wallet.type);

      expect(errorPresenter.presentConnectionError).toHaveBeenCalledWith(error);
    });
  });
});
