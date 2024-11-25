import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const Username = graphql(`
    fragment Username on Username {
      __typename
      id
      value
      namespace {
        address
        namespace
        metadata {
          description
          id
        }
      }
      linkedTo
      ownedBy
      timestamp
    }
  `);
export type Username = FragmentOf<typeof Username>;
