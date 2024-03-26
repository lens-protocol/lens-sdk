import { Profile } from '@lens-protocol/api-bindings';
import { EvmAddress } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../../NotFoundError';
import { useLazyModuleMetadata } from '../../misc';

export type TransactionExecutionMode =
  | {
      signless: false;
      sponsored: false;
    }
  | {
      signless: boolean;
      sponsored: true;
    };

export type ExecutionModeArgs = {
  author: Profile;
  unknownModules: EvmAddress[];
};

export function useExecutionMode() {
  const { execute: fetch } = useLazyModuleMetadata();

  return async ({
    author,
    unknownModules,
  }: ExecutionModeArgs): Promise<TransactionExecutionMode> => {
    const desired: TransactionExecutionMode = author.sponsor
      ? {
          signless: author.signless,
          sponsored: true,
        }
      : {
          signless: false,
          sponsored: false,
        };

    const results = await Promise.all(
      unknownModules.map((implementation) => fetch({ implementation })),
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
