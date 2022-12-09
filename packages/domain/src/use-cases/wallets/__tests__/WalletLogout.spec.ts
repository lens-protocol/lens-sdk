import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockWallet } from '../../../entities/__helpers__/mocks';
import { IActiveProfileGateway, IActiveProfilePresenter } from '../../profile';
import { ILoginPresenter } from '../ILoginPresenter';
import { ActiveWallet } from '../ActiveWallet';
import { IActiveWalletPresenter } from '../IActiveWalletPresenter';
import {
  IResettableCredentialsGateway,
  IResettableWalletGateway,
  LogoutReason,
  WalletLogout,
} from '../WalletLogout';

const wallet = mockWallet();

const setupWalletLogout = ({
  activeProfileGateway = mock<IActiveProfileGateway>(),
  activeProfilePresenter = mock<IActiveProfilePresenter>(),
  activeWallet = mock<ActiveWallet>(),
  credentialsGateway = mock<IResettableCredentialsGateway>(),
  walletGateway = mock<IResettableWalletGateway>(),
  activeWalletPresenter = mock<IActiveWalletPresenter>(),
  loginPresenter = mock<ILoginPresenter>(),
}: {
  activeProfileGateway?: IActiveProfileGateway;
  activeProfilePresenter?: IActiveProfilePresenter;
  activeWallet?: ActiveWallet;
  credentialsGateway?: IResettableCredentialsGateway;
  walletGateway?: IResettableWalletGateway;
  activeWalletPresenter?: IActiveWalletPresenter;
  loginPresenter?: ILoginPresenter;
}) => {
  return new WalletLogout(
    walletGateway,
    credentialsGateway,
    activeWallet,
    activeProfileGateway,
    activeProfilePresenter,
    activeWalletPresenter,
    loginPresenter,
  );
};

describe(`Given the ${WalletLogout.name} interactor`, () => {
  describe(`when "${WalletLogout.prototype.logout.name}" is invoked`, () => {
    describe('with USER_INITIATED logout reason', () => {
      it(`should:
          - clear wallets from storage
          - clear credentials from storage
          - clear active profile from storage
          - present an empty profile
          - present an empty wallet`, async () => {
        const walletGateway = mock<IResettableWalletGateway>();
        const credentialsGateway = mock<IResettableCredentialsGateway>();
        const activeWallet = mock<ActiveWallet>();
        const activeWalletPresenter = mock<IActiveWalletPresenter>();
        const activeProfilePresenter = mock<IActiveProfilePresenter>();
        const activeProfileGateway = mock<IActiveProfileGateway>();

        when(activeWallet.requireActiveWallet).calledWith().mockResolvedValue(wallet);

        const walletLogout = setupWalletLogout({
          activeProfileGateway,
          activeProfilePresenter,
          activeWallet,
          activeWalletPresenter,
          credentialsGateway,
          walletGateway,
        });

        await walletLogout.logout(LogoutReason.USER_INITIATED);

        expect(credentialsGateway.invalidate).toHaveBeenCalled();
        expect(walletGateway.reset).toHaveBeenCalled();
        expect(activeProfileGateway.reset).toHaveBeenCalled();
        expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(null);
        expect(activeWalletPresenter.presentActiveWallet).toHaveBeenCalledWith(null);
      });
    });

    describe('with TOKEN_EXPIRED logout reason', () => {
      it(`should:
          - clear wallets from storage
          - clear credentials from storage
          - clear active profile from storage
          - present an empty wallet
          - present login options with previously connected wallet`, async () => {
        const walletGateway = mock<IResettableWalletGateway>();
        const credentialsGateway = mock<IResettableCredentialsGateway>();
        const activeWallet = mock<ActiveWallet>();
        const activeWalletPresenter = mock<IActiveWalletPresenter>();
        const activeProfileGateway = mock<IActiveProfileGateway>();
        const activeProfilePresenter = mock<IActiveProfilePresenter>();

        const loginPresenter = mock<ILoginPresenter>();

        when(activeWallet.requireActiveWallet).calledWith().mockResolvedValue(wallet);

        const walletLogout = setupWalletLogout({
          activeProfileGateway,
          activeProfilePresenter,
          activeWallet,
          activeWalletPresenter,
          credentialsGateway,
          loginPresenter,
          walletGateway,
        });

        await walletLogout.logout(LogoutReason.TOKEN_EXPIRED);

        expect(credentialsGateway.invalidate).toHaveBeenCalled();
        expect(walletGateway.reset).toHaveBeenCalled();
        expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(null);
        expect(activeWalletPresenter.presentActiveWallet).toHaveBeenCalledWith(null);
        expect(loginPresenter.presentLoginOptions).toHaveBeenCalledWith(wallet);
      });
    });
  });
});
