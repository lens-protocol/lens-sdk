import { PromiseResult } from '@lens-protocol/shared-kernel';

import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { ChallengeRequest, SignedAuthChallenge } from '../graphql/types.generated';
import type { AuthChallengeFragment } from './graphql/auth.generated';

/**
 * Authentication for Lens API.
 *
 * @group LensClient Modules
 */
export interface IAuthentication {
  /**
   * Generate a challenge string for the wallet to sign.
   *
   * @param address - The wallet address
   * @returns A challenge string
   */
  generateChallenge(request: ChallengeRequest): Promise<AuthChallengeFragment>;

  /**
   * Authenticate the user with the wallet address and signature of the challenge.
   *
   * @param address - The wallet address
   * @param signature - The signature of the challenge
   */
  authenticate(request: SignedAuthChallenge): Promise<void>;

  /**
   * Verify that the access token is signed by the server and the user.
   *
   * @param accessToken - The access token to verify
   * @returns Whether the access token is valid
   */
  verify(accessToken: string): Promise<boolean>;

  /**
   * Check if the user is authenticated. If the credentials are expired, try to refresh them.
   *
   * @returns Whether the user is authenticated
   */
  isAuthenticated(): Promise<boolean>;

  /**
   * Get the access token. If it expired, try to refresh it.
   *
   * @returns The access token
   */
  getAccessToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError>;
}
