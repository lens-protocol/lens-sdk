import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ChargeFollowConfig, NoFeeFollowConfig } from '@lens-protocol/domain/use-cases/profile';

import { Operation, useOperation } from '../helpers/operations';
import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

export type UseUpdateFollowPolicyArgs = {
  profile: ProfileOwnedByMe;
};

export type { ChargeFollowConfig, NoFeeFollowConfig };

export type UpdateFollowPolicyArgs = {
  followPolicy: ChargeFollowConfig | NoFeeFollowConfig;
};

export type UpdateFollowPolicyOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [UpdateFollowPolicyArgs]
>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useUpdateFollowPolicy({
  profile,
}: UseUpdateFollowPolicyArgs): UpdateFollowPolicyOperation {
  const updateFollowPolicy = useUpdateFollowPolicyController();

  return useOperation(async ({ followPolicy }: UpdateFollowPolicyArgs) =>
    updateFollowPolicy({
      profileId: profile.id,
      policy: followPolicy,
      kind: TransactionKind.UPDATE_FOLLOW_POLICY,
    }),
  );
}
