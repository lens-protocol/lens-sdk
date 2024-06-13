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
export type UsePublicationsArgs = PaginatedArgs<PublicationsRequest>;

export type { PublicationsRequest };

/**
 * {@link usePublications} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspensePublicationsArgs = SuspenseEnabled<UsePublicationsArgs>;

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
 */
export function usePublications(args: UsePublicationsArgs): PaginatedReadResult<AnyPublication[]>;
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
 * @experimental This API can change without notice
 * @category Publications
 * @group Hooks
 */
export function usePublications(
  args: UseSuspensePublicationsArgs,
): SuspensePaginatedResult<AnyPublication[]>;

export function usePublications({
  limit,
  suspense = false,
  where,
}: UsePublicationsArgs & { suspense?: boolean }): SuspendablePaginatedResult<AnyPublication[]> {
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
