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

export const GroupMetadataFragment = graphql(
  `fragment GroupMetadata on GroupMetadata {
      __typename
      description
      id
      icon
      name
      coverPicture
  }`,
);
export type GroupMetadata = FragmentOf<typeof GroupMetadataFragment>;

// TODO: add GroupRulesConfig
export const GroupFragment = graphql(
  `fragment Group on Group {
    __typename
    address
    timestamp
    metadata {
      ...GroupMetadata
    }
    isMember
    owner
  }`,
  [GroupMetadataFragment],
);
export type Group = FragmentOf<typeof GroupFragment>;
