import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const UsernameNamespace = graphql(
  `fragment UsernameNamespace on UsernameNamespace {
      __typename
      address
      namespace
      createdAt
      metadata {
        __typename
        description
        id
      }
      owner
      # TODO: Implement rules
      # rules {
      #   anyOf {
      #     ...RULE
      #   }
      #   required {
      #     ...RULE
      #   }
      # }
    }`,
);
export type UsernameNamespace = FragmentOf<typeof UsernameNamespace>;
