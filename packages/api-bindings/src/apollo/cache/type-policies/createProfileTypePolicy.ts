import { FieldFunctionOptions } from '@apollo/client';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';

import { FollowModule, FollowPolicy, StrictTypedTypePolicies, erc20Amount } from '../../../lens';

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

export function createProfileTypePolicy(): StrictTypedTypePolicies['Profile'] {
  return {
    fields: {
      followPolicy(existing: FollowPolicy | undefined, { readField }: FieldFunctionOptions) {
        if (existing) return existing;

        return resolveFollowPolicy({
          followModule: readField('followModule') as FollowModule,
        });
      },
    },
  };
}
