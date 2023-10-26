import { FieldFunctionOptions } from '@apollo/client/cache/inmemory/policies';
import { ProfileId } from '@lens-protocol/domain/entities';

import { OptimisticStatusResult, StrictTypedTypePolicies } from '../../../lens';
import { hasPendingUnblockForProfile } from '../transactions';

export function createProfileOperationsTypePolicy(): StrictTypedTypePolicies['ProfileOperations'] {
  return {
    fields: {
      canUnblock: {
        read(existing: boolean | undefined, { readField }: FieldFunctionOptions) {
          if (!existing === undefined) {
            return existing;
          }

          const id = readField('id') as ProfileId;

          if (hasPendingUnblockForProfile(id)) {
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

          // console.log({ hasPendingUnblock, existing, id, adFiel });

          if (hasPendingUnblock) {
            return {
              ...existing,
              isFinalisedOnchain: false,
              value: false,
            };
          }

          return existing;
        },
      },
    },
  };
}
