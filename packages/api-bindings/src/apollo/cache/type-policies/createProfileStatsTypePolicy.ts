import { FieldFunctionOptions } from '@apollo/client/cache/inmemory/policies';

import {
  OpenActionCategoryType,
  PublicationStatsCountOpenActionArgs,
  StrictTypedTypePolicies,
} from '../../../lens';
import { countAnyPendingCollect } from '../transactions';

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
    },
  };
}
