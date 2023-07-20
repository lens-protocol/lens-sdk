import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '@lens-protocol/domain/entities';
import { mockSignature, mockWallet } from '@lens-protocol/domain/mocks';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/lifecycle';
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Credentials } from '../Credentials';
import { CredentialsFactory, IAuthMethods } from '../CredentialsFactory';

const challenge = 'Challenge to sign from backend';
const signedChallenge = mockSignature();

const setupFactory = () => {
  const authApi = mock<IAuthMethods>();
  const credentialsFactory = new CredentialsFactory(authApi);
  const wallet = mockWallet();
  const credentials = mock<Credentials>({
    canRefresh: () => true,
    address: wallet.address,
  });
  return {
    authApi,
    credentialsFactory,
    wallet,
    credentials,
  };
};

describe(`Given an instance of the ${CredentialsFactory.name} class`, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe(`when ${CredentialsFactory.prototype.issueCredentials.name} method is called`, () => {
    it('should return new credentials for a certain wallet', async () => {
      const { credentialsFactory, wallet, authApi, credentials } = setupFactory();
      when(authApi.generateChallenge).calledWith(wallet.address).mockResolvedValue(challenge);
      when(wallet.signMessage).calledWith(challenge).mockResolvedValue(success(signedChallenge));
      when(authApi.generateCredentials)
        .calledWith(wallet.address, signedChallenge)
        .mockResolvedValue(credentials);

      const result = await credentialsFactory.issueCredentials(wallet);
      expect(result.unwrap()).toEqual(credentials);
    });
    it.each([
      {
        ErrorCtor: UserRejectedError,
        error: new UserRejectedError(),
      },
      {
        ErrorCtor: WalletConnectionError,
        error: new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT),
      },
      {
        ErrorCtor: PendingSigningRequestError,
        error: new PendingSigningRequestError(),
      },
    ])(
      `should fail with $ErrorCtor.name if the challenge signing fails with it`,
      async ({ ErrorCtor, error }) => {
        const { credentialsFactory, wallet, authApi } = setupFactory();
        when(authApi.generateChallenge).calledWith(wallet.address).mockResolvedValue(challenge);
        when(wallet.signMessage).calledWith(challenge).mockResolvedValue(failure(error));

        const result = await credentialsFactory.issueCredentials(wallet);
        expect(() => result.unwrap()).toThrow(ErrorCtor);
      },
    );
  });

  describe(`when ${CredentialsFactory.prototype.renewCredentials.name} method is called`, () => {
    it(`should fail with ${CredentialsExpiredError.name} if the credentials cant be refreshed`, async () => {
      const { credentialsFactory } = setupFactory();
      const credentials = mock<Credentials>({
        canRefresh: () => false,
      });

      const result = await credentialsFactory.renewCredentials(credentials);
      expect(() => result.unwrap()).toThrow(CredentialsExpiredError);
    });
    it('should return the new credentials if the credentials can be refreshed', async () => {
      const { credentialsFactory, credentials, authApi } = setupFactory();
      const newCredentials = mock<Credentials>();
      when(authApi.refreshCredentials)
        .calledWith(credentials.refreshToken)
        .mockResolvedValue(newCredentials);

      const result = await credentialsFactory.renewCredentials(credentials);
      expect(result.unwrap()).toEqual(newCredentials);
    });
  });
});
