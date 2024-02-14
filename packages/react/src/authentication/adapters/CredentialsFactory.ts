import { ProfileId, Wallet } from '@lens-protocol/domain/entities';
import {
  CredentialsExpiredError,
  ICredentialsIssuer,
  ICredentialsRenewer,
  LoginError,
} from '@lens-protocol/domain/use-cases/authentication';
import { PromiseResult, failure, success } from '@lens-protocol/shared-kernel';

import { AuthApi } from './AuthApi';
import { JwtCredentials } from './JwtCredentials';

export class CredentialsFactory implements ICredentialsIssuer, ICredentialsRenewer {
  constructor(private auth: AuthApi) {}

  async renewCredentials(
    credentials: JwtCredentials,
  ): PromiseResult<JwtCredentials, CredentialsExpiredError> {
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
  ): PromiseResult<JwtCredentials, LoginError> {
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
