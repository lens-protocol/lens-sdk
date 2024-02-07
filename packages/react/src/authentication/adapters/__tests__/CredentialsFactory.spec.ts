import { faker } from '@faker-js/faker';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '@lens-protocol/domain/entities';
import { mockProfileId, mockSignature, mockWallet } from '@lens-protocol/domain/mocks';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { AuthApi, AuthChallenge } from '../AuthApi';
import { CredentialsFactory } from '../CredentialsFactory';
import { mockJwtCredentials } from '../__helpers__/mocks';

const challenge: AuthChallenge = {
  id: faker.datatype.uuid(),
  text: 'Challenge to sign from backend',
};
const signature = mockSignature();
const credentials = mockJwtCredentials();

function setupTestScenario() {
  const wallet = mockWallet();
  const authApi = mock<AuthApi>();
  const credentialsFactory = new CredentialsFactory(authApi);

  return {
    authApi,
    credentialsFactory,
    wallet,
  };
}

describe(`Given an instance of the ${CredentialsFactory.name} class`, () => {
  const profileId = mockProfileId();

  describe(`when the "${CredentialsFactory.prototype.issueCredentials.name}" method is invoked`, () => {
    it('should return new credentials for a certain wallet', async () => {
      const { credentialsFactory, authApi, wallet } = setupTestScenario();

      when(authApi.generateChallenge)
        .calledWith({ for: profileId, signedBy: wallet.address })
        .mockResolvedValue(challenge);
      when(wallet.signMessage).calledWith(challenge.text).mockResolvedValue(success(signature));
      when(authApi.generateCredentials)
        .calledWith({ id: challenge.id, signature })
        .mockResolvedValue(credentials);

      const result = await credentialsFactory.issueCredentials(wallet, profileId);

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
        const { credentialsFactory, authApi, wallet } = setupTestScenario();

        when(authApi.generateChallenge).mockResolvedValue(challenge);
        when(wallet.signMessage).mockResolvedValue(failure(error));

        const result = await credentialsFactory.issueCredentials(wallet, profileId);

        expect(() => result.unwrap()).toThrow(ErrorCtor);
      },
    );
  });

  describe(`when the "${CredentialsFactory.prototype.renewCredentials.name}" method is invoked`, () => {
    it('should return the new credentials', async () => {
      jest.useFakeTimers({
        now: new Date(0),
      });
      const newCredentials = mockJwtCredentials();
      const { credentialsFactory, authApi } = setupTestScenario();

      when(authApi.refreshCredentials)
        .calledWith(credentials.refreshToken)
        .mockResolvedValue(newCredentials);

      const result = await credentialsFactory.renewCredentials(credentials);

      expect(result.unwrap()).toEqual(newCredentials);
    });

    it(`should fail with ${CredentialsExpiredError.name} if the credentials cant be refreshed`, async () => {
      jest.useFakeTimers({
        now: new Date(Number.MAX_SAFE_INTEGER),
      });
      const { credentialsFactory } = setupTestScenario();

      const result = await credentialsFactory.renewCredentials(credentials);
      expect(() => result.unwrap()).toThrow(CredentialsExpiredError);
    });
  });
});
