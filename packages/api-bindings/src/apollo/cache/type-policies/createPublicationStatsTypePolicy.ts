import { FieldFunctionOptions } from '@apollo/client/cache/inmemory/policies';
import { PublicationId } from '@lens-protocol/domain/entities';
import { never } from '@lens-protocol/shared-kernel';

import {
  OpenActionCategoryType,
  PublicationStatsCountOpenActionArgs,
  StrictTypedTypePolicies,
} from '../../../lens';
import { countAnyPendingCollectFor } from '../transactions';

type CountOpenActionsArgs = {
  request?: PublicationStatsCountOpenActionArgs;
};

function isCollectsAlias(args: CountOpenActionsArgs) {
  return args?.request?.anyOf?.[0]?.category === OpenActionCategoryType.Collect;
}

export function createPublicationStatsTypePolicy(): StrictTypedTypePolicies['PublicationStats'] {
  return {
    fields: {
      countOpenActions: {
        read(
          existing: number | undefined,
          { args, readField }: FieldFunctionOptions<CountOpenActionsArgs>,
        ) {
          if (args && isCollectsAlias(args)) {
            const id = readField('id') as PublicationId;

            return (
              (existing ?? 0) +
              countAnyPendingCollectFor(
                id ?? never('PublicationStats.id is missing, this is likely a bug.'),
              )
            );
          }
          return existing ?? 0;
        },
      },
    },
  };
}
