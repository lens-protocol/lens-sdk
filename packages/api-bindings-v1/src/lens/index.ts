import { QueryHookOptions, StoreValue, useQuery } from '@apollo/client';
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';

import { Cursor } from './Cursor';
import { MediaTransformParams } from './ImageSizeTransform';
import {
  Comment,
  PaginatedResultInfo,
  Exact,
  GetPublicationsDocument,
  InputMaybe,
  Profile,
  PublicationMetadataFilters,
  SearchProfilesDocument,
  SearchProfilesVariables,
  SearchPublicationsDocument,
  SearchPublicationsVariables,
  GetProfileBookmarksVariables,
  GetProfileBookmarksDocument,
} from './generated';
import { Sources } from './sources';
import { ContentPublication } from './utils';

export * from './CollectPolicy';
export * from './ContentEncryptionKey';
export * from './ContentInsight';
export * from './Cursor';
export * from './FollowPolicy';
export * from './FollowStatus';
export * from './generated';
export type {
  Digit,
  ImageSizeTransform,
  MediaTransformParams, // overwrite the generated one
  Percentage,
  Pixel,
} from './ImageSizeTransform';
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
  cursor?: InputMaybe<Cursor>;
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

export type SearchProfilesData = {
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
  options: QueryHookOptions<SearchProfilesData, SearchProfilesVariables>,
) {
  return useQuery<SearchProfilesData, SearchProfilesVariables>(SearchProfilesDocument, options);
}

export type SearchPublicationsData = {
  result: {
    __typename: 'PublicationSearchResult';
    items: Array<ContentPublication>;
    pageInfo: PaginatedResultInfo;
  };
};

/**
 * This is a patched version of the codegen generated useSearchPublicationsQuery hook.
 * It is patched to return paginated results of ContentPublication instead of union with `{}` type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useSearchPublications(
  options: QueryHookOptions<SearchPublicationsData, SearchPublicationsVariables>,
) {
  return useQuery<SearchPublicationsData, SearchPublicationsVariables>(
    SearchPublicationsDocument,
    options,
  );
}

export type GetProfileBookmarksData = {
  result: {
    items: Array<ContentPublication>;
    pageInfo: PaginatedResultInfo;
  };
};

/**
 * This is a patched version of the codegen generated useGetProfileBookmarks hook.
 * It is patched to return paginated results of ContentPublication instead of union with `{}` type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useGetProfileBookmarks(
  options: QueryHookOptions<GetProfileBookmarksData, GetProfileBookmarksVariables>,
) {
  return useQuery<GetProfileBookmarksData, GetProfileBookmarksVariables>(
    GetProfileBookmarksDocument,
    options,
  );
}
