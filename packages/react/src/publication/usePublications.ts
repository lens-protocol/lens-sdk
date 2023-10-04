import {
  AnyPublication,
  LimitType,
  PublicationsOrderByType,
  PublicationsRequest,
  usePublications as usePublicationsBase,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link usePublications} hook arguments
 */
export type UsePublicationsArgs = PaginatedArgs<PublicationsRequest>;

/**
 * Fetch a paginated result of publications based on a set of filters.
 *
 * @category Publications
 * @group Hooks
 *
 * @example
 * Fetch post publications
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *      publicationTypes: [PublicationType.Post]
 *    }
 * });
 * ```
 *
 * @example
 * Fetch all short form video post publications
 * ```tsx
 * const { data, loading, error } = usePublications({
 *    where: {
 *      publicationTypes: [PublicationType.Post]
 *      metadata: {
 *        mainContentFocus: [PublicationMetadataMainFocusType.ShortVideo],
 *      }
 *    }
 * });
 * ```
 *
 * @example
 * Fetch all comments for a specified publication
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *      publicationTypes: [PublicationType.Comment]
 *      publicationIds: ['0x1b-0x012b']
 *    }
 * });
 * ```
 *
 * @example
 * Fetch all mirrors made by a specified profile
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *      publicationTypes: [PublicationType.Mirror]
 *      from: [profileId('0x0635')]
 *    }
 * });
 * ```
 *
 * @example
 * Fetch all publications by a Profile ID
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *      from: [profileId('0x0635')]
 *    }
 * });
 * ```
 *
 * @example
 * Fetch publications by several Profile IDs
 * ```tsx
 * const { data, loading, error } = usePublications({
 *   where: {
 *      from: [profileId('0x0635'), profileId('0x0f')]
 *    }
 * });
 * ```
 *
 */
export function usePublications({
  where,
  orderBy = PublicationsOrderByType.Latest,
  limit = LimitType.Ten,
}: UsePublicationsArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    usePublicationsBase(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          where,
          limit,
          orderBy,
        }),
      }),
    ),
  );
}
