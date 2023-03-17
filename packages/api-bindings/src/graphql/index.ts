import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  CommentFragment,
  CommentsDocument,
  CommentsQueryVariables,
  CommentWithFirstCommentFragment,
  CommonPaginatedResultInfoFragment,
  PostFragment,
  ProfileFragment,
  SearchProfilesDocument,
  SearchProfilesQueryVariables,
  SearchPublicationsDocument,
  SearchPublicationsQueryVariables,
} from './generated';

export * from './CollectPolicy';
export * from './ContentEncryptionKey';
export * from './FollowPolicy';
export * from './FollowStatus';
export * from './generated';
export * from './ProfileAttributeReader';
export * from './ProfileAttributes';
export * from './ReferencePolicy';
export * from './sources';
export * from './utils';

export type CommentsQuery = {
  result: {
    items: Array<CommentWithFirstCommentFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

/**
 * This is a patched version of the codegen generated useCommentsQuery hook.
 * It is patched to return paginated results of CommentWithFirstCommentFragment instead of union with {} type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useCommentsQuery(options: QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
  return useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
}

export type SearchProfilesQuery = {
  result: {
    __typename: 'ProfileSearchResult';
    items: Array<ProfileFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

/**
 * This is a patched version of the codegen generated useSearchProfilesQuery hook.
 * It is patched to return paginated results of ProfileFragment instead of union with {} type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useSearchProfilesQuery(
  options: QueryHookOptions<SearchProfilesQuery, SearchProfilesQueryVariables>,
) {
  return useQuery<SearchProfilesQuery, SearchProfilesQueryVariables>(
    SearchProfilesDocument,
    options,
  );
}

export type SearchPublicationsQuery = {
  result: {
    __typename: 'PublicationSearchResult';
    items: Array<CommentFragment | PostFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

/**
 * This is a patched version of the codegen generated useSearchPublicationsQuery hook.
 * It is patched to return paginated results of CommentFragment | PostFragment instead of union with {} type.
 *
 * See: https://github.com/dotansimha/graphql-code-generator/discussions/5567
 */
export function useSearchPublicationsQuery(
  options: QueryHookOptions<SearchPublicationsQuery, SearchPublicationsQueryVariables>,
) {
  return useQuery<SearchPublicationsQuery, SearchPublicationsQueryVariables>(
    SearchPublicationsDocument,
    options,
  );
}
