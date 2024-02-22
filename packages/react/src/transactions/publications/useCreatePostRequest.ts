import { CreatePostRequest, OpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { EvmAddress, UnknownObject } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../../NotFoundError';
import { useLazyModuleMetadata } from '../../misc';
import { useSharedDependencies } from '../../shared';
import { createPostRequest } from '../adapters/schemas/builders';

function extractUnknownOpenActionModuleAddresses(desired: CreatePostRequest): EvmAddress[] {
  return desired.actions.reduce((addresses, action) => {
    if (action.type === OpenActionType.UNKNOWN_OPEN_ACTION) {
      addresses.push(action.address);
    }
    return addresses;
  }, [] as EvmAddress[]);
}

export function useCreatePostRequest() {
  const { execute: fetch } = useLazyModuleMetadata();
  const { config } = useSharedDependencies();

  return async (input: UnknownObject): Promise<CreatePostRequest> => {
    const desired = createPostRequest(input);

    // if sponsored is disabled globally, return here
    if (config.sponsored === false) {
      return { ...desired, sponsored: false };
    }

    const implementations = extractUnknownOpenActionModuleAddresses(desired);

    const results = await Promise.all(
      implementations.map((implementation) => fetch({ implementation })),
    );

    for (const result of results) {
      if (result.isFailure()) {
        if (result.error instanceof NotFoundError) {
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
