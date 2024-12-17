import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const TransactionWillFailFragment = graphql(`
  fragment TransactionWillFail on TransactionWillFail {
    __typename
    reason
  }
`);
export type TransactionWillFail = FragmentOf<typeof TransactionWillFailFragment>;
