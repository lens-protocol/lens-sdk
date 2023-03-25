import { QueryHookOptions, useQuery } from '@apollo/client';

import { CommentsDocument, SearchProfilesDocument, SearchPublicationsDocument } from './hooks';
import {
  Comment,
  CommentsVariables,
  CommentWithFirstComment,
  CommonPaginatedResultInfo,
  Post,
  Profile,
  SearchProfilesVariables,
  SearchPublicationsVariables,
} from './operations';

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

export type FollowModule = Profile['followModule'];

export type CommentsResult = {
  result: {
    items: Array<CommentWithFirstComment>;
    pageInfo: CommonPaginatedResultInfo;
  };
};

/**
 * This is a patched version of the codegen generated useCommentsQuery hook.
 * It is patched to return paginated results of CommentWithFirstComment instead of union with {} type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useComments(options: QueryHookOptions<CommentsResult, CommentsVariables>) {
  return useQuery<CommentsResult, CommentsVariables>(CommentsDocument, options);
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
 * It is patched to return paginated results of Profile instead of union with {} type.
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
 * It is patched to return paginated results of Comment | Post instead of union with {} type.
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
