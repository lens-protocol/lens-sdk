import {
  ModuleMetadataResult,
  UnspecifiedError,
  useModuleMetadata as useModuleMetadataHook,
  useModuleMetadataLazyQuery,
} from '@lens-protocol/api-bindings';
import { PromiseResult, failure, success } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';

export type { ModuleMetadataResult };

// export helpers
export { decodeData, encodeData } from '@lens-protocol/blockchain-bindings';
export type { ModuleData, ModuleParam } from '@lens-protocol/blockchain-bindings';

/**
 * {@link useModuleMetadata} hook arguments
 */
export type UseModuleMetadataArgs = {
  /**
   * The module address to fetch metadata for.
   */
  implementation: string;
};

/**
 * Fetch a Lens Module's metadata.
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useModuleMetadata();
 * ```
 *
 * @category Modules
 * @group Hooks
 */
export function useModuleMetadata(
  args: UseModuleMetadataArgs,
): ReadResult<ModuleMetadataResult | null> {
  return useReadResult(
    useModuleMetadataHook(
      useLensApolloClient({
        variables: {
          request: args,
        },
      }),
    ),
  );
}

export type FetchModuleMetadataArgs = {
  /**
   * The module address to fetch metadata for.
   */
  implementation: string;
};

/**
 * `useLazyModuleMetadata` is a lazy version of {@link useModuleMetadata} React Hook.
 *
 * This hook will not fetch the metadata until the returned function is called.
 *
 *
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyModuleMetadata();
 * ```
 *
 * @experimental This hook is experimental and may change in the future.
 * @category Modules
 * @group Hooks
 */
export function useLazyModuleMetadata(): UseDeferredTask<
  ModuleMetadataResult,
  NotFoundError | UnspecifiedError,
  UseModuleMetadataArgs
> {
  const [fetch] = useModuleMetadataLazyQuery(
    useLensApolloClient({
      fetchPolicy: 'cache-and-network',
    }),
  );

  return useDeferredTask(
    async (args): PromiseResult<ModuleMetadataResult, NotFoundError | UnspecifiedError> => {
      const { data, error } = await fetch({ variables: { request: args } });

      if (error) {
        return failure(new UnspecifiedError(error));
      }

      if (!data?.result) {
        return failure(new NotFoundError(`module metadata for: ${args.implementation}`));
      }

      return success(data.result);
    },
  );
}
