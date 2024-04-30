import {
  AnyPublication,
  PublicationsRequest,
  usePublications as usePublicationsBase,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link usePublications} hook arguments
 */
export type UsePublicationsArgs = PaginatedArgs<PublicationsRequest>;

export type { PublicationsRequest };

/**
 * Fetch a paginated result of publications based on a set of filters.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UsePublicationsArgs}
 *
 * @example
 * Fetch post publications
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     publicationTypes: [PublicationType.Post],
 *   }
 * });
 * ```
 *
 * @example
 * Fetch all short form video post publications
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
 * @example
 * Fetch all comments for a specified publication
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
 * @example
 * Fetch all mirrors of a specified publication
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     mirrorOn: publicationId('0x03-0x24'),
 *   }
 * });
 * ```
 *
 * @example
 * Fetch all quotes of a specified publication
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     quoteOn: publicationId('0x03-0x24'),
 *   }
 * });
 * ```
 *
 * @example
 * Fetch all publications by an author's Profile ID
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     from: [profileId('0x01')],
 *   }
 * });
 * ```
 *
 * @example
 * Fetch publications mirrored by a Profile ID
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     from: [profileId('0x01')],
 *     publicationTypes: [PublicationType.Mirror],
 *   }
 * });
 * ```
 *
 * @example
 * Fetch publications quoted by a Profile ID
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *     from: [profileId('0x01')],
 *     publicationTypes: [PublicationType.Quote],
 *   }
 * });
 * ```
 */
export function usePublications({
  where,
  limit,
}: UsePublicationsArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    usePublicationsBase(
      useLensApolloClient({
        variables: useFragmentVariables({
          where,
          limit,
          statsFor: where?.metadata?.publishedOn,
        }),
      }),
    ),
  );
}
