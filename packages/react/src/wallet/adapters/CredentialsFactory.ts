import { Wallet } from '@lens-protocol/domain/entities';
import {
  CredentialsExpiredError,
  ICredentialsRenewer,
} from '@lens-protocol/domain/use-cases/lifecycle';
import { ICredentialsIssuer, LoginError } from '@lens-protocol/domain/use-cases/wallets';
import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { Credentials } from './Credentials';

export interface IAuthMethods {
  generateChallenge(address: string): Promise<string>;
  generateCredentials(address: string, signature: string): Promise<Credentials>;
  refreshCredentials(refreshToken: string): Promise<Credentials>;
}

export class CredentialsFactory implements ICredentialsIssuer, ICredentialsRenewer {
  constructor(private auth: IAuthMethods) {}

  async renewCredentials(
    credentials: Credentials,
  ): PromiseResult<Credentials, CredentialsExpiredError> {
    if (!credentials.canRefresh()) {
      return failure(new CredentialsExpiredError());
    }
    const newCredentials = await this.auth.refreshCredentials(credentials.refreshToken);
    return success(newCredentials);
  }

  async issueCredentials(wallet: Wallet): PromiseResult<Credentials, LoginError> {
    const challenge = await this.auth.generateChallenge(wallet.address);
    const signedChallengeResult = await wallet.signMessage(challenge);
    if (signedChallengeResult.isFailure()) {
      return failure(signedChallengeResult.error);
    }
    const credentials = await this.auth.generateCredentials(
      wallet.address,
      signedChallengeResult.value,
    );

    return success(credentials);
  }
}
