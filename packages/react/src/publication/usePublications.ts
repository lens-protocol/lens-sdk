import {
  AnyPublication,
  PublicationsDocument,
  PublicationsRequest,
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
 * {@link usePublications} hook arguments
 */
export type UsePublicationsArgs<TSuspense extends boolean = never> =
  PaginatedArgs<PublicationsRequest> & SuspenseEnabled<TSuspense>;

export type { PublicationsRequest };

/**
 * Retrieves a paginated list of publications, filtered according to specified criteria.
 *
 * Fetch by Publication Type:
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     publicationTypes: [PublicationType.Post],
 *   }
 * });
 * ```
 *
 * Fetch by Main Content Focus:
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     publicationTypes: [PublicationType.Post]
 *     metadata: {
 *       mainContentFocus: [PublicationMetadataMainFocusType.ShortVideo],
 *     }
 *   }
 * });
 * ```
 *
 * Fetch Post's comments:
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     commentOn: {
 *       id: publicationId('0x03-0x24'),
 *     },
 *   }
 * });
 * ```
 *
 * Fetch Profile's Publications:
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     from: [profileId('0x01')],
 *   }
 * });
 * ```
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UsePublicationsArgs}
 */
export function usePublications(
  args: UsePublicationsArgs<never>,
): PaginatedReadResult<AnyPublication[]>;
/**
 * Retrieves a paginated list of publications, filtered according to specified criteria.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * const { data } = usePublications({
 *   where: { ... },
 *   suspense: true,
 * });
 * ```
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UsePublicationsArgs}
 */
export function usePublications(
  args: UsePublicationsArgs<true>,
): SuspensePaginatedResult<AnyPublication[]>;

export function usePublications({
  suspense = false,
  where,
  limit,
}: UsePublicationsArgs<boolean>): SuspendablePaginatedResult<AnyPublication[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: PublicationsDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({
        where,
        limit,
        statsFor: where?.metadata?.publishedOn,
      }),
    }),
  });
}
