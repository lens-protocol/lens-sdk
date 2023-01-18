import { ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { Maybe, Profile } from '../graphql/generated';
import { TypePolicy } from './TypePolicy';

export function createProfileTypePolicy(
  activeWalletVar: ReactiveVar<WalletData | null>,
): TypePolicy<Profile> {
  return {
    fields: {
      isFollowing: {
        keyArgs: false,
      },

      isFollowedByMe: {
        keyArgs: false,
      },

      isOptimisticFollowedByMe(existing) {
        return existing ?? false;
      },

      attributes: {
        merge(_, incoming) {
          // Attributes are not merged, but replaced cause they are not normalized.
          // (see createAttributeTypePolicy).
          return incoming;
        },
      },

      location(_: Maybe<string> | undefined, { readField }) {
        return (readField('attributes') ?? []).find(({ key }) => key === 'location')?.value ?? null;
      },

      twitter(_: Maybe<string> | undefined, { readField }) {
        return (readField('attributes') ?? []).find(({ key }) => key === 'twitter')?.value ?? null;
      },

      website(_: Maybe<string> | undefined, { readField }) {
        return (readField('attributes') ?? []).find(({ key }) => key === 'website')?.value ?? null;
      },

      ownedByMe(_: boolean | undefined, { readField }) {
        const activeWallet = activeWalletVar();
        if (activeWallet) {
          return readField('ownedBy') === activeWallet.address;
        }
        return false;
      },
    },
  };
}
