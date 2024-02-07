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
import { IWalletFactory } from '../../wallets/IWalletFactory';
import { ICredentialsWriter } from '../ICredentialsWriter';
import { ICredentialsIssuer, ILoginPresenter, IWritableWalletGateway, Login } from '../Login';
import { profileSessionData, walletOnlySessionData } from '../SessionData';
import { mockJustWalletLoginRequest, mockProfileLoginRequest } from '../__helpers__/mocks';

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
    const wallet = mockWallet();

    describe('with a profile ID', () => {
      const request = mockProfileLoginRequest({
        address: wallet.address,
      });

      it(`should:
        - use the IWalletFactory to create the specified ${Wallet.name} entity
        - generate new credentials for the wallet and specified profile
        - save wallet and credentials
        - present successful ProfileSessionData`, async () => {
        const walletFactory = mock<IWalletFactory>();
        const credentialsIssuer = mock<ICredentialsIssuer>();

        const credentials = mockCredentials({ address: wallet.address });

        when(walletFactory.create).calledWith(request.address).mockResolvedValue(wallet);
        when(credentialsIssuer.issueCredentials)
          .calledWith(wallet, request.profileId)
          .mockResolvedValue(success(credentials));

        const { interactor, walletGateway, credentialsWriter, loginPresenter } = setupTestScenario({
          credentialsIssuer,
          walletFactory,
        });

        await interactor.execute(request);

        expect(walletGateway.save).toHaveBeenCalledWith(wallet);
        expect(credentialsWriter.save).toHaveBeenCalledWith(credentials);
        expect(loginPresenter.present).toBeCalledWith(
          success(
            profileSessionData({
              address: wallet.address,
              profileId: request.profileId ?? never(),
            }),
          ),
        );
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
    });

    describe('with just an EVM address', () => {
      const request = mockJustWalletLoginRequest({
        address: wallet.address,
      });

      it(`should:
        - use the IWalletFactory to create the specified ${Wallet.name} entity
        - generate new credentials for the address
        - save wallet and credentials
        - present successful WalletOnlySessionData`, async () => {
        const walletFactory = mock<IWalletFactory>();
        const credentialsIssuer = mock<ICredentialsIssuer>();

        const credentials = mockCredentials({ address: wallet.address });

        when(walletFactory.create).calledWith(request.address).mockResolvedValue(wallet);
        when(credentialsIssuer.issueCredentials)
          .calledWith(wallet, undefined)
          .mockResolvedValue(success(credentials));

        const { interactor, walletGateway, credentialsWriter, loginPresenter } = setupTestScenario({
          credentialsIssuer,
          walletFactory,
        });

        await interactor.execute(request);

        expect(walletGateway.save).toHaveBeenCalledWith(wallet);
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
    });

    it('should handle scenarios where there is a wallet connection error', async () => {
      const request = mockProfileLoginRequest({
        address: wallet.address,
      });

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
