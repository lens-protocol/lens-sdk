import { FieldFunctionOptions } from '@apollo/client/cache/inmemory/policies';
import { ProfileId } from '@lens-protocol/domain/entities';

import { OptimisticStatusResult, StrictTypedTypePolicies, TriStateValue } from '../../../lens';
import {
  countPendingFollowFor,
  countPendingUnfollowFor,
  hasPendingBlockForProfile,
  hasPendingUnblockForProfile,
} from '../transactions';

export function createProfileOperationsTypePolicy(): StrictTypedTypePolicies['ProfileOperations'] {
  return {
    keyFields: false,
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
      canUnblock: {
        read(existing: boolean | undefined, { readField }: FieldFunctionOptions) {
          if (existing === undefined) {
            return existing;
          }

          const id = readField('id') as ProfileId;

          if (hasPendingUnblockForProfile(id)) {
            return false;
          }

          return existing;
        },
      },
      canBlock: {
        read(existing: boolean | undefined, { readField }: FieldFunctionOptions) {
          if (existing === undefined) {
            return existing;
          }

          const id = readField('id') as ProfileId;

          if (hasPendingBlockForProfile(id)) {
            return false;
          }

          return existing;
        },
      },
      isBlockedByMe: {
        read(existing: OptimisticStatusResult | undefined, { readField }: FieldFunctionOptions) {
          if (!existing) {
            return existing;
          }

          const id = readField('id') as ProfileId;

          const hasPendingUnblock = hasPendingUnblockForProfile(id);

          if (hasPendingUnblock) {
            return {
              ...existing,
              isFinalisedOnchain: false,
              value: false,
            };
          }

          const hasPendingBlock = hasPendingBlockForProfile(id);

          if (hasPendingBlock) {
            return {
              ...existing,
              isFinalisedOnchain: false,
              value: true,
            };
          }

          return existing;
        },
      },
    },
  };
}
