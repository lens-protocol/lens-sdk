import { Profile } from '@lens-protocol/api-bindings';
import { CreatePostRequest, OpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { EvmAddress } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../../NotFoundError';
import { useLazyModuleMetadata } from '../../misc';
import { useSharedDependencies } from '../../shared';

function extractUnknownOpenActionModuleAddresses(
  actions: CreatePostRequest['actions'] = [],
): EvmAddress[] {
  return actions.reduce((addresses, action) => {
    if (action.type === OpenActionType.UNKNOWN_OPEN_ACTION) {
      addresses.push(action.address);
    }
    return addresses;
  }, [] as EvmAddress[]);
}

export type CreatePostExecutionModeArgs = {
  author: Profile;
  actions?: CreatePostRequest['actions'];
  sponsored?: CreatePostRequest['sponsored'];
};

export type TransactionExecutionMode =
  | {
      signless: false;
      sponsored: false;
    }
  | {
      signless: boolean;
      sponsored: true;
    };

export function useCreatePostExecutionMode() {
  const { execute: fetch } = useLazyModuleMetadata();
  const { config } = useSharedDependencies();

  return async ({
    actions,
    author,
    sponsored,
  }: CreatePostExecutionModeArgs): Promise<TransactionExecutionMode> => {
    // if sponsored is disabled globally, return here
    if (config.sponsored === false) {
      return { signless: false, sponsored: false };
    }

    const desired: TransactionExecutionMode =
      sponsored === false
        ? { signless: false, sponsored: false }
        : author.sponsor
        ? {
            signless: author.signless,
            sponsored: true,
          }
        : {
            signless: false,
            sponsored: false,
          };

    const implementations = extractUnknownOpenActionModuleAddresses(actions);

    const results = await Promise.all(
      implementations.map((implementation) => fetch({ implementation })),
    );

    for (const result of results) {
      if (result.isFailure()) {
        if (result.error instanceof NotFoundError) {
          // if the module is not registered, opt for non-sponsored tx
          return {
            ...desired,
            sponsored: false,
            signless: false,
          };
        }
        throw result.error;
      }
      const { signlessApproved, sponsoredApproved } = result.value;

      if (!sponsoredApproved) {
        return {
          ...desired,
          sponsored: false,
          signless: false,
        };
      }

      if (!signlessApproved) {
        return {
          ...desired,
          signless: false,
        };
      }
    }

    return desired;
  };
}
