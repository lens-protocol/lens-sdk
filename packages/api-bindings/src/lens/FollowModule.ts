import { FollowPolicy, FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';

import { Profile } from './graphql/generated';
import { erc20Amount } from './utils';

export type FollowModule = NonNullable<Profile['followModule']>;

/**
 * @deprecated not longer in use - removal slated for stable 2.x release
 */
export type ResolveFollowPolicy = {
  followModule: FollowModule | null;
};

/**
 * Resolve API {@link FollowModule} to more user friendly {@link FollowPolicy}.
 *
 * @param args - The {@link Profile} to resolve {@link FollowPolicy} from
 * @returns {@link FollowPolicy}
 */
export function resolveFollowPolicy({ followModule }: Profile): FollowPolicy {
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
        contractAddress: followModule.contract.address,
        chainId: followModule.contract.chainId,
      };
    case 'RevertFollowModuleSettings':
      return {
        type: FollowPolicyType.NO_ONE,
        contractAddress: followModule.contract.address,
        chainId: followModule.contract.chainId,
      };
    case 'UnknownFollowModuleSettings':
      return {
        type: FollowPolicyType.UNKNOWN,
        contractAddress: followModule.contract.address,
        chainId: followModule.contract.chainId,
      };
  }
}
