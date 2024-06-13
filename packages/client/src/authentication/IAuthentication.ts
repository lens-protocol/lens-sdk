import { PromiseResult } from '@lens-protocol/shared-kernel';

import { CredentialsExpiredError, NotAuthenticatedError } from '../errors';
import type {
  ApprovedAuthenticationRequest,
  ChallengeRequest,
  RevokeAuthenticationRequest,
  SignedAuthChallenge,
  VerifyRequest,
  WalletAuthenticationToProfileAuthenticationRequest,
} from '../graphql/types.generated';
import type { PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import type {
  ApprovedAuthenticationFragment,
  AuthChallengeFragment,
} from './graphql/auth.generated';

/**
 * Authentication for Lens API.
 *
 * @group LensClient Modules
 */
export interface IAuthentication {
  /**
   * Authenticate with an existing, valid refresh token.
   */
  authenticateWith({ refreshToken }: { refreshToken: string }): Promise<void>;

  /**
   * Generate a challenge for a wallet or profile to sign.
   *
   * @param request - Challenge request
   * @returns A challenge string
   */
  generateChallenge(request: ChallengeRequest): Promise<AuthChallengeFragment>;

  /**
   * Authenticate a user with a signature.
   *
   * @param request - Authentication request
   */
  authenticate(request: SignedAuthChallenge): Promise<void>;

  /**
   * Upgrade the credentials from wallet only to profile authentication.
   *
   * ⚠️ Requires authenticated LensClient with wallet only.
   *
   * @example
   * ```ts
   * await client.authentication.upgradeCredentials();
   * ```
   */
  upgradeCredentials(
    request: WalletAuthenticationToProfileAuthenticationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError>;

  /**
   * Check the validity of the provided token.
   *
   * @deprecated Use with {@link VerifyRequest} instead.
   *
   * @param request - Access token as a string
   * @returns Whether the provided token is valid
   */
  verify(request: string): Promise<boolean>;

  /**
   * Check the validity of the provided token.
   *
   * @param request - Verify request
   * @returns Whether the provided token is valid
   */
  verify(request: VerifyRequest): Promise<boolean>;

  /**
   * Check if the user is authenticated. If the credentials are expired, try to refresh them.
   *
   * @returns Whether the user is authenticated
   */
  isAuthenticated(): Promise<boolean>;

  /**
   * Get the access token.
   *
   * @returns A Result with the access token or possible error scenarios
   */
  getAccessToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError>;

  /**
   * Get the refresh token.
   *
   * @returns A Result with the refresh token or possible error scenarios
   */
  getRefreshToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError>;

  /**
   * Get the identity token.
   *
   * @returns A Result with the identity token or possible error scenarios
   */
  getIdentityToken(): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError>;

  /**
   * Get the authenticated profile id.
   *
   * @returns The profile id or null if not authenticated or authenticated with wallet only
   */
  getProfileId(): Promise<string | null>;

  /**
   * Get the authenticated wallet address.
   *
   * @returns The wallet address or null if not authenticated
   */
  getWalletAddress(): Promise<string | null>;

  /**
   * Get the authorization id needed to revoke the active authentication session.
   *
   * @returns The authorization id or null if not authenticated
   */
  getAuthorizationId(): Promise<string | null>;

  /**
   * Logout the authenticated profile. Cleanup the storage.
   *
   * @returns Nothing
   */
  logout(): Promise<void>;

  /**
   * Fetch current active authentication session.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link ApprovedAuthenticationFragment}
   *
   * ```ts
   * const result = await client.authentication.fetch();
   * ```
   */
  fetch(): PromiseResult<
    ApprovedAuthenticationFragment,
    CredentialsExpiredError | NotAuthenticatedError
  >;

  /**
   * Fetch all active authentication sessions.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns {@link ApprovedAuthenticationFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.authentication.fetchAll();
   * ```
   */
  fetchAll(
    request?: ApprovedAuthenticationRequest,
  ): PromiseResult<
    PaginatedResult<ApprovedAuthenticationFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  >;

  /**
   * Revoke an active authentication session.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * await client.authentication.revoke({
   *   authorizationId: '8a905b63-1236-4d69-8969-95e93b7dd35d',
   * });
   * ```
   */
  revoke(
    request: RevokeAuthenticationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError>;
}
