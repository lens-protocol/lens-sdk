import { FieldFunctionOptions } from '@apollo/client';
import { ProfileId } from '@lens-protocol/domain/entities';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { never } from '@lens-protocol/shared-kernel';

import {
  erc20Amount,
  FollowPolicy,
  FollowModule,
  FollowStatus,
  ProfileAttributeReader,
  ProfileAttributes,
  StrictTypedTypePolicies,
  ProfileCoverSet,
  Attribute,
  ProfilePictureSet,
} from '../../lens';
import { getSession } from './session';
import {
  getAllPendingTransactions,
  isFollowTransactionFor,
  isUnfollowTransactionFor,
} from './transactions';

function resolveFollowPolicy({ followModule }: { followModule: FollowModule }): FollowPolicy {
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

export function createProfileTypePolicy(): StrictTypedTypePolicies['Profile'] {
  return {
    fields: {
      isFollowing: {
        keyArgs: false,
      },

      isFollowedByMe: {
        keyArgs: false,

        merge(_, incoming: boolean) {
          return incoming;
        },
      },

      followStatus: {
        read(_, { readField }) {
          const session = getSession();

          if (!session || session.isNotAuthenticated()) {
            return null;
          }

          const profileId = (readField('id') as ProfileId) ?? never('Cannot read profile id');
          const isFollowedByMe =
            (readField('isFollowedByMe') as boolean) ?? never('Cannot read profile isFollowedByMe');

          const isFollowTransactionForThisProfile = isFollowTransactionFor({
            profileId,
            followerAddress: session.wallet.address,
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

      followPolicy(existing: FollowPolicy | undefined, { readField }: FieldFunctionOptions) {
        if (existing) return existing;

        return resolveFollowPolicy({
          followModule: readField('followModule') as FollowModule,
        });
      },

      picture: {
        merge(_, incoming: ProfilePictureSet) {
          return incoming;
        },
      },

      coverPicture: {
        merge(_, incoming: ProfileCoverSet) {
          return incoming;
        },
      },

      attributes: {
        merge(_, incoming: Attribute) {
          return incoming;
        },
      },

      attributesMap(_, { readField }) {
        const attributes = readField('attributes') as Attribute[];

        return (attributes ?? []).reduce((acc, attribute) => {
          acc[attribute.key] = new ProfileAttributeReader(attribute);
          return acc;
        }, {} as ProfileAttributes);
      },

      ownedByMe(_: boolean | undefined, { readField }) {
        const session = getSession();

        if (!session || session.isNotAuthenticated()) {
          return false;
        }

        return readField('ownedBy') === session.wallet.address;
      },
    },
  };
}
