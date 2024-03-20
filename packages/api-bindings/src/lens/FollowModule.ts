import { FollowPolicyConfig, FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Data, Erc20Amount, EvmAddress, FiatAmount } from '@lens-protocol/shared-kernel';

import { FollowModuleInput, Profile } from './graphql/generated';
import { erc20Amount, fiatAmount } from './utils';

export type FollowModule = NonNullable<Profile['followModule']>;

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: Erc20Amount;
  rate: FiatAmount | null;
  recipient: string;
  contractAddress: EvmAddress;
  chainId: number;
};

export type NoFollowPolicy = {
  type: FollowPolicyType.NO_ONE;
  contractAddress: EvmAddress;
  chainId: number;
};

export type UnknownFollowPolicy = {
  type: FollowPolicyType.UNKNOWN;
  contractAddress: EvmAddress;
  chainId: number;
  initializeCalldata: Data;
  initializeResultData?: Data;
  signlessApproved: boolean;
  sponsoredApproved: boolean;
  verified: boolean;
};

export type OpenFollowPolicy = {
  type: FollowPolicyType.ANYONE;
};

export type FollowPolicy =
  | ChargeFollowPolicy
  | NoFollowPolicy
  | OpenFollowPolicy
  | UnknownFollowPolicy;

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
        amount: erc20Amount(followModule.amount),
        rate: followModule.amount.rate ? fiatAmount(followModule.amount.rate) : null,
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
        initializeCalldata: followModule.initializeCalldata as Data,
        initializeResultData: (followModule.initializeResultData as Data) ?? undefined,
        signlessApproved: followModule.signlessApproved,
        sponsoredApproved: followModule.sponsoredApproved,
        verified: followModule.verified,
      };
  }
}

/**
 * Given a {@link FollowPolicyConfig} resolve it to a {@link FollowModuleInput} to be used by the API.
 *
 * @internal
 */
export function resolveFollowModuleInput(policy: FollowPolicyConfig): FollowModuleInput {
  switch (policy.type) {
    case FollowPolicyType.CHARGE:
      return {
        feeFollowModule: {
          amount: {
            currency: policy.amount.asset.address,
            value: policy.amount.toSignificantDigits(),
          },
          recipient: policy.recipient,
        },
      };

    case FollowPolicyType.ANYONE:
      return {
        freeFollowModule: true,
      };

    case FollowPolicyType.NO_ONE:
      return {
        revertFollowModule: true,
      };

    case FollowPolicyType.UNKNOWN:
      return {
        unknownFollowModule: {
          address: policy.address,
          data: policy.data,
        },
      };
  }
}
