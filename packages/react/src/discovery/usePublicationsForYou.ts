import {
  ForYouDocument,
  ForYouResult,
  PublicationForYouRequest,
} from '@lens-protocol/api-bindings';

import { UseSessionArgs, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult } from '../helpers/reads';
import {
  SuspendablePaginatedResult,
  SuspenseEnabled,
  SuspensePaginatedResult,
  useSuspendablePaginatedQuery,
} from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

export { type ForYouResult, ForYouSource } from '@lens-protocol/api-bindings';

/**
 * {@link usePublicationsForYou} hook arguments
 */
export type UsePublicationsForYouArgs = PaginatedArgs<PublicationForYouRequest>;

/**
 * {@link usePublicationsForYou} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspensePublicationsForYouArgs = SuspenseEnabled<UsePublicationsForYouArgs>;

/**
 * Fetch a the feed of a given profile and filters.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { data, loading, error } =  usePublicationsForYou({
 *   for: '0x01`, // profileId
 * });
 *
 * if (loading) return <div>Loading...</div>;
 *
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <ul>
 *     {data.map((item, idx) => (
 *       <li key={item.publication.id}>
 *         // render item details
 *       </li>
 *     ))}
 *   </ul>
 * );
 * ```
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UsePublicationsForYouArgs}
 */
export function usePublicationsForYou(
  args?: UsePublicationsForYouArgs,
): PaginatedReadResult<ForYouResult[]>;

/**
 * Fetch a the feed of a given profile and filters.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * @example
 * ```tsx
 * const { data, loading, error } =  usePublicationsForYou({
 *   for: '0x01`, // profileId
 *   suspense: true,
 * });
 *
 * return (
 *   <ul>
 *     {data.map((item, idx) => (
 *       <li key={item.publication.id}>
 *         // render item details
 *       </li>
 *     ))}
 *   </ul>
 * );
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseSuspensePublicationsForYouArgs}
 */
export function usePublicationsForYou(
  args: UseSuspensePublicationsForYouArgs,
): SuspensePaginatedResult<ForYouResult[]>;

export function usePublicationsForYou({
  suspense = false,
  ...args
}: UsePublicationsForYouArgs & { suspense?: boolean } = {}): SuspendablePaginatedResult<
  ForYouResult[]
> {
  const { data: session } = useSession({ suspense } as UseSessionArgs);

  return useSuspendablePaginatedQuery({
    suspense,
    query: ForYouDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables(args),
      skip: !session.authenticated,
    }),
  });
}
