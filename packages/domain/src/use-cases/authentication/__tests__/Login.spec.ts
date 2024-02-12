import { failure, never, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  UserRejectedError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '../../../entities';
import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { IWalletGateway } from '../../wallets/IWalletGateway';
import { ICredentialsWriter } from '../ICredentialsWriter';
import { ICredentialsIssuer, ILoginPresenter, Login } from '../Login';
import { profileSessionData, walletOnlySessionData } from '../SessionData';
import { mockJustWalletLoginRequest, mockProfileLoginRequest } from '../__helpers__/mocks';

function setupTestScenario({
  walletGateway,
  credentialsIssuer,
}: {
  walletGateway: IWalletGateway;
  credentialsIssuer: ICredentialsIssuer;
}) {
  const credentialsWriter = mock<ICredentialsWriter>();
  const loginPresenter = mock<ILoginPresenter>();

  const interactor = new Login(walletGateway, credentialsIssuer, credentialsWriter, loginPresenter);

  return {
    credentialsIssuer,
    credentialsWriter,
    loginPresenter,
    walletGateway,
    interactor,
  };
}

describe(`Given the ${Login.name} interactor`, () => {
  describe(`when "${Login.prototype.execute.name}" is invoked`, () => {
    const wallet = mockWallet();

    describe('with a profile ID', () => {
      const request = mockProfileLoginRequest({
        address: wallet.address,
      });

      it(`should:
        - use the IWalletGateway to retrieve the specified ${Wallet.name} entity
        - generate new credentials for the wallet and specified profile
        - present successful ProfileSessionData`, async () => {
        const walletGateway = mock<IWalletGateway>();
        when(walletGateway.getByAddress).calledWith(request.address).mockResolvedValue(wallet);

        const credentialsIssuer = mock<ICredentialsIssuer>();
        const credentials = mockCredentials({ address: wallet.address });
        when(credentialsIssuer.issueCredentials)
          .calledWith(wallet, request.profileId)
          .mockResolvedValue(success(credentials));

        const { interactor, credentialsWriter, loginPresenter } = setupTestScenario({
          credentialsIssuer,
          walletGateway,
        });

        await interactor.execute(request);

        expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
        expect(loginPresenter.present).toHaveBeenCalledWith(
          success(
            profileSessionData({
              address: wallet.address,
              profileId: request.profileId ?? never(),
            }),
          ),
        );
      });

      it('should handle scenarios where the user cancels the challenge signing operation', async () => {
        const walletGateway = mock<IWalletGateway>();
        const credentialsIssuer = mock<ICredentialsIssuer>();
        const error = new UserRejectedError();

        when(walletGateway.getByAddress).calledWith(request.address).mockResolvedValue(wallet);
        when(credentialsIssuer.issueCredentials).mockResolvedValue(failure(error));

        const { loginPresenter, interactor } = setupTestScenario({
          credentialsIssuer,
          walletGateway,
        });

        await interactor.execute(request);

        expect(loginPresenter.present).toHaveBeenCalledWith(failure(error));
      });
    });

    describe('with just an EVM address', () => {
      const request = mockJustWalletLoginRequest({
        address: wallet.address,
      });

      it(`should:
        - use the IWalletGateway to retrieve the specified ${Wallet.name} entity
        - generate new credentials for the address
        - present successful WalletOnlySessionData`, async () => {
        const walletGateway = mock<IWalletGateway>();
        const credentialsIssuer = mock<ICredentialsIssuer>();

        const credentials = mockCredentials({ address: wallet.address });

        when(walletGateway.getByAddress).calledWith(request.address).mockResolvedValue(wallet);
        when(credentialsIssuer.issueCredentials)
          .calledWith(wallet, undefined)
          .mockResolvedValue(success(credentials));

        const { interactor, credentialsWriter, loginPresenter } = setupTestScenario({
          credentialsIssuer,
          walletGateway,
        });

        await interactor.execute(request);

        expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
        expect(loginPresenter.present).toBeCalledWith(
          success(
            walletOnlySessionData({
              address: wallet.address,
            }),
          ),
        );
      });

      it('should handle scenarios where the user cancels the challenge signing operation', async () => {
        const walletGateway = mock<IWalletGateway>();
        const credentialsIssuer = mock<ICredentialsIssuer>();
        const error = new UserRejectedError();

        when(walletGateway.getByAddress).calledWith(request.address).mockResolvedValue(wallet);
        when(credentialsIssuer.issueCredentials).mockResolvedValue(failure(error));

        const { loginPresenter, interactor } = setupTestScenario({
          credentialsIssuer,
          walletGateway,
        });

        await interactor.execute(request);

        expect(loginPresenter.present).toHaveBeenCalledWith(failure(error));
      });
    });

    it('should handle scenarios where there is a wallet connection error', async () => {
      const request = mockProfileLoginRequest({
        address: wallet.address,
      });

      const walletGateway = mock<IWalletGateway>();
      const credentialsIssuer = mock<ICredentialsIssuer>();
      const error = new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT);

      when(walletGateway.getByAddress).calledWith(request.address).mockResolvedValue(wallet);
      when(credentialsIssuer.issueCredentials).mockResolvedValue(failure(error));

      const { loginPresenter, interactor } = setupTestScenario({
        credentialsIssuer,
        walletGateway,
      });

      await interactor.execute(request);

      expect(loginPresenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
