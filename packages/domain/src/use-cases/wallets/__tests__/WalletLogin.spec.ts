import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';

import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import {
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
} from '../../../entities';
import { ActiveProfile } from '../../profile/ActiveProfile';
import {
  WalletLogin,
  IAuthenticationGateway,
  IConnectionErrorPresenter,
  IExternalWalletGateway,
} from '../WalletLogin';
import { IActiveWalletPresenter } from '../IActiveWalletPresenter';

const wallet = mockWallet();

function setupConnectWallet({
  walletGateway = mock<IExternalWalletGateway>(),
  authGateway = mock<IAuthenticationGateway>(),
  walletPresenter = mock<IActiveWalletPresenter>(),
  errorPresenter = mock<IConnectionErrorPresenter>(),
  activeProfile = mock<ActiveProfile>(),
}: {
  walletGateway?: IExternalWalletGateway;
  authGateway?: IAuthenticationGateway;
  walletPresenter?: IActiveWalletPresenter;
  errorPresenter?: IConnectionErrorPresenter;
  activeProfile?: ActiveProfile;
} = {}) {
  return new WalletLogin(
    walletGateway,
    authGateway,
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
        - load the active profile associated with the wallet`, async () => {
      const walletGateway = mock<IExternalWalletGateway>();
      const authGateway = mock<IAuthenticationGateway>();
      const walletPresenter = mock<IActiveWalletPresenter>();
      const activeProfile = mock<ActiveProfile>();

      when(walletGateway.connect)
        .calledWith(wallet.type, ChainType.POLYGON)
        .mockResolvedValue(success(wallet));

      when(authGateway.authenticate)
        .calledWith(wallet)
        .mockResolvedValue(success(mockCredentials({ address: wallet.address })));

      const connectWallet = setupConnectWallet({
        authGateway,
        activeProfile,
        walletGateway,
        walletPresenter,
      });

      await connectWallet.login(wallet.type);

      expect(walletPresenter.presentActiveWallet).toHaveBeenCalledWith(wallet);
      expect(activeProfile.loadActiveProfileByOwnerAddress).toHaveBeenCalledWith(wallet.address);
    });

    it('should handle scenarios where the user cancels the challenge signing operation', async () => {
      const walletGateway = mock<IExternalWalletGateway>();
      const errorPresenter = mock<IConnectionErrorPresenter>();
      const authGateway = mock<IAuthenticationGateway>();
      const error = new UserRejectedError();

      when(walletGateway.connect)
        .calledWith(wallet.type, ChainType.POLYGON)
        .mockResolvedValue(success(wallet));

      when(authGateway.authenticate).calledWith(wallet).mockResolvedValue(failure(error));

      const connectWallet = setupConnectWallet({
        authGateway,
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
