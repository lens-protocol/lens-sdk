import { QueryHookOptions, StoreValue, useQuery } from '@apollo/client';
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';

import {
  Comment,
  PaginatedResultInfo,
  Exact,
  GetPublicationsDocument,
  InputMaybe,
  Post,
  Profile,
  PublicationMetadataFilters,
  SearchProfilesDocument,
  SearchProfilesVariables,
  SearchPublicationsDocument,
  SearchPublicationsVariables,
  MediaTransformParams,
} from './generated';
import { Sources } from './sources';

export * from './CollectPolicy';
export * from './ContentEncryptionKey';
export * from './ContentInsight';
export * from './Cursor';
export * from './FollowPolicy';
export * from './FollowStatus';
export * from './generated';
export * from './ProfileAttributeReader';
export * from './ProfileAttributes';
export * from './ReferencePolicy';
export * from './sources';
export * from './utils';

export type CursorBasedPaginatedResult<T = StoreValue> = {
  items: T[];
  pageInfo: PaginatedResultInfo;
};

export type GetCommentsVariables = Exact<{
  commentsOf: PublicationId;
  limit: number;
  sources: Sources;
  cursor?: string;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  observerId?: InputMaybe<ProfileId>;
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetCommentsData = {
  result: {
    items: Array<Comment>;
    pageInfo: PaginatedResultInfo;
  };
};

/**
 * This hooks uses the codegen generated GetPublications query hook so that it
 * can returns paginated results of Comment in a type safe way.
 */
export function useGetComments(options: QueryHookOptions<GetCommentsData, GetCommentsVariables>) {
  return useQuery<GetCommentsData, GetCommentsVariables>(GetPublicationsDocument, options);
}

export type SearchProfilesResult = {
  result: {
    __typename: 'ProfileSearchResult';
    items: Array<Profile>;
    pageInfo: PaginatedResultInfo;
  };
};

/**
 * This is a patched version of the codegen generated useSearchProfilesQuery hook.
 * It is patched to return paginated results of Profile instead of union with `{}` type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useSearchProfiles(
  options: QueryHookOptions<SearchProfilesResult, SearchProfilesVariables>,
) {
  return useQuery<SearchProfilesResult, SearchProfilesVariables>(SearchProfilesDocument, options);
}

export type SearchPublicationsResult = {
  result: {
    __typename: 'PublicationSearchResult';
    items: Array<Comment | Post>;
    pageInfo: PaginatedResultInfo;
  };
};

/**
 * This is a patched version of the codegen generated useSearchPublicationsQuery hook.
 * It is patched to return paginated results of Comment | Post instead of union with `{}` type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useSearchPublications(
  options: QueryHookOptions<SearchPublicationsResult, SearchPublicationsVariables>,
) {
  return useQuery<SearchPublicationsResult, SearchPublicationsVariables>(
    SearchPublicationsDocument,
    options,
  );
}
