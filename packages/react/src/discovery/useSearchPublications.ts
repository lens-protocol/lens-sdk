import {
  PrimaryPublication,
  PublicationSearchRequest,
  PublicationSearchWhere,
  SearchPublicationsDocument,
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
 * {@link useSearchPublications} hook arguments
 */
export type UseSearchPublicationsArgs = PaginatedArgs<PublicationSearchRequest>;

export type { PublicationSearchRequest, PublicationSearchWhere };

/**
 * {@link useSearchPublications} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseSearchPublicationsArgs = SuspenseEnabled<UseSearchPublicationsArgs>;

/**
 * Search for publications based on a defined criteria.
 *
 * Search for publications with content that contains "foo"
 * ```tsx
 * const { data, error, loading } = useSearchPublications({ query: 'foo' });
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
 * Search for audio post publications with content that matches a query
 * ```tsx
 * const { data, error, loading } = useSearchPublications({
 *   query: '...',
 *   where: {
 *     publicationTypes: [SearchPublicationType.Post],
 *     metadata: {
 *       mainContentFocus: [PublicationMetadataMainFocusType.Audio],
 *     },
 *   },
 * });
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
export function useSearchPublications(
  args: UseSearchPublicationsArgs,
): PaginatedReadResult<PrimaryPublication[]>;

/**
 * Search for publications based on a defined criteria.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * const { data } = useSearchPublications({
 *   query: 'foo',
 *   suspense: true,
 * });
 *
 * console.log(data);
 * ```
 *
 * Use [startTransition](https://react.dev/reference/react/startTransition) to avoid to re-suspend the component.
 *
 * ```tsx
 * const [query, setQuery] = useState('foo');
 *
 * const { data } = useSearchPublications({
 *   query,
 *   suspense: true,
 * });
 *
 * const search = () => {
 *   startTransition(() => {
 *     setQuery('bar');
 *   });
 * };
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 */
export function useSearchPublications(
  args: UseSuspenseSearchPublicationsArgs,
): SuspensePaginatedResult<PrimaryPublication[]>;

export function useSearchPublications({
  limit,
  query,
  suspense = false,
  where,
}: UseSearchPublicationsArgs & { suspense?: boolean }): SuspendablePaginatedResult<
  PrimaryPublication[]
> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: SearchPublicationsDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({
        query,
        limit,
        where,
        statsFor: where?.metadata?.publishedOn,
      }),
    }),
  });
}
