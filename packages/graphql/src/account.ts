import type { VariablesOf } from 'gql.tada';
import { Account } from './fragments';
import { graphql } from './graphql';

export const AccountQuery = graphql(
  `query Account($request: AccountRequest!) {
    value: account(request: $request) {
      ...Account
    }
  }`,
  [Account],
);
export type AccountQueryVariables = VariablesOf<typeof AccountQuery>;
