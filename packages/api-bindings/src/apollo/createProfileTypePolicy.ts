import {
  ChargeFollowPolicy,
  FollowPolicyType,
  NoFeeFollowPolicy,
} from '@lens-protocol/domain/use-cases/profile';
import { Amount, ChainType, erc20 } from '@lens-protocol/shared-kernel';

import {
  FeeFollowModuleSettings,
  FollowModule,
  getFollowPolicyTypeFromProfileFieldsFragment,
  Profile,
  ProfileAttributeReader,
  ProfileAttributes,
} from '../graphql';
import { TypePolicy } from './TypePolicy';

function isFeeModule(followModule: FollowModule): followModule is FeeFollowModuleSettings {
  return followModule.__typename === 'FeeFollowModuleSettings';
}

function resolveFollowPolicy({
  followModule,
}: {
  followModule: FollowModule;
}): ChargeFollowPolicy | NoFeeFollowPolicy | { type: FollowPolicyType.UNKNOWN } | null {
  const followPolicyType = getFollowPolicyTypeFromProfileFieldsFragment(followModule);
  if (!followPolicyType) return null;

  if (followPolicyType === FollowPolicyType.CHARGE) {
    if (!isFeeModule(followModule)) return null;
    const erc20Value = erc20({
      name: followModule.amount.asset.name,
      address: followModule.amount.asset.address,
      chainType: ChainType.POLYGON,
      decimals: followModule.amount.asset.decimals,
      symbol: followModule.amount.asset.symbol,
    });
    return {
      type: FollowPolicyType.CHARGE,
      amount: Amount.erc20(erc20Value, followModule.amount.value),
      recipient: followModule.recipient,
    };
  }

  return {
    type: followPolicyType,
  };
}

export function createProfileTypePolicy(): TypePolicy<Profile> {
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

        if (!followModule) return null;

        return resolveFollowPolicy({
          followModule,
        });
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

      ownedByMe() {
        // TODO: implement ownership check using active profile
        return false;
      },
    },
  };
}
