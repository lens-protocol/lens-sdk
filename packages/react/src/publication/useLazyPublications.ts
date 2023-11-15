import {
  AnyPublication,
  PublicationsRequest,
  UnspecifiedError,
  usePublicationsLazyQuery,
} from '@lens-protocol/api-bindings';
import { failure, invariant, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs } from '../helpers/reads';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';

/**
 * {@link useLazyPublications} callback hook arguments
 */
export type FetchPublicationsArgs = PaginatedArgs<PublicationsRequest>;

/**
 * `useLazyPublications` is a lazy version of {@link usePublications} React Hook.
 *
 * This version doesn't support pagination!
 *
 * This hook will not fetch publications until the returned function is called.
 *
 * @experimental This hook is experimental and may change in the future.
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyPublications();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     where: {
 *       publicationTypes: [PublicationType.Post]
 *     }
 *   });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *     return;
 *   }
 *
 *   const publications = result.value;
 *
 *   // do something with the publications
 * }
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useLazyPublications(): UseDeferredTask<
  AnyPublication[],
  UnspecifiedError,
  FetchPublicationsArgs
> {
  const [fetch] = usePublicationsLazyQuery(useLensApolloClient({ fetchPolicy: 'no-cache' }));

  return useDeferredTask(async (args): PromiseResult<AnyPublication[], UnspecifiedError> => {
    const { data, error } = await fetch({ variables: args });

    if (error) {
      return failure(new UnspecifiedError(error));
    }

    invariant(data, 'Data must be defined');

    return success(data.result.items);
  });
}
