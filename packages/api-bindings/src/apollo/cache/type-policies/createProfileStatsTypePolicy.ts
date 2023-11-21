import { FieldFunctionOptions } from '@apollo/client/cache/inmemory/policies';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  OpenActionCategoryType,
  PublicationStatsCountOpenActionArgs,
  StrictTypedTypePolicies,
} from '../../../lens';
import {
  countAnyPendingCollect,
  countPendingFollowFor,
  countPendingUnfollowFor,
} from '../transactions';

type CountOpenActionsArgs = {
  request?: PublicationStatsCountOpenActionArgs;
};

function isCollectsAlias(args: CountOpenActionsArgs) {
  return args?.request?.anyOf?.[0]?.category === OpenActionCategoryType.Collect;
}

export function createProfileStatsTypePolicy(): StrictTypedTypePolicies['ProfileStats'] {
  return {
    fields: {
      countOpenActions: {
        read(existing: number | undefined, { args }: FieldFunctionOptions<CountOpenActionsArgs>) {
          if (args && isCollectsAlias(args)) {
            return (existing ?? 0) + countAnyPendingCollect();
          }
          return existing ?? 0;
        },
      },
      followers: {
        read(existing: number | undefined, { readField }: FieldFunctionOptions) {
          const profileId = readField('id') as ProfileId;
          const pendingFollowTxCount = countPendingFollowFor(profileId);
          const pendingUnfollowTxCount = countPendingUnfollowFor(profileId);
          return (existing ?? 0) + pendingFollowTxCount - pendingUnfollowTxCount;
        },
      },
    },
  };
}
