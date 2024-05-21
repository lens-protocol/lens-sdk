import {
  ExplorePublication,
  ExplorePublicationRequest,
  ExplorePublicationsDocument,
  ExplorePublicationsOrderByType,
  ExplorePublicationsWhere,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult } from '../helpers/reads';
import {
  SuspendablePaginatedResult,
  SuspenseEnabled,
  SuspensePaginatedResult,
  useSuspendablePaginatedQuery,
} from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useExplorePublications} hook arguments
 */
export type UseExplorePublicationsArgs = PaginatedArgs<ExplorePublicationRequest>;

export type { ExplorePublicationRequest, ExplorePublicationsWhere };

/**
 * {@link useExplorePublications} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseExplorePublicationsArgs = SuspenseEnabled<UseExplorePublicationsArgs>;

/**
 * Discover new publications base on a defined criteria.
 *
 * ```tsx
 * const { data, error, loading } = useExplorePublications(
 *   where: {
 *     publicationTypes: [ExplorePublicationType.Post],
 *   },
 *   orderBy: ExplorePublicationsOrderByType.TopCommented,
 * );
 *
 * if (loading) return <Loader />;
 *
 * if (error) return <Error message={error.message} />;
 *
 * return (
 *   <>
 *     {data.map((publication) => (
 *       <PublicationCard key={publication.id} publication={publication} />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @category Discovery
 * @group Hooks
 */
export function useExplorePublications(
  args?: UseExplorePublicationsArgs,
): PaginatedReadResult<ExplorePublication[]>;

/**
 * Discover new publications base on a defined criteria.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```ts
 * const { data } = useExplorePublications(
 *   where: {
 *     publicationTypes: [ExplorePublicationType.Post],
 *   },
 *   orderBy: ExplorePublicationsOrderByType.TopCommented,
 *   suspense: true,
 * );
 *
 * console.log(data);
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 */
export function useExplorePublications(
  args: UseSuspenseExplorePublicationsArgs,
): SuspensePaginatedResult<ExplorePublication[]>;

export function useExplorePublications(
  {
    orderBy = ExplorePublicationsOrderByType.Latest,
    where,
    suspense = false,
  }: UseExplorePublicationsArgs & { suspense?: boolean } = {
    orderBy: ExplorePublicationsOrderByType.Latest,
  },
): SuspendablePaginatedResult<ExplorePublication[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: ExplorePublicationsDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({
        where,
        orderBy,
        statsFor: where?.metadata?.publishedOn,
      }),
    }),
  });
}
