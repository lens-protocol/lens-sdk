import { ReactiveVar } from '@apollo/client';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { TypePolicy } from './TypePolicy';
import {
  erc20Amount,
  FollowModule,
  Profile,
  ProfileAttributeReader,
  ProfileAttributes,
} from '../graphql';
import { FollowPolicy } from '../graphql/FollowPolicy';

function resolveFollowPolicy({
  followModule,
}: {
  followModule: FollowModule | null;
}): FollowPolicy {
  if (followModule === null) {
    return {
      type: FollowPolicyType.ANYONE,
    };
  }

  switch (followModule.__typename) {
    case 'FeeFollowModuleSettings':
      return {
        type: FollowPolicyType.CHARGE,
        amount: erc20Amount({ from: followModule.amount }),
        recipient: followModule.recipient,
        contractAddress: followModule.contractAddress,
      };
    case 'ProfileFollowModuleSettings':
      return {
        type: FollowPolicyType.ONLY_PROFILE_OWNERS,
        contractAddress: followModule.contractAddress,
      };
    case 'RevertFollowModuleSettings':
      return {
        type: FollowPolicyType.NO_ONE,
        contractAddress: followModule.contractAddress,
      };
    case 'UnknownFollowModuleSettings':
      return {
        type: FollowPolicyType.UNKNOWN,
        contractAddress: followModule.contractAddress,
      };
  }
}

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

      followPolicy(existing, { readField }) {
        if (existing) return existing;

        const followModule = readField('followModule');

        return resolveFollowPolicy({
          followModule: followModule ?? null,
        });
      },

      coverPicture: {
        merge(_, incoming) {
          return incoming;
        },
      },

      attributes: {
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
