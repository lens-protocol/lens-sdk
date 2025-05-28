import { Role } from '@lens-protocol/graphql';
import { type EvmAddress, type Result, type UUID, err, never, ok } from '@lens-protocol/types';
import { UnexpectedError } from './errors';
import { type IdTokenClaims, ROLE_CLAIM, SPONSORED_CLAIM } from './tokens';

export type AuthenticatedUser = {
  address: EvmAddress;
  app: EvmAddress;
  authenticationId: UUID;
  role: Role;
  signer: EvmAddress;
  sponsored: boolean;
};

/**
 * @internal
 */
export function authenticatedUser(
  claims: IdTokenClaims,
): Result<AuthenticatedUser, UnexpectedError> {
  switch (claims[ROLE_CLAIM]) {
    case Role.AccountManager:
      return ok({
        address: claims.act?.sub ?? never('Account Manager must have an Actor Claim'),
        app: claims.aud,
        authenticationId: claims.sid,
        role: Role.AccountManager,
        signer: claims.sub,
        sponsored: claims[SPONSORED_CLAIM],
      });

    case Role.AccountOwner:
      return ok({
        address: claims.act?.sub ?? never('Account Owner must have an Actor Claim'),
        app: claims.aud,
        authenticationId: claims.sid,
        role: Role.AccountOwner,
        signer: claims.sub,
        sponsored: claims[SPONSORED_CLAIM],
      });

    case Role.OnboardingUser:
    case Role.Builder:
    case Role.UnverifiedEOA:
      return ok({
        address: claims.sub,
        app: claims.aud,
        authenticationId: claims.sid,
        role: claims[ROLE_CLAIM],
        signer: claims.sub,
        sponsored: claims[SPONSORED_CLAIM],
      });

    default:
      return err(UnexpectedError.from(`Unexpected role: ${claims[ROLE_CLAIM]}`));
  }
}
