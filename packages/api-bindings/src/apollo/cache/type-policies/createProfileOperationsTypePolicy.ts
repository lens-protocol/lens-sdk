import { FieldFunctionOptions } from '@apollo/client/cache/inmemory/policies';
import { ProfileId } from '@lens-protocol/domain/entities';

import { OptimisticStatusResult, StrictTypedTypePolicies, TriStateValue } from '../../../lens';
import { countPendingFollowFor, countPendingUnfollowFor } from '../transactions';

export function createProfileOperationsTypePolicy(): StrictTypedTypePolicies['ProfileOperations'] {
  return {
    fields: {
      canFollow: {
        read(
          existing: TriStateValue | undefined,
          { readField }: FieldFunctionOptions,
        ): TriStateValue | undefined {
          // if we don't know, we can't do any optimistic updates
          if (!existing || existing === TriStateValue.Unknown) {
            return existing;
          }

          const profileId = readField('id') as ProfileId;
          const pendingFollowTxCount = countPendingFollowFor(profileId);

          if (pendingFollowTxCount > 0) return TriStateValue.No;

          return existing;
        },
      },
      canUnfollow: {
        read(
          existing: boolean | undefined,
          { readField }: FieldFunctionOptions,
        ): boolean | undefined {
          if (!existing) {
            return existing;
          }

          const profileId = readField('id') as ProfileId;
          const pendingUnfollowTxCount = countPendingUnfollowFor(profileId);

          if (pendingUnfollowTxCount > 0) return false;

          return existing;
        },
      },
      isFollowedByMe: {
        read(
          existing: OptimisticStatusResult | undefined,
          { readField }: FieldFunctionOptions,
        ): OptimisticStatusResult | undefined {
          if (!existing) {
            return existing;
          }

          const profileId = readField('id') as ProfileId;
          const pendingFollowTxCount = countPendingFollowFor(profileId);
          const pendingUnfollowTxCount = countPendingUnfollowFor(profileId);

          if (pendingFollowTxCount > 0) {
            return {
              ...existing,
              value: true,
              isFinalisedOnchain: false,
            };
          }

          if (pendingUnfollowTxCount > 0) {
            return {
              ...existing,
              value: false,
              isFinalisedOnchain: false,
            };
          }

          return existing;
        },
      },
    },
  };
}
