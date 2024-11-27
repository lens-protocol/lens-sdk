import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const AppMetadata = graphql(
  `fragment AppMetadata on AppMetadata {
      __typename
      description
      developer
      logo
      name
      platforms
      privacyPolicy
      termsOfService
      url
  }`,
);
export type AppMetadata = FragmentOf<typeof AppMetadata>;

export const App = graphql(
  `fragment App on App {
    __typename
    address
    graphAddress
    sponsorshipAddress
    defaultFeedAddress
    namespaceAddress
    treasuryAddress
    createdAt
    metadata {
      ...AppMetadata
    }
  }`,
  [AppMetadata],
);
export type App = FragmentOf<typeof App>;

export const Feed = graphql(
  `fragment Feed on Feed {
      address
  }`,
);
