import { ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { ProfileAttributes, Profile, ProfileAttributeReader } from '../graphql';
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

      coverPicture: {
        merge(_, incoming) {
          return incoming;
        },
      },

      attributesMap(_: unknown, { readField }) {
        return (readField('attributes') ?? []).reduce((acc, attribute) => {
          acc[attribute.key] = new ProfileAttributeReader(attribute);
          return acc;
        }, {} as ProfileAttributes);
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
