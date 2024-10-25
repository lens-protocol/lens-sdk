import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const App = graphql(
  `fragment App on App {
    address
  }`,
);
export type App = FragmentOf<typeof App>;

export const Feed = graphql(
  `fragment Feed on Feed {
    address
  }`,
);
export type Feed = FragmentOf<typeof App>;
