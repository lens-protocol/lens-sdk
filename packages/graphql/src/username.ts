import { PaginatedResultInfo, Username } from './fragments';
import { type RequestOf, graphql } from './graphql';

export const UsernameQuery = graphql(
  `query Username($request: UsernameRequest!) {
    value: username(request: $request) {
      ...Username
    }
  }`,
  [Username],
);
export type UsernameRequest = RequestOf<typeof UsernameQuery>;

export const UsernamesQuery = graphql(
  `query Usernames($request: UsernamesRequest!) {
    value: usernames(request: $request) {
      __typename
      items {
        ...Username
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Username, PaginatedResultInfo],
);
export type UsernamesRequest = RequestOf<typeof UsernamesQuery>;
