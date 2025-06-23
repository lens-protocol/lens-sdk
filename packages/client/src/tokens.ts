import type { Role } from '@lens-protocol/graphql';
import type {
  AccessToken,
  EvmAddress,
  Result,
  UUID,
} from '@lens-protocol/types';
import { err, type IdToken, ok } from '@lens-protocol/types';
import { jwtDecode } from 'jwt-decode';
import { UnexpectedError } from './errors';

export const SPONSORED_CLAIM = 'tag:lens.dev,2024:sponsored';
export const ROLE_CLAIM = 'tag:lens.dev,2024:role';

export interface ActorClaim {
  sub: EvmAddress;
}

export interface IdTokenClaims {
  /**
   * Subject - the `signedBy` address used to sign the Authentication Challenge.
   * This could be the Account or an Account Manager for it.
   * Example: 0xC47Cccc2bf4CF2635a817C01c6A6d965045b06e6
   */
  sub: EvmAddress;

  /**
   * Issuer - the Lens API instance that issued the token.
   * Typically: https://api-v3.lens.dev
   */
  iss: string;

  /**
   * Audience - the Lens App address that the token is intended for.
   * Example: 0x00004747f7a56EE7Af7237220c960a7D06232626
   */
  aud: EvmAddress;

  /**
   * Issued At - the timestamp when the token was issued.
   */
  iat: number;

  /**
   * Expiration - the timestamp indicating when the token will expire.
   * This is used to determine when to preemptively refresh the token.
   */
  exp: number;

  /**
   * Session ID - the unique identifier of the session that the token was issued for.
   */
  sid: UUID;

  /**
   * Optional claim that allows the token to act on behalf of another Account.
   * This is useful for Account Managers to specify the Account address they can act on behalf of.
   */
  act?: ActorClaim | null;

  /**
   * Sponsored - a boolean indicating if the Account is sponsored.
   */
  [SPONSORED_CLAIM]: boolean;

  /**
   * Role - the authenticated role of the user.
   */
  [ROLE_CLAIM]: Role;
}

/**
 * Decodes an Id Token into its claims.
 *
 * @param token - The Id Token to decode.
 * @returns The Id Token claims or an Unexpected Error.
 */
export function decodeIdToken(
  token: IdToken,
): Result<IdTokenClaims, UnexpectedError> {
  try {
    return ok(jwtDecode(token));
  } catch (cause) {
    return err(UnexpectedError.from(cause));
  }
}

/**
 * @internal
 */
export interface AccessTokenClaims {
  /**
   * Subject - the `signedBy` address used to sign the Authentication Challenge.
   * This could be the Account or an Account Manager for it.
   * Example: 0xC47Cccc2bf4CF2635a817C01c6A6d965045b06e6
   */
  sub: EvmAddress;

  /**
   * Issuer - the Lens API instance that issued the token.
   * Typically:
   * - Mainnet: https://api.lens.dev
   * - Testnet: https://api.testnet.lens.dev
   * - Staging: https://api-staging.lens.dev
   * - Local: http://localhost:3000
   */
  iss: string;

  /**
   * Audience - the Lens API instance that the token is intended for.
   * Example: https://api.lens.dev
   */
  aud: string;

  /**
   * Issued At - the timestamp when the token was issued.
   */
  iat: number;

  /**
   * Expiration - the timestamp indicating when the token will expire.
   * This is used to determine when to preemptively refresh the token.
   */
  exp: number;

  /**
   * Session ID - the unique identifier of the session that the token was issued for.
   */
  sid: UUID;

  /**
   * Lens App Address - the Lens App address that the token was issued for.
   * Example: 0x00004747f7a56EE7Af7237220c960a7D06232626
   */
  client_id: EvmAddress;

  /**
   * Optional claim that allows the token to act on behalf of another Account.
   * This is useful for Account Managers to specify the Account address they can act on behalf of.
   */
  act?: ActorClaim | null;

  /**
   * Optional claim that specifies the scope of the token.
   * A space-separated lowercase string of permissions.
   */
  scope?: string[] | null;

  /**
   * Sponsored - a boolean indicating if the Account is sponsored.
   */
  [SPONSORED_CLAIM]: boolean;

  /**
   * Role - the authenticated role of the user.
   */
  [ROLE_CLAIM]: Role;
}

/**
 * @internal
 */
export function decodeAccessToken(
  token: AccessToken,
): Result<AccessTokenClaims, UnexpectedError> {
  try {
    return ok(jwtDecode(token));
  } catch (cause) {
    return err(UnexpectedError.from(cause));
  }
}
