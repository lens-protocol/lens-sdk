import { ReactiveVar } from '@apollo/client';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { never } from '@lens-protocol/shared-kernel';

import {
  erc20Amount,
  FollowPolicy,
  FollowModule,
  FollowStatus,
  Profile,
  ProfileAttributeReader,
  ProfileAttributes,
} from '../../graphql';
import {
  getAllPendingTransactions,
  isFollowTransactionFor,
  isUnfollowTransactionFor,
} from './transactions';
import { TypePolicy } from './utils/TypePolicy';

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

        merge(_, incoming) {
          return incoming;
        },
      },

      followStatus: {
        read(_, { readField }) {
          const activeWallet = activeWalletVar();

          if (!activeWallet) {
            return null;
          }

          const profileId = readField('id') ?? never('Cannot read profile id');
          const isFollowedByMe =
            readField('isFollowedByMe') ?? never('Cannot read profile isFollowedByMe');

          const isFollowTransactionForThisProfile = isFollowTransactionFor({
            profileId,
            followerAddress: activeWallet.address,
          });
          const isUnfollowTransactionForThisProfile = isUnfollowTransactionFor({
            profileId,
          });

          return getAllPendingTransactions().reduce(
            (status, transaction) => {
              if (isFollowTransactionForThisProfile(transaction)) {
                return {
                  isFollowedByMe: true,
                  canFollow: false,
                  canUnfollow: false,
                };
              }

              if (isUnfollowTransactionForThisProfile(transaction)) {
                return {
                  isFollowedByMe: false,
                  canFollow: false,
                  canUnfollow: false,
                };
              }

              return status;
            },
            {
              isFollowedByMe,
              canFollow: !isFollowedByMe,
              canUnfollow: isFollowedByMe,
            } as FollowStatus,
          );
        },
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
