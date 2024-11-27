import type { Role } from '@lens-protocol/graphql';
import type { EvmAddress, Result } from '@lens-protocol/types';
import type { UUID } from '@lens-protocol/types';
import { type IdToken, err, ok } from '@lens-protocol/types';
import { jwtDecode } from 'jwt-decode';
import { UnexpectedError } from './errors';

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
  'tag:lens.dev,2024:sponsored': boolean;

  /**
   * Role - the authenticated role of the user.
   */
  'tag:lens.dev,2024:role': Role;
}

/**
 * Decodes an Id Token into its claims.
 *
 * @param token - The Id Token to decode.
 * @returns The Id Token claims or an Unexpected Error.
 */
export function decodeIdToken(token: IdToken): Result<IdTokenClaims, UnexpectedError> {
  try {
    return ok(jwtDecode(token));
  } catch (cause) {
    return err(UnexpectedError.from(cause));
  }
}
