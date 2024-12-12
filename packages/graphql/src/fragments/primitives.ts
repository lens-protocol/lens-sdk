import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const AppMetadataFragment = graphql(
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
export type AppMetadata = FragmentOf<typeof AppMetadataFragment>;

export const AppFragment = graphql(
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
  [AppMetadataFragment],
);
export type App = FragmentOf<typeof AppFragment>;

export const Feed = graphql(
  `fragment Feed on Feed {
      address
  }`,
);
