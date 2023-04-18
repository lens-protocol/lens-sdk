import { QueryHookOptions, useQuery } from '@apollo/client';
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';

import {
  GetPublicationsDocument,
  SearchProfilesDocument,
  SearchPublicationsDocument,
} from './hooks';
import {
  Comment,
  CommonPaginatedResultInfo,
  Exact,
  InputMaybe,
  Post,
  Profile,
  PublicationMetadataFilters,
  SearchProfilesVariables,
  SearchPublicationsVariables,
} from './operations';
import { Sources } from './sources';

export * from './CollectPolicy';
export * from './ContentEncryptionKey';
export * from './FollowPolicy';
export * from './FollowStatus';
export * from './hooks';
export * from './operations';
export * from './ProfileAttributeReader';
export * from './ProfileAttributes';
export * from './ReferencePolicy';
export * from './sources';
export * from './utils';

export type GetCommentsVariables = Exact<{
  commentsOf: PublicationId;
  limit: number;
  sources: Sources;
  cursor?: string;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  observerId?: InputMaybe<ProfileId>;
}>;

export type GetCommentsData = {
  result: {
    items: Array<Comment>;
    pageInfo: CommonPaginatedResultInfo;
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
    pageInfo: CommonPaginatedResultInfo;
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
    pageInfo: CommonPaginatedResultInfo;
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
