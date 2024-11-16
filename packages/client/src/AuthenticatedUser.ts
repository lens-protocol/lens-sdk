import { Role } from '@lens-social/graphql';
import { type EvmAddress, type Result, type UUID, err, never, ok } from '@lens-social/types';
import { UnexpectedError } from './errors';
import type { IdTokenClaims } from './tokens';

export type AccountManager = {
  role: Role.AccountManager;
  authentication_id: UUID;
  account: EvmAddress;
  app: EvmAddress;
  manager: EvmAddress;
  sponsored: boolean;
};

export type AccountOwner = {
  role: Role.AccountOwner;
  authentication_id: UUID;
  account: EvmAddress;
  app: EvmAddress;
  owner: EvmAddress;
  sponsored: boolean;
};

export type OnboardingUser = {
  role: Role.OnboardingUser;
  authentication_id: UUID;
  address: EvmAddress;
  app: EvmAddress;
  sponsored: boolean;
};

export type Builder = {
  role: Role.Builder;
  authentication_id: UUID;
  address: EvmAddress;
  sponsored: boolean;
};

export type AuthenticatedUser = AccountManager | AccountOwner | OnboardingUser | Builder;

/**
 * @internal
 */
export function authenticatedUser(
  claims: IdTokenClaims,
): Result<AuthenticatedUser, UnexpectedError> {
  switch (claims['tag:lens.dev,2024:role']) {
    case Role.AccountManager:
      return ok({
        role: Role.AccountManager,
        authentication_id: claims.sid,
        account: claims.act?.sub ?? never('Account Manager must have an Actor Claim'),
        app: claims.aud,
        manager: claims.sub,
        sponsored: claims['tag:lens.dev,2024:sponsored'],
      });
    case Role.AccountOwner:
      return ok({
        role: Role.AccountOwner,
        authentication_id: claims.sid,
        account: claims.act?.sub ?? never('Account Owner must have an Actor Claim'),
        app: claims.aud,
        owner: claims.sub,
        sponsored: claims['tag:lens.dev,2024:sponsored'],
      });
    case Role.OnboardingUser:
      return ok({
        role: Role.OnboardingUser,
        authentication_id: claims.sid,
        address: claims.sub,
        app: claims.aud,
        sponsored: claims['tag:lens.dev,2024:sponsored'],
      });
    case Role.Builder:
      return ok({
        role: Role.Builder,
        authentication_id: claims.sid,
        address: claims.sub,
        sponsored: claims['tag:lens.dev,2024:sponsored'],
      });
    default:
      return err(UnexpectedError.from(`Unexpected role: ${claims['tag:lens.dev,2024:role']}`));
  }
}
