import { type FragmentDocumentFor, graphql } from '../graphql';

export type PaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  prev: string | null;
  next: string | null;
};

export const PaginatedResultInfoFragment: FragmentDocumentFor<
  PaginatedResultInfo,
  'PaginatedResultInfo'
> = graphql(
  `fragment PaginatedResultInfo on PaginatedResultInfo {
    __typename
    prev
    next
  }`,
);
