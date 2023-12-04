import { ProfileId, Wallet } from '@lens-protocol/domain/entities';
import {
  ICredentialsIssuer,
  LoginError,
  CredentialsExpiredError,
  ICredentialsRenewer,
} from '@lens-protocol/domain/use-cases/authentication';
import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { AuthApi } from './AuthApi';
import { Credentials } from './Credentials';

export class CredentialsFactory implements ICredentialsIssuer, ICredentialsRenewer {
  constructor(private auth: AuthApi) {}

  async renewCredentials(
    credentials: Credentials,
  ): PromiseResult<Credentials, CredentialsExpiredError> {
    if (!credentials.canRefresh()) {
      return failure(new CredentialsExpiredError());
    }
    try {
      const newCredentials = await this.auth.refreshCredentials(credentials.refreshToken);
      return success(newCredentials);
    } catch (error) {
      return failure(new CredentialsExpiredError());
    }
  }

  async issueCredentials(
    signer: Wallet,
    using?: ProfileId,
  ): PromiseResult<Credentials, LoginError> {
    const challenge = await this.auth.generateChallenge({
      for: using,
      signedBy: signer.address,
    });

    const result = await signer.signMessage(challenge.text);

    if (result.isFailure()) {
      return result;
    }

    const credentials = await this.auth.generateCredentials({
      id: challenge.id,
      signature: result.value,
    });

    return success(credentials);
  }
}
