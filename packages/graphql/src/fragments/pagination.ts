import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const PaginatedResultInfoFragment = graphql(
  `fragment PaginatedResultInfo on PaginatedResultInfo {
    __typename
    prev
    next
  }`,
);
export type PaginatedResultInfo = FragmentOf<typeof PaginatedResultInfoFragment>;
