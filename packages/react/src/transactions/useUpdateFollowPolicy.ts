import { ProfileOwnedByMeFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ChargeFollowConfig, NoFeeFollowConfig } from '@lens-protocol/domain/use-cases/profile';

import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';
import { Operation, useOperation } from '../helpers';

export type UseUpdateFollowPolicyArgs = {
  profile: ProfileOwnedByMeFragment;
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
