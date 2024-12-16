import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { UsernameNamespaceFragment } from './primitives';

export const UsernameFragment = graphql(
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
  [UsernameNamespaceFragment],
);
export type Username = FragmentOf<typeof UsernameFragment>;
