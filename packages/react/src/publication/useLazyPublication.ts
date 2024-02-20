import {
  AnyPublication,
  PublicationRequest,
  UnspecifiedError,
  usePublicationLazyQuery,
} from '@lens-protocol/api-bindings';
import { failure, OneOf, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useLazyFragmentVariables } from '../helpers/variables';

/**
 * {@link useLazyPublication} callback hook arguments
 */
export type FetchPublicationArgs = OneOf<PublicationRequest>;

/**
 * `useLazyPublication` is a lazy version of {@link usePublication} React Hook.
 *
 * This hook will not fetch the publication until the returned function is called.
 *
 * This hook is intended to enable more complex use cases, the vast majority of
 * use cases should use {@link usePublication} instead.
 *
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyPublication();
 * ```
 *
 * @experimental This hook is experimental and may change in the future.
 *
 * ```ts
 * const { called, data, error, loading, execute } = useLazyPublication();
 *
 * const callback = async () => {
 *   const result = await execute({ forId: publicationId });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *     return;
 *   }
 *
 *   const publication = result.value;
 *
 *   // do something with the publication
 * }
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useLazyPublication(): UseDeferredTask<
  AnyPublication,
  NotFoundError | UnspecifiedError,
  FetchPublicationArgs
> {
  const [fetch] = usePublicationLazyQuery(
    useLensApolloClient({
      fetchPolicy: 'cache-and-network',
    }),
  );
  const fill = useLazyFragmentVariables();

  return useDeferredTask(
    async (args): PromiseResult<AnyPublication, NotFoundError | UnspecifiedError> => {
      const { data, error } = await fetch({ variables: fill({ request: args }) });

      if (error) {
        return failure(new UnspecifiedError(error));
      }

      if (!data?.result) {
        return failure(
          new NotFoundError(`publication for: ${String(args.forId ?? args.forTxHash)}`),
        );
      }

      return success(data.result);
    },
  );
}
