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
    const newCredentials = await this.auth.refreshCredentials(credentials.refreshToken);
    return success(newCredentials);
  }

  async issueCredentials(
    forProfile: ProfileId,
    signedBy: Wallet,
  ): PromiseResult<Credentials, LoginError> {
    const challenge = await this.auth.generateChallenge({
      for: forProfile,
      signedBy: signedBy.address,
    });

    const result = await signedBy.signMessage(challenge.text);

    if (result.isFailure()) {
      return failure(result.error);
    }

    const credentials = await this.auth.generateCredentials({
      id: challenge.id,
      signature: result.value,
    });

    return success(credentials);
  }
}
