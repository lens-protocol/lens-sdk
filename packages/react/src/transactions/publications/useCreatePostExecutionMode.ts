import { Profile } from '@lens-protocol/api-bindings';
import {
  OpenActionConfig,
  ReferencePolicyConfig,
} from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { extractUnknownModuleConfigAddresses } from './modules';
import { useExecutionMode, TransactionExecutionMode } from './useExecutionMode';

export type CreatePostExecutionModeArgs = {
  author: Profile;
  actions: OpenActionConfig[] | undefined; // | undefined is intentional to force consumers to provide a value
  reference: ReferencePolicyConfig | undefined; // | undefined is intentional to force consumers to provide a value
  sponsored: boolean | undefined; // | undefined is intentional to force consumers to provide a value
};

export function useCreatePostExecutionMode() {
  const resolve = useExecutionMode();
  const { config } = useSharedDependencies();

  return async ({
    actions,
    author,
    reference,
    sponsored,
  }: CreatePostExecutionModeArgs): Promise<TransactionExecutionMode> => {
    if (sponsored === false) {
      return { signless: false, sponsored: false };
    }

    if (config.sponsored === false) {
      return { signless: false, sponsored: false };
    }

    return resolve({
      author,
      unknownModules: extractUnknownModuleConfigAddresses({ actions, reference }),
    });
  };
}
