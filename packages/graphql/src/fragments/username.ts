import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { UsernameNamespace } from './namespace';

export const Username = graphql(
  `fragment Username on Username {
      __typename
      id
      value
      localName
      linkedTo
      ownedBy
      timestamp
      namespace {
        ...UsernameNamespace
      }
  }`,
  [UsernameNamespace],
);
export type Username = FragmentOf<typeof Username>;
